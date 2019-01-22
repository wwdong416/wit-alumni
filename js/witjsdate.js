/* JavaScript Document
 Author: zhengzhe; 2015-10-30; V0.0.1
 Alter: liujingjing; 2016-06-07; V0.0.2
 */

var wit_date = {

    attr: {
        outtype: "",
        outtext: "",
        date: "",
        date_show_type: "",
        date_show_gs: "",

        hour: 0,
        minute: 0,
        year: 2016,
        month: 1,
        day: 1,

        H: 0,

        cYear: 0,
        cMonth: 0,
        cDay: 0,
        cDays: 0,

        monString: [],
        dayString: [],
        CalendarData: [],
        madd: [],
        astroString: [],
        astroN: [],
        date_sli: []
    },
    //生成框架-触发对象（默认传this，只接受dom对象）-生成到指定对象-显示格式(01234)-扩展格式(日月周:)-初始化农历/阳历,初始化日期
    init: function ($d, $p, $n, $gs, $tp, $td) {
        console.log($d, $p);
        //初始化参数
        this.attr.H = (M ? M : 10) * 4;
        this.attr.dayString = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "廿十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
        this.attr.CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95, 0x6AA, 0xAD5, 0x209DA, 0x4B6, 0x614AE, 0xA4E, 0xD26, 0x51D26, 0xD53, 0x5AA, 0x30D6A, 0x96D, 0x11095D, 0x4AD, 0xA4D, 0x61A4B, 0xD25, 0xD52, 0x51B54, 0xB5A, 0x56D, 0x2095B, 0x49B, 0x71497, 0xA4B, 0xAA5, 0x516A5, 0x6D2, 0xADA, 0x30AB6, 0x937, 0x8092F, 0x497, 0x64B, 0x60D4A, 0xEA5, 0x6B2, 0x4156C, 0xAAE, 0x92E, 0x3192E, 0xC96, 0x71A95, 0xD4A, 0xDA5, 0x50B55, 0x5EA, 0xA6D, 0x40A5D, 0x52D, 0x8152B, 0xA95, 0xB4A, 0x616AA, 0xAD5, 0x55A, 0x414BA, 0xA5B, 0x52B, 0x21527, 0x693, 0x70E53, 0x6AA, 0xAD5, 0x509B5, 0x4B6, 0xA57, 0x40A4E, 0xD26, 0x81D6A, 0xD52, 0xDAA, 0x60D6A, 0x56D, 0x4AE, 0x4149D, 0xA5D, 0xD15, 0x21B25, 0xD52, 0x70B52, 0xB5D, 0x55D, 0x5095B, 0x49B, 0xA4B, 0x41A4B, 0xAA5, 0x916A5, 0x6D3, 0xAD6, 0x60AB6, 0x937, 0x497, 0x41C97, 0x74B, 0x6A5];
        this.attr.madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        this.attr.astroString = ["魔蝎座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座"];
        this.attr.astroN = ["22", "20", "19", "21", "20", "21", "22", "23", "23", "23", "24", "23"];
        this.attr.date_sli = ['year', 'month', 'day', 'hour', 'minute', 'second', 'week'];
        var d = $d, p = $p || "s_select", n = $n, gs = $gs, tp = $tp, td = $td, $ = this;
        if (typeof d != "object") {
            console.warn("params 1 不合格！请传递触发的dom对象！");
            return;
        }
        this.attr.date_show_type = tp == 1 ? "农历" : "阳历";
        this.attr.date_show_gs = gs ? gs : "年月日:";
        var cont = '<div id="UI_bk" class="W11 H11 bgca"></div>' +
            '<div id="UI_content" class="index99 fix bottom0 FL W11 H35M bgc102 AC" >' +
            '<div class="FL MLT A51 H F3 AC bgc36" onclick="wit_date.change_date_type()">' + this.attr.date_show_type + '<!--</br>阳历--></div>' +
            '<div id="wit_date_opt" class="FL MLT A53 H AC bgc9 bord0" ></div>' +
            '<div id="wit_date_confirm" class="FR MRT A51 H AC bgc16 color1">确认</div>' +
            '<div id="wit_scr" class="FL ML A11 H28M" ><div class="no_event index999 absolute bottom13M W11 H bgc55 alpha2"></div>';
        for (var i in n.split("")) {
            cont += '<div id="' + this.attr.date_sli[n.charAt(i)] + '" name="s" class="ofa FL MT H11 W' + n.length + '1 bgc' + (1 + Number(i)) + '" ></div>'
        }
        document.getElementById(p).innerHTML = cont + "</div>";

        this.toggle(p, 1);
        if (td) {
            this.attr.date = new Date(td);
        } else if (d.dataset.yl && d.dataset.yl != "") {
            this.attr.date = new Date(d.dataset.yl);
        } else if (d.title && d.title != "") {
            this.attr.date = new Date(d.title);
        } else if (localStorage.lastDate && localStorage.lastDate != "Invalid Date") {
            this.attr.date = new Date(localStorage.lastDate);
        } else {
            this.attr.date = new Date();
        }

        this.attr.outtype = n;
        this.attr.year = this.attr.date.getFullYear();
        this.attr.month = this.attr.date.getMonth() + 1;
        this.attr.day = this.attr.date.getDate();
        this.attr.hour = this.attr.date.getHours();
        this.attr.minute = this.attr.date.getMinutes();
        this.C_scrolli(0);
        document.getElementById('wit_date_confirm').addEventListener('click', function () {
            var o = document.querySelector("#wit_date_opt"),
                opt = o.innerHTML, yl = o.dataset.yl, nl = o.dataset.nl;
            var f = {
                0: "yyyy-",
                1: "MM-",
                2: "dd ",
                3: "hh:",
                4: "mm:",
                5: "ss"
            }, s = "";
            $.attr.outtype.split("").forEach(function (v) {
                s += f[v];
            });
            s = s.rtrim("-").rtrim(":");
            var standard = new Date(yl).Format(s);
            d.dataset.yl = yl;
            d.title = standard;
            localStorage.lastDate = yl;
            wit_date.call_back(d, {opt: opt, yl: yl, nl: nl, std: standard});
            $.toggle(p, 0);
        }, false);
        document.getElementById('UI_bk').addEventListener('click', function () {
            $.toggle(p, 0);
        }, false);
    },

    C_scrolli: function (k) {
        var formi = [1920, 1, 1, 0, 0], formj = [200, 12, 30, 24, 60];
        var ye = this.attr.outtype[k];
        if (ye == 2) {
            var w = (new Date(this.attr.year, this.attr.month - 1, 1)).getDay();
            formj[2] = new Date(this.attr.year, this.attr.month, 0).getDate();
        }
        var content = "<ul class='FL W11 color1'><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li>";
        for (var i = 0; i < formj[ye]; i++) {
            var j = i + formi[ye];
            content += "<li class='W11 H AC " + (ye == 3 && i > 12 ? "colorY" : "") + ((ye == 2 && (j + w) % 7 < 2) ? " colorR" : "") + "' data-v=" + j + " onclick='wit_date.turn()' >" + (j < 10 ? ("0" + j) : j) + (ye == 3 ? ":" : "") + "</li>"
        }
        content = content + "<li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li></ul>";
        var scrp = document.getElementById("wit_scr").children[k + 1];
        scrp.innerHTML = content;
        scrp.scrollTop = H * (eval("this.attr." + this.attr.date_sli[ye]) - eval(formi[ye]));
        scrp.addEventListener('touchend', this.alladjust, false);
        scrp.addEventListener('scroll', this.scrolladjust, false);
        if (k < this.attr.outtype.length - 1) {
            this.C_scrolli(k + 1);
        } else {
            this.displaydate();
        }
    },  //生成滚轮
    call_back: function (d, o) {
        console.log(d, "显示:" + o.opt + "\n阳历：" + o.yl + "\n农历：" + o.nl + "\n标准：" + o.std);
        if (d.tagName == "INPUT") {
            d.value = o.std;
        } else d.innerHTML = o.std;
    },
    change_date_type: function () {
        this.attr.date_show_type = this.attr.date_show_type == "阳历" ? "农历" : "阳历";
        event.srcElement.innerHTML = this.attr.date_show_type /*+ "</br>阳历"*/;
        this.displaydate();
    },
    //单击跳转居中
    turn: function () {
        var litop = event.srcElement.offsetTop - event.srcElement.parentNode.offsetTop;
        var ppobj = event.srcElement.parentNode.parentNode;
        ppobj.scrollTop = litop - H * 3;
        eval("this.attr." + ppobj.id + "=" + event.srcElement.dataset.v);
        if ((ppobj.id == "year" || ppobj.id == "month") && this.attr.outtype.indexOf(2) >= 0) {
            this.C_scrolli(this.attr.outtype.indexOf(2));
        }
        else {
            this.displaydate();
        }
    },
    //调整滚动后位置
    alladjust: function () {
        var obj = event.srcElement.parentNode.parentNode;
        setTimeout(function () {
            obj.childNodes[0].childNodes[Math.round(obj.scrollTop / wit_date.attr.H) + 3].click();
        }, 500);
    },
    //滚轮调整
    scrolladjust: function () {
        var obj = event.srcElement;
        setTimeout(function () {
            //obj.scrollTop = Math.round(obj.scrollTop / (H)) * H;
            obj.childNodes[0].childNodes[Math.round(obj.scrollTop / wit_date.attr.H) + 3].click()
        }, 500);
    },
    //显示到输入预显框
    displaydate: function (d, da, t) {
        if (da) {
            this.attr.date = da;
            this.attr.year = da.getFullYear();
            this.attr.month = da.getMonth() + 1;
            this.attr.day = da.getDate();
            this.attr.hour = da.getHours();
            this.attr.minute = da.getMinutes();
        } else {
            this.attr.date = new Date(this.attr.year, this.attr.month - 1, this.attr.day, this.attr.hour, this.attr.minute);
        }
        if (t && t.length > 0) {
            this.attr.outtype = t;
        }
        {
            var nl, yl, outtext = "";
            nl = this.TOCNDate(this.attr.date);
            yl = this.attr.date;
            for (var i = 0; i < this.attr.outtype.length; i++) {
                var dxt = eval("this.attr." + this.attr.date_sli[this.attr.outtype[i]]);
                outtext += (dxt > 9 ? dxt : "0" + dxt) + (this.attr.date_show_gs[i] ? this.attr.date_show_gs[i] : "");
            }
            if (this.attr.date_show_gs.indexOf('周') >= 0) {
                outtext += "周" + "日一二三四五六".charAt(this.attr.date.getDay());
            }
            this.attr.outtext = outtext;
            document.getElementById("wit_date_opt").innerHTML = this.attr.outtext;
            document.getElementById("wit_date_opt").dataset.yl = yl;
            document.getElementById("wit_date_opt").dataset.nl = nl;
            if (this.attr.date_show_type == "农历") {
                //农历换算暂时到2021年
                if (this.attr.year > 2021) document.getElementById("wit_date_opt").innerHTML = this.attr.outtext;
                else document.getElementById("wit_date_opt").innerHTML = nl;
            } else {
                document.getElementById("wit_date_opt").innerHTML = this.attr.outtext;
            }
        }   //日期展示与保存
    },

    //农历换算
    GetBit: function ($m, $n) {
        var m = $m, n = $n;
        return (m >> n) & 1;
    },
    e2c: function ($D) {
        var D = $D;
        var total, m, n, k;
        this.attr.monString = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
        var isEnd = false;
        var tmp = D.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.attr.madd[D.getMonth()] + D.getDate() - 38;
        if (D.getYear() % 4 == 0 && D.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (this.attr.CalendarData[m] < 0xfff) ? 11 : 12;//闰月
            for (n = k; n >= 0; n--) {
                this.attr.cDays = 29 + wit_date.GetBit(this.attr.CalendarData[m], n);
                if (total <= this.attr.cDays) {
                    isEnd = true;
                    break;
                }
                total = total - this.attr.cDays;
                if (m > 100) return;
            }
            if (isEnd) break;
        }
        this.attr.cYear = 1921 + m;
        this.attr.cMonth = k - n + 1;
        this.attr.cDay = total;
        if (k == 12) {
            var mon = Math.floor(this.attr.CalendarData[m] / 0x10000);
            this.attr.monString.splice(mon, 0, "闰" + this.attr.monString[mon - 1]);
        }
    },
    TOCNDate: function (D) {
        this.e2c(D);
        var tmp = this.attr.cYear + "甲乙丙丁戊己庚辛壬癸".charAt((this.attr.cYear - 4) % 10) + "子丑寅卯辰巳午未申酉戌亥".charAt((this.attr.cYear - 4) % 12);
        tmp += "(" + "鼠牛虎兔龙蛇马羊猴鸡狗猪".charAt((this.attr.cYear - 4) % 12) + ")年 ";
        tmp += this.attr.monString[this.attr.cMonth - 1];
        tmp += this.attr.dayString[this.attr.cDay - 1];
        return tmp;
    },

    /* common */
    toggle: function (d, syn) {
        d = typeof d == "string" ? document.getElementById(d) : d;
        if (syn) {
            d.style.display = "";
            d.classList.remove("none");
            document.body.style.overflow = "hidden";
        } else {
            d.style.display = "none";
            d.classList.add("none");
            document.body.style.overflow = "auto";
        }
    }            //通用切换
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds(), //毫秒
        "w+": "日一二三四五六".charAt(this.getDay())
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
String.prototype.rtrim = function (v) {
    //return this.replace(/\s*$/g, "");
    v = (v || "\\s").replace(/(\W)/g, "\\$1");
    return this.replace(new RegExp(v + "*$", "g"), "");
};