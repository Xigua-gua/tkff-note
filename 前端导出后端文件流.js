
https://juejin.im/post/5c1610cae51d455c627a967e


1, 后端返回下载链接
<a href="后端文件下载接口地址" >下载文件</a>



2, 原生XMLHttpRequest  请求下载
function request () {
    const req = new XMLHttpRequest();
    req.open('POST', '<接口地址>', true);
    req.responseType = 'blob';
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function() {
      const data = req.response;
      const a = document.createElement('a');
      const blob = new Blob([data]);
      const blobUrl = window.URL.createObjectURL(blob);
      download(blobUrl) ;
    };
    req.send('<请求参数：json字符串>');
  };

function download(blobUrl) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.download = '<文件名>';
  a.href = blobUrl;
  a.click();
  document.body.removeChild(a);
}

request();


//fetch请求 
function request() {
  fetch('<接口地址>', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '<请求参数：json字符串>',
  })
    .then(res => res.blob())
    .then(data => {
      let blobUrl = window.URL.createObjectURL(data);
      download(blobUrl);
    });
}

function download(blobUrl) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.download = '<文件名>';
  a.href = blobUrl;
  a.click();
  document.body.removeChild(a);
}

request();


