虽然在 React 16.8.1 中终于面世的 hooks 引人瞩目，但在去年发布的 16.6.0 版本里也包含了一个吸引人的新特性，可以让我们在不依赖第三方库的情况下简化对延迟加载（lazy loading）的处理。
让我们看看如何借助这个特性改善应用性能，并构建更好的用户体验。
按照过往的经验，在构建组件的时候，将其用类似 Bit 的工具归纳起来是很有用的 -- 可以分享你的组件并在任意应用中使用之，以加速开发并保持 DRY 原则。
React.lazy() 是什么？
这项新功能使得可以不借助任何附加库就能通过代码分割（code splitting）延迟加载 react 组件。延迟加载是一种优先渲染必须或重要的用户界面项目，而将不重要的项目悄然载入的技术。这项技术已经被完全整合进了 react 自身的核心库中。之前我们要用 react-loadable 达到这一目的，但现在用 react.lazy() 就行了。
Suspense 挂起组件
Suspense 是一个延迟函数所必须的组件，通常用来包裹住延迟加载组件。多个延迟加载的组件可被包在一个 suspense 组件中。它也提供了一个 fallback 属性，用来在组件的延迟加载过程中显式某些 react 元素。
延迟和挂起为何重要？
首先，打包工具将所有代码组件相继归纳到一个 javascript 块中，并将其传递给浏览器；但随着应用增长，我们注意到打包的体积也与日俱增。这会导致应用因为加载慢而难以使用。借助代码分割，代码包能被分割成更小的块，最重要的块先被加载，而其余次要的则延迟加载。
同时，我们知道构建应用的一个最佳实践是：应该考虑到用户在使用移动互联网数据和其他慢速网络连接时的情况。作为开发者就应该在哪怕是在资源读取到 DOM 中的挂起阶段也能控制好用户体验。
起步
根据 react 官方文档，如果使用了下列技术，那么就已经有 webpack 打包配置了：

CRA (create react app)
Next js
Gatsby

如果没有的话，就需要自己设置打包了。比如，读一下 Webpack 官方文档中的 Installation 和 Getting Started 。
Demo
我们用 create-react-app 创建一个 react 应用，并在里面实现带挂起的延迟加载，它将用来显示 MTV Base 上 2019 上头牌艺人的专辑名和专辑数量。我用 create-react-app 创建了一个干净的应用，并包含了一个我们可以在本例中用得上的简易组件。

克隆 gitlab.com/viclotana/r…
解压文件并打开一个终端窗口
在解压出的文件的根目录下安装项目的 node modules 依赖
用以下命令启动开发服务器：

$ sudo npm start

就是这么个简单的应用，艺人的数据被从应用中的一个 store 中读出。当然你也可以自己编写这些代码，应用的 src 下面应该有这些文件：

Artists.js

import React from ‘react’;
import ‘./App.css’;
import artists from “./store”;
export default function Artists(){
 return (
   <>
   <h1>MTV Base Headline Artists 2019</h1>
   {artists.map(artist =>(
   <div id=”card-body” key={artist.id}>
    <div className=”card”>
     <h2>{artist.name}</h2>
     <p>genre: {artist.genre}</p>
     <p>Albums released: {artist.albums}</p>
    </div>
   </div>
    ))}
   </>
);
}

Store.js

export default [
{
  id: “1”,
  name: “Davido”,
  country: “Nigeria”,
  genre: “Afro-Pop”,
  albums: “2”
},
{
  id: “2”,
  name: “AKA”,
  country: “South-Africa”,
  genre: “Hip-Hop”,
  albums: “4”
},
{
  id: “3”,
  name: “Seyi Shay”,
  country: “Nigeria”,
  genre: “R&B”,
  albums: “2”
},
{
  id: “4”,
  name: “Sauti Sol”,
  country: “Kenya”,
  genre: “Soul”,
  albums: “3”
}
];

Index.js

import React from ‘react’;
import ReactDOM from ‘react-dom’;
import ‘./index.css’;
import Artists from ‘./Artists’;
class App extends React.Component {
 render(){
  return(
   <div className=”App”>
    <Artists />
   </div>
   );
 }
}
ReactDOM.render(<App />, document.getElementById(‘root’));

App.css

.App {
 text-align: center;
}
h1 {
 padding: 30px;
}
#card-body {
 display: inline-flex;
 padding: 10px;
 margin: 30px 30px;
 border: 5px solid rgb(93, 171, 207);
 border-radius: 8px;
 background: lightblue;
}
现在让我们看看如何用 react.lazy 及 suspense 去处理艺人组件的延迟加载。

在 index.js 的头部引入 react 中的 lazy 和 suspense：

import { Suspense, lazy } from 'react';

要像常规组件一样渲染一个动态引入的组件，使用 react 文档中提供的 react.lazy 函数语法，如下:

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

应用到我们的艺人组件上：

const Artists = React.lazy(() => import('./Artists'));

function MyComponent() {
  return (
    <div>
      <Artists />
    </div>
  );
}
若在 App 组件渲染期间，包含艺人组件的模块没有加载完，就必须显示一些提示等待的 fallback 内容 -- 比如一个加载指示器，下面是用 Suspense 组件完成这一目的的语法:
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
应用到艺人组件上:
const Artists = React.lazy(() => import('./Artists'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Artists />
      </Suspense>
    </div>
  );
}
把以上拼在一起， index.js 看起来是这样的：
import React, { lazy, Suspense } from ‘react’;
import ReactDOM from ‘react-dom’;
import ‘./index.css’;
// import Artists from ‘./Artists’;
const Artists = lazy(() => import(‘./Artists’))
class App extends React.Component {
 render(){
  return(
   <div className=”App”>
    <Suspense fallback={<h1>Still Loading…</h1>}>
     <Artists />
    </Suspense>
   </div>
  );
 }
}
ReactDOM.render(<App />, document.getElementById(‘root’));
在你的 localhost 上应该运行的很快，以至于你根本感觉不到有什么改变。但你可以创建一段时间统计代码，或模拟慢速网络：

打开浏览器的 dev tools
选择 network tab
点击右侧远端的 online tab，显示其他选项（最右侧的下箭头）
选择 fast 3G


现在刷新浏览器就能看到延迟加载如何发生了...

多个延迟加载组件
那么再快速添加一个渲染标题的小组件，看看 react.lazy 如何仍只用一个 suspense 组件处理：
创建 performers.js 文件:
mport React from ‘react’;
import ‘./App.css’;
export default function Performers(){
 return (
  <>
  <h2>These are the MTV Base Headline Artists...</h2>
  </>
 );
}
并在 index.js 中添加一行延迟加载代码：
import React, { lazy, Suspense } from ‘react’;
import ReactDOM from ‘react-dom’;
import ‘./index.css’;
const Artists = lazy(() => import(‘./Artists’))
const Performers = lazy(() => import(‘./Performers’))
class App extends React.Component {
 render(){
  return(
   <div className=”App”>
    <Suspense fallback={<h1>Still Loading…</h1>}>
     <Artists />
     <Performers />
    </Suspense>
   </div>
  );
 }
}
ReactDOM.render(<App />, document.getElementById(‘root’));
现在，在 suspense 中的占位符元素渲染之后，两个延迟加载的组件便立刻显示出来了。

链接：https://juejin.im/post/5c60e1d2f265da2dd16843f6
