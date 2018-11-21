export default {
  title: {
    // text: '世界人口总量',
    // subtext: '数据来自网络'
  },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'shadow'
  //     },
  //     formatter:'{b}</br>{a0}: {c0} 间',
  //   },
  legend: {
    show: false,
    data: ['2011年'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    show: true,
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    }
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: ['授权过的直接联系人\n/占比', '命中黑名单的直接联系人\n/占比', '授权过的间接联系人\n/占比', '命中黑名单的间接联系人\n/占比', '引起间接联系人在黑名单的直接联系人\n/占比', '引起间接联系人授权的直接联系人\n/占比']
  },
  series: [{
    name: '2011年',
    type: 'bar',
    data: [3, 6, 1, 4, 9, 5],
    label: {
      normal: {
        show: true,
        position: "right",
        fontSize: 14,
        formatter: "{c}人"
      }
    },
    itemStyle: {
      color: function (params) {
        var colorList = ["#3AA1FF", "#4CCA73", "#F9D337", "#415088","#FF841C","#FF4236"];
        return colorList[params.dataIndex];
      }
    }
  }],
};
