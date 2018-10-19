function postmessage(obj) {
    obj.classname = "self";
    var json = JSON.stringify(obj);
    try {
        window.webkit.messageHandlers.witwebview.postMessage(json); //IOS
    } catch (e) {
        try {
            window.witwebview.postMessage(json); //Android-pc
        } catch (e) {
            try {
                witwebview.postMessage(json); //PC
            } catch (e) {
                obj.callback && eval(obj.callback + "({result:-1,status:0,message:'直接调用'},'" + obj.callbackparam + "')"); //web
                //throw e
            }
        }
    }
}