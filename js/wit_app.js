/**
 * @author W.Dong
 * @date 2018/11/2
 */
var _wd = {
    /**
     * 提示框
     * @$t:提示内容
     * @$c:提示框颜色
     */
    info: function ($t, $c) {
        var t = $t, c = $c, d = document.querySelector("#toAlert");
        var className = "AC fix F2 ma rad03e P05M MTH  LSP " + " " + c;
        if (d) {
            var div = d.querySelector("div");
            d.classList.remove("none");
            if (div.style.display == "none") div.style.display = "";
            div.innerHTML = '<div class="' + className + '" style="width:40%;top:50%;left:0; right: 0">' + t + '</div>';
        } else {

            var div = document.createElement("div");
            div.className = "CW CH fix index999";
            div.id = "toAlert";
            div.innerHTML = '<div class="' + className + '" style="width:40%;top:50%;left:0; right: 0">' + t + '</div>';
            console.log(div);
            document.body.appendChild(div);
        }
        setTimeout(function () {
            if (d) d.classList.add("none");
            else document.querySelector("#toAlert").classList.add("none");
        }, 3000);
    },
    /*
    * ajax数据交互
    * @url：地址
    * @asunc：异步？同步
    * @para：传输数据
    * @func：成功返回值方法
    * */
    ajax_formdata: function (url, async, para, func, error, file, noloading) {
        var xmlhttp, $this = this;
        var form = new FormData();
        if (para) {
            for (var i in para) {
                if (typeof para[i] == "object") {
                    form.append(i, JSON.stringify(para[i]));
                    continue;
                }
                form.append(i, para[i]);
            }
        }
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest()
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        xmlhttp.open("post", url, async);
//        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (file)
            xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
        xmlhttp.onreadystatechange = function () {
            //console.log(xmlhttp);
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var msg = xmlhttp.responseText;
                    func(msg);
                }
                else {
                    var funerr = error || function () {

                        _wd.info("服务器异常！", "bgc24");

                        console.log("服务器异常！", 1500);
                    };
                    funerr();
                }
            }
        };
        xmlhttp.send(form);
    },
    //获取url中"?"符后的字串
    getUrl: function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
};
