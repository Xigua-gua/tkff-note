

var log = function() {
    console.log.apply(console, arguments)
}

// 定义我们用于测试的函数
// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}
JSON加强版 测试  JSON加强版 测试 JSON加强版 测试
var arrayEquals = function(a, b, message) {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        log(`${message}测试失败---> ${a}不等于${b} `)
    }
    if (JSON.stringify(a) === JSON.stringify(b)) {
        log(`${message}测试成功---> ${a}等于${b}`)
    }
}

函数执行遇到 return 就结束 函数执行遇到 return 就结束
var minus = function(a, b) {
    return a - b
    log('这一句是不会被执行的, 因为 return 的时候函数就结束了')
}


Math 标准库函数 Math 标准库函数 Math 标准库函数
Math.random()   得到一个随机的小数(0 - 1 之间)
Math.floor(x)	返回 <= x 整数 向下取整
//Math.floor(1.5) == 1
Math.ceil( x )  返回 >= x 整数 向下上取整
Math.round( x )  四舍五入
Math.abs( x )    取绝对值
Math.max(1,5,3,8)  取最大值
Math.min(1,5,3,8)  去最小值
var max = Math.max.apply(null,array)



数组方法 数组方法 数组方法
常用数组方法:
array.push(a,b,c) 在数组尾部添加元素
array.pop()   删除一个数组尾部元素
array.unshift(x,y,z)  在数组头部添加元素
array.shift()  删除一个数组头部元素
var arr = [1,2,3]
arr.join('&') // 返回 '1&2&3'

字符串方法 字符串方法 字符串方法
字符串方法:
var str = 'abcdefg'
str.split('d')// 返回 ['abc', 'efg']
如何将字符串 按给定长度平均分割 保存到数组
var ffge = function(str, n) {
    var array = []
    var len = str.length / n
    for (var i = 0; i < len; i++) {
        var a = str.slice(n*i, n*(i+1))
        array.push(a)
    }
    return array
}


// 内置的基本数据有以下几种类型
// number          数字
// string          字符串
// boolean         布尔变量（只有两个值 true 或 false）
// object          对象, 是高级一点的内容
var a
a = 1       // a 是 number
a = 1.1     // number
a = 'good'  // string

typeof( object )	判断 类型
String( number )	数字 转 字符串
Number( string )	字符串 转 数字

可以用 typeof 语句得到一个变量的类型
a = 10
b = true
c = 'I am good'
log('type a', typeof a)
log('type b', typeof b)
log('type c', typeof c)
// 运行, 输出如下
// type a number
// type b boolean
// type c string

Object.prototype.toString.call([1,2]) // "[object Array]"
typeof([1,2]) //"object"  这是什么鬼


typeof a !== 'undefined'
上面代码会检测 foo 是否已经定义；如果没有定义而直接使用会导致 ReferenceError 的异常。
这是 typeof 唯一有用的地方。
结论
为了检测一个对象的类型，强烈推荐使用 Object.prototype.toString 方法；因为这是唯一一个
可依赖的方式。正如上面表格所示，typeof 的一些返回值在标准文档中并未定义，因此不同的引擎
实现可能不同。
除非为了检测一个变量是否已经定义，我们应尽量避免使用 typeof 操作符。







JSON  JSON  JSON
var s = JSON.stringify([1, 2, 3, 4])
log('序列化后的字符串', typeof s, s)
var a = JSON.parse(s)
log('反序列化后的数组', typeof a, a)


时间函数 时间函数 时间函数 时间函数
var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

omg为父元素,html 为子元素,在父元素中插入子元素用 insertAdjacentHTML
omg.insertAdjacentHTML('beforeend', html )
删除元素
omg.remove( )

insertAdjacentHTML	标签 描述
beforebegin  	   开始标记 前
afterbegin	       开始标记 后
beforeend	       结束标记 前
afterend	       结束标记 后
