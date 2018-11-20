<template>
<div class="sixth">
    <div class="title">变更信息</div>
    <div class="btn_group">
        <el-button-group>
            <el-button size="small" :class="btnIndex == '1' ? 'btn_act' : ''" data-type="1" @click="hadnleBtn(1)">身份证存疑</el-button>
            <el-button size="small" :class="btnIndex == '2' ? 'btn_act' : ''" data-type="2" @click="hadnleBtn(2)">手机存疑</el-button>
            <el-button size="small" :class="btnIndex == '3' ? 'btn_act' : ''" data-type="3" @click="hadnleBtn(3)">设备指纹</el-button>
        </el-button-group>
    </div>
    <div class="btn_3" v-if="btnIndex == '3'">
        <div>
            <div>使用过的设备数</div>
            <div>3</div>
        </div>
        <div>
            <div>手机号码使用过的设备数</div>
            <div>3</div>
        </div>
        <div>
            <div>身份证号码使用过的设备数</div>
            <div>3</div>
        </div>
    </div>
    <el-row :gutter="20">
        <el-col :span="6" class="left">
            <template v-if="btnIndex == '1'">
                <div class="box active" @click="handleClickBox">
                    <div>身份证存疑姓名数</div>
                    <div>6</div>
                </div>
                <div class="box" data-index="2" @click="handleClickBox">
                    <div>身份证存疑手机号码数</div>
                    <div>
                        <div>61</div>
                        <div>处黑手机号码数: 
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>8</div>
                </div>
            </template>
            <template v-else-if="btnIndex == '2'">
                <div class="box active" @click="handleClickBox">
                    <div>手机存疑姓名数</div>
                    <div>28</div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>手机存疑身份证号码数</div>
                    <div>
                        <div>21</div>
                        <div>处黑身份证号码数: 
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>14</div>
                </div>
            </template>
            <template v-else="btnIndex == '3'">
                <div class="box active" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他姓名数</div>
                    <div>1</div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他手机号码数</div>
                    <div>
                        <div>1</div>
                        <div>处黑手机号码数: 
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>使用过的设备上登陆的其他身份证号码数</div>
                    <div>
                        <div>1</div>
                        <div>处黑身份证号码数: 
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="box" @click="handleClickBox">
                    <div>提供数据的机构数</div>
                    <div>8</div>
                </div>
            </template>
        </el-col>
        <el-col :span="17" class="right">
            <template>
                <div class="tab_title">{{tab_title}}</div>
                <el-table :data="tableData" style="width:100%;">
                    <el-table-column prop="a" label="最后使用时间"></el-table-column>
                    <el-table-column prop="b" label="手机号"></el-table-column>
                    <el-table-column prop="c" label="号码归属地"></el-table-column>
                    <el-table-column prop="d" label="运营商"></el-table-column>
                    <el-table-column prop="e" label="是否命中黑灰名单"></el-table-column>
                </el-table>
                <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="2" layout="prev, pager, next, jumper" :total="gRecordCount">
                </el-pagination>
            </template>
        </el-col>
    </el-row>
</div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          a: "2017-02-24 01:04:10",
          b: "15940718467",
          c: "辽宁",
          d: "中国移动",
          e: "	否"
        },
        {
          a: "2017-02-24 01:04:10",
          b: "15940718467",
          c: "辽宁",
          d: "中国移动",
          e: "	否"
        },
        {
          a: "2017-02-24 01:04:10",
          b: "15940718467",
          c: "辽宁",
          d: "中国移动",
          e: "	否"
        },
        {
          a: "2017-02-24 01:04:10",
          b: "15940718467",
          c: "辽宁",
          d: "中国移动",
          e: "	否"
        },
        {
          a: "2017-02-24 01:04:10",
          b: "15940718467",
          c: "辽宁",
          d: "中国移动",
          e: "	否"
        }
      ],
      gRecordCount: 15,
      btnIndex: 1,
      tab_title:"身份证存疑手机号码",
    };
  },
  mounted() {},
  watch: {},
  methods: {
    handleQuery() {},
    // 点击按钮
    // 1：身份证存疑
    // 2：手机存疑
    // 3：设备指纹
    hadnleBtn(index) {
      this.btnIndex = index;
      //   debugger
    },
    // 左侧选项点击
    handleClickBox(e) {
      $(".active").removeClass("active");
      $(e.currentTarget).addClass("active");
      this.tab_title = $($(e.currentTarget).children()[0]).text().slice(0,-1);
    }
  }
};
</script>
<style lang='scss' scoped >
.sixth {
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