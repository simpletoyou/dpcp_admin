/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

//修正乘法的精度问题
let accMul = function (arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

/**
 * 保留小数位
 * @param name
 * @param str
 * @param length
 * @returns {string}
 */
let fix = function (name, str, length) {
    str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
    length = isNaN(parseInt(length)) ? 2 : parseInt(length);
    let pow = Math.pow(10, length);
    //修正小数乘一个整数出小数的情况,乘完之后再进行四舍五入取0位小数
    return ((Math[name](accMul(str, pow))) / pow).toFixed(length);
};

export default {
    // 金额展示
    // 示例: {{item.moneyChange|sign}} {{item.moneyChange|abs|currency(' ')}} G
    sign(str) { // 判断正负
        str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
        //3-16前写法 return str != 0 ? str > 0 ? '+' : '-' : '';
        return str >= 0 ? '+' : '-';
    },
    sign2(str) { // 判断正负2
        str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
        return str != 0 ? str > 0 ? '↑' : '↓' : '';
    },
    abs(str) { // 绝对值
        str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
        return Math.abs(str);
    },
    fix(str, length) { // 四舍五入后保留多少位小数
        return fix('round', str, length);
    },
    floorFix(str, length) { // 去尾后保留多少位小数
        return fix('floor', str, length);
    },
    ceilFix(str, length, isGop) { // 向上进一后保留多少位小数 最后一个参数默认就是两位，true为果仁数设置为三位
        if (str === 0 || (str + '').indexOf('.') < 0) {
            return (isGop === undefined ? (str + '.00') : (str + '.000'));
        }
        return ((str + '').split('.')[1].length && (str + '').split('.')[1].length === (length ? length : 2)) ? parseFloat(str) : fix('ceil', parseFloat(str), length);
    },
    tail(str, length) { // 尾数
        str = typeof str !== 'string' ? '' : parseFloat(str);
        length = isNaN(parseInt(length)) ? 4 : Math.abs(parseInt(length));
        return str.substr(-length);
    },
    omit(str, length, replace) { // 省略
        let l = 5; // 默认保留长度
        length = isNaN(parseInt(length)) ? l : parseInt(length); //没传length isNaN()返回true
        return str.length > length ? (str.substring(0, length) + (replace || '...')) : str;
    },
    phone(str) { // 手机省略
        let phoneReg = /^((13[0-9])|(14[57])|(15[0-35-9])|(17[0678])|(18[0-9]))\d{8}$/;
        return phoneReg.test(str) ? String(str).substr(0, 3) + '****' + String(str).substr(-4) : str;
    }
};