websocket = null;  
url="127.xxxxxxx/xxx"  
var websocketAddress = 'ws://'+ url  ;
//判断当前浏览器是否支持WebSocket  
if('WebSocket' in window){  
    websocket = new WebSocket(websocketAddress);  
}  
else{  
    alert('当前浏览器不支持WebSocket')  
}  
//连接发生错误的回调方法  
websocket.onerror = function(){  
    //notificationReminder("错误");  
};  
  
//连接成功时的回调方法  
websocket.onopen = function(event){  
    console.log(event);  
}  
  
//接收到消息的回调方法  
websocket.onmessage = function(event){  
    $scope.notificationReminder(event.data);  
}  
  
//连接关闭的回调方法  
websocket.onclose = function(){  
    //notificationReminder("关闭");  
}  
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
window.onbeforeunload = function(){  
    websocket.close();  
}  
  
//发送消息  
$scope.send = function(){  
    websocket.send(localStorageService.get('UserID'));  
}  
$scope.closeWebSocket = function(){  
    websocket.close();  
}  
