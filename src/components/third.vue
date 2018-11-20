

<template>
<div class="third">
  <el-row :gutter="5">
    <el-col :span="5" class="col box_1">
      <div class="title">失信情况</div>
      <div class="content">
        <div>法院执行人次数</div>
        <div>2</div>
        <div>失信未执行次数</div>
        <div>2</div>
      </div>
    </el-col>
    <el-col :span="18" class="col">
      <div class="title">失信明细</div>
        <template>
          <div class="box_2">
            <div class="tit">上海市浦东新区人民法院</div>
            <div class="add_time">
              <span>上海</span>
              <span>2017年07月08日</span>
            </div>
            <div class="box_row">
              <span>执行依据文号：</span>
              <span>(2017)沪0115执9562号</span>
              <span>案号：</span>
              <span>(2016)沪0115民初49001号</span>
            </div>
            <div class="box_row">
              <span>生效法律文书确定的义务：</span>
              <span>返还人民币702909.60元及已支付的诉讼费1534.40元共计：704444元</span>
            </div>
            <div class="box_row">
              <span>被执行人的履行性质：</span>
              <span>全部未履行</span>
            </div>
            <div class="box_row">
              <span>失信被执行人行为具体情形：</span>
              <span>违反财产报告制度</span>
            </div>
          </div>
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
      gRecordCount: 15
    };
  },
  mounted() {},
  watch: {},
  methods: {
    handleQuery() {}
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

