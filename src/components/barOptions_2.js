export default {
  title: {
    // text: '世界人口总量',
    text: '',
    textStyle: {
      fontSize: '16px',
      color: '#14152d',
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: (params) => {
      return "近" + params[0].axisValueLabel + "贷款申请<br/>" + params[0].marker + "次数：" + params[0].value;
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['15天', '1个月', '3个月', '6个月']
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: "dotted"
      }
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    }
  },
  series: [{
    data: [120, 200, 150, 80],
    type: 'bar'
  }]

}
