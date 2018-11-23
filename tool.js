
import XLSX from 'xlsx';


export function getObjUrl(hash) {
  let obj_url
  let res = {}
  if (hash.length > 1) {
    obj_url = hash[1]
  }
  obj_url && obj_url.split('&').forEach((item) => {
    const temp = item.split('=')
    res[temp[0]] = temp[1]
  })
  return res
}

export function Base64() {
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9+\/=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    }

    this._utf8_encode = function(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    this._utf8_decode = function(utftext) {
        let string = "";
        let i = 0;
        let [c,c2,c3] = [0,0,0];
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
let buly = function(str) {
    let res = str + ''
    if(res.length < 2) {
        res = '0' + res
    }
    return res
}

//时间函数
export function currentTime() {
    var d = new Date()
    var year = d.getFullYear()
    var month = buly(d.getMonth() + 1)
    var date = buly(d.getDate())
    var hours = buly(d.getHours())
    var minutes = buly(d.getMinutes())
    var seconds = buly(d.getSeconds())
    var timeString = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

//车牌验证
export function isLicensePlate(str) {
    return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(str);
}

//
export function downloadExl(list_name,json, type) {
    let tmpDown //导出的二进制对象
    let tmpdata = json[0];
    json.unshift({});
    let keyMap = []; //获取keys
    for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
    }
    tmpdata = [];//用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    // console.log('tmpdata',tmpdata);
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    let tmpWB
    if (list_name === 'order_model') {
      tmpWB = {
        SheetNames: ["发货单拣货明细"], //保存的表标题
        Sheets: {
          "发货单拣货明细": Object.assign({},
          tmpdata, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
        }
      };
    }else if (list_name === 'commodity_model') {
      tmpWB = {
        SheetNames: ["sheet1"], //保存的表标题
        Sheets: {
          "sheet1": Object.assign({},
          tmpdata, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
        }
      };
    }else {
      tmpWB = {
        SheetNames: ["mySheet"], //保存的表标题
        Sheets: {
          "mySheet": Object.assign({},
          tmpdata, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
        }
      };
    }
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
        {bookType: (type === undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
        type: ""
    }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById(list_name).href = href; //绑定a标签
    document.getElementById(list_name).click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

function s2ab(s) { //字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
 // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    let s = ''
    let m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}


// TMS订单模块 订单模板下载
export function downloadExl1(list_name,tmpdata,type) {
    let tmpDown //导出的二进制对象
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['发货单拣货明细'], //保存的表标题
        Sheets: {
          '发货单拣货明细': Object.assign({},
          tmpdata, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
        {bookType: (type === undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
        type: ""
    }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById(list_name).href = href; //绑定a标签
    document.getElementById(list_name).click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

export function diffArray(arr1,arr2) {
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      var index = arr1.indexOf(arr2[i]);
      if (index > -1) {
        arr1.splice(index, 1);
      }
    }
  }
  return arr1;
}

//取交集
export function commonArray(arr1,arr2) {
  let common_arr = []
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      var index = arr1.indexOf(arr2[i]);
      if (index > -1) {
        common_arr.push(arr1[index])
      }
    }
  }
  return common_arr;
}


//数组 元素交换位置
export function swapItems(arr, index1, index2){
　　arr[index1] = arr.splice(index2,1,arr[index1])[0]
　　return arr
}

// 目标元素上移
export function upData(arr, index) {
　if (arr.length > 1 && index !== 0) {
    var newArr = swapItems(arr, index, index - 1)
　}
  return newArr;
}

//目标元素 下移
export function downData(arr, index) {
  if (arr.length > 1 && index !== (arr.length - 1)) {
　   var newArr = swapItems(arr, index, index + 1)
　}
  return newArr;
}
