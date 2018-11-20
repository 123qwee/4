<template>
<div class="fourth">
    <div class="title">QQ群风险</div>
    <div id="fourthChart"></div>
</div>
</template>
<script>
import radarOptions from "./radarOptions";
import barOptions from "./barOptions";
export default {
  components: {},
  data() {
    return {
      fourthChart: null,
      radarOptions: _.cloneDeep(radarOptions)
    };
  },
  mounted() {
    let that = this;

    let fourthChartDom = this.$el.querySelector("#fourthChart");
    that.fourthChart = this.$echarts.init(fourthChartDom);

    that.handleFourthChart();
  },
  watch: {},
  methods: {
    handleFourthChart() {
      let that = this;
      let aa = Object.assign(that.radarOptions, {});

      that.fourthChart.setOption(aa);
      that.fourthChart.resize();
    }
  }
};
</script>
<style lang='scss' scoped >
.fourth {
    margin: 5px;
    padding: 20px;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }
  .title {
    font-size: 14px;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    border-bottom: 1px solid #e9e9e9;
    height: 48px;
    line-height: 48px;
  }
  #fourthChart {
    height: 400px;
  }
}
</style>