

<template>
<div class="third">
  <el-row :gutter="5">
    <el-col :span="5" class="col box_1">
      <div class="title">失信情况</div>
      <div class="content">
        <div>法院执行人次数</div>
        <div>{{untrustedInfo.courtcaseCnt}}</div>
        <div>失信未执行次数</div>
        <div>{{untrustedInfo.dishonestCnt}}</div>
      </div>
    </el-col>
    <el-col :span="18" class="col">
      <div class="title">失信明细</div>
        <template v-for="(item,index) in detailsList">
          <div class="box_2" :key="index">
            <div class="tit">{{item.courtName}}</div>
            <div class="add_time">
              <span>{{item.areaName}}</span>
              <span>{{item.publishDate}}</span>
            </div>
            <div class="box_row">
              <span>执行依据文号：</span>
              <span>{{item.caseCode}}</span>
              <span>案号：</span>
              <span>{{item.gistId}}</span>
            </div>
            <div class="box_row">
              <span>生效法律文书确定的义务：</span>
              <span>{{item.duty}}</span>
            </div>
            <div class="box_row">
              <span>被执行人的履行性质：</span>
              <span>{{item.performance}}</span>
            </div>
            <div class="box_row">
              <span>失信被执行人行为具体情形：</span>
              <span>{{item.disruptTypeName}}</span>
            </div>
          </div>
          <div v-if="index % 2 == 0" :key="index + '1'" style="width: 96%;height: 1px;background: #e8e8e8;margin: 20px auto;"></div>
        </template>
      <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="2" layout="prev, pager, next, jumper" :total="gRecordCount">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>
<script>
import service from "./service";
export default {
  components: {},
  data() {
    return {
      gRecordCount: 15,
      untrustedInfo: {
        courtcaseCnt: "0",
        dishonestCnt: "0"
      },
      detailsList: []
    };
  },
  created() {
    this.handleUntrustedInfo(utilsOper.GetUserId());
  },
  mounted() {},
  watch: {},
  methods: {
    // 法院失信
    handleUntrustedInfo(userId) {
      let that = this;
      service.getInfo({
        url: "untrusted_info/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.untrustedInfo = data.obj;
            that.handleQuery();
          }
        }
      });
    },
    handleQuery() {
      popupOper.showLoading();
      let that = this,
        page,
        pageSize;
      if (this.$refs["pager"] == undefined) {
        page = 1;
        pageSize = 2;
      } else {
        page = this.$refs["pager"].internalCurrentPage;
        pageSize = this.$refs["pager"].internalPageSize;
      }
      service.getInfo({
        url: "untrusted_info_dishonest_detail_info/" + that.untrustedInfo.id,
        data: {
          pageNum: page,
          pageSize: pageSize
        },
        successFunc: data => {
          if (data.code == 200) {
            // 多头信息-注册
            that.gRecordCount = data.count;
            that.detailsList = data.list;
          }
          popupOper.closeLoading();
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped >
.third {
  .title {
    font-size: 14px;
    line-height: 48px;
    text-overflow: ellipsis;
    border-bottom: 1px solid #e9e9e9;
    padding: 0 24px;
    margin-bottom: 20px;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .el-col {
    margin: 10px;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
  .box_1 {
    .content {
      padding: 0 24px;
      div:nth-child(odd) {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
        margin-bottom: 4px;
      }
      div:nth-child(even) {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
        margin-bottom: 24px;
      }
    }
  }
  .pages {
    text-align: right;
  }
  .box_2 {
    padding: 0 24px;
    .tit {
      font-size: 16px;
      color: #14152d;
      line-height: 24px;
      margin-bottom: 8px;
    }
    .add_time {
      color: #14152d;
      line-height: 24px;
      margin-bottom: 8px;
      span {
        display: inline-block;
        line-height: 24px;
        height: 22px;
        padding: 0 8px;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        background: #f3f3f3;
        font-size: 12px;
        opacity: 1;
        margin-right: 8px;
        cursor: pointer;
        white-space: nowrap;
      }
    }
    .box_row {
      margin: 4px 0;
      font-size: 14px;
      color: #14152d;
      line-height: 22px;
      span:nth-child(even) {
        display: inline;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
      }
    }
  }
}
</style>

