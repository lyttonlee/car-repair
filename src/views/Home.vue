<template>
  <div class="page home">
    <div id="map" class="page"></div>
    <!-- <div class="search">
      <el-input size="small" placeholder="请输入要查询的车辆"></el-input>
    </div> -->
    <div class="switch" @click="toggleShowSide">
      close
    </div>
    <div class="list" v-if="showSide">
      <h4>车辆列表可收缩</h4>
      <h5>点击车辆会显示车辆的详细信息以及返修的过程记录</h5>
      <h5>点击地图上的车辆和列表的效果应一致,效果类似于轨迹记录</h5>
      <el-input size="small" placeholder="请输入要查询的车辆"></el-input>
      <el-tabs>
        <el-tab-pane label="所有" name="online">
          <template v-for="item in 8">
            <div class="item" @click="showCar" :key="item">
              {{`本田XX车 --- 状态(是否告警) --- 维修时长(3小时)`}}
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="告警" name="his">
          <template v-for="item in 10">
            <div class="item" @click="showCar" :key="item">历史车辆-{{item}}</div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="未告警" name="no">
          <template v-for="item in 10">
            <div class="item" @click="showCar" :key="item">历史车辆-{{item}}</div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <RepairTrack ref="repairTrack" />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import imgMap from '../assets/img/map.png'
import car from '../assets/img/car.png'
import RepairTrack from '../components/RepairTrack'
export default {
  name: 'home',
  components: {
    // HelloWorld
    // RepairTrack: () => import('../components/RepairTrack')
    RepairTrack
  },
  data () {
    return {
      showSide: true,
      showTrack: false
    }
  },
  methods: {
    toggleShowSide () {
      this.showSide = !this.showSide
    },
    showCar () {
      console.log('show car')
      // this.showTrack = true
      this.$refs['repairTrack'].visible = true
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    const map = L.map('map', {
      center: [2, 2],
      zoom: 3,
      zoomControl: false, // 默认不显示缩放按钮
      attributionControl: false // 不显示leaflet 图标logo

    })
    // console.log(map)
    const imgUrl = imgMap
    const imgBounds = [[-60, -100], [60, 100]]
    // eslint-disable-next-line no-undef
    L.imageOverlay(imgUrl, imgBounds).addTo(map)
    // map.removeControl()
    // 添加车
    // eslint-disable-next-line no-undef
    const carIcon = L.icon({
      iconUrl: car,
      iconSize: [20, 20],
      iconAnchor: [1, 1],
    })
    // eslint-disable-next-line no-undef
    const carMarker = L.marker([15, 25], { icon: carIcon, autoPan: true, draggable: true })
    carMarker.bindPopup(`<h3>我就是一辆车</h3>`).openPopup()
    carMarker.addTo(map)
    console.log(map)
    let [x, y] = [20, 30]
    // requestAnimationFrame(() => {
    //   carMarker.setLatLng([x + 1, y + 1])
    // })
    this.cartime = setInterval(() => {
      // console.log(i)
      // console.log(x)
      carMarker.setLatLng([x++, y++])
    }, 500)
    console.log(L.latLng([25, 40]).toBounds(2))
    console.log(window.WebSocket)
  },
  beforeDestroy () {
    this.cartime && clearInterval(this.cartime)
    this.cartime = null
  }
}
</script>

<style lang="less" scoped>
.home {
  .search {
    position: fixed;
    width: 600px;
    top: 80px;
    left: 20%;
    z-index: 1001;
  }
  .list {
    position: fixed;
    width: 350px;
    top: 30px;
    right: 20px;
    z-index: 1001;
    height: 80%;
    border-radius: 10px;
    background: rgba(102, 101, 101, 0.75);
    box-shadow: 2px 2px 5px #666;
    .item {
      cursor: pointer;
      margin: 10px 0;
      padding: 5px;
    }
  }
  .switch {
    padding: 15px;
    position: fixed;
    top: 35px;
    right: 25px;
    z-index: 1002;
    cursor: pointer;
  }
}
</style>
