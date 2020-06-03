


---------------------------------------------------------------
bind() 方法的主要作用就是将函数绑定至某个对象，bind() 方法会创建一个函数，
函数体内this对象的值会被绑定到传入bind() 函数的值。

例如，在 f() 函数上调用 bind() 方法并传入参数 obj ，即 f.bind(obj) ，
这将返回一个新函数, 新函数会把原始的函数 f() 当做 obj 的方法来调用,就像 obj.f() 似的，
当然这时 f() 函数中的 this 对象指向的是 obj 。





Js apply方法详解
JavaScript的函数apply和call
主要解决一下几个问题:
1.        apply和call的区别在哪里
2.        什么情况下用apply,什么情况下用call
3.        apply的其他巧妙用法（一般在什么情况下可以使用apply）
我首先从网上查到关于apply和call的定义,然后用示例来解释这两个方法的意思和如何去用.
         apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.
 Function.apply(obj,args)方法能接收两个参数
obj：这个对象将代替Function类里this对象
args：这个是数组，它将作为参数传给Function（args-->arguments）
         call:和apply的意思一样,只不过是参数列表不一样.
 Function.call(obj,[param1[,param2[,…[,paramN]]]])
obj：这个对象将代替Function类里this对象
params：这个是一个参数列表
1.        apply示例:
[javascript] view plain copy 在CODE上查看代码片派生到我的代码片
<script type="text/javascript">
    /*定义一个人类*/
    function Person(name,age)
    {
        this.name=name;
        this.age=age;
    }
    /*定义一个学生类*/
    function Student(name,age,grade)
    {
        Person.apply(this,arguments);
        this.grade=grade;
    }
    //创建一个学生类
    var student=new Student("zhangsan",21,"一年级");
    //测试
    alert("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);
    //大家可以看到测试结果name:zhangsan age:21  grade:一年级
    //学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处.
</script>


分析: Person.apply(this,arguments);
this:在创建对象在这个时候代表的是student
arguments:是一个数组,也就是[“zhangsan”,”21”,”一年级”];
也就是通俗一点讲就是:用student去执行Person这个类里面的内容,
在Person这个类里面存在this.name等之类的语句,这样就将属性创建到了student对象里面

2.        call示例
在Studen函数里面可以将apply中修改成如下:
Person.call(this,name,age);
这样就ok了


3.        什么情况下用apply,什么情况下用call
在给对象参数的情况下,如果参数的形式是数组的时候,比如apply示例里面传递了参数arguments,
这个参数是数组类型,并且在调用Person的时候参数的列表是对应一致的
(也就是Person和Student的参数列表前两位是一致的) 就可以采用 apply ,
 如果我的Person的参数列表是这样的(age,name),而Student的参数列表是(name,age,grade),
 这样就可以用call来实现了,也就是直接指定参数列表对应值的位置
 (Person.call(this,age,name,grade));


4.        apply的一些其他巧妙用法
细心的人可能已经察觉到,在我调用apply方法的时候,第一个参数是对象(this), 第二个参数是一个
数组集合, 在调用Person的时候,他需要的不是一个数组,但是为什么他给我一个数组我仍然可以将
数组解析为一个一个的参数,这个就是apply的一个巧妙的用处,可以将一个数组默认的转换为一个
参数列表([param1,param2,param3] 转换为 param1,param2,param3) 这个如果让我们用程序来
实现将数组的每一个项,来装换为参数的列表,可能都得费一会功夫,借助apply的这点特性,所以
就有了以下高效率的方法:

a)        Math.max 可以实现得到数组中最大的一项
因为Math.max 参数里面不支持Math.max([param1,param2]) 也就是数组
但是它支持Math.max(param1,param2,param3…),所以可以根据刚才apply的那个特点来解决
var max=Math.max.apply(null,array),这样轻易的可以得到一个数组中最大的一项
(apply会将一个数组装换为一个参数接一个参数的传递给方法)
这块在调用的时候第一个参数给了一个null,这个是因为没有对象去调用这个方法,我只需要用这个
方法帮我运算,得到返回的结果就行,.所以直接传递了一个null过去


b)        Math.min  可以实现得到数组中最小的一项
同样和 max是一个思想 var min=Math.min.apply(null,array);


c)        Array.prototype.push 可以实现两个数组合并
同样push方法没有提供push一个数组,但是它提供了push(param1,param,…paramN) 所以同样也
可以通过apply来装换一下这个数组,即:
[javascript] view plain copy 在CODE上查看代码片派生到我的代码片
var arr1=new Array("1","2","3");
var arr2=new Array("4","5","6");
Array.prototype.push.apply(arr1,arr2);

也可以这样理解,arr1调用了push方法,参数是通过apply将数组装换为参数列表的集合.
通常在什么情况下,可以使用apply类似Math.min等之类的特殊用法:
一般在目标函数只需要n个参数列表,而不接收一个数组的形式（[param1[,param2[,…[,paramN]]
]]）,可以通过apply的方式巧妙地解决这个问题!

5.        总结:
一开始我对apply 非常的不懂,最后多看了几遍,自己多敲了几遍代码,才明白了中间的道理,
所以,不管做什么事情,只要自己肯动脑子,肯动手敲代码,这样一个技术就会掌握…
还有比如第四部分得内容,巧妙的解决了实实在在存在的问题,这个肯定不是一个初学者能想到
的解决方案(这个也不是我自己想的),没有对编程有一定认识的不会想到这个的,还是一句话,
多积累,多学习,提升自己的能力和对编程思想的理解能力才是最关键!

其中有大部分内容参考自:
http://www.cnblogs.com/xiaohongwu/archive/2011/06/15/2081237.html




/
