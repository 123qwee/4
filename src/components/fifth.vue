<template>
<div class="fourth">
    <div class="title">设备指纹风险</div>
    <div id="fifthChart"></div>
</div>
</template>
<script>
import radarOptions from "./radarOptions";
import barOptions from "./barOptions";
export default {
  components: {},
  data() {
    return {
      fifthChart: null,
      radarOptions: _.cloneDeep(radarOptions)
    };
  },
  mounted() {
    let that = this;

    let fifthChartDom = this.$el.querySelector("#fifthChartChart");
    that.fifthChart = this.$echarts.init(fifthChartDom);

    that.handleFourthChart();
  },
  watch: {},
  methods: {
    handleFourthChart() {
      let that = this;
      let aa = Object.assign(that.radarOptions, {});

      that.fifthChart.setOption(aa);
      that.fifthChart.resize();
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
  #fifthChart {
    height: 400px;
  }
}
</style>