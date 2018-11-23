<template>
  <div class="main">
    <el-row class="row_1">
      <el-col :span="2" class="col col_1">
        <div class="img_name">
          <span>{{userInfo.name.slice(0,1)}}</span>
        </div>
      </el-col>
      <el-col :span="14" class="col">
        <div class="user_name">
          <span>{{userInfo.name}}</span>
          <span>{{userInfo.gender}}</span>
          <span>{{userInfo.age}}</span>
        </div>
          <div class="user_font">
            <span class="tit">身份证号：</span>
            <span class="val">{{userInfo.idcard}} | {{userInfo.idcardLocation}}</span>
            <span class="status">有效</span>
          </div>
          <div class="user_font">
            <span class="tit">手机号码：</span>
            <span class="val">{{userInfo.mobile}} | {{userInfo.mobileLocation}}</span>
            <span class="tit padding_left_40">联系邮箱：</span>
            <span class="val">{{userInfo.email}}</span>
          </div>
          <div class="user_font">
            <span class="tit">是否导入过运营商数据：</span>
            <span class="val">{{verification.hasCarrierData ? "是" : "否"}}</span>
          </div>
      </el-col>
      <el-col :span="8" class="col col_3">
          <div class="box">
            <div>查询结果</div>
            <div>成功</div>
          </div>
          <div class="box">
            <div>涉黑评分</div>
            <div>{{mobileInfo.matchScore ? mobileInfo.matchScore : '-'}}</div>
          </div>
          <div class="box">
            <div>失信情况</div>
            <div>{{isUntrusted ? "是": "否" }}</div>
          </div>
      </el-col>
    </el-row>
    <el-row class="row_2">
      <el-tabs v-model="activeName">
        <el-tab-pane label="运营商模块" name="first">
            <vFirst v-if="activeName == 'first'"></vFirst>
        </el-tab-pane>
        <el-tab-pane label="多头信息" name="second">
            <vSecond v-if="activeName == 'second'"></vSecond>
        </el-tab-pane>
        <el-tab-pane label="失信情况" name="third">
            <vThird v-if="activeName == 'third'"></vThird>
        </el-tab-pane>
        <el-tab-pane label="QQ群风险" name="fourth">
          <vFourth v-if="activeName == 'fourth'"></vFourth>
        </el-tab-pane>
        <el-tab-pane label="设备指纹风险" name="fifth">
          <vFifth v-if="activeName == 'fifth'"></vFifth>
        </el-tab-pane>
        <el-tab-pane label="变更信息" name="sixth">
          <vSixth v-if="activeName == 'sixth'"></vSixth>
        </el-tab-pane>
        <el-tab-pane label="黑名单信息" name="seventh">
          <vSeventh v-if="activeName == 'seventh'"></vSeventh>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import vFirst from "./first";
import vSecond from "./second";
import vThird from "./third";
import vFourth from "./fourth";
import vFifth from "./fifth";
import vSixth from "./sixth";
import vSeventh from "./seventh";
import service from "./service";

export default {
  components: {
    vFirst,
    vSecond,
    vThird,
    vFourth,
    vFifth,
    vSixth,
    vSeventh
  },
  data() {
    return {
      activeName: "first",
      isUntrusted: false,
      // 用户信息
      userInfo: {
        idcard: "-",
        idcardLocation: "-",
        mobile: "-",
        carrier: "-",
        mobileLocation: "-",
        name: "-",
        age: "-",
        gender: "-",
        email: "-"
      },
      verification: {
        hasCarrierData: "-", //用户是否导入过运营商数据
        hasOnlinebankData: "-" //用户是否导入过网银信用卡数据
      },
      mobileInfo: {}
    };
  },
  created() {
    this.handlePersonInfo(utilsOper.GetUserId());
    this.handleUntrustedInfo(utilsOper.GetUserId());
  },
  methods: {
    // 法院失信
    handleUntrustedInfo(userId) {
      let that = this;
      service.getInfo({
        url: "untrusted_info/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            if (
              data.obj &&
              (data.obj.courtcaseCnt > 0 || data.obj.dishonestCnt > 0)
            ) {
              that.isUntrusted = true;
            } else {
              that.isUntrusted = false;
            }
          }
        }
      });
    },
    handlePersonInfo(userId) {
      let that = this;
      // 人员信息
      service.getInfo({
        url: "person_info/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.userInfo = data.obj;
          }
        }
      });
      // 认证信息
      service.getInfo({
        url: "verification_info/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.verification = data.obj;
          }
        }
      });
      // 手机信息
      service.getInfo({
        url: "mobile_info/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.mobileInfo = data.obj;
            this.$bus.$emit("busInfoId", that.mobileInfo.id.toString());
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin: 20px;
  .row_1 {
    display: flex;
    align-items: center;
    margin: 20px;

    .col {
      padding: 0 20px;
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
        margin-bottom: 20px;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.65);
        & span:nth-child(2) {
          margin: 0 15px;
          font-family: PingFangSC-Regular;
          line-height: 28px;
          margin: auto 40px;
        }
      }
      .user_font {
        font-size: 14px;
        .tit {
          color: #000;
        }
        .padding_left_40 {
          padding-left: 40px;
        }
        .val {
          color: #000000a6;
        }
        .status {
          width: 44px;
          height: 20px;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #1e88f5;
          margin-left: 10px;
          font-size: 12px;
          color: #1e88f5;
          display: inline-block;
          text-align: center;
          line-height: 20px;
        }
      }
      & div:nth-child(3) {
        margin: 8px 0;
      }
    }
    .col_1 {
      text-align: center;
    }
    .col_3 {
      display: flex;
      justify-content: space-around;
      div {
        & div:first-child {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          margin-bottom: 5px;
        }
        & div:last-child {
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 38px;
        }
      }
      & div:nth-child(3) {
        margin: 0;
      }
    }
  }
  .row_2 {
    padding: 0 20px;
  }
}
</style>
