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
            document.body.appendChild(div);
        }
        setTimeout(function () {
            if (d) d.classList.add("none");
            else document.querySelector("#toAlert").classList.add("none");
        }, 2000);
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
        if (!para) return;
        var form = new FormData();
        if (para instanceof FormData) {
            form = para;
        } else {
            for (var i in para) {
                if (para[i] instanceof File) {
                    form.append(i, para[i]);
                } else if (typeof para[i] == "object") {
                    form.append(i, JSON.stringify(para[i]));
                } else form.append(i, para[i]);
            }
        }
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest()
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        // !noloading && $this.toLoading(5000);
        xmlhttp.open("post", url, async);
        if (file) xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
        xmlhttp.onreadystatechange = function () {
            //console.log(xmlhttp);
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    // !noloading && $this.toLoading(0);
                    var msg = xmlhttp.responseText;
                    func(msg);
                }
                else {
                    // !noloading && $this.toLoading(0);
                    var funerr = error || function () {
                        _wd.info("服务器异常！", "bgc24");
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
    },
    //--------------更改时间格式---------------
    /**时间格式化处理
     *@fmt 格式要求
     * @date 时间
     * */
    dateFtt: function (fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    //创建时间显示年月日时分
    crtTimeFtt: function (value) {
        var crtTime = new Date(value);
        //直接调用公共JS里面的时间类处理的办法
        //yyyy-MM-dd hh:mm:ss
        return _wd.dateFtt("yyyy-MM-dd hh:mm ", crtTime);
    },
    //创建时间显示时分
    crtTimeHM: function (value) {
        var crtTime = new Date(value);
        //直接调用公共JS里面的时间类处理的办法
        //yyyy-MM-dd hh:mm:ss
        return _wd.dateFtt("hh:mm ", crtTime);
    },
    //两个时间相差天数
    getDateDF: function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
        var dateSpan,
            iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },


    /**
     * [Show_Hidden 点击控制div显示与隐藏]
     * @param {[id]} obj [需要显示隐藏div的id]
     */
    Show_Hidden: function (obj) {
        var div = document.getElementById(obj);
        if (div.className.indexOf("none") > -1) {
            div.classList.remove("none");
        } else {
            div.classList.add("none");
        }
    },
    /**
     * 添加清除浮动
     * @id 目标id
     * */
    clear: function (id) {
        var newDiv = document.createElement("div");
        newDiv.className = "clear";
        id.appendChild(newDiv);
    },
    /**
     * 使用正则替换所有中文字符,然后再计算字符个数
     */
    getBLen: function (str) {
        if (str == null) return 0;
        if (typeof str != "string") {
            str += "";
        }
        return str.replace(/[^\x00-\xff]/g, "ab").length;
    },
    //--------------上拉加载更多---------------
    //获取滚动条当前的位置
    getScrollTop: function () {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    //获取当前可视范围的高度
    getClientHeight: function () {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight: function () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    // //滚动事件触发
    // window.onscroll = function () {
    //     if (_wd.getScrollTop() + _wd.getClientHeight() == _wd.getScrollHeight()) {

    //     }
    // }
    //------------移动端触摸事件-------------
    touch_long: function (id) {
        id.ontouchstart = function () {
            // 长按事件触发
            timeOutEvent = setTimeout(function () {
                timeOutEvent = 0;
                alert('你长按了');
            }, 400);
        }
    },
    noFind_Pic: function (img) {
        img.src = "../images/nofindpic.png";
        img.alt="加载失败";
        img.classList.add("P2M");
        img.onerror = null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
    }

};
