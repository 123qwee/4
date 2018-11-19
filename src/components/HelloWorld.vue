<template>
  <div class="main">
    <el-row class="row">
      <el-col :span="2" class="col col_1">
        <div class="img_name">
          <span>路</span>
        </div>
      </el-col>
      <el-col :span="14" class="col">
        <div class="user_name">
          <span>卢*</span>
          <span>男</span>
          <span>25</span>
        </div>
          <div class="">身份证号：33032719911111**** | 浙江省/温州市/苍南县有效</div>
          <div>手机号码：1371111**** | 浙江/杭州联系邮箱：111111111@qq.com</div>
          <div>是否导入过运营商数据：是</div>
      </el-col>
      <el-col :span="8" class="col">
        <div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  .row {
    display: flex;
    align-items: center;
    margin: 20px;

    .col {
      .img_name {
        display: inline-block;
        background: #d9ebfe;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 40px;
        color: #fff;
      }
      .user_name {
        margin-bottom: 15px;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.65);
        & span:nth-child(2) {
          margin: 0 15px;
          font-family: PingFangSC-Regular;
          line-height: 28px;
          margin: auto 40px;
        }
      }
      & div:nth-child(3) {
        margin: 5px 0;
      }
    }
    .col_1 {
      text-align: center;
    }
  }
}
</style>
