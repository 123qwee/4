<template>
    <div class="main first">
        <div class="title">运营商模块</div>
        <el-tabs v-model="firstActiveName" @tab-click="handleClick">
            <el-tab-pane label="联系人" name="firstContacts">
                <template>
                    <div class="head">
                        <div class="chart_tit">近{{day}}天直接联系人命中黑名单的类型: -</div>
                        <div>
                            <el-button-group>
                                <el-button size="small" @click="handleFirstChartData('180d')">180天</el-button>
                                <el-button size="small" @click="handleFirstChartData('90d')">90天</el-button>
                                <el-button size="small" @click="handleFirstChartData('30d')">30天</el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <div id="firstChart"></div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="亲密联系人" name="secondContacts">
                <template>
                    <div class="head">
                        <div class="chart_tit">近{{day}}天亲密直接联系人命中黑名单的类型: -</div>
                        <div>
                            <el-button-group>
                                <el-button size="small" @click="handleFirstChartData('180d')">180天</el-button>
                                <el-button size="small" @click="handleFirstChartData('90d')">90天</el-button>
                                <el-button size="small" @click="handleFirstChartData('30d')">30天</el-button>
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
      day: "30",
      firstActiveName: "firstContacts",

      firstChart: null,
      firstChartOptions: _.cloneDeep(barOptions),

      secondChart: null
    };
  },
  created() {
    // alert("1");
  },
  mounted() {
    // alert("2");
    this.init();
  },
  updated() {
    // alert("3");
  },
  destroyed() {
    // alert("4");
  },
  methods: {
    init() {
      let that = this;
      let firstChartDom = this.$el.querySelector("#firstChart");
      that.firstChart = this.$echarts.init(firstChartDom);

      let secondChartDom = this.$el.querySelector("#secondChart");
      this.secondChart = this.$echarts.init(secondChartDom);

      if (lscache.get("infoId")) {
        let params = {
          infoId: lscache.get("infoId"),
          day: "180d"
        };
        that.handleFirstContact(params);
      }
      this.$bus.$on("busInfoId", data => {
        let params = {
          infoId: data,
          day: "180d"
        };
        lscache.set("infoId", data, constants.SESSION_LIMIT);
        that.handleFirstContact(params); // 获取联系人
      });
    },
    handleClick(tab) {
      let params = {
        infoId: lscache.get("infoId"),
        day: "180d"
      };
      this.day = "30";
      this.$nextTick(() => {
        if (tab.name == "firstContacts") {
          this.handleFirstContact(params);
        } else {
          this.handleSecondContact(params);
        }
      });
    },
    handleFirstChartData(day) {
      this.day = day.slice(0, -1);
      if (this.firstActiveName == "firstContacts") {
        let params = {
          infoId: lscache.get("infoId"),
          day: day
        };
        this.handleFirstContact(params);
      } else {
        let params = {
          infoId: lscache.get("infoId"),
          day: day
        };
        this.handleSecondContact(params);
      }
    },
    // 联系人
    handleFirstContact(params) {
      let that = this;
      popupOper.showLoading();
      service.statis({
        url: "mobile_info_mobile_contact/" + params.infoId + "/" + params.day,
        successFunc: data => {
          if (data.code == 200) {
            if (data.obj) {
              let chartData = data.obj;
              let firstChartOptions = _.cloneDeep(this.firstChartOptions);

              firstChartOptions.yAxis.data = [
                "授权过的直接联系人\n/占比",
                "命中黑名单的直接联系人\n/占比",
                "授权过的间接联系人\n/占比",
                "命中黑名单的间接联系人\n/占比",
                "引起间接联系人在黑名单的直接联系人\n/占比",
                "引起间接联系人授权的直接联系人\n/占比"
              ];

              firstChartOptions.series[0].data.push(
                chartData.authContactnum,
                chartData.blackContactnum,
                chartData.authIndirectnum,
                chartData.blackIndirectnum,
                chartData.blackIndirectPeernum,
                chartData.authIndirectPeernum
              );

              that.firstChart.setOption(firstChartOptions);
              that.firstChart.resize();
            } else {
              let firstChartOptions = _.cloneDeep(this.firstChartOptions);
              that.firstChart.setOption(firstChartOptions);
              that.firstChart.resize();
            }
            popupOper.closeLoading();
          }
        }
      });
    },
    // 亲密联系人
    handleSecondContact(params) {
      let that = this;
      popupOper.showLoading();
      service.statis({
        url:
          "mobile_info_intimate_contact_info/" +
          params.infoId +
          "/" +
          params.day,
        successFunc: data => {
          if (data.code == 200) {
            if (data.obj) {
              let obj = {};
              _.map(data.obj, (val, key) => {
                obj[key] = val ? val : 0;
              });
              let chartData = obj;
              let secondChartOptions = _.cloneDeep(this.firstChartOptions);

              secondChartOptions.yAxis.data = [
                "授权过的亲密联系人\n/占比",
                "命中黑名单的亲密联系人\n/占比",
                "授权过的亲密间接联系人\n/占比",
                "命中黑名单的亲密间接联系人\n/占比",
                "引起亲密间接联系人在黑名单的亲密直接联系人\n/占比",
                "引起亲密联系人授权的亲密直接联系人\n/占比"
              ];

              secondChartOptions.series[0].data.push(
                chartData.authIntimatenum,
                chartData.blackIntimatenum,
                chartData.authIntimateIndirectnum,
                chartData.blackIntimateIndirectnum,
                chartData.blackIntimateIndirectPeernum,
                chartData.authIntimateIndirectPeernum
              );

              that.secondChart.setOption(secondChartOptions);
              that.secondChart.resize();
            } else {
              let secondChartOptions = _.cloneDeep(this.secondChartOptions);
              that.secondChart.setOption(secondChartOptions);
              that.secondChart.resize();
            }
            popupOper.closeLoading();
          }
        }
      });
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
