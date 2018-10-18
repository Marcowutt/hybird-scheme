export default (cfg) => {
    let url;
    if(cfg.callback){
        // 生成回调函数名
        const hybird_timetemp = 'hybird_' + Date.now();
        console.log(hybird_timetemp)
        // 将回调函数挂载window对象的HybirdAPI中
        window.HybirdAPI || (window.HybirdAPI = {})
        window.HybirdAPI[hybird_timetemp] = function(data){
            cfg.callback(data);
            delete window.HybirdAPI[hybird_timetemp]
        }
        url = `hybridschema://${cfg.action}?callback=${hybird_timetemp}&param=${encodeURIComponent(JSON.stringify(cfg.param))}`;
        // url =  'hybridschema://getAddressList?callback=hybird_1539573375486&param=%7B%7D'
    }else{
        url = `hybridschema://${cfg.action}?param=${encodeURIComponent(JSON.stringify(cfg.param))}`;
    }
    // let iframe = document.createElement('iframe');
    // iframe.setAttribute('src',url);
    // iframe.setAttribute('style','height:0px;border:0px;')
    // document.body.appendChild(iframe)
    // setTimeout(() => {
    //     document.body.removeChild(iframe)
    // }, 5000);
    
    window.location.href = url;
}