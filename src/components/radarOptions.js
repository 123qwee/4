export default {
  tooltip: {},
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: [{
        name: '命中借贷群数量',
        max: 10
      },
      {
        name: '命中分期群数量',
        max: 10
      },
      {
        name: '命中理财群数量',
        max: 10
      },
      {
        name: '命中薅羊毛群数量',
        max: 10
      },
      {
        name: '命中赌博彩票群数量',
        max: 10
      }
    ]
  },
  series: [{
    name: '数量',
    type: 'radar',
    data: [{
      value: [1, 5, 2, 4, 3],
      name: 'QQ群风险'
    }],
    itemStyle: {
      normal: {
        areaStyle: {
          type: 'default'
        },
        color: function (params) {
          var colorList = ["#3AA1FF", "#4CCA73", "#F9D337", "#415088"];
          return colorList[params.dataIndex];
        }
      },
    }
  }],
}
