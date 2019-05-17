//金钱格式 /货币价格
var number = 99999
var option = { style: 'currency',currency: 'CNY'} 
var res = number.toLocaleString('zn-CN',option)
"￥99,999.00"


//计算经纬度 之间的距离
var earthR = 6378137.0;
function getDistance(latA, lngA, latB, lngB) {
	var pi180 = Math.PI / 180;
	var arcLatA = latA * pi180;
 	var arcLatB = latB * pi180;
	var x = Math.cos(arcLatA) * Math.cos(arcLatB) * Math.cos((lngA-lngB)*pi180);
	var y = Math.sin(arcLatA) * Math.sin(arcLatB);
	var s = x + y;
	if (s > 1) {
		s = 1;
	}
	if (s < -1) {
		s = -1;
	}
	var alpha = Math.acos(s);
	var distance = alpha * earthR;
	return distance;
}

//JS浮点数陷阱及解法
https://juejin.im/post/59f9e26f6fb9a0452724ea32

/*
* f: 转换之前的小数
* digit: 正常结果的小数位数
*/
var numA = 0.1; 
var numB = 0.2;
console.log(re = numA + numB)//0.30000000000000004
Math.formatFloat = function(f, digit) { 
	var m = Math.pow(10, digit); 
	return parseInt(f * m, 10) / m; 
} 
 
//github
https://github.com/nefe/number-precision

Javascript中 toFixed 的‘奇葩坑’

以前一直以为toFixed就是四舍五入的方法，后来又有一段时间以为toFixed是五舍六入。今天终于写的时候，终于才知道toFixed是一个叫做四舍六入无成双的诡异的方法。。。

什么是四舍六入五成双：百度是这么说的：

对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，这种修约（舍入）规则是“四舍六入五成双”，也即“4舍6入5凑偶”这里“四”是指≤4 时舍去，"六"是指≥6时进上，"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。（0是偶数）

toFixed使用的是银行家舍入规则。 银行家舍入:所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法。 简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。 但是不论引入toFixed解决浮点数计算精度缺失的问题也好，它有没有使用银行家舍入法也罢，都是为了解决精度的问题，但是又离不开二进制浮点数的环境，但至少他帮助我们找到了问题所在，从而让我们有解决方法。
所以也就是说： (0.5251).toFixed(2) => 0.53 然而 (0.525).toFixed(2)=>0.52，这并不是我们想用的四舍五入的方法。

通过重写toFixed的方法：

Number.prototype.toFixed = function(length){
	var carry = 0; //存放进位标志
	var num, multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
	var str = this + ''; //将调用该方法的数字转为字符串
	var dot = str.indexOf("."); //找到小数点的位置
	if(str.slice(dot + length + 1, dot + length + 2) >= 5) carry = 1; /*找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1,这里原作者用的是str.substr(dot + length + 1, 1)*/
	multiple = Math.pow(10, length); //设置浮点数要扩大的倍数
	num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
	var result = num / multiple + ''; //将进位后的整数再缩小为原浮点数
	/*
	* 处理进位后无小数
	*/
	dot = result.indexOf(".");
	if(dot === -1){
		result += '.';
		dot = result.indexOf(".");
	}
	/*
	* 处理多次进位
	*/
	var len = result.length - (dot+1);
	if(len < length){
		for(var i = 0; i < length - len; i++){
				result += 0;
		}
	}
	return result;
}

--------------------- 

/*


*/
