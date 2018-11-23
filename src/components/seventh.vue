<template>
<div class="seventh">
  <div class="title">黑名单信息</div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="黑名单信息" name="blackList">
        <transition-group name="animation_left_right">
          <template v-if="activeName == 'blackList'">
            <div class="content" key="1_1">
              <div>
                <div>
                  <span class="spanBorderColor_1"></span>
                  <div class="line"></div>
                  <div>手机和姓名是否在黑名单</div>
                </div>
                <div>
                  <i v-if="! blackInfo.mobileNameInBlacklist" class="el-icon-circle-close-outline"></i>
                  <i v-else class="el-icon-circle-check-outline"></i>
                </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_1"></span>
                  <div class="line"></div>
                  <div>手机和姓名黑名单更新时间</div>
                </div>
                <div>{{blackInfo.mobileNameBlacklistUpdatedTime ? blackInfo.idcardNameBlacklistUpdatedTime : '-'}} </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_2"></span>
                  <div class="line"></div>
                  <div>身份证和姓名是否在黑名单</div>
                </div>
                <div>
                  <i v-if="! blackInfo.idcardNameInBlacklist" class="el-icon-circle-close-outline"></i>
                  <i v-else class="el-icon-circle-check-outline"></i>
                </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_2"></span>
                  <div class="line"></div>
                  <div>身份证和姓名黑名单更新时间</div>
                </div>
                <div>{{blackInfo.idcardNameBlacklistUpdatedTime ? blackInfo.idcardNameBlacklistUpdatedTime : '-'}} </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_3"></span>
                  <div>被标记的黑名单分类</div>
                </div>
                <div>
                  {{blackInfo.blackTypes ? blackInfo.blackTypes : ""}}
                </div>
              </div>
            </div>
            <div class="footer" key="1_2">
              <div>
                <div>逾期次数</div>
                <div>{{blackInfo.overdueCount}}</div>
              </div>
              <div>
                <div>最大逾期金额(元)</div>
                <div>{{blackInfo.overdueAmount}}</div>
              </div>
              <div>
                <div>最大逾期天数</div>
                <div>{{blackInfo.overdueStatus}}</div>
              </div>
            </div>
          </template>
        </transition-group>
      </el-tab-pane>
      <el-tab-pane label="灰名单信息" name="greyList">
        <transition-group name="animation_right_left">
          <template v-if="activeName == 'greyList'">
            <div class="content" key="2_1">
              <div>
                <div>
                  <span class="spanBorderColor_1"></span>
                  <div class="line"></div>
                  <div>手机和姓名是否在灰名单</div>
                </div>
                <div>
                  <i v-if="! grayInfo.mobileNameInGray" class="el-icon-circle-close-outline"></i>
                  <i v-else class="el-icon-circle-check-outline"></i>
                </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_1"></span>
                  <div class="line"></div>
                  <div>手机和姓名灰名单更新时间</div>
                </div>
                <div>{{grayInfo.mobileNameGrayUpdatedTime ? blackInfo.mobileNameGrayUpdatedTime : '-'}} </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_2"></span>
                  <div class="line"></div>
                  <div>身份证和姓名是否在灰名单</div>
                </div>
                <div>
                  <i v-if="! grayInfo.idcardNameInGray" class="el-icon-circle-close-outline"></i>
                  <i v-else class="el-icon-circle-check-outline"></i>
                </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_2"></span>
                  <div class="line"></div>
                  <div>身份证和姓名灰名单更新时间</div>
                </div>
                <div>{{grayInfo.idcardNameGrayUpdatedTime ? blackInfo.idcardNameGrayUpdatedTime : '-'}} </div>
              </div>
              <div>
                <div>
                  <span class="spanBorderColor_3"></span>
                  <div>被标记的灰名单分类</div>
                </div>
                <div>
                  {{grayInfo.grayTypes ? grayInfo.grayTypes : ""}}
                </div>
              </div>
            </div>
            <div class="footer" key="2_2">
              <div>
                <div>逾期次数</div>
                <div>{{grayInfo.overdueCount}}</div>
              </div>
              <div>
                <div>最大逾期金额(元)</div>
                <div>{{grayInfo.overdueAmount}}</div>
              </div>
              <div>
                <div>最大逾期天数</div>
                <div>{{grayInfo.overdueStatus}}</div>
              </div>
            </div>
          </template>
        </transition-group>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import service from "./service";
export default {
  components: {},
  data() {
    return {
      activeName: "blackList",
      blackInfo: {},
      grayInfo: {}
    };
  },
  mounted() {},
  watch: {},
  created() {
    popupOper.showLoading();
    this.handleBlackInfo(utilsOper.GetUserId());
  },
  methods: {
    handleClick() {},
    handleBlackInfo(userId) {
      let that = this;
      // 黑名单
      service.getInfo({
        url: "black_info_detail/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            popupOper.closeLoading();
            that.blackInfo = data.obj;
          }
        }
      });
      // 灰名单
      service.getInfo({
        url: "gray_info_detail/" + userId,
        successFunc: data => {
          if (data.code == 200) {
            that.grayInfo = data.obj;
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped >
.seventh {
  .title {
    margin: 24px;
    font-size: 18px;
    color: #14152d;
    line-height: 18px;
  }
  .content {
    padding: 25px 100px;
    div {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #090404;
      line-height: 18px;
      margin: 6px;
      position: relative;
      &:first-child {
        display: flex;
        align-items: center;
      }
      &:last-child {
        i {
          font-size: 12px;
          top: -3px;
          color: #f5474a;
          line-height: 32px;
          font-size: 18px;
        }
      }
      div {
        .spanBorderColor_1 {
          border-color: #f5474a;
        }
        .spanBorderColor_2 {
          border-color: #f38428;
        }
        .spanBorderColor_3 {
          border-color: #20bbef;
        }
        .line {
          position: absolute;
          width: 4px;
          height: 45px;
          background: #e9e9e9;
          top: 12px;
          left: -2px;
        }
        span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 2px #ffeaea solid;
          background: #fff;
          border-radius: 50%;
          position: relative;
          z-index: 10;
        }
      }
    }
  }
  .footer {
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
    background: #f9fcff;
    div {
      &:first-child {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
        margin-bottom: 16px;
      }
      &:last-child {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 30px;
      }
    }
  }
}
</style>