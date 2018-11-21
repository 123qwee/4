<template>
    <div class="main first">
        <div class="title">运营商模块</div>
        <el-tabs v-model="firstActiveName" @tab-click="handleClick">
            <el-tab-pane label="联系人" name="firstContacts">
                <template>
                    <div class="head">
                        <div class="chart_tit">近30天直接联系人命中黑名单的类型: -</div>
                        <div>
                            <el-button-group>
                                <el-button size="small">180天</el-button>
                                <el-button size="small">90天</el-button>
                                <el-button size="small" type="primary" plain>30天</el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <div id="firstChart"></div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="亲密联系人" name="secondContacts">
                <template>
                    <div class="head">
                        <div class="chart_tit">近30天亲密直接联系人命中黑名单的类型: -</div>
                        <div>
                            <el-button-group>
                                <el-button size="small" type="primary" plain>180天</el-button>
                                <el-button size="small">90天</el-button>
                                <el-button size="small">30天</el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <div id="secondChart"></div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import service from "./service";
import barOptions from "./barOptions";

export default {
  data() {
    return {
      firstActiveName: "firstContacts",

      firstChartChart: null,
      firstChartOptions: _.cloneDeep(barOptions),

      secondChart: null
    };
  },
  mounted() {
    let that = this;

    let firstChartDom = this.$el.querySelector("#firstChart");
    that.firstChartChart = this.$echarts.init(firstChartDom);

    that.handleFirstContact(); // 获取联系人

    let secondChartDom = this.$el.querySelector("#secondChart");
    this.secondChart = this.$echarts.init(secondChartDom);
  },
  methods: {
    handleClick(tab) {
      this.$nextTick(() => {
        if (tab.name == "firstContacts") {
          this.handleFirstContact();
        } else {
          this.handleSecondContact();
        }
      });
    },
    handleFirstContact() {
      let that = this;

      that.firstChartChart.setOption(that.firstChartOptions);
      that.firstChartChart.resize();

      //   service.statis({
      //     url: "/statis/people/basic/roomAction",
      //     successFunc: data => {
      //       if (data.code == 200) {
      //         // that.firstChartChart.setOption(regionOptions);
      //         // that.firstChartChart.resize();
      //       }
      //     }
      //   });
    },
    handleSecondContact() {
      let that = this;

      let aa = _.cloneDeep(that.firstChartOptions);
      aa.series[0].data[5] = 111;
      
      that.secondChart.setOption(aa);
      that.secondChart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.first {
  .title {
    font-size: 14px;
    color: #14152d;
    line-height: 28px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    .chart_tit {
      font-size: 18px;
      color: #14152d;
      line-height: 28px;
    }
  }
  #firstChart,
  #secondChart {
    height: 400px;
  }
}
</style>
