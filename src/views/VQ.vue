<template>
  <div class="page">
    <!-- <div v-if="true" class="page-title">
      {{$route.name}}
      <ShowTime />
    </div> -->
    <div class="layout">
      <div class="item">
        <div class="overview">
          <div class="overview-item">
            <h3>四小时出荷率</h3>
            <div class="error">今日: 15%</div>
            <div>昨日: 75%</div>
            <div>近七日: 80%</div>
          </div>
          <div class="overview-item">
            <h3>平均出荷时间</h3>
            <div class="error">今日: 6.3小时</div>
            <div>昨日: 3.4小时</div>
            <div>近七日: 2.8小时</div>
          </div>
          <div class="overview-item">
            <h3>今日入荷数</h3>
            <div class="success">今日: 276</div>
            <div>昨日: 148</div>
            <div>近七日: 245</div>
          </div>
          <div class="overview-item">
            <h3>剩余在库数</h3>
            <div class="error">今日: 245</div>
            <div>昨日: 16</div>
            <div>近七日: 45</div>
          </div>
        </div>
        <!-- <h2>今日入荷车辆: 18</h2>
        <h2>今日待修车辆: 17</h2>
        <h2>今日已出荷车辆: 5</h2>
        <h2>今日复检未通过车辆: 1</h2>
        <h2>今日待复检车辆: 2</h2>
        <h2>昨日班后在库车辆: 7</h2> -->
      </div>
      <div class="item item-row-1-3 item-col-2-4">地图</div>
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
        <h4>超八小时未出荷车辆列表</h4>
        <el-carousel indicator-position="none" height="100px" arrow="never">
          <el-carousel-item v-for="item in 4" :key="item">
            <div>{{`xxx-${item}号车`}}</div>
            <div>{{`xxx-${item}号车`}}</div>
            <div>{{`xxx-${item}号车`}}</div>
            <div>{{`xxx-${item}号车`}}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="item item-col-1-3" id="repaired-percent-chart">出荷率时间比例图</div>
      <div class="item item-col-3-5">chart</div>
    </div>
  </div>
</template>
<script>
// import ShowTime from '@/components/showTime'
import echart from 'echarts'
import bus from '@/bus/bus'
import { baseChartOption } from '../config/chartConfig'
export default {
  data () {
    return {}
  },
  components: {
    // ShowTime
  },
  mounted () {
    const legend = []
    for (let i = 0; i < 24; i++) {
      if (i % 3 === 0) {
        legend.push(i.toString() + '日')
      }
    }
    const repairNum = echart.init(document.getElementById('repair-num-chart'))
    const repairedPercentChart = echart.init(document.getElementById('repaired-percent-chart'))
    repairNum.setOption({
      color: ['#c23531', '#61a0a8', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      title: {
        text: '当日在库在修出荷趋势图',
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
      textStyle: {
        color: '#999'
      },
      legend: {
        // type: 'scroll',
        orient: 'vertical',
        left: '2%',
        top: '25%',
        // data: ['总在库车辆', '入荷车辆', '出荷车辆', 'PQ总装在库车辆', 'AF涂装在库车辆', 'WE焊装在库车辆', 'PA零件在库车辆'],
        data: ['在库车辆', '入荷车辆', '出荷车辆'],
        textStyle: {
          color: '#999'
        }
      },
      // toolbox: {
      //   feature: {
      //     // saveAsImage: {}
      //     magicType: {
      //       type: ['line', 'bar', 'tiled']
      //     }
      //   }
      // },
      grid: {
        left: '15%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: legend,
        }
      ],
      yAxis: [
        {
          type: 'value'
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
          lineStyle: {
            color: 'blue'
          }
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
        text: '当日出荷率比例',
        textStyle: {
          color: '#999'
        },
        // textAlign: 'center',
        left: '30%',
        top: 10,
      },
      legend: {
        // type: 'scroll',
        // orient: 'vertical',
        left: 'center',
        top: '10%',
        textStyle: {
          color: '#999'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '出荷率',
          type: 'pie',
          radius: '40%',
          // center: ['30%', '60%'],
          label: {
            normal: {
              formatter: '{b} \n {c} : ({d}%)',
            }
          },
          data: [
            { name: '1.5小时内', value: 7 },
            { name: '1.5-4小时', value: 25 },
            { name: '4-8小时', value: 58 },
            { name: '大于8小时', value: 14 },
          ]
        }
      ]
    }
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
      }
    }
  }
</style>
