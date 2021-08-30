/**
 * @file
 * @auth jinguangguo
 * @date 2016/11/11
 */

export default function (str, hasPlus) {
    if (str === '' || typeof str == 'undefined') {
        return '-';
    } else {
        // 整数部分
        var integer = parseInt(str = Math.abs(+str || 0).toFixed(2), 10) + '';
        var part = integer.length;
        part = part > 3 ? part % 3 : 0;
        return (part ? '￥' + integer.substr(0, part) + ',' : '￥')
            + integer.substr(part).replace(/(\d{3})(?=\d)/g, '$1' + ',') + ('.' + Math.abs(str - integer).toFixed(2).slice(2));
    }
};