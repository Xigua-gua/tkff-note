@page{
 size:a4;//定义为a4纸
 margin:0 0 0 50px;//页面的编剧
}
@page rotated { size: landscape;} //定义纸张旋转
.ccc{ 
    page: rotated; //引用旋转
    page-break-before:avoid;//前面不加空页
    page-break-after:avoid;//后面不加空页
}
