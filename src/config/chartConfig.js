const textColor = '#ccc'
const backgroundColor = '#6a7985'
export const baseChartOption = {
  title: {
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
        backgroundColor: backgroundColor
      }
    }
  },
  textStyle: {
    color: textColor
  },
  legend: {
    textStyle: {
      color: textColor
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    top: '3%',
    left: '2%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
}
