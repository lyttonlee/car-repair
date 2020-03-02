<template>
  <div class="page">
    <!-- <div v-if="true" class="page-title">
      {{$route.name}}
      <ShowTime />
    </div> -->
    <div class="layout">
      <div class="item">
        <div class="overview">
          <template v-for="(item, key, index) in broad">
            <div :key="index" class="overview-item">
              <h3>{{item.key}}</h3>
              <div :class="item.today > item.yesterday ? 'success' : 'error'">今日: {{item.today}}</div>
              <div>昨日: {{item.yesterday}}</div>
              <div>七日: {{item.sevenDays}}</div>
            </div>
          </template>
        </div>
      </div>
      <div class="item item-row-1-3 item-col-2-4">
        <div id="map-small" class="page"></div>
        <div class="percent">
          <div class="percent-item">
            <div class="text">正常车辆</div>
            <el-progress :show-text="false" :stroke-width="8" :percentage="43"></el-progress>
            <div class="number">43% (100辆)</div>
          </div>
          <div class="percent-item">
            <div class="text">告警车辆</div>
            <el-progress :show-text="false" :stroke-width="8" :percentage="21" status="exception"></el-progress>
            <div class="number">21% (45辆)</div>
          </div>
          <div class="percent-item">
            <div class="text">超时车辆</div>
            <el-progress :show-text="false" :stroke-width="8" :percentage="36" status="warning"></el-progress>
            <div class="number">36% (67辆)</div>
          </div>
        </div>
      </div>
      <div class="item" id="repair-num-chart">总返修在库出荷趋势图(小时)</div>
      <div class="item">
        <h4>告警列表</h4>
        <el-carousel indicator-position="none" height="100px" arrow="never">
          <el-carousel-item v-for="item in 4" :key="item">
            <div>{{`xxx-${item}告警`}}</div>
            <div>{{`xxx-${item}告警`}}</div>
            <div>{{`xxx-${item}告警`}}</div>
            <div>{{`xxx-${item}告警`}}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="item">
        <!-- <h4>超八小时未出荷车辆列表</h4> -->
        <el-carousel :autoplay="true" indicator-position="none" arrow="never">
          <el-carousel-item v-for="(item, index) in cars" :key="index">
            <div class="item-car">
              <div class="head">
                <div class="name">{{item.name}}</div>
                <div :class="formatTime(item.ducration) < 4 ? 'time success' : 'time warn'">{{formatTime(item.ducration)}}小时</div>
              </div>
              <div class="problem">{{item.problem}}</div>
              <div class="lines">
                <template v-for="(line, index) in item.timeLines">
                  <div class="line" :key="index">
                    <div class="text">{{line.text}}</div>
                    <div class="time">{{line.time}}</div>
                  </div>
                </template>
              </div>
              <!-- <el-timeline>
                <el-timeline-item
                  v-for="(line, index) in item.timeLines"
                  :key="index"
                  :timestamp="line.time">
                  {{line.text}}
                </el-timeline-item>
              </el-timeline> -->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="item item-col-1-3" id="repaired-percent-chart">出荷率时间比例图</div>
      <div class="item item-col-3-5" id="out-put"></div>
    </div>
  </div>
</template>
<script>
// import ShowTime from '@/components/showTime'
import echart from 'echarts'
import bus from '@/bus/bus'
import { baseChartOption } from '../config/chartConfig'
import { broads } from '../mock/broad'
import getLastDays from '../mock/days'
import imgMap from '../assets/img/map.png'
import { cars } from '../mock/cars'
import moment from 'moment'
export default {
  data () {
    return {
      broad: broads[0],
      cars
    }
  },
  components: {
    // ShowTime
  },
  methods: {
    // moment,
    formatTime (s) {
      return moment.duration(s, 's').asHours().toFixed(2)
    },
    intervalBroad () {
      let index = 1
      this.broadTime = setInterval(() => {
        if (index > broads.length - 1) {
          index = 0
        }
        this.broad = broads[index]
        // console.log(this.broad)
        index++
      }, 5000)
    },
    // // 转变进度条的内容显示
    // format (percent) {
    //   return `正常车辆 ${percent}%`
    // },
  },
  mounted () {
    // 地图加载
    // eslint-disable-next-line no-undef
    const map = L.map('map-small', {
      center: [0, 0],
      zoom: 2,
      zoomControl: false, // 默认不显示缩放按钮
      attributionControl: false // 不显示leaflet 图标logo

    })
    // console.log(map)
    const imgUrl = imgMap
    const imgBounds = [[-60, -100], [60, 100]]
    // eslint-disable-next-line no-undef
    L.imageOverlay(imgUrl, imgBounds).addTo(map)

    // 看板总体数据概览变换
    this.intervalBroad()
    const legend = []
    for (let i = 0; i < 24; i++) {
      if (i % 3 === 0) {
        legend.push(i.toString() + '日')
      }
    }
    const repairNum = echart.init(document.getElementById('repair-num-chart'))
    const repairedPercentChart = echart.init(document.getElementById('repaired-percent-chart'))
    repairNum.setOption({
      color: ['#91c7ae', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      // title: {
      //   text: '当日在库在修出荷趋势图',
      //   textStyle: {
      //     color: '#999'
      //   },
      //   // textAlign: 'center',
      //   left: '30%',
      //   top: 10,
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      textStyle: {
        color: '#999'
      },
      legend: {
        // type: 'scroll',
        // orient: 'vertical',
        left: '20%',
        bottom: '5%',
        data: ['在库车辆', '入荷车辆', '出荷车辆'],
        textStyle: {
          color: '#999'
        }
      },
      grid: {
        left: '5%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          name: '日期',
          // data: legend,
          data: getLastDays(7)
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '数量'
        }
      ],
      series: [
        {
          name: '入荷车辆',
          type: 'line',
          // areaStyle: {},
          data: [5, 7, 14, 12, 18, 26],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
        },
        {
          name: '出荷车辆',
          type: 'line',
          // areaStyle: {},
          data: [0, 3, 2, 5, 17, 20],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
        },
        {
          name: '在库车辆',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          // areaStyle: {},
          data: [12, 16, 17, 22, 25, 16]
        }
      ]
    })
    const customRepairedOption = {
      title: {
        text: '出荷率',
        textStyle: {
          color: '#999'
        },
        // textAlign: 'center',
        left: '30%',
        top: 10,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        // type: 'scroll',
        // orient: 'vertical',
        left: '20%',
        bottom: '5%',
        data: ['四小时出荷率', '八小时出荷率'],
        textStyle: {
          color: '#999'
        }
      },
      grid: {
        left: '5%',
        right: '6%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          name: '日期',
          // data: legend,
          data: getLastDays(14)
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '百分比'
        }
      ],
      series: [
        {
          name: '四小时出荷率',
          type: 'line',
          // areaStyle: {},
          data: [5, 7, 14, 12, 18, 26, 45, 45, 67, 56, 87, 32, 67, 90, 34, 89],
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
        },
        {
          name: '八小时出荷率',
          type: 'line',
          // areaStyle: {},
          data: [0, 3, 2, 5, 17, 20, 56, 89, 67, 89, 56, 78, 90, 45, 67, 56],
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          // lineStyle: {
          //   color: 'blue'
          // }
        },
      ]
    }
    const outputOption = {
      title: {
        text: '平均出荷时间',
        textStyle: {
          color: '#999'
        },
        // textAlign: 'center',
        left: '30%',
        top: 10,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '5%',
        right: '6%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          name: '日期',
          // data: legend,
          data: getLastDays(14)
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '小时'
        }
      ],
      series: [
        {
          type: 'line',
          // areaStyle: {},
          data: [5, 7, 3.2, 4.6, 5, 6, 4.5, 4.5, 6.7, 5.6, 8.7, 3.2, 6.7, 9, 3.4, 8.9],
          areaStyle: {}
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
        },
      ]
    }
    const outNum = echart.init(document.getElementById('out-put'))
    outNum.setOption(Object.assign(baseChartOption, outputOption))
    const repairedOption = Object.assign(baseChartOption, customRepairedOption)
    repairedPercentChart.setOption(repairedOption)
    window.addEventListener('resize', () => {
      repairNum.resize()
    })
    bus.$on('menuSizeChanged', (statu) => {
      console.log('resize')
      setTimeout(() => {
        repairNum.resize()
        repairedPercentChart.resize()
      }, 500)
    })
  },
  beforeDestroy () {
    bus.$off('menuSizeChanged')
    this.broadTime && clearInterval(this.broadTime)
  }
}
</script>
<style lang="less" scoped>
.page {
    .page-title {
      margin: 20px 0;
      padding: 30px 0;
      background: rgba(53, 51, 51, 0.322);
      border-radius: 30px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .layout {
      height: 90%;
      margin-top: 20px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 40% 30% 30%;
      grid-gap: 20px;
      grid-auto-flow: column dense;

      .item {
        background: rgba(53, 51, 51, 0.322);
        border-radius: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        // height: 200px;
        .item-car {
          // height: 100%;
          font-size: .8rem;
          padding: 5px;
          .head {
            display: grid;
            grid-template-columns: 70% 30%;
            margin-top: 5px;
            margin: 10px 0;
            .name {
              text-align: left;
              font-size: 1rem;
              color: aquamarine;
            }
            .time {
              text-align: right;
            }
          }
          .problem {
            text-align: left;
          }
          .line {
            display: grid;
            grid-template-columns: 60% 40%;
            margin-top: 5px;
            .text {
              text-align: left;
            }
            .time {
              text-align: right;
            }
          }
        }
        .overview {
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          .overview-item {
            background: rgba(53, 51, 51, 0.322);
            border-radius: 5px;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
          }
        }
        .percent {
          position: relative;
          width: 100px;
          height: 300px;
          // background: red;
          top: -500px;
          left: 700px;
          z-index: 1500;
          .percent-item {
            margin: 15px auto;
            .text {
              margin-bottom: 5px;
            }
            .number {
              margin-top: 5px;
              font-size: .8rem;
            }
          }
        }
      }
    }
  }
</style>
