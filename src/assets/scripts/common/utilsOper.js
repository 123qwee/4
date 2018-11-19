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

/**
 * 根据附件路径判断附件类型是否为图片
 * @param {*} url 
 */
const isImageType = (url) => {
    if (url.indexOf("base64") > 0) {
        return true;
    } else {
        let suffix = _.last(url.split("."));
        return constants.MEDIA_TYPE_IMAGE.indexOf(suffix) >= 0;
    }
}

/**
 * 根据附件路径判断附件类型是否为视频
 * @param {*} url 
 */
const isVideoType = (url) => {
    let suffix = _.last(url.split("."));
    return constants.MEDIA_TYPE_VIDEO.indexOf(suffix) >= 0;
}

/**
 * 根据附件路径判断附件类型是否为音频
 * @param {*} url 
 */
const isAudioType = (url) => {
    let suffix = _.last(url.split("."));
    return constants.MEDIA_TYPE_AUDIO.indexOf(suffix) >= 0;
}

/**
 * 获取Dom元素的计算后样式
 * @param {*} el 
 */
const getCurrentStyle = (el) => {
    let style = null;

    // IE不支持getComputedStyle方法
    if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
    } else {
        style = el.currentStyle;
    }

    return style;
}

/**
 * 获取Dom元素的计算后值样式，如height,width
 * @param {*} el 
 * @param {*} type 如height,width
 */
const getStyleValue = (el, type) => {
    return Number(getCurrentStyle(el)[type].split("px")[0]);
}

/**
 * 导出表格数据到Excel文件
 * @param parentElm 表格容器Dom
 * @param ignoreColumn 不导出的列索引数组
 * @param filename 导出文件名
 */
const exportToExcel = (parentElm, ignoreColumn, filename) => {
    let $head = $(parentElm).find(".el-table__header");
    let $table = $(parentElm).find(".el-table__body");

    if (filename == undefined) {
        filename = "导出文件";
    }

    require.ensure([], () => {
        const {
            export_json_to_excel
        } = require("excel/Export2Excel");

        const tHeader = [],
            data = [];

        // 获取表头
        $head.find(".cell").map((index, el) => {
            if (ignoreColumn.indexOf(index) < 0) {
                tHeader.push(el.innerText.trim());
            }
        })

        // 获取表格内容
        $table.find(".el-table__row").map((index, row) => {
            let rowData = [];

            $(row).find(".cell").map((index, el) => {
                if (ignoreColumn.indexOf(index) < 0) {
                    rowData.push(el.innerText.trim());
                }
            })

            data.push(rowData);
        })

        export_json_to_excel(tHeader, data, filename);
    });
}

/**
 * 导出列表数据到Excel文件
 * @param {*} tHeader 表头数据
 * @param {*} tData  列表数据
 */
const exportDataToExcel = (tHeader, tData) => {
    let filename = "导出文件";

    require.ensure([], () => {
        const {
            export_json_to_excel
        } = require("@/components/excel/Export2Excel");

        export_json_to_excel(tHeader, tData, filename);
    });
}

/**
 * 生成某个数后面的可以被10整除的数
 * 返回包括开始，没有结束
 * sNum : 开始值
 * eNum : 结束值
 */
const createLastNum = (sNum, eNum) => {
    let Tnum = parseInt(sNum / 10) + 1, //十位
        endNum = parseInt(eNum / 10), // 结束的值
        numArray = [];
    for (let i = Tnum; i < endNum; i++) {
        numArray.push({
            "label": i * 10,
            "value": i * 10
        });
    }
    return numArray;
};

/**
 * 编码与文字转换
 */
const codeTransf = (type, code) => {
    if (type && code && (!isNaN(Number(code)) || code.constructor == Array)) {
        let data = lscache.get(type);
        if (type == "regionDataUnorganized") {
            if (typeof code != "string") {
                let prov = _.find(data, {
                    divisionCode: String(code[0]).slice(0, 2) * 10000
                }).divisionDistrict,
                    city = _.find(data, {
                        divisionCode: String(code[1]).slice(0, 4) * 100
                    }).divisionDistrict,
                    county = _.find(data, {
                        divisionCode: code[2]
                    }).divisionDistrict;
                return prov + city + county;
            }
        } else {
            return _.find(data, {
                value: code
            }).label;
        }
    } else {
        return code;
    }
}

// 将Boolean 类型值转为字符串
const filterForm = (formVal, AllVal) => {
    let regKey = /^is\w+/;
    for (var item in formVal) {
        if (regKey.test(item)) {
            formVal[item] = AllVal[item].toString();
        } else {
            formVal[item] = AllVal[item];
        }
    }
}
//人员年龄区间互转
const AgeConversion = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let ageType;
        if (val == "teen") {
            ageType = "青年"
        } else if (val == "prime") {
            ageType = "中年"
        } else if (val == "old") {
            ageType = "老年"
        }
        return ageType;
    } else {
        let type;
        if (val == "青年") {
            type = '1'
        } else if (val == "中年") {
            type = '2'
        } else if (val == "老年") {
            type = '3'
        }
        return type;
    }
}
//人员类型互转
const TypeConversion = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let Type;
        if (val == "float") {
            Type = "流动人口"
        } else if (val == "household") {
            Type = "户籍人口"
        }
        return Type;
    }
}
//两新组织名称互转
const swapName = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let Type;
        if (val == "economic") {
            Type = "非公有经济组织"
        } else if (val == "social") {
            Type = "社会组织"
        }
        return Type;
    }
}
// 人员类型和人员类型名称互转
const MutualConversion = (val, form) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let popleType;
        if (val == "6" || val == "peopleFocusStaying" || val == "stay") {
            popleType = '留守人员';
        } else if (val == "5" || val == "peopleFocusRelease" || val == "release") {
            popleType = '刑满释放人员';
        } else if (val == "2" || val == "peopleFocusCorrection" || val == "community") {
            popleType = '社区矫正人员';
        } else if (val == "4" || val == "peopleFocusMental" || val == "mental") {
            popleType = '严重精神障碍人员';
        } else if (val == "3" || val == "peopleFocusDrug" || val == "drugs") {
            popleType = '吸毒人员';
        } else if (val == "1" || val == "peopleFocusAids" || val == "aids") {
            popleType = '艾滋病危险人员';
        } else if (val == "7" || val == "peopleFocusTeens" || val == "teens") {
            popleType = '重点青少年';
        };
        return popleType;
    } else if (form) {
        let formName;
        if (val == "留守人员") {
            formName = 'peopleFocusStaying';
        } else if (val == "刑满释放人员") {
            formName = 'peopleFocusRelease';
        } else if (val == "严重精神障碍人员") {
            formName = 'peopleFocusMental';
        } else if (val == "吸毒人员") {
            formName = 'peopleFocusDrug';
        } else if (val == "艾滋病危险人员") {
            formName = 'peopleFocusAids';
        } else if (val == "重点青少年") {
            formName = 'peopleFocusTeens';
        } else if (val == "社区矫正人员") {
            formName = 'peopleFocusCorrection';
        };
        return formName;
    } else {
        let type;
        if (val == "留守人员") {
            type = '6';
        } else if (val == "刑满释放人员") {
            type = '5';
        } else if (val == "社区矫正人员") {
            type = '2';
        } else if (val == "严重精神障碍人员") {
            type = '4';
        } else if (val == "吸毒人员") {
            type = '3';
        } else if (val == "艾滋病危险人员") {
            type = '1';
        } else if (val == "重点青少年") {
            type = '7';
        };
        return type;
    }
}
/** 根据传入字段进行中文数值排序 */
const sortByFieldNumber = (items, field) => {
    return _.sortBy(items, function (item) {
        if (item[field]) {
            switch (item[field].length == 3 ? item[field].substring(0, 2) : item[field].substring(1, 2)) {
                case "一":
                    return 1;
                case "二":
                    return 2;
                case "三":
                    return 3;
                case "四":
                    return 4;
                case "五":
                    return 5;
                case "六":
                    return 6;
                case "七":
                    return 7;
                case "八":
                    return 8;
                case "九":
                    return 9;
                case "十":
                    return 10;
                case "十一":
                    return 11;
                case "十二":
                    return 12;
                case "十三":
                    return 13;
                case "十四":
                    return 14;
                case "十五":
                    return 15;
                default:
                    return 100;
            }
        }
    })
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
            十: { value: 10, secUnit: false },
            百: { value: 100, secUnit: false },
            千: { value: 1000, secUnit: false },
            万: { value: 10000, secUnit: true },
            亿: { value: 100000000, secUnit: true }
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
}


export default {
    formatCustomDate,
    formatDate,
    formatSDate,
    formatEDate,
    getMonthSDate,
    getWeek,
    isImageType,
    isVideoType,
    isAudioType,
    getCurrentStyle,
    getStyleValue,
    exportToExcel,
    createLastNum,
    codeTransf,
    filterForm,
    MutualConversion,
    AgeConversion,
    TypeConversion,
    swapName,
    exportDataToExcel,
    sortByFieldNumber,
    SectionToChinese,
    ChineseToNumber,
}
