const moment = require('moment');
moment.locale('zh-cn');

/**
 * 自定义日期格式 格式化
 * @param {*} value
 * @param format 日期格式，如：YYYY-MM-DD HH:ss:mm
 */
const formatCustomDate = (value, format) => {
  return moment(value).format(format);
}

/**
 * 日期格式化【YYYY-MM-DD HH:ss:mm】
 * @param {*} value 
 */
const formatDate = (value) => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 开始日期格式化
 * @param {*} value 
 */
const formatSDate = (value) => {
  !value && (value = moment());
  return moment(value).startOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 结束日期格式化
 * @param {*} value 
 */
const formatEDate = (value) => {
  !value && (value = moment());
  return moment(value).endOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 获取月初日期
 * @param {*} value 
 */
const getMonthSDate = (value) => {
  !value && (value = moment());
  return moment(value).startOf('month').startOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 获取周信息
 * @param {*} value 
 */
const getWeek = (value) => {
  let week = moment(value).format('d');

  switch (week) {
    case "0":
      week = "周日";
      break;
    case "1":
      week = "周一";
      break;
    case "2":
      week = "周二";
      break;
    case "3":
      week = "周三";
      break;
    case "4":
      week = "周四";
      break;
    case "5":
      week = "周五";
      break;
    case "6":
      week = "周六";
      break;
  }

  return week;
}

// 阿拉伯数字转汉字
const SectionToChinese = (section) => {
  let number = section;
  let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    chnUnitSection = ["", "万", "亿", "万亿", "亿亿"],
    chnUnitChar = ["", "十", "百", "千"],
    strIns = '',
    chnStr = '',
    unitPos = 0,
    zero = true;
  while (section > 0) {

    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
// 汉字转阿拉伯数字
const ChineseToNumber = (chnStr) => {
  let chnNumChar = {
      零: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10,
    },
    chnNameValue = {
      十: {
        value: 10,
        secUnit: false
      },
      百: {
        value: 100,
        secUnit: false
      },
      千: {
        value: 1000,
        secUnit: false
      },
      万: {
        value: 10000,
        secUnit: true
      },
      亿: {
        value: 100000000,
        secUnit: true
      }
    },
    rtn = 0,
    section = 0,
    number = 0,
    secUnit = false,
    str = chnStr.split('');

  for (var i = 0; i < str.length; i++) {
    var num = chnNumChar[str[i]];
    if (typeof num !== 'undefined') {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += (number * unit);
      }
      number = 0;
    }
  }
  return rtn + section;
};
// 用JS获取地址栏参数的方法
function GetQueryString(name) {
  // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  // var r = window.location.href.match(reg);
  var r = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null

  // if (r != null) return unescape(r[2]);
  if (r != null) return unescape(r);
  return null;
}

function GetUserId() {
  if (constants.ENV == "development") {
    return 1;
  } else {
    return GetQueryString("userId");
  }
}
// 名称转换
function nameConversion(type, name) {
  let data_1 = {
    'ZHENGXIN': '征信机构',
    'DATA_PLATFORM': '数据平台',
    'BANK': '银行',
    'CUSTOMER_FINANCE': '消费金融',
    'CASH_LOAN': '现金贷',
    'P2P': 'P2P理财',
    'CREDITPAY': '信用支付',
    'CONSUMSTAGE': '消费分期',
    'COMPENSATION': '信用卡代偿',
    'DIVERSION': '导流平台',
    '其它': '其它',
    'CHINA_UNICOM':'中国联通',    
    'CHINA_MOBILE':'中国移动',
    "CHINA_TELECOM":"中国电信",
  };
  let data_2 = {
    'M0': '0-15天',
    'M1': '16-30天',
    'M2': '31-60天',
    'M3': '61-90天',
    'M4': '91-120天',
    'M5': '121-150天',
    'M6': '151-180天',
    'M6+': '大于180天',
  };
  let obj = {};
  if(type == 1){
    obj = data_1;
  }else{
    obj = data_2;
  }
  if (obj[name]) {
    return obj[name];
  } else if (!name || name == undefined || name == null || name == "NULL") {
    return "";
  } else {
    return name;
  }
}


export default {
  formatCustomDate,
  formatDate,
  formatSDate,
  formatEDate,
  getMonthSDate,
  getWeek,
  SectionToChinese,
  ChineseToNumber,
  GetQueryString,
  GetUserId,
  nameConversion,
}
