项目中经常会出现点击跳转锚点的方法，
比如给一个a标签一个href=“#锚点”，然后要跳的锚点给个id=“锚点”，这样就实现简单的跳转
，但是这样在url地址栏后面都会出现一个诸如www.xxx.com/#锚点，然后你点击给一次后退都是退回上一个选择的锚点url，
这里总结一些跳转锚点的方法。

第一种方法，也是最简单的方法是锚点用<a>标签，在href属性中写入DIV的id
<body>  
<h2>  
<a href="#div1">to div1</a>  
<a href="#div2">to div2</a>  
<a href="#div3">to div3</a>  
</h2>  
<div id="div1">div1</div>  
<div id="div2">div2</div>  
<div id="div3">div3</div>  
</body>  

---------------------------
2. Jquery下锚点的平滑跳转。

如果让页面平滑滚动到一个id为box的元素处，则JQuery代码只要一句话，关键位置如下：

$('html, body').animate({scrollTop: $('#div1').offset().top}, 1000)
JS原生实现。
scrollTo() 方法可把内容滚动到指定的坐标。
scrollTo(xpos,ypos);

3. 用js的srollIntoView方法，
这里就是点击id是#roll1的元素可以滚动到id是#roll1_top的地方
这种方法的好处，是URL不会变，同时能够响应相应的scroll事件，不需要算法
直接用:
document.querySelector("#roll1").onclick = function(){  
      document.querySelector("#roll1_top").scrollIntoView(true);  
} 
<button id="roll1">scrollIntoView</button>  
<div id="roll1_top">  
//   scrollIntoView(ture)元素上边框与视窗顶部齐平  
  <span id="bottom">scrollIntoView(false)元素下边框与视窗底部齐平</span>  
</div> 
比如：

4, react 下的锚点跳转
也是用js的srollIntoView方法
用法如下: https://zhuanlan.zhihu.com/p/25294428?refer=c_78280513
class HomeView extends Component {
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  render() {
    return (
      <div>
        <div>
          <a onClick={()=>this.scrollToAnchor('screens')}>
            <button>
              <i className="material-icons">expand_more</i>
            </button>
          </a>
        </div>
        <div style={{height: 800}}>
          <a id="screens"></a>
          跳到这里
          <br />
        </div>
      </div>
    );
  }
}

export default HomeView;


// ==========================
// PC端滚动加载更多的实现方法
//滚动加载更多
var pullRefreshss = true;
$(window).scroll(
    function () {
        /*当前滚动条到顶部的距离*/
        var top = $(document).scrollTop();
        /*当前浏览器的可是高度*/
        var height = document.body.clientHeight;
        /*当前网页（body）的高度*/
        var z_height = $(document).height();
        /*判断（网页的body高度减去当前浏览器的可视高度是否等于滚动条到顶部的距离）
         * 相等：则判定当前页面在底部
         * 不相等：判定当前页面不在底部
         * */
        
        var stats = (z_height - height - top < 1);
        //console.log(stats)

        if (stats) {
            /*当前网页在最底部，执行该函数*/
            endIndex += 4;   //每次加载的条数 endIndex 为默认显示的条数
            console.log(endIndex)
            setTimeout(navList, 1000);  // navList()为加载列表的方法  控制滚动加载显示的时间
          /*  navList(); */       //调用加载列表的方法
        } else {
            if (!pullRefreshss) {
                $("#articleListM").html("没有更多的数据");
            }
        }
    }
);
// ————————————————
