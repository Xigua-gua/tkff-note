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
//github
https://github.com/nefe/number-precision

/*


*/
