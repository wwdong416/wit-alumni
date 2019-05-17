/**
 * @author W.Dong
 * @date 2018/11/2
 */
var _wd = {
    _sto: null, //setTimeout全局
    /**
     * 提示框
     * @param $t:提示内容
     * @param $c:提示框颜色
     * @param $time 时间
     */

    info: function ($t, $c, $time) {
        var t = $t, time = $time || 2000, d = document.querySelector("#toInfo");
        var className = "AC fix ffWRYH F2 MA color1 rad05e P1M " + " " + $c;
        if (d) {
            var div = d.querySelector("div");
            d.classList.remove("none");

            if (div.style.display == "none") div.style.display = "";
            div.innerHTML = '<div class="' + className + '" style="width:50%;top:80%;left:0; right: 0">' + t + '</div>';
        } else {
            var div = document.createElement("div");
            div.className = "CW CH fix index999";
            div.id = "toInfo";
            div.innerHTML = '<div class="' + className + '" style="width:50%;top:80%;left:0; right: 0">' + t + '</div>';
            document.body.appendChild(div);
        }
        setTimeout(function () {
            if (d) {
                d.classList.add("none");
            }
            else {
                document.querySelector("#toInfo").classList.add("none");
            }
        }, time);
    },
    /**
     *页面加载动画
     * @param $time 延迟时间
     * @param $img 图片地址选填
     * @param $modal 是否有模态框
     */
    toLoading: function ($time, $img, $modal) {
        var $this = this, img = $img || "../images/icon/witing2.gif", d = document.querySelector("#toLoading"),
            time = $time || 2000, modal = $modal;
        if (d) {
            document.body.removeChild(d);
            clearTimeout($this._sto);
        } else {
            if (time <= 0) {
                clearTimeout($this._sto);
                return;
            }
            var div = document.createElement("div");
            div.className = "fix index999 AC " + (modal ? "W11 top40" : "W11 CH");
            div.id = "toLoading";
            div.innerHTML = '<img src="' + img + '" class="B8M relative ' + (modal ? "" : "top40") + '"  onerror="this.src =\'images/icon/witing2.gif\' " >';
            if (div.querySelector("img")) {
                $this.insertBefore(document.body, div);
            }
            $this._sto = setTimeout(function () {
                if (div) {
                    document.body.removeChild(div);
                    //$this.toAlert("访问超时！", 1500);
                }
            }, time);
        }
    },
    /**
     * 确认提示框
     * @param $t 内容
     * @param $f 确认返回方法 （必填）
     * @param $e 取消返回方法 （选填）
     */
    toConfirm: function ($t, $f, $e) {
        var t = $t, d = document.querySelector("#toConfirm"), f = $f, e = $e || function () {
            document.body.removeChild(div);
        };
        var className = "AC fix ffWRYH F3 MA color8 PT05M rad05e  bgc10";
        if (d) {
            document.body.removeChild(d);
        }
        var div = document.createElement("div");
        div.className = "CW CH fix top0 index999 bgcabg";
        div.id = "toConfirm";
        div.innerHTML = '<div class="' + className + '" style="width:50%;top:45%;left:0; right: 0">' +
            '<div class="P1M">' + t + '</div>' +
            '<div class="MT05 bordTD1">' +
            '<div class="FL  W21 bordRD1 colorC bold P1M" id="toTrue">确认</div>' +
            '<div class="W21  FR bordLD1 bold P1M" id="toFalse">取消</div></div>' +
            '</div>';
        document.body.appendChild(div);
        document.getElementById("toTrue").onclick = f;
        div.querySelector("#toTrue").addEventListener("click", function () {
            document.body.removeChild(div);
        });
        document.getElementById("toFalse").onclick = e;
    },
    /*
     * 错误返回界面
     */
    toError: function () {
        // console.log(a);
        var $this = this, d = document.querySelector("#toError");
        if (d) {
            document.body.removeChild(d);
        } else {
            var div = document.createElement("div");
            div.className = "fix index999 AC CH CW bgc10";
            div.id = "toError";
            div.innerHTML = '<div class="relative top40">' +
                '<div class=" W11 MA">' +
                '<img src="../images/icon/errorPage.png">' +
                '</div>' +
                '<div class="W11 AC F4">加载失败了</div>' +
                '<div class="MT2 W11 F4">点击重试</div>' +
                '</div> ';
            div.onclick = function () {
                window.location.reload();
            };
            $this.insertBefore(document.body, div);
        }

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
                } else if (typeof para[i] === "object") {
                    form.append(i, JSON.stringify(para[i]));
                } else form.append(i, para[i]);
            }
        }
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest()
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        !noloading && $this.toLoading(5000);
        xmlhttp.open("post", url, async);
        if (file) xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
        xmlhttp.onreadystatechange = function () {
            //console.log(xmlhttp);
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    !noloading && $this.toLoading(0);
                    var msg = xmlhttp.responseText;
                    func(msg);
                }
                else {
                    !noloading && $this.toLoading(0);
                    var funerr = error || function () {
                        _wd.info("异常！您与服务器断开连接！", "bgc24");
                        $this.toError();
                        // return 0;
                    };
                    funerr();
                }
            }
        };
        xmlhttp.send(form);
    },


    //获取url中"?"符后的字串
    getUrl_sid: function () {
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
    //创建时间显示时分
    crtTimeYMD: function (value) {
        var crtTime = new Date(value);
        //直接调用公共JS里面的时间类处理的办法
        //yyyy-MM-dd hh:mm:ss
        return _wd.dateFtt("yyyy-MM-dd ", crtTime);
    },
    //两个时间相差天数
    getDateSUB: function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
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
     *获取当前时间
     *format=1精确到天
     *format=2精确到分
     */
    getCurrentDate: function (format) {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        var day = now.getDay();//得到周几
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        var time = "";
        //精确到天
        if (format == 1) {
            time = year + "-" + month + "-" + date;
        }
        //精确到分
        else if (format == 2) {
            time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
        }
        return time;
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
    up_down: function (p, s) {
        var div = document.getElementById(p);
        var u = s.querySelector("b");
        if (div.className.indexOf("none") > -1) {
            div.classList.remove("none");
            u.innerHTML = "&#9650";
        } else {
            div.classList.add("none");
            u.innerHTML = "&#9660";
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
    /**
     * [getCut 截取字符串]
     * @param   reg [截取的字符]
     * @param   num [获取的第几位的字符]
     * @param   msg [字符串]
     * @return      [返回截取后第num个的字符]
     */
    getCut: function (reg, num, msg) {
        var name = msg.split(reg);
        return name[num] || "";
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
    /**
     * 下拉刷新
     * @param $p 包裹所有需要刷新的新节点
     * @param $s  新节点下的新节点
     */
    down_refresh: function ($p, $s) {
        var p = $p || "d_cont_p", s = $s || "d_cont_s";
        var scroll = document.getElementById(s);
        var outerScroller = document.getElementById(p);

        // scroll.className = "absolute top0 bottom0 W11 left0";
        // outerScroller.className = "absolute top0 bottom0 W11 left0";
        var touchStart = 0;
        var touchDis = 0;
        outerScroller.addEventListener('touchstart', function (event) {
            var touch = event.targetTouches[0];
            // 把元素放在手指所在的位置
            touchStart = touch.pageY;
            // console.log(touchStart);
        }, false);
        outerScroller.addEventListener('touchmove', function (event) {
            var touch = event.targetTouches[0];
            // console.log(touch.pageY + 'px');
            if ((scroll.offsetTop + touch.pageY - touchStart) > 0) {
                scroll.style.top = scroll.offsetTop + touch.pageY - touchStart + 'px';
                if ((scroll.offsetTop + touch.pageY - touchStart) > 100) {
                    scroll.children[0].innerHTML = "松开刷新";
                }
                touchStart = touch.pageY;
                touchDis = touch.pageY - touchStart;
            }
        }, false);
        outerScroller.addEventListener('touchend', function (event) {
            touchStart = 0;
            var top = scroll.offsetTop;
            console.log(top);
            console.log(outerScroller.scrollHeight);
            if (top > 100) {
                setTimeout(function () {
                    window.location.reload();
                }, 400);
            }
            if (top > 0) {
                var time = setInterval(function () {
                    scroll.style.top = scroll.offsetTop - 2 + 'px';
                    if (scroll.offsetTop <= 0) clearInterval(time);
                }, 1)
            }
            // if (top < 0){
            //     setTimeout(function () {
            //         window.location.reload();
            //     },400);
            // }
        }, false);
    },
    /*
     * 下拉刷新
     */
    up_refresh: function (d) {
        var touchStart = 0;
        var touchDis = 0;
        var tip = document.querySelector("#up_reload");
        var p = document.querySelector("#" + d);

        document.body.addEventListener('touchstart', function (event) {
            var touch = event.targetTouches[0];
            // 把元素放在手指所在的位置
            touchStart = touch.pageY;
            console.log("begin", touchStart);
        }, false);
        document.body.addEventListener('touchmove', function (event) {
            if (p.classList.contains("none")) {
                var touch = event.targetTouches[0];
                touchDis = touch.pageY - touchStart;
                console.log("move", touchDis);
                if (touchDis > 0) {
                    document.body.style.marginTop = touchDis + "px";
                    if (touchDis > 80) {
                        tip.innerText = "松开刷新"
                    }
                    if (touchDis < 79) {
                        tip.innerText = "下拉刷新"
                    }
                }
            }
        }, false);
        document.body.addEventListener('touchend', function (event) {
            if (p.classList.contains("none")) {
                touchStart = 0;
                console.log(document.body.style.marginTop);
                console.log(touchDis);
                if (touchDis > 80) {
                    window.location.reload();
                }
                if (touchDis > 0) {
                    // document.body.style.marginTop = "0px";
                    setTimeout(function () {
                        document.body.style.marginTop = "0px";
                    }, 100)
                }
            }
        }, false);

    },
    /**
     * 图片加载错误返回的图片
     * @param img 节点
     */
    noFind_Pic: function (img) {
        img.src = "../images/nofindpic.png";
        img.alt = "图片加载失败";
        img.classList.add("P2M");
        img.onerror = null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
    },
    noLogo: function (img, url) {
        img.src = url;
        img.onerror = null; //如果错误图片也不存在就会死循环一直跳，所以要设置成null，也可以不加
    },
    /**
     * 插入新节点
     * @param parent 父节点
     * @param newChild 新节点
     * @returns {*}
     */
    insertBefore: function (parent, newChild) {
        if (parent.firstChild) {
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            parent.appendChild(newChild);
        }
        return parent;
    },     //dom插入
    /**
     * 末尾插入新节点，无返回值
     * @param newElement 新节点
     * @param targetElement 父节点
     */
    insertAfter: function (newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(newElement);
        }
        else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    },
    /**
     * 删除父节点下的子节点
     * @param $p 父节点
     * @param $s 子节点
     */
    deleteChild: function ($p, $s) {
        var p = document.getElementById($p);
        var s = document.getElementById($s);
        p.removeChild(s);
        // document.getElementById(p).removeChild(document.getElementById(s));
    },
    /**
     * 展示对象
     * @param $obj 对象id
     * @returns 此对象
     */
    show: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (obj.classList.contains("none")) obj.classList.remove("none");
        if (obj.style.display == "none") obj.style.display = "";
        return this;
    },
    /**
     * 隐藏对象
     * @param $obj 对象id
     * @returns 此对象
     */
    hide: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.classList.add("none");
        obj.style.display = "none";
        return this;
    },
    closeWindow: function (p, s) {
        console.log(p, s);
        p.removeChild(s);
    },
    marquee: function (p, s) {
        var scrollWidth = document.getElementById(p).offsetWidth;
        var textWidth = document.getElementById(s).offsetWidth;
        // console.log(document.getElementById(s));
        var i = scrollWidth;
        console.log(scrollWidth, textWidth);

        function change() {
            i--;
            if (i < -textWidth) {
                i = scrollWidth;
            }
            document.getElementById(s).style.left = i + "px";
            window.requestAnimationFrame(change);
        }

        window.requestAnimationFrame(change);

    },
    //实现将项目的图片转化成base64

    // function(){
    //     var url = "static/img/js1.jpg";//这是站内的一张图片资源，采用的相对路径
    //     convertImgToBase64(url, function(base64Img){
    //         //转化后的base64
    //         alert(base64Img);
    //     });
    // }
    convertImgToBase64: function (url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    },
    //正序：排序方法
    ForwardRankingDate: function (data, p) {
        for (i = 0; i < data.length - 1; i++) {
            for (j = 0; j < data.length - 1 - i; j++) {
                if (data[j][p] > data[j + 1][p]) {
                    var temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
        return data;
    },
    //反序：按日期排序方法
    ReverseRankingDate: function (data, p) {
        for (i = 0; i < data.length - 1; i++) {
            for (j = 0; j < data.length - 1 - i; j++) {
                if (data[j][p] < data[j + 1][p]) {
                    var temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
        return data;
    },
    getVideoBlob: function (url, callback) {
        var xhr = new XMLHttpRequest();
        var video = document.createElement("video");
        xhr.open('get', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (this.status === 200) {
                spiderVideoResponse = this.response;
                // 将response赋值为Video的src 或者也可以使用preView转换为base64的格式
                // 截取第一帧的图片方法跟第一种情况一样，而且还解决了获取图片时跨域的问题 一举两得
                video.src = URL.createObjectURL(this.response);
            }
        };
        xhr.send();
        var scale = 0.8;
        console.log(video);
        var init = function () {
            video.addEventListener('loadeddata', captureImage);
        };
        var captureImage = function () {
            var canvas = document.createElement("canvas");//创建一个canvas
            canvas.width = video.videoWidth * scale;//设置canvas的宽度为视频的宽度
            canvas.height = video.videoHeight * scale;//设置canvas的高度为视频的高度
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//绘制图像
            src = canvas.toDataURL("image/png");//将绘制的图像用img显示出来
            callback(src);//返回图片
        };
        init();
    },

    getVideoImg: function () {
        var video = document.querySelector("#ph_list>video");
        console.log(video);
        var scale = 0.8;
        var initialize = function () {
            video.addEventListener('loadeddata', captureImage);
        };
        var captureImage = function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            video.poster = canvas.toDataURL("image/png");
            console.log(video);
        };

        initialize();
    },
    //通过地址title判断是否为直辖市
    isProvince_level: function (id) {

        return ["11", "12", "31", "50"].indexOf(id.substr(0, 2)) >= 0;
    },
    /**
     * @return {boolean}
     */
    IsPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    delSameArray: function (array) {
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
            for (var j = i + 1; j < l; j++)
                if (array[i] === array[j]) j = ++i;
            r.push(array[i]);
        }
        return r;
    },
    fouces_input:function (d) {
        var input = d.querySelector("input");
        // input.style.
    }

};

