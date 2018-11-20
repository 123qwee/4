<template>
    <div class="main second">
        <el-row :gutter="10" class="row">
            <el-col :span="11" class="box_1">
                <div class="title">多头信息 - 申请多头</div>
                <div class="box_1_head">
                    <div>
                        <div class="head_txt">注册机构数量</div>
                        <div class="cont">8</div>
                    </div>
                    <div>
                        <div class="head_txt head_level_2">第三方渠道</div>
                        <div class="head_txt">注册机构数量</div>
                        <div class="cont">0</div>
                    </div>
                    <div>
                        <div class="head_txt">机构查询次数</div>
                        <div class="cont">11</div>
                    </div>
                </div>
                <div class="tab_head">机构查询历史</div>
                <div class="tab">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="查询日期">
                        </el-table-column>
                        <el-table-column prop="type" label="查询机构类型">
                        </el-table-column>
                        <el-table-column prop="is" label="是否为本机构">
                            <template slot-scope="scope">
                                <span>{{scope.row.is == 0 ? '是' : '否'}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="5" layout="prev, pager, next, jumper" :total="gRecordCount">
                    </el-pagination>
                </div>
            </el-col>
            <el-col :span="11" class="box_2">
                <div class="box_2_head">
                    <div class="title">多头信息 - 机构类型</div>
                    <el-button-group>
                        <el-button size="small">ZHENGXIN</el-button>
                        <el-button size="small" type="primary" plain>CASH_LOAN</el-button>
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
      tableData: [
        {
          date: "2017-01-22",
          type: "CASH_LOAN",
          is: 0
        },
        {
          date: "2017-01-22",
          type: "CASH_LOAN",
          is: 0
        },
        {
          date: "2017-01-22",
          type: "CASH_LOAN",
          is: 1
        },
        {
          date: "2017-01-22",
          type: "CASH_LOAN",
          is: 0
        },
        {
          date: "2017-01-22",
          type: "CASH_LOAN",
          is: 0
        }
      ],
      gRecordCount: 15,

      thirdChart1: null,
      thirdChart2: null,
      thirdChart3: null,
      barOptions2: _.cloneDeep(barOptions2)
    };
  },
  mounted() {
    let that = this;

    let thirdChartDom1 = this.$el.querySelector("#third_1");
    that.thirdChart1 = this.$echarts.init(thirdChartDom1);

    let thirdChartDom2 = this.$el.querySelector("#third_2");
    that.thirdChart2 = this.$echarts.init(thirdChartDom2);

    let thirdChartDom3 = this.$el.querySelector("#third_3");
    that.thirdChart3 = this.$echarts.init(thirdChartDom3);

    that.handleSecondChart1();
    that.handleSecondChart2();
    that.handleSecondChart3();
  },
  methods: {
    handleQuery() {},
    handleSecondChart1() {
      let that = this;
      let aa = JSON.parse(JSON.stringify(that.barOptions2));
      aa.title.text = "多平台借贷分析-近X天贷款申请次数";
      that.thirdChart1.setOption(aa);

      that.thirdChart1.resize();
    },
    handleSecondChart2() {
      let that = this;
      let aa = Object.assign(that.barOptions2, {});
      aa.title.text = "借贷多头-近X天贷款的机构数";

      that.thirdChart2.setOption(aa);
      that.thirdChart2.resize();
    },
    handleSecondChart3() {
      let that = this;
      let { ...aa } = that.barOptions2;
      aa.title.text = "借贷多头-近X天贷款的次数";

      that.thirdChart3.setOption(aa);
      that.thirdChart3.resize();
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
