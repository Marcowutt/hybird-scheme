
# Hybird开发-native与js交互设计思路

Hybrid的交互无非是Native调用前端页面的JS方法，或者前端页面通过JS调用Native提供的接口，两者交互的桥梁皆为Webview。
#### 1.Native to JS
js将一组API绑定在webview的window上，App通过Android/iOS原生方法调用webview的window对象中的js方法。
#### 2.JS to Native
App实现webview的URL观察者模式，js改变URL，app会解析url中的信息，做出相应操作。
#### 3.具体实现
##### 3.1 数据交互
app自身可以自定义url schema，并且把自定义的url注册在调度中心， 例如：

ctrip://wireless 打开携程App

weixin:// 打开微信

JS与Native通信一般就是创建这类URL被Native捕获处理,在实际设计Hybrid交互模型时，可以以接口为单位进行设计，比如获取通讯录的总体交互是：

js调用requestHybird接口，传入对应操作与回调：
```js
requestHybird({
    action:'getAddressList',
    param：{},
    callback:function(data){
        //对应js逻辑...
    }
})
```
requestHybird此api的js实现可以是：
```
function requestHybird(cfg){
    if(cfg.callback){
        // 生成回调函数名
        var hybird_timetemp = 'hybird_' + Date.now();
        // 将回调函数挂载window对象的HybirdAPI中
        window.HybirdAPI[hybird_timetemp] = function(data){
            cfg.callback(data)；
            delete window.HybirdAPI[hybird_timetemp]
        }
        var url = 'hybridschema://'
        + cfg.action 
        + '?callback=' 
        + hybird_timetemp 
        + '&param=' 
        + encodeURIComponent(JSON.stringify(cfg.param));
        // url =  'hybridschema://getAddressList?callback=hybird_1539573375486&param=%7B%7D'
    }else{
        var url = 'hybridschema://'
        + cfg.action 
        + '?param=' 
        + encodeURIComponent(JSON.stringify(cfg.param));
    }
    window.location.href = url;
    // 改变url，将被Native捕获
    
}
```
Native捕获到url变化，获得对应操作（getAddressList）与回调函数名（hybird_1539573375486），调用底层mobile api，通过获取window对象上的HybirdAPI，执行相应回调并传入用户通讯录数据
```
window.HybirdAPI['hybird_1539573375486'](data)
```

##### 3.2 页面跳转（H5跳转Native）
如果要使用动画，按业务来说有向前与向后两种，forward&back，所以约定如下，H5跳Native某一个页面
```
requestHybrid({
    tagname: 'forward',
     param: {
         //要去到的页面
        topage: 'home',
         //跳转方式，H5跳Native
         type: 'native',
         //其它参数
         data2: 2
     }
});
```