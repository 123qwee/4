<template>
<div class="sixth">
    <div class="title">变更信息</div>
    <div class="btn_group">
        <el-button-group>
            <el-button size="small" :class="btnIndex == '0' ? 'btn_act' : ''" data-type="1" @click="hadnleBtn(0)">身份证存疑</el-button>
            <el-button size="small" :class="btnIndex == '1' ? 'btn_act' : ''" data-type="2" @click="hadnleBtn(1)">手机存疑</el-button>
            <el-button size="small" :class="btnIndex == '2' ? 'btn_act' : ''" data-type="3" @click="hadnleBtn(2)">设备指纹</el-button>
        </el-button-group>
    </div>
    <div class="btn_3" v-if="btnIndex == '2'">
        <div>
            <div>使用过的设备数</div>
            <div>{{suspiciousDevice.otherDevicesCnt}}</div>
        </div>
        <div>
            <div>手机号码使用过的设备数</div>
            <div>{{suspiciousDevice.mobileOtherDevicesCnt}}</div>
        </div>
        <div>
            <div>身份证号码使用过的设备数</div>
            <div>{{suspiciousDevice.idcardOtherDevicesCnt}}</div>
        </div>
    </div>
    <el-row :gutter="20">
        <el-col :span="6" class="left">
            <template v-if="btnIndex == '0'">
                <div :class="btnIndex == '0' && leftButtonIndex == '1_1' ? 'box active' : 'box'" data-index= "1_1" @click="handleClickBox">
                    <div>身份证存疑姓名数</div>
                    <div>{{suspiciousIdcard.otherNamesCnt}}</div>
                </div>
                <div :class="btnIndex == '0' && leftButtonIndex == '1_2' ? 'box active' : 'box'" data-index="1_2" @click="handleClickBox">
                    <div>身份证存疑手机号码数</div>
                    <div>
                        <div>{{suspiciousIdcard.otherMobilesCnt}}</div>
                        <div>处黑手机号码数: 
                            <span>{{suspiciousIdcard.otherMobilesBlackCnt}}</span>
                        </div>
                    </div>
                </div>
                <div :class="btnIndex == '0' && leftButtonIndex == '1_3' ? 'box active' : 'box'" data-index= "1_3" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>{{suspiciousIdcard.informationSourcesCnt}}</div>
                </div>
            </template>
            <template v-else-if="btnIndex == '1'">
                <div :class="btnIndex == '1' && leftButtonIndex == '2_1' ? 'box active' : 'box'" data-index= "2_1" @click="handleClickBox">
                    <div>手机存疑姓名数</div>
                    <div>{{suspiciousMobile.otherNamesCnt}}</div>
                </div>
                <div :class="btnIndex == '1' && leftButtonIndex == '2_2' ? 'box active' : 'box'" data-index= "2_2" @click="handleClickBox">
                    <div>手机存疑身份证号码数</div>
                    <div>
                        <div>{{suspiciousMobile.otherIdcardsCnt}}</div>
                        <div>处黑身份证号码数: 
                            <span>{{suspiciousMobile.otherIdcardsBlackCnt}}</span>
                        </div>
                    </div>
                </div>
                <div :class="btnIndex == '1' && leftButtonIndex == '2_3' ? 'box active' : 'box'" data-index= "2_3" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>{{suspiciousMobile.informationSourcesCnt}}</div>
                </div>
            </template>
            <template v-else="btnIndex == '2'">
                <div :class="btnIndex == '2' && leftButtonIndex == '3_1' ? 'box active' : 'box'" data-index= "3_1" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他姓名数</div>
                    <div>{{suspiciousDevice.otherNamesCnt}}</div>
                </div>
                <div :class="btnIndex == '2' && leftButtonIndex == '3_2' ? 'box active' : 'box'" data-index= "3_2" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他手机号码数</div>
                    <div>
                        <div>{{suspiciousDevice.otherMobilesCnt}}</div>
                        <div>处黑手机号码数: 
                            <span>{{suspiciousDevice.otherMobilesCnt}}</span>
                        </div>
                    </div>
                </div>
                <div  :class="btnIndex == '2' && leftButtonIndex == '3_3' ? 'box active' : 'box'" data-index= "3_3" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他身份证号码数</div>
                    <div>
                        <div>{{suspiciousDevice.otherIdcardsCnt}}</div>
                        <div>处黑身份证号码数: 
                            <span>{{suspiciousDevice.otherIdcardsBlackCnt}}</span>
                        </div>
                    </div>
                </div>
                <div :class="btnIndex == '2' && leftButtonIndex == '3_4' ? 'box active' : 'box'" data-index= "3_4" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>{{suspiciousDevice.informationSourcesCnt}}</div>
                </div>
            </template>
        </el-col>
        <el-col :span="17" class="right">
                <div class="tab_title">{{tab_title}}</div>
                <!-- 身份证存疑 -->
                  <el-table v-if="btnIndex == '0' && leftButtonIndex == '1_1' " :data="tableData" style="width:100%;" key="1_1">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '0' && leftButtonIndex == '1_2' " :data="tableData" style="width:100%;" key="1_2">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column label="运营商">
                      <template slot-scope="scope">
                        <span>{{utilsNameConversion(1,scope.row.carrier)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="mobileLocation" label="号码归属地"></el-table-column>
                    <el-table-column label="是否命中黑灰名单">
                      <template slot-scope="scope">
                        <span>{{scope.row.isblack ? "是" : "否"}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '0' && leftButtonIndex == '1_3' " :data="tableData" style="width:100%;" key="1_3">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column label="机构类型">
                      <template slot-scope="scope">
                        <span>{{utilsNameConversion(1,scope.row.orgType)}}</span>
                      </template>
                    </el-table-column>
                  </el-table>


                  <!-- 手机号存疑 -->
                  <el-table v-if="btnIndex == '1' && leftButtonIndex == '2_1' " :data="tableData" style="width:100%;" key="2_1">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '1' && leftButtonIndex == '2_2' " :data="tableData" style="width:100%;" key="2_2">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="idcard" label="身份证号"></el-table-column>
                    <el-table-column label="是否命中黑灰名单">
                      <template slot-scope="scope">
                        <span>{{scope.row.isblack ? "是" : "否"}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '1' && leftButtonIndex == '2_3' " :data="tableData" style="width:100%;" key="2_3">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column label="机构类型">
                      <template slot-scope="scope">
                        <span>{{utilsNameConversion(1,scope.row.orgType)}}</span>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!-- 设备指纹 -->
                  <el-table v-if="btnIndex == '2' && leftButtonIndex == '3_1' " :data="tableData" style="width:100%;" key="2_1">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '2' && leftButtonIndex == '3_2' " :data="tableData" style="width:100%;" key="2_2">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column prop="mobileLocation" label="号码归属地"></el-table-column>
                    <el-table-column label="运营商">
                      <template slot-scope="scope">
                        <span>{{utilsNameConversion(1,scope.row.carrier)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="是否命中黑灰名单">
                      <template slot-scope="scope">
                        <span>{{scope.row.isblack ? "是" : "否"}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '2' && leftButtonIndex == '3_3' " :data="tableData" style="width:100%;" key="2_3">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column prop="idcard" label="身份证号"></el-table-column>
                    <el-table-column label="是否命中黑灰名单">
                      <template slot-scope="scope">
                        <span>{{scope.row.isblack ? "是" : "否"}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table v-if="btnIndex == '2' && leftButtonIndex == '3_4' " :data="tableData" style="width:100%;" key="2_3">
                    <el-table-column prop="latestUsedTime" label="最后使用时间"></el-table-column>
                    <el-table-column label="机构类型">
                      <template slot-scope="scope">
                        <span>{{utilsNameConversion(1,scope.row.orgType)}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="10" layout="prev, pager, next, jumper" :total="gRecordCount">
                </el-pagination>
        </el-col>
    </el-row>
</div>
</template>
<script>
var urlList = [
  {
    "1_1": "suspicious_idcard_other_names/",
    "1_2": "suspicious_idcard_other_mobiles/",
    "1_3": "suspicious_idcard_information_sources/"
  },
  {
    "2_1": "suspicious_mobile_other_names/",
    "2_2": "suspicious_mobile_other_idcards/",
    "2_3": "suspicious_mobile_information_sources/"
  },
  {
    "3_1": "suspicious_device_other_names/",
    "3_2": "suspicious_device_other_mobiles/",
    "3_3": "suspicious_device_other_idcards/",
    "3_4": "suspicious_device_information_sources/"
  }
];
import service from "./service";
export default {
  components: {},
  data() {
    return {
      suspiciousIdcard: {
        otherNamesCnt: 0,
        otherMobilesCnt: 0,
        otherMobilesBlackCnt: 0,
        informationSourcesCnt: 0
      },
      suspiciousMobile: {
        otherNamesCnt: "0", //	身份证存疑姓名数
        otherIdcardsCnt: "0", //	身份证存疑身份证数
        otherIdcardsBlackCnt: "0", //	身份证存疑触黑身份证数
        informationSourcesCnt: "0" //	提供数据的机构数
      },
      suspiciousDevice: {
        otherDevicesCnt: "0", //	使用过的设备数
        mobileOtherDevicesCnt: "0", //	手机号码使用过的设备数
        idcardOtherDevicesCnt: "0", //	身份证号码使用过的设备数
        informationSourcesCnt: "0", //	提供数据的机构数
        otherNamesCnt: "0", //	使用过的设备上登陆的其他姓名数
        otherMobilesCnt: "0", //	使用过的设备上登陆的其他手机号码数
        otherMobilesBlackCnt: "0", //	使用过的设备上登陆的其他触黑手机号码数
        otherIdcardsCnt: "0", //	使用过的设备上登陆的其他身份证号码数
        otherIdcardsBlackCnt: "0" //	使用过的设备上登陆的其他触黑身份证号码数
      },
      tableData: [],
      gRecordCount: 15,
      btnIndex: 0, //顶部三个按钮
      leftButtonIndex: "1_1", // 左侧三个按钮
      tab_title: "身份证存疑手机号码"
    };
  },
  created() {
    this.handleSuspiciousIdcard();
  },
  mounted() {},
  watch: {},
  methods: {
    utilsNameConversion(type,name) {
      return utilsOper.nameConversion(type, name);
    },
    // 点击按钮
    // 0：身份证存疑
    // 1：手机存疑
    // 2：设备指纹
    hadnleBtn(index) {
      this.btnIndex = index;
      if (index == "0") {
        this.handleSuspiciousIdcard();
        this.leftButtonIndex = "1_1";
      } else if (index == "1") {
        this.handleSuspiciousMobile();
        this.leftButtonIndex = "2_1";
      } else {
        this.handleSuspiciousDevice();
        this.leftButtonIndex = "3_1";
      }
    },
    // 左侧选项点击
    handleClickBox(e) {
      // $(".active").removeClass("active");
      // $(e.currentTarget).addClass("active");
      this.tab_title = $($(e.currentTarget).children()[0])
        .text()
        .slice(0, -1);
      this.leftButtonIndex = $(e.currentTarget).attr("data-index");
      this.handleQuery();
    },
    // 身份证存疑
    handleSuspiciousIdcard() {
      let that = this;
      service.getInfo({
        url: "suspicious_idcard/" + utilsOper.GetUserId(),
        successFunc: data => {
          if (data.code == 200) {
            that.suspiciousIdcard = data.obj;
            that.handleQuery();
          }
        }
      });
    },
    // 手机存疑
    handleSuspiciousMobile() {
      let that = this;
      service.getInfo({
        url: "suspicious_mobile/" + utilsOper.GetUserId(),
        successFunc: data => {
          if (data.code == 200) {
            that.suspiciousMobile = data.obj;
            that.handleQuery();
          }
        }
      });
    },
    // 设备存疑
    handleSuspiciousDevice() {
      let that = this;
      service.getInfo({
        url: "suspicious_device/" + utilsOper.GetUserId(),
        successFunc: data => {
          if (data.code == 200) {
            that.suspiciousDevice = data.obj;
            that.handleQuery();
          }
        }
      });
    },
    handleQuery() {
      let that = this,
        url,
        id,
        page,
        pageSize;
      if (this.$refs["pager"] == undefined) {
        page = 1;
        pageSize = 10;
      } else {
        page = this.$refs["pager"].internalCurrentPage;
        pageSize = this.$refs["pager"].internalPageSize;
      }

      url = urlList[this.btnIndex][this.leftButtonIndex];

      if (this.btnIndex == "0") {
        id = this.suspiciousIdcard.id;
      } else if (this.btnIndex == "1") {
        id = this.suspiciousMobile.id;
      } else {
        id = this.suspiciousDevice.id;
      }
      popupOper.showLoading();
      service.getInfo({
        url: url + id,
        data: {
          pageNum: page,
          pageSize: pageSize
        },
        successFunc: data => {
          if (data.code == 200) {
            that.tableData = data.list;
            that.gRecordCount = data.count;
          }
          popupOper.closeLoading();
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped >
.sixth {
  .el-table th {
    background: #f7f7f7;
  }
  .title {
    font-size: 14px;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    height: 48px;
    line-height: 48px;
  }
  .btn_group {
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
    .btn_act {
      border: 1px solid #409eff;
    }
  }
  .el-row {
    margin-top: 20px;
  }
  .left {
    .box.active {
      background: rgba(30, 136, 245, 0.05);
      border: 1px solid rgba(0, 0, 0, 0);
    }
    .box {
      box-sizing: border-box;
      overflow: hidden;
      cursor: pointer;
      background: #fff;
      border-radius: 2px;
      border: 1px solid #1e88f5;
      margin-bottom: 16px;
      margin-right: 24px;
      padding: 20px;
      height: 105px;
      div {
        &:first-child {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          margin-top: 0;
          margin-bottom: 4px;
        }
        &:last-child {
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          height: 38px;
          line-height: 38px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          div {
            &:first-child {
              font-size: 30px;
              color: rgba(0, 0, 0, 0.85);
            }
            &:last-child {
              right: 20px;
              bottom: 20px;
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              span {
                color: #f2637b;
              }
            }
          }
        }
      }
    }
  }
  .right {
    .pages {
      text-align: right;
      margin: 10px 0;
    }
    .tab_title {
      font-size: 14px;
      color: #14152d;
      line-height: 22px;
      margin-bottom: 16px;
    }
  }
  .btn_3 {
    display: flex;
    justify-content: space-between;
    background: #f9fcff;
    margin-top: 20px;
    margin-bottom: 16px;
    padding: 20px 24px;
    border-radius: 2px;
    div {
      div {
        &:first-child {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          margin-bottom: 16px;
        }
        &:last-child {
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 30px;
        }
      }
    }
  }
}
</style>