/*


*/

所有 jQuery 函数位于一个 document ready 函数中：
这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码
通常会把 jQuery 代码放到 <head>部分的事件处理方法中
<html>
<head>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){

--- jQuery functions go here ----

});
</script>
</head>

<body>
<h2>This is a heading</h2>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
<button>Click me</button>
</body>

</html>

jQuery 名称冲突
jQuery 使用 $ 符号作为 jQuery 的简介方式。
某些其他 JavaScript 库中的函数（比如 Prototype）同样使用 $ 符号。
jQuery 使用名为 noConflict() 的方法来解决该问题。
var jq=jQuery.noConflict()，帮助您使用自己的名称（比如 jq）来代替 $ 符号。


prev() 获得匹配元素集合中每个元素紧邻的前一个同胞元素，通过选择器进行筛选是可选的。
next() 获得匹配元素集合中每个元素紧邻的同胞元素。如果提供选择器，则取回匹配该选择器
的下一个同胞元素。


jQuery CSS 选择器
jQuery CSS 选择器可用于改变 HTML 元素的 CSS 属性。
下面的例子把所有 p 元素的背景颜色更改为红色：
实例
$("p").css("background-color","red");

jQuery 属性选择器
jQuery 使用 XPath 表达式来选择带有给定属性的元素。
$("[href]") 选取所有带有 href 属性的元素。
$("[href='#']") 选取所有带有 href 值等于 "#" 的元素。
$("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。
$("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。

*	$("*")	所有元素
选择器	         实例	        选取
:input	     $(":input")	所有 <input> 元素
:text	     $(":text")	    所有 type="text" 的 <input> 元素
:password	 $(":password")	所有 type="password" 的 <input> 元素
:radio	     $(":radio")  	所有 type="radio" 的 <input> 元素
:checkbox	 $(":checkbox")	所有 type="checkbox" 的 <input> 元素
:submit	     $(":submit")   所有 type="submit" 的 <input> 元素
:reset	     $(":reset")	所有 type="reset" 的 <input> 元素
:button	     $(":button")	所有 type="button" 的 <input> 元素
:image	     $(":image")	所有 type="image" 的 <input> 元素
:file	     $(":file")	所有 type="file" 的 <input> 元素

:first	     $("p:first")	第一个 <p> 元素
:last	     $("p:last")	最后一个 <p> 元素
:even	     $("tr:even")	所有 偶数 <tr> 元素
:odd	     $("tr:odd")	所有 奇数 <tr> 元素
:header      $(":header")	所有标题元素 <h1> - <h6>









eq 概述 :获取第N个元素
/获取匹配的第二个元素   eq(index) 的用法  参数index描述 和 参数-index描述: eq(-index)
//HTML 代码:
<p> This is just a test.</p> <p> So is this</p>
//jQuery 代码:
$("p").eq(1)               $("p").eq(-2)
//结果:
[ <p> So is this</p> ]    [ <p> So is this</p> ]

方法.eq( index )将匹配元素集合缩减为集合中指定位置的元素；方法.first()将匹配元素集合
缩减为集合中的第一个元素；方法.last()将匹配元素集合缩减为集合中的最后一个元素；
方法.slice( start [, end] )将匹配元素集合缩减为指定范围的子集。
方法.first()和.last()通过调用.eq( index )实现，.eq( index )则通过
.slice( start [, end] )实现，.slice( start [, end] )则通过调用
.pushStack( elements, name, arguments )实现，
方法调用链为.first/last()→.eq( index )→.slice( start [, end] )→
.pushStack( elements, name, arguments )。相关代码如下所示：
284      eq: function( i ) {
285         i = +i;
286         return i === -1 ?
287             this.slice( i ) :
288             this.slice( i, i + 1 );
289      },
290
291      first: function() {
292         return this.eq( 0 );
293      },
294
295      last: function() {
296         return this.eq( -1 );
297      },
298
299      slice: function() {
300         return this.pushStack( slice.apply( this, arguments ),
301             "slice", slice.call(arguments).join(",") );
302     },

第285行：如果参数i是字符串，则通过在前面加上一个加号把该参数转换为数值。

第300～301行：先借用数组方法slice()从当前jQuery对象中获取指定范围的子集（数组），
再调用方法.pushStack()把子集转换为jQuery对象，同时通过属性prevObject保留了对当前
jQuery对象的引用。
/*









*/
