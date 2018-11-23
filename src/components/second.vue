<template>
    <div class="main second">
        <el-row :gutter="10" class="row">
            <el-col :span="11" class="box_1">
                <div class="title">多头信息 - 申请多头</div>
                <div class="box_1_head">
                    <div>
                        <div class="head_txt">注册机构数量</div>
                        <div class="cont">{{authQueriedDetailRegisterInfo.orgCount}}</div>
                    </div>
                    <div>
                        <div class="head_txt head_level_2">第三方渠道</div>
                        <div class="head_txt">注册机构数量</div>
                        <div class="cont">{{authQueriedDetailRegisterInfo.otherCount}}</div>
                    </div>
                    <div>
                        <div class="head_txt">机构查询次数</div>
                        <div class="cont">{{authQueriedDetail.queriedDetailOrgCount}}</div>
                    </div>
                </div>
                <div class="tab_head">机构查询历史</div>
                <div class="tab">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="time" label="查询日期">
                        </el-table-column>
                        <el-table-column prop="orgType" label="查询机构类型">
                        </el-table-column>
                        <el-table-column label="是否为本机构">
                            <template slot-scope="scope">
                                <span>{{scope.row.isSelf ? '是' : '否'}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pages" ref="pager" @current-change="handleQuery_3" @size-change="handleQuery_3" :page-size="5" layout="prev, pager, next, jumper" :total="gRecordCount">
                    </el-pagination>
                </div>
            </el-col>
            <el-col :span="11" class="box_2">
                <div class="box_2_head">
                    <div class="title">多头信息 - 机构类型</div>
                    <el-button-group>
                        <el-button size="small" v-for="(item,index) in typeList" :key="index" @click="handleBtn(item)">{{item}}</el-button>
                    </el-button-group>
                </div>
                <div id="third_1"></div>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:40px;">
            <el-col :span="11" class="box_3">
                <div class="box_3_head">
                    <div class="title">借贷多头 - 借贷次数</div>
                </div>
                <div id="third_2"></div>
            </el-col>
            <el-col :span="11" class="box_4">
                <div class="box_4_head">
                    <div class="title">借贷多头 - 机构数</div>
                </div>
                <div id="third_3"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import service from "./service";
import barOptions2 from "./barOptions_2";

export default {
  data() {
    return {
      authQueriedDetail: {
        queriedDetailOrgCount: ""
      },
      authQueriedDetailRegisterInfo: {
        orgCount: "",
        otherCount: ""
      },
      typeList: [],
      tableData: [],
      gRecordCount: 15,

      thirdChart1: null,
      thirdChart2: null,
      thirdChart3: null,
      barOptions2: _.cloneDeep(barOptions2)
    };
  },
  created() {},
  mounted() {
    let that = this;

    let thirdChartDom1 = this.$el.querySelector("#third_1");
    that.thirdChart1 = this.$echarts.init(thirdChartDom1);

    let thirdChartDom2 = this.$el.querySelector("#third_2");
    that.thirdChart2 = this.$echarts.init(thirdChartDom2);

    let thirdChartDom3 = this.$el.querySelector("#third_3");
    that.thirdChart3 = this.$echarts.init(thirdChartDom3);

    this.handleQuery_1(utilsOper.GetUserId());
  },
  methods: {
    // 机构查询次数
    handleQuery_1(userId) {
      let that = this;
      service.getInfo({
        url: "auth_queried_detail/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.authQueriedDetail = data.obj;
            that.handleQuery_2();
            that.handleQuery_3();
          }
        }
      });
    },
    // 多头信息-注册
    handleQuery_2() {
      let that = this;
      service.getInfo({
        url: "auth_queried_detail_register_info/" + that.authQueriedDetail.id,
        successFunc: data => {
          if (data.code == 200) {
            // 多头信息-注册
            that.authQueriedDetailRegisterInfo = data.obj;
            that.typeList = data.obj.orgTypes.split(",");

            that.handleSecondChart1(that.typeList[0]);
            that.handleSecondChart2();
          }
        }
      });
    },
    // 多头信息-表格
    handleQuery_3() {
      popupOper.showLoading();
      let that = this,
        page,
        pageSize;
      if (this.$refs["pager"] == undefined) {
        page = 1;
        pageSize = 5;
      } else {
        page = this.$refs["pager"].internalCurrentPage;
        pageSize = this.$refs["pager"].internalPageSize;
      }
      service.getInfo({
        url: "auth_queried_detail_queried_infos/" + that.authQueriedDetail.id,
        data: {
          pageNum: page,
          pageSize: pageSize
        },
        successFunc: data => {
          if (data.code == 200) {
            // 多头信息-注册
            that.gRecordCount = data.count;
            that.tableData = data.list;
          }
          popupOper.closeLoading();
        }
      });
    },
    handleBtn(type) {
      this.handleSecondChart1(type);
    },
    handleQuery() {},
    handleSecondChart1(type) {
      let that = this;
      popupOper.showLoading();
      service.getInfo({
        url: "auth_queried_detail_queried_analyze/" + that.authQueriedDetail.id,
        successFunc: data => {
          if (data.code == 200) {
            let itemOptions = Object.assign(that.barOptions2, {});
            itemOptions.title.text = "多平台借贷分析-近X天贷款申请次数";
            itemOptions.xAxis.data = ["15天", "1个月", "3个月", "6个月"];
            let seriesData = {};
            _.map(_.find(data.list, { orgType: type }), (val, key) => {
              seriesData[key] = val ? val : 0;
            });
            itemOptions.series[0].data = [
              seriesData.loanCnt15d,
              seriesData.loanCnt30d,
              seriesData.loanCnt90d,
              seriesData.loanCnt180d
            ];
            that.thirdChart1.setOption(itemOptions);
            that.thirdChart1.resize();
          }
          popupOper.closeLoading();
        }
      });
    },
    handleSecondChart2() {
      let that = this;
      popupOper.showLoading();
      service.getInfo({
        url: "auth_queried_detail_loan_info/" + that.authQueriedDetail.id,
        successFunc: data => {
          if (data.code == 200) {
            // 多平台借贷分析-近X天贷款的机构数
            let itemOptions = Object.assign(that.barOptions2, {});
            itemOptions.title.text = "多平台借贷分析-近X天贷款的机构数";
            itemOptions.xAxis.data = [
              "借贷机构数(去重)",
              "15天",
              "1个月",
              "3个月",
              "6个月"
            ];
            let seriesData = {};
            _.map(data.list, (val, key) => {
              seriesData[key] = val ? val : 0;
            });
            itemOptions.series[0].data = [
              seriesData.loanOrgCnt,
              seriesData.loanOrgCnt15d,
              seriesData.loanOrgCnt30d,
              seriesData.loanOrgCnt90d,
              seriesData.loanOrgCnt180d
            ];
            that.thirdChart2.setOption(itemOptions);
            that.thirdChart2.resize();
            // 借贷多头-近X天贷款的次数

            let itemOptions2 = Object.assign(that.barOptions2, {});
            itemOptions2.title.text = "多平台借贷分析-近X天贷款的机构数";
            itemOptions2.xAxis.data = [
              "借贷次数",
              "15天",
              "1个月",
              "3个月",
              "6个月"
            ];
            let seriesData2 = {};
            _.map(data.list, (val, key) => {
              seriesData2[key] = val ? val : 0;
            });
            itemOptions2.series[0].data = [
              seriesData2.loanOrgCnt,
              seriesData2.loanCnt15d,
              seriesData2.loanCnt30d,
              seriesData2.loanCnt90d,
              seriesData2.loanCnt180d
            ];
            that.thirdChart3.setOption(itemOptions2);
            that.thirdChart3.resize();
          }
          popupOper.closeLoading();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.second {
  .el-col {
    height: 620px;
    margin-left: 12px;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
  .box_1 {
    .title {
      font-size: 14px;
      line-height: 48px;
      text-overflow: ellipsis;
      border-bottom: 1px solid #e9e9e9;
      margin-bottom: 20px;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    .box_1_head {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
      .head_txt {
        height: 45px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }
      .head_level_2 {
        height: auto;
      }
      .cont {
        font-size: 24px;
        color: #14152d;
        line-height: 32px;
      }
    }
    .tab_head {
      font-size: 14px;
      color: #14152d;
      line-height: 22px;
      margin: 16px auto;
    }
    .tab {
      border: 1px solid #e9e9e9;
      padding: 0 5px;
      td,
      th {
        padding: 6px 0;
      }
      .pages {
        text-align: right;
        margin: 10px 0;
      }
    }
  }
  .box_2,
  .box_3,
  .box_4 {
    .box_2_head,
    .box_3_head,
    .box_4_head {
      padding: 0 20px 20px;
      border-bottom: 1px solid #e9e9e9;
      .title {
        font-size: 14px;
        line-height: 48px;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
    }
    #third_2,
    #third_3 {
      height: calc(100% - 70px);
    }
    #third_1 {
      height: calc(100% - 105px);
    }
  }
}
</style>
