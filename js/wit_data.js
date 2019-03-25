/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
 */
var url = "http://121.43.233.185/alumnicloudweb";
// var url = "http://192.168.10.23:8080";
//获取学校id
var s_guid = _wd.getUrl_sid().sid;
//获取班级id
var id = _wd.getUrl_sid().cid;
//获取班级在表中的id（退出此班级用）
var class_id = _wd.getUrl_sid().id;

var _userguid, _token, _phone, _editor, _schoolName, _className;
//flagCheck表示成员状态  0：未加入班级 1：加入班级，审核状态 2：审核通过
var flagCheck = 0;

var myclass, myObject, myPrivacy, myPersocial, myEduJson;

var base64img = "";

console.log(class_id, s_guid, id);

//返回值失败的情况

function m_Error(msg, io) {
    var p = JSON.parse(msg);
    // console.log(p);
    if (p.result < 0) {
        console.log(p, io);
        _wd.toError();
        _wd.info("失败！" + p.message, "bgc24");
        return false;
    } else {
        return true;
    }
}

function callback(msg) {
    var info = msg.perinfo;
    //获取班级信息
    myclass = info.perexpeducationjson;
    myObject = info.perobjectjson;
    myPrivacy = info.perprivacyobjectjson;
    myPersocial = info.persocialinforobjectjson;
    myEduJson = info.perexpeducationjson;
    console.log(info);
    _wit.postmessage({functionname: 'getuserinfo', callback: 'init'});
}

function init(msg) {
    if (msg.result >= 0) {
        var info = msg.message;
        console.log(info);
        _userguid = info.user_guid;
        _token = info.token;
        _editor = info.per_full_name;
        _phone = info.user_phone;
        base64img = info.localphotobase64;
        _wit.event.input_UI("s_select", function (i, v, d) {
            console.log(i, v, d);
        });
        _wit.event.input_limit();
        // console.log(flagCheck);
        isMsg();
        class_message();
    } else {
        _wd.info("用户非法，请重新登录！", "bgc24");
    }
}

//判断是否为班级成员
function isMsg() {
    const para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        phone: _phone
    };
    _wd.ajax_formdata(url + "/member/queryByCH.do", true, para, function (msg) {
        if (m_Error(msg, "获取本人在此班级信息")) {
            var p = JSON.parse(msg);
            console.log(p);
            var len = p.message.length;
            if (len === 0) {
                console.log("成员未加入");
                flagCheck = 0;
                // _wd.toConfirm("是否加入此班级！", addClassmate, backindex)
            } else {
                var check = p.message[0].checkrank;
                console.log(check);
                if (check >= 1) {
                    console.log("成员已存在，直接进入班级！");
                    flagCheck = 2;
                } else {
                    console.log("成员正在审核中...");
                    flagCheck = 1;
                }
            }
            toMenu("cl_index");
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

function noJoin() {
    var cont = document.getElementById("addBtn");
    cont.classList.remove("none");
    cont.innerHTML = "";
    document.getElementById("index_tip").innerText = "";
    var div = document.createElement("div");
    div.className = "fix topH W11 MA rad03e bgc104";
    div.innerHTML = '加入此班级！';
    div.onclick = function () {
        _wd.toConfirm("是否加入此班级！", addClassmate)
    };
    cont.appendChild(div);
}

function noChecked() {
    var cont = document.getElementById("tip");
    cont.classList.remove("none");
    cont.innerHTML = "";
    document.getElementById("index_tip").innerText = "";
    var div = document.createElement("div");
    div.className = "fix topH W11 MA rad03e F2 bgc104";
    div.innerHTML = '等待管理员审核！';
    cont.appendChild(div);
}

//返回首页
function backindex() {
    _wit.winclose();
}

//添加信息到班级成员表中
function addClassmate() {
    console.log("开始添加成员");
    const c = myPrivacy;
    const o = myObject;
    const b = myPersocial;
    var graduation = "", honors = "";
    myEduJson.forEach(function (v) {
        if (v.industry_code.indexOf("大学") > -1) {
            console.log(v.unit_name);
            graduation = v.unit_name;
        }
        if (v.class_name.split("||")[2]) {
            if (v.class_name.split("||")[2] === id) {
                honors = v.honors;
            }
        }
    });
    const p = {}, para = {};
    const hy = ["其它", "公务", "教育", "医疗", "科研设计", "农业", "食品", "纺织服饰", "轻工", "能源矿材", "化工", "五金机电", "仪器仪表", "家电", "设备制造", "建筑房产", "交通工业", "物流服务", "信息产业", "商贸", "金融", "商务服务", "居民服务", "环境管理", "文化娱乐", "餐住旅游"];
    var a = o.per_address.split("||");
    console.log(a.length);
    if (a.length > 1) {
        p.acode = a[1] || "";
        p.addr = a[0] || "";
    }
    p.cid = id;
    p.sid = s_guid;
    p.phone = o.per_phone0 || "";
    p.name = o.per_full_name || "";
    p.sex = o.per_sex || 0;
    p.zcode = "";
    p.mail = o.per_email || "";
    p.qq = o.per_qq || "";
    p.wx = o.per_webchat || "";
    p.education = c.per_education || "";
    p.ret = 0;
    p.graduation = graduation || "";
    p.industry = hy[parseInt(parseInt(o.per_industry) / 100)] || "";
    p.career = c.per_job_title || "";
    p.honor = honors || "";
    p.comp = o.per_unit_name || "";
    p.dept = o.per_dept || "";
    p.job = o.per_position || "";
    p.birthday = b.per_birth_date || "";
    p.site = 0;
    p.date = new Date().getTime();
    p.checkrank = p.checkdate = 0;
    p.checkmember = "";
    para.json = p;
    para.token = _token;
    para.userguid = _userguid;
    para.logo = base64img || "";
    console.log("成员信息", para);
    console.log(base64img);
    _wd.ajax_formdata(url + "/member/insert.do", true, para, function (msg) {
        if (m_Error(msg, "插入此班级")) {
            console.log(msg);
            var j = JSON.parse(msg);
            if (j.result >= 0) {
                _wd.info("添加成功！", "bgc5e");
                setTimeout(function () {
                    window.location.reload();
                }, 1000)
            } else {
                _wd.info("添加失败！请重试！", "bgc5e");
                setTimeout(function () {
                    _wit.winclose();
                }, 1000)
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

//班级信息
function class_message() {
    var para = {
        token: _token,
        userguid: _userguid,
        guid: s_guid,
        page: 1,
        pagesize: 1
    };
    _wd.ajax_formdata(url + "/school/queryByGuid.do", true, para, function (msg) {
        if (m_Error(msg, "获取学校信息")) {
            var p = JSON.parse(msg).message;
            console.log(p);
            if (p.length > 0) {
                _schoolName = p[0].name;//获取学校名称
                var para = {
                    token: _token,
                    userguid: _userguid,
                    guid: id,
                    page: 1,
                    pagesize: 1
                };
                _wd.ajax_formdata(url + "/class/queryByGuid.do", true, para, function (msg) {
                    if (m_Error(msg, "获取班级信息")) {
                        var p = JSON.parse(msg).message;
                        console.log(p);
                        if (p.length > 0) {
                            //获取班级和班主任
                            _className = p[0].name;
                            if (_className.indexOf("班") < 0) {
                                _className = _className + "班";
                            }
                            master = p[0].master || "未知";
                            sdate = p[0].sdate;
                            document.getElementById("class_name").innerText = _schoolName + sdate + "届" + _className;
                            document.getElementById("class_master").innerText = "班主任：" + master;
                            document.getElementById("i_class").onclick = function () {
                                window.open(location.href.replace('H5/Classmates', 'com/manager') + "&t=" + p[0].type);
                            }
                        }
                        else {
                            _wd.toConfirm("班级数据异常，是否重新添加！", openClass, backindex)
                        }
                    }
                }, function (msg) {
                    _wd.info("错误！请重新登录！" + msg, "bgc24");
                    _wd.toError();
                });
            }
            else {
                _wd.toConfirm("此学校信息异常，是否重新添加！", openSchool, backindex)
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
        _wd.toError();
    });
}

function openClass() {
    window.open("http://witknow.com/ljj/school/a/class.html?sid=" + s_guid);
}

function openSchool() {
    window.open("http://witknow.com/ljj/school/a/school.html");
}

// 班级详情
function class_msg() {
    // console.log(s);
    // console.log(c);
    var p = document.getElementById("new_page");
    p.innerHTML = "";
    var div = document.createElement("div");
    div.className = "fix W11 CHmax bgc9  ofa";
    div.innerHTML = '<div class="fix top0 H W11 AC bgct1 ffHT">班级信息' +
        '    <div  class="FL B4M H4M F2" onclick="_wd.hide(new_page)">' +
        '<img src="../images/icon/back_w.png" class="FL B4M H4M  P1M" > </div>' +
        '    <div  class="FR B4M H4M F2 color8">' +
        '</div>' +
        '</div>' +
        '<div class=" W11 F3 bgc10 MTH">' +
        '<div class="bordBD1 H4M ">' +
        '<div class="FL W31 AL P1M">学校</div>' +
        '<div  class="FR W32 AR P1M color8">' + _schoolName + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="bordBD1 H4M ">' +
        '<div class="FL W31 AL P1M">年届</div>' +
        '<div  class="FR W32 AR P1M color8">' + sdate + '届</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="bordBD1 H4M ">' +
        '<div class="FL W31 AL P1M">班级</div>' +
        '<div  class="FR W32 AR P1M color8">' + _className + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class=" H4M ">' +
        '<div class="FL W31 AL P1M">班主任</div>' +
        '<div  class="FR W32 AR P1M color8">' + master + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="fix bottom0 M C4M H AC bgc13" id="del_calss" >退出该班级</div>' +
        '</div>';
    p.appendChild(div);
    _wd.show(p);
    document.getElementById("del_calss").onclick = function () {
        _wd.toConfirm("确定删除该班级经历?", del_school)
    }
}

//删除已加入的学校
function del_school() {
    console.log(class_id);
    _wit.postmessage({
        functionname: "deleteexp",
        witparams: {
            type: 0,
            id: class_id
        },
        callbackparam: JSON.stringify({
            type: 0,
            id: class_id
        }),
        callback: "delExp"
    });
}

function delExp(msg, param) {
    console.log("正在删除");
    console.log(msg, param);
    var j = msg;
    if (j && j.result >= 0) {
        _wd.info("删除成功！", "bgc5e");
        setTimeout(function () {
            _wit.postmessage({functionname: 'exitclass', callback: 'p_fresh'});
        }, 1000);
    }
}

function p_fresh(msg) {
    console.log("正在刷新父窗口");
    console.log(msg);
}

//首页通知
function cl_index() {
    document.getElementById("index_notice").innerHTML = "";
    if (flagCheck === 2) {
        var para = {
            token: _token,
            userguid: _userguid,
            cid: id,
            page: 1,
            pagesize: 5//首页只展示五条数据
        };
        if (para.cid) {
            _wd.ajax_formdata(url + "/notice/queryByCid.do", true, para, function (msg) {
                if (m_Error(msg, "获取通知（展现在首页）")) {
                    var p = JSON.parse(msg).message;
                    fill_index(p);
                    _wd.marquee("marquee", "marquee_text");
                }
            }, function (msg) {
                _wd.info("错误！请重新登录！" + msg, "bgc24");
            });
        }
    } else {
        if (flagCheck === 0) {
            noJoin();
        }
        if (flagCheck === 1) {
            noChecked();
        }

        document.getElementById("index_tip").innerText = "————加入班级查看更多信息！————";
        var para1 = {
            token: _token,
            userguid: _userguid,
            cid: id,
            type: 0,
            page: 1,
            pagesize: 5//首页只展示五条数据
        };
        if (para1.cid) {
            _wd.ajax_formdata(url + "/notice/queryByType.do", true, para1, function (msg) {
                if (m_Error(msg, "获取班务通知（展现在首页）")) {
                    var p = JSON.parse(msg).message;
                    fill_index(p);
                    _wd.marquee("marquee", "marquee_text");
                }
            }, function (msg) {
                _wd.info("错误！请重新登录！" + msg, "bgc24");
            });
        }
    }
}

function fill_index(p) {
    var f_notice = document.getElementById("marquee_text");
    // console.log(f_notice);
    if (p.length > 0) {
        //插入置顶通知，即数据库首条数据
        f_notice.innerText = "【" + p[0].title + "】" + p[0].notice;
        var sameTime;
        p.forEach(function (v) {
            var date = _wd.crtTimeFtt(v.date);
            var nowTime = _wd.getCurrentDate(1);//获取当前时间
            var YMD = date.substring(0, 10);//获取数据中时间的年月日
            var HM = date.substring(11, date.length);//获取数据中时间的时分
            var DF_time = _wd.getDateSUB(nowTime, YMD);//计算两者时间差天数
            switch (DF_time) {
                case 0:
                    YMD = "今天";
                    break;
                case 1:
                    YMD = "昨天";
                    break;
                case 2:

                    YMD = "前天";
                    break;
            }
            var timeTitle = "";
            //判断是否为同一天的通知
            if (sameTime !== YMD) {
                timeTitle = '<div class="AC colorA PB1M PT1M flexbox" id="index_time">' +
                    '                <img class="W31 FL" src="../images/icon/line-min.png" alt="">' +
                    '                <div class="W41 FL">' + YMD + '</div>' +
                    '                <img class="W31 FL" src="../images/icon/line-min.png" alt="">' +
                    '            </div>';
            }
            var div = document.createElement("div");
            var id = "index_n_" + v.id;
            var n_detail = v.notice;
            if (n_detail.length === 0 || typeof(n_detail) === "undefined") {
                n_detail = "";
            }
            //展开通知详情
            div.onclick = function () {
                _wd.Show_Hidden(id);
            };
            div.innerHTML = timeTitle +
                '<div class=" bgc10 rad05  MB">' +
                '                <div class="P1M W11 AL ">' +
                '                    <div>通知：' + v.title + '</div>' +
                '                    <div class="MT05  F2 colorA"><div class="FL W43 ellips">发布人：' + v.editor + '</div><div class="FR W41 AR">' + HM + '</div> </div>' +
                '                   <div class="FL P1M none MT05 W11  rad03e color8 bgcaf5" id="index_n_' + v.id + '">' +
                '                       <div class="LH2 F3">' + n_detail + '</div>' +
                '                           </div>' +
                '                    <div class="clear"></div>' +
                '                </div>' +
                '            </div>';
            document.getElementById("index_notice").appendChild(div);
            sameTime = YMD;
        });
    } else {
        //若无通知内容置空
        document.getElementById("index_tip").innerText = "";
    }
}

//发布通知页面
function Re_notice() {
    if (flagCheck === 2) {
        document.getElementById("re_notice").innerHTML = "";
        var div = document.createElement("div");
        div.className = " W11 index99 fix bgc9 CH";
        div.innerHTML = '<div class="top0 H W11 AC ffHT bgct1 ">发布通知' +
            '    <div  class="FL B4M H4M F2" onclick="_wd.hide(re_notice)"> 取消</div>' +
            '    <div  class="FR B4M H4M F2 color8" id="n_release" onclick="in_notice()"> 发布</div>' +
            '</div>' +
            '<div class="bgc10 W11 AL">' +
            '<div  class="FL W11 F3 H4M LH3   bordBD1  bgcddc  color876 bord_select AC" id="n_tag" title="-1" data-t="radio" data-s="班务,探望,游玩,喜报,哀悼" />选择类型标签</div>' +
            '<input type="text" class=" FL H4M W11 F3 ALP ffWRYH bordBD1 " id="re_title" placeholder="输入标题"/>' +
            '<textarea class=" FL  W11  ALP F3 bordBD1 ffWRYH " rows="8"  style="resize:none"  id="re_content" placeholder="发布我的内容......" ></textarea>' +
            '<div class="W11 FL AR F1 colorA PR1M">最多输入250个字</div>' +
            '</div>';
        document.getElementById("re_notice").appendChild(div);
        // dais.toggle("re_notice", 1);
        _wd.show("re_notice");
        _wit.event.div_UI("s_select");
        //输入标题后 发布按钮 改变颜色
        document.getElementById("re_title").oninput = function () {
            var div = document.getElementById("n_release");
            var tag = document.getElementById("n_tag");
            if (this.value.length > 0) {
                if (tag.title < 0) {
                    tag.click();
                    _wd.info("请选择类型标签！", "bgc5e");
                } else {
                    div.classList.remove("color8");
                    div.classList.add("colorff");
                }
            } else {
                div.classList.remove("colorff");
                div.classList.add("color8");
            }
        };
    } else {
        _wd.info("加入班级后才能发布通知！", "bgc5e");
    }
}

//发布通知接口
function in_notice() {
    var type = parseInt(document.getElementById("n_tag").title);
    var title = document.getElementById("re_title").value;
    var notice = document.getElementById("re_content").value;
    if (type < 0 || title.length === 0) {
        _wd.info("通知标签、标题不能为空", "bgc5e");
        // console.log(type, title.length);
        document.getElementById("n_tag").click();
    } else if (_wd.getBLen(title) > 50) {
        _wd.info("标题不能超过25个字！", "bgc5e");
    } else if (_wd.getBLen(notice) > 500) {
        _wd.info("内容不能超过250个字！", "bgc5e");
    } else {
        var para = {
            json: {
                sid: s_guid,
                cid: id,
                phone: _phone,
                type: type,
                editor: _editor,
                title: title,
                notice: notice,
                date: new Date().getTime(),
                replay: ""
            },
            token: _token,
            userguid: _userguid,
        };
        // console.log(para.json);
        _wd.ajax_formdata(url + "/notice/insert.do", true, para, function (msg) {
            // console.log(JSON.parse(msg));
            if (m_Error(msg, "发布通知")) {
                var p = JSON.parse(msg).result;
                if (p === 1) {
                    _wd.hide("re_notice");
                    // dais.toggle(re_notice, 0);
                    toMenu("cl_notice");
                } else {
                    _wd.info("发布失败，请重试！", "bgc24");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    }
}

var tag_number = 1;//通知编号
var more_btn = 1;//计算点击更多次数
//通知消息
function cl_notice() {
    document.getElementById("cont_notice").innerHTML = "";
    tag_number = 1;
    getNoticeList(1);
}

//获取通知列表
function getNoticeList(page) {
    if (flagCheck === 2) {
        var para = {
            token: _token,
            userguid: _userguid,
            cid: id,
            page: page,
            pagesize: 20
        };
        _wd.ajax_formdata(url + "/notice/queryByCid.do", true, para, function (msg) {
            if (m_Error(msg, "加载更多通知")) {
                var p = JSON.parse(msg).message;
                fill_notice(p, page);
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    } else {
        var para1 = {
            token: _token,
            userguid: _userguid,
            cid: id,
            type: 0,
            page: page,
            pagesize: 20
        };
        _wd.ajax_formdata(url + "/notice/queryByType.do", true, para1, function (msg) {
            if (m_Error(msg, "加载更多通知")) {
                var p = JSON.parse(msg).message;
                fill_notice(p, page);
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    }
}

function fill_notice(p, page) {
    var more_notice = document.getElementById("more_notice");
    if (page === 1 && p.length === 0) {
        more_notice.innerText = "";
    } else {
        if (p.length < 20 && p.length > 0) {
            more_notice.innerText = "—————— END ——————";
        } else if (p.length === 0) {
            more_notice.innerText = "已经没有更多了！";
            more_btn = 1;
        } else {
            more_notice.innerText = "点击加载更多";
        }
    }

    p.forEach(function (v) {
        var div = document.createElement("div");
        div.className = " W11 AL";
        var id = "notice_" + v.id;
        var n_detail = v.notice;
        if (n_detail.length === 0 || typeof(n_detail) === "undefined") {
            n_detail = "";
        }
        div.onclick = function () {
            _wd.Show_Hidden(id);
        };
        div.innerHTML = '  <div class="W11 P1M bordBD1">' +
            '<div class="thicker F3"><b class="colorO F3 italic MR">' + tag_number++ + ' </b> ' + v.title + '</div>' +
            '<div class="W11 F2 MT05 colorA">' +
            '<div class="FL  W21 " > 发布人：' + v.editor + '</div>' +
            '<div class="FR  AR W21 ">' + _wd.crtTimeFtt(v.date) + '</div>' +
            '<div class="clear"></div>' +
            '</div>' +
            '<div class="FL P1M none MT05 W11  rad03e color8 bgcaf5" id="notice_' + v.id + '">' +
            '<div class="LH2 F3">' + n_detail + '</div>' +

            '</div>' +
            '<div class="clear"></div>' +

            '</div>';
        document.getElementById("cont_notice").appendChild(div);
    });
}

//点击更多加载下一页列表
var moreNotice = document.getElementById("more_notice");
if (moreNotice) {
    moreNotice.onclick = function () {
        more_btn++;
        getNoticeList(more_btn);
    };
}

/**
 * 座位表的图片
 * */
function daisWH(value_w, value_h) {
    // var daisBtn = document.getElementById("dais_value");
    // var wh = daisBtn.getAttribute("data-value");
    // if (wh) {
    //     value_w = wh.split("*")[0];
    //     value_h = wh.split("*")[1];
    // } else {
    value_w = 7;
    value_h = 8;
    // }
    // daisBtn.setAttribute("wh", value_w + "*" + value_h);
    console.log("座位表：列" + value_w + " 行" + value_h);
    var cont = "";
    for (var i = 1; i <= value_h * value_w; i++) {
        cont += "<img class='A" + value_w + "1 rad03e ML AL' src='../images/icon/classmatespic.png' onerror=\"this.src ='../images/nofindpic.png' \" id=c_headimg" + i + " onclick='change_info_logo(this)'>"
    }//绘制座位表
    document.getElementById("daislist").innerHTML = cont;
    get_information_logo();
}

/*座位的展开与隐藏*/
function openAll() {
    var daislist = document.getElementById("daislist");
    var daislistclass = daislist.className;
    var bq_open = document.getElementById("open_all");
    var class_name = "ofh H16M W11";
    if (daislistclass.indexOf("ofh H16M") > -1) {
        daislist.className = "W11";
        bq_open.src = "../images/icon/close.png";
    }
    else {
        daislist.className = class_name;
        bq_open.src = "../images/icon/open.png";
    }
}

//座位表插入头像
function get_information_logo() {
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        page: 1,
        pagesize: 200
    };
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg, "获取班级成员头像")) {
            var p = JSON.parse(msg).message;
            var logoPath = JSON.parse(msg).logoPath;
            p.forEach(function (v) {
                if (v.site > 0) {
                    var logo = document.getElementById("c_headimg" + v.site);
                    logo.src = logoPath + s_guid + "/" + id + "/" + MD5(v.phone) + ".jpg";
                    // console.log(logo.src);
                    var logo_w = logo.width;
                    if (logo.height > logo_w) {
                        logo.height = logo_w;
                        logo.classList.add("OFC");
                    }
                }
            });
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

//改变座位
function change_info_logo(s) {
    if (flagCheck === 2) {
        if (s.src.indexOf("classmatespic.png") > 0) {
            var site = parseInt(s.id.replace(/[^0-9]/ig, ""));
            _wd.toConfirm("确定入坐此位置？", function () {
                change_site(site);
            });
        }
    } else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
}

function change_site(site) {
    const para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        phone: _phone
    };
    console.log(para);
    _wd.ajax_formdata(url + "/member/queryByCH.do", true, para, function (msg) {
        if (m_Error(msg, "修改座位")) {
            var p = JSON.parse(msg);
            console.log(p);
            var l = p.message[0];
            console.log(l);
            if (l) {
                var para = {};
                var newSite = JSON.parse(JSON.stringify(l));
                newSite.site = site;
                para.json = newSite;
                para.token = _token;
                para.userguid = _userguid;
                para.logo = "";
                para.phone = _phone;
                console.log("成员信息", para);
                _wd.ajax_formdata(url + "/member/insert.do", true, para, function (msg) {
                    // var d = document.querySelector("#toConfirm");
                    var j = JSON.parse(msg);
                    if (j.result >= 0) {
                        _wd.info("入座成功！", "bgc5e");
                        // get_information_logo();
                        toMenu("cl_information");
                    } else {
                        _wd.info("入座失败！", "bgc24");
                        toMenu("cl_information");
                    }
                });
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

//添加通讯录
function cl_information() {
    // daisWH();
    daisWH();//设置默认座位表
    // get_information_logo();
    var cont = document.getElementById("phone_list");
    cont.innerHTML = "";
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        page: 1,
        pagesize: 200
    };
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg, "获取班级成员")) {
            console.log(JSON.parse(msg));
            var p = JSON.parse(msg).message;
            var logoPath = JSON.parse(msg).logoPath;
            console.log(p);
            p.forEach(function (v) {

                var div = document.createElement("div");
                var checkBtn = "";
                var isCheck = 0;
                // console.log(flagCheck, v.checkrank);
                var check_m = v.checkmember.split(",");
                for (var i = 0; i < check_m.length; i++) {
                    if (check_m[i] === _phone) {
                        isCheck = 1;
                    }
                }
                if (flagCheck === 2 && v.checkrank < 1 && v.phone && isCheck === 0) {
                    checkBtn = '<div class="FR LH2 F2 rad03e  ACP bgc15 " onclick="Help_Check(this,' + v.phone + ')">给予认证</div>';
                }
                div.innerHTML = ' <div class="W11 H7M  bgc10 nowrap inlineT" data-phone="' + v.phone + '" data-name="' + v.name + '"' +
                    ' style="transform: translate(-' + 7 * M + 'px, 0px);">' +
                    '<div class="B7M H7M F4 AC color1 bgc36 inlineB top" style="line-height: ' + 7 * M + 'px">详情</div>' +
                    '<ul class="CW H7M bgc10 bordBD1 inlineB top">' +
                    '<li class="H7M B7M FL">' +
                    '<img class="FL B5M H5M OFC rad03e M" src="' + logoPath + s_guid + "/" + id + "/" + MD5(v.phone) + '.jpg" onerror="this.src =\'../images/port03.jpg\' " alt=""> ' +
                    '</li>' +
                    '<li class="H7M C8M FL ">' +
                    '<div class=" MT05 LH2 ofh">' +
                    '<div class="W11 clear">' +
                    '<div class="FL W43  ofh F3 ellips">' +
                    '<div class="' + (v.phone ? "color876" : "colorA") + ' ellips bold B6M FL">' + v.name + '</div>' +
                    '<div class="color8 ML ellips B11M FL"> ' + (v.phone ? "\u260E " : "") + v.phone + '</div>' +
                    '</div> ' +
                    '<div class="FR W41 ellips">' + checkBtn +
                    '</div>' +
                    '</div>' +
                    '<div class="W11 clear">' +
                    '<div class="FL W32 color8 F3 ellips AL">' + v.comp + '</div>' +
                    '<div class="FR W31 AR color8 F3 ellips ofh">' + v.dept + v.job + '</div> ' +
                    '</div></div>' +
                    '</li>    ' +
                    '</ul>' +
                    '<div class="B7M H7M F4 AC color1  bgc45 inlineB top" style="line-height: ' + 7 * M + 'px">打电话</div>' +
                    '</div>';
                SomeEvent(div, {
                    MOVE_LIMIT_BACK: true,
                    CW: CW,
                    S: M * 7,
                    L: M * 12,
                    MOVE_BACK: {_X: 10, X_: CW - 10},
                    MOVE_LIMIT: true,
                    TRANSFORM: 1
                }, f, {e1: v.phone});
                cont.appendChild(div);
            });
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
    if (flagCheck === 2) {
        var f = {
            A_L: function (e) {
                window.open("tel://" + e.e1);
            },
            A_R: function (e) {
                if (e.e1 === "") {
                    _wd.info("此同学信息为空！", "bgc24");
                } else {
                    classmatesMember(e.e1)
                }
            },
            A_O: function () {

            }
        }
    } else {
        f = {
            A_L: function () {
                _wd.info("加入班级后才能使用此功能！", "bgc5e");
            },
            A_R: function () {
                _wd.info("加入班级后才能使用此功能！", "bgc5e");
            },
            A_O: function () {
                _wd.info("加入班级后才能使用此功能！", "bgc5e");
            }
        }
    }
}

function Help_Check(d, p) {
    console.log(d);
    if (p) {
        var para = {
            token: _token,
            userguid: _userguid,
            cid: id,
            phone: p,
            phones: _phone,
            num: 3
        };
        console.log(para);
        _wd.ajax_formdata(url + "/member/verify.do", true, para, function (msg) {
            if (m_Error(msg, "认证")) {
                var p = JSON.parse(msg).message;
                console.log(p);
                var check_m = p.checkmember.split(",");
                console.log(check_m);
                for (var i = 0; i < check_m.length; i++) {
                    if (check_m[i] === _phone) {
                        d.className = " ";
                        d.innerText = "";
                        _wd.info("认证人数+1！达到三人才能开放全功能！", "bgc5e", 2000);
                    }
                }
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    } else {
        _wd.info("无法帮TA认证！", "bgc5e");
    }
}
function clear_addr(str) {
    str = str.replace(/@@/g, "");//取消字符串中出现的@@
    return str;
}
//班级成员详情
function classmatesMember(p) {
    var cont = document.getElementById("classmates_page");
    cont.innerHTML = "";
    var div = document.createElement("div");
    div.className = "fix top0 F3  W11 CHmax bgc9 ofa";
    var msgHtml = '<div class="fix index100 top0 H bgct1 W11 AC ffHT ">成员信息' +
        '<div class="FL B4M H4M F2" id="exit_c_page" onclick="exit_classmate_page()"> <img  src=\'../images/icon/back_w.png\' class="FL B4M H4M P1M" /></div>' +
        '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
        '</div>';
    const para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        phone: p
    };
    console.log(para);
    _wd.ajax_formdata(url + "/member/queryByCH.do", true, para, function (msg) {
        if (m_Error(msg, "获取班级成员")) {
            var p = JSON.parse(msg).message;
            console.log(p[0]);
            var sex = "";
            switch (p[0].sex) {
                case 1:
                    sex = "男";
                    break;
                case 2:
                    sex = " 女";
                    break;
                default:
                    sex = "";
                    break;
            }
            var ret = "";
            console.log(p[0].ret);
            switch (p[0].ret) {
                case 0:
                    ret = "在职";
                    break;
                case 1:
                    ret = "退休";
                    break;
            }
            var check_Btn = '<div class="H5M W11"></div>' +
                '<div class="fix bottom0 M B34M H AC bgc14" onclick="Help_Check(this,' + p[0].phone + ')">给予认证</div>';
            var check_m = p[0].checkmember.split(",");
            var check_r = p[0].checkrank;
            if (check_r === 1) {
                check_Btn = "";
            } else {
                for (var i = 0; i < check_m.length; i++) {
                    if (check_m[i] === _phone) {
                        check_Btn = "";
                    }
                }
            }

            var addr = "";
            if (p[0].addr) {
                addr = clear_addr(p[0].addr);
            } else {
                addr = "";
            }
            msgHtml +=
                '<div class="bgc10 W11 MTH">' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">姓名</div>' +
                '            <div  class="W32 FR AR color8 ellips">' + p[0].name +
                '            </div>' +
                '        </div>' +
                '        <div class="  H4M flexbox">' +
                '            <div class="W31 FL  AL">电话</div>' +
                '            <div  class="W32 FR AR color8 ellips">' + p[0].phone +
                '            </div>' +
                '        </div>' +
                '</div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">性别</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + sex +
                '            </div>' +
                '        </div>' +
                '        <div class="  H4M flexbox">' +
                '            <div class="W31 FL  AL">生日</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + _wd.crtTimeYMD(p[0].birthday) +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">QQ</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].qq +
                '            </div>' +
                '        </div>' +
                '        <div class=" bordBDe6 H4M flexbox">' +
                '            <div class="W31 FL  AL">微信</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].wx +
                '            </div>' +
                '        </div>' +
                '        <div class=" H4M flexbox">' +
                '            <div class="W31 FL  AL">邮箱</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].mail +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="HN4M flexbox">' +
                '            <div class="W31 FL  AL">地址</div>' +
                '                <div  class="W32 FR AL  color8 ">' + addr +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">学历</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].education +
                '            </div>' +
                '        </div>' +
                '        <div class="H4M flexbox">' +
                '            <div class="W31 FL  AL">毕业院校</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].graduation +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">行业</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].industry +
                '            </div>' +
                '        </div>' +
                '        <div class="bordBDe6 H4M flexbox">' +
                '            <div class="W31 FL  AL">单位名称</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].comp +
                '            </div>' +
                '        </div>' +
                '        <div class="bordBDe6 H4M flexbox">' +
                '            <div class="W31 FL  AL">部门</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].dept +
                '            </div>' +
                '        </div>' +
                '        <div class="bordBDe6 H4M flexbox">' +
                '            <div class="W31 FL  AL">职务</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].job +
                '            </div>' +
                '        </div>' +
                '        <div class=" H4M flexbox">' +
                '            <div class="W31 FL  AL">职称</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].career +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                ' <div class="H1M W11 bgcaf5 bordBDe6"></div>' +
                '    <div class=" W11  PL1M PR1M bgc10  bordBDe6">' +
                '        <div class="bordBDe6  H4M flexbox">' +
                '            <div class="W31 FL  AL">工作状况</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + ret +
                '            </div>' +
                '        </div>' +
                '        <div class="H4M flexbox">' +
                '            <div class="W31 FL  AL">荣誉</div>' +
                '                <div  class="W32 FR AR color8 ellips">' + p[0].honor +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                check_Btn +
                '</div>';
            div.innerHTML = msgHtml;
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
    cont.appendChild(div);
    _wd.show(cont);

}

function exit_classmate_page() {
    _wd.hide("classmates_page");
    toMenu("cl_information");
}

var ph_more_btn_img = 1;//照片页数
var ph_more_btn_vdo = 1;//视频页数
var ph_more_btn_wrd = 1;//文件页数

//档案
function cl_photo() {
    if (flagCheck === 2) {
        getGra_ph();
        ph_more_btn_img = 1;
        ph_more_btn_vdo = 1;
        ph_more_btn_wrd = 1;
        var ph_img = document.getElementById("ph_img");
        ph_img.innerHTML = "";
        var ph_video = document.getElementById("ph_video");
        ph_video.innerHTML = "";
        var ph_word = document.getElementById("ph_word");
        ph_word.innerHTML = "";
        get_cl_Photo(ph_more_btn_img, 1);//获取相册
        get_cl_Photo(ph_more_btn_vdo, 2);//获取视频文件夹
        get_cl_Photo(ph_more_btn_wrd, 4);//获取文件
        //添加毕业照小白点
    }
    else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
}

//毕业照左右滑动监听事件
var ph_touch = document.getElementById("ph_gra");
EventUtil.listenTouchDirection(ph_touch, true, "", tou_right, "", tou_left);
var number = 1;//初始化滑动次数
var by_photos = [];//存放毕业照
var ph_index = document.getElementById("ph_index").children;
var ph_gray = "color8 radius index9 inlineB F8";//未激活小点的样式
var ph_white = "color1 radius index9 inlineB F8";//激活状态的样式
var byzPath;

//获取毕业照
function getGra_ph() {
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        type: 5,
    };
    _wd.ajax_formdata(url + "/recordGroup/queryByType.do", true, para, function (msg) {
        if (m_Error(msg, "获取毕业照")) {
            var p = JSON.parse(msg).message;
            if (p.length > 0) {
                var _gra_id = p[0].id;
                var para1 = {
                    token: _token,
                    userguid: _userguid,
                    cid: id,
                    gid: _gra_id,
                    page: 1,
                    pagesize: 10
                };
                _wd.ajax_formdata(url + "/record/queryByGid.do", true, para1, function (msg) {
                    if (m_Error(msg, "获取毕业照图片路路径")) {
                        var p = JSON.parse(msg).message;
                        console.log(JSON.parse(msg));
                        if (p.length > 0) {
                            byzPath = JSON.parse(msg).logoPath + s_guid + "/" + id + "/";
                            by_photos = [];
                            p.forEach(function (v) {
                                by_photos.push(v.src);
                                // console.log(v.src);
                            });
                            // console.log(by_photos);
                            add_photoindex(by_photos);
                        }
                    }
                });
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });

}

//向右滑动
function tou_right() {
    console.log(ph_index);
    console.log("right");
    number--;
    if (number < 0) {
        number = 1;
    } else {
        for (var i = 0; i < by_photos.length; i++) {
            ph_index[i].className = ph_gray;
        }
        ph_index[number].className = ph_white;
        document.getElementById("by_photo").src = byzPath + by_photos[number];
    }
}

//向左滑动
function tou_left() {
    console.log(ph_index);
    console.log("left");
    number++;
    console.log(number);
    if (number > by_photos.length) {
        number = by_photos.length - 1;
    } else {
        for (var i = 0; i < by_photos.length; i++) {
            ph_index[i].className = ph_gray;
        }
        ph_index[number - 1].className = ph_white;
        document.getElementById("by_photo").src = byzPath + by_photos[number - 1];
    }
}

//添加毕业照的小白点
function add_photoindex(by_photos) {
    var ph_photoindex = document.getElementById("ph_index");
    ph_photoindex.innerHTML = "";
    console.log(by_photos);
    by_photos.forEach(function () {
        var div = document.createElement("li");
        div.className = " color8 radius index9 inlineB F8";
        div.innerHTML = '&#8226';
        ph_photoindex.appendChild(div);
    });
    if (ph_photoindex.children.length > 0) {
        ph_photoindex.children[0].className = ph_white;//设置初始状态的小白点
        document.getElementById("by_photo").src = byzPath + by_photos[0];//设置初始图片
    }
}

//点击毕业照，判断是否存在，否则新建
ph_touch.onclick = function () {
    if (flagCheck === 2) {
        var para = {
            token: _token,
            userguid: _userguid,
            cid: id,
            type: 5,
        };
        _wd.ajax_formdata(url + "/recordGroup/queryByType.do", true, para, function (msg) {
            if (m_Error(msg, "判断是否有毕业照")) {
                var p = JSON.parse(msg).message;
                console.log(p);

                 if (p.length < 1) {
                    var para = {
                        json: {
                            sid: s_guid,
                            cid: id,
                            phone: _phone,
                            type: 5,
                            name: "毕业照",
                            memo: "",
                            date: new Date().getTime()
                        },
                        token: _token,
                        userguid: _userguid,
                    };
                    _wd.ajax_formdata(url + "/recordGroup/insert.do", true, para, function (msg) {
                        if (m_Error(msg, "上传毕业照文件")) {
                            var p = JSON.parse(msg);
                            console.log(p);
                            if (p.result > 0){
                                upBYZ(p.message.id);
                            }
                        }
                    });
                 }
                else {
                     upBYZ(p[0].id);
                }
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    } else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
};

function upBYZ(_gra_id) {
    // _gra_id = p[0].id;
    var para1 = {
        token: _token,
        userguid: _userguid,
        cid: id,
        gid: _gra_id,
        page: 1,
        pagesize: 10
    };
    console.log(para1);
    _wd.ajax_formdata(url + "/record/queryByGid.do", true, para1, function (msg) {
        if (m_Error(msg, "获取所有毕业照")) {
            var p = JSON.parse(msg).message;
            console.log(p);
            var cont = document.getElementById("new_page");
            cont.innerHTML = "";
            var div = document.createElement("div");
            div.className = "fix top0  W11 CHmax bgc9 ofa";
            div.innerHTML = '  <div class="fix index100 top0 H bgct1 W11 AC ffHT ">毕业照' +
                '<div class="FL B4M H4M F2" onclick="_wd.hide(new_page)"> <img  src="../images/icon/back_w.png" class="FL B4M H4M P1M" /></div>' +
                '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
                '</div>' +
                '<div class="bgc10 W11 MTH">' +
                '<div class="H1M W11"></div>' +
                '<div  class="MA rad03e bgcff P05M C4M AC" id="add_photo_byz" >上传毕业照' +
                '</div>' +
                '<input type="file" id="up_photo_1" multiple="multiple" accept="image/*" class="none" capture="camera" >' +
                '<div id="gra_photo" class="W11  bgc10 MT"></div>' +
                '<div class="H1M W11"></div>' +
                '</div>';
            cont.appendChild(div);
            _wd.show(cont);
            var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
            var isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
            if (isIos) {
                document.getElementById("up_photo_1").removeAttribute("capture");
            }
            var oSelect = document.getElementById("add_photo_byz");
            var oInput = document.getElementById("up_photo_1");
            var gra_photo = document.getElementById("gra_photo");
            var upInput = document.getElementById("up_photo_1");
            var result;
            var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
            var fd;  //FormData方式发送请求
            oSelect.onclick = function () {
                if (p.length < 10) {
                    oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
                    //清空已选图片
                    oInput.click();
                } else {
                    _wd.info("毕业照上传数量已达上限！", "bgc24");
                }
            };
            if (typeof FileReader === 'undefined') {
                // alert("抱歉，你的浏览器不支持 FileReader");
                upInput.setAttribute('disabled', 'disabled');
            } else {
                upInput.addEventListener('change', readFile, false);
            }
            var imgHtml = JSON.parse(msg).logoPath + s_guid + "/" + id + "/";
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = "   ofh AC";
                div.innerHTML =
                    '<img class=" W11 H11  OFC"  src="' + imgHtml + v.src + '" alt="" onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this)">';
                gra_photo.appendChild(div);
            });
            _wd.clear(gra_photo);

            //上传毕业照
            function readFile() {
                fd = new FormData();
                var iLen = this.files.length;
                var index = 0;
                var cont = document.getElementById("ph_upload");
                var div = document.createElement("div");
                div.className = "index100 absolute top0 left0  bgc10 W11 CHmin";
                div.id = "ph_upload_xq";
                div.innerHTML = '  <div class="fix index100 top0 H bgc9 W11 AC ffHT ">' +
                    '<div class="FL B4M H4M F2" onclick="_wd.hide(\'ph_upload\')"> <img  src="../images/icon/back_w.png" class="FL B4M H4M P1M" /></div>' +
                    '<div class="FR B4M H4M F2 color8 " id="ph_upload_btn" >上传</div>' +
                    '</div>' +
                    '<div class="bgc10 W11 P05M MTH" id="ch_list_5">' +
                    '</div>';
                cont.appendChild(div);
                _wd.show(cont);
                for (var i = 0; i < iLen; i++) {
                    var reader = new FileReader();
                    reader.index = i;
                    fd.append("files", this.files[i]);
                    reader.readAsDataURL(this.files[i]);  //转成base64
                    reader.fileName = this.files[i].name;
                    reader.onload = function () {
                        var imgMsg = {
                            name: this.fileName,//获取文件名
                            base64: this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        };
                        dataArr.push(imgMsg);
                        result = ' <img class=" W11 H11  OFC" src="' + this.result + '" onclick="toFull_img(this)"/> ';
                        var div1 = document.createElement('div');
                        div1.innerHTML = result;
                        var upload_btn = document.getElementById("ph_upload_btn");
                        if (div1.innerHTML.length > 0) {
                            // document.getElementById("dbclick_delete").innerText = "长按图片删除！";
                            upload_btn.classList.add("colorff");
                            upload_btn.classList.remove("color8");
                        } else {
                            upload_btn.classList.add("color8");
                            upload_btn.classList.remove("colorff");
                        }
                        div1.className = "W11  ofh";
                        document.getElementById("ch_list_5").appendChild(div1);
                    }

                }
                document.getElementById("ph_upload_btn").onclick = function () {
                    if (iLen < 10) {
                        // var fd = new FormData();
                        fd.append("json", JSON.stringify({
                            cid: id,
                            sid: s_guid,
                            gid: _gra_id,
                            phone: _phone,
                            type: 5,
                            name: "毕业照",
                            src: "",
                            memo: "",
                            date: new Date().getTime(),
                            replay: ""
                        }));
                        fd.append("token", _token);
                        fd.append("userguid", _userguid);
                        _wd.ajax_formdata(url + "/record/insert.do", true, fd, function (msg) {
                            if (m_Error(msg, "上传毕业照")) {
                               var f =  document.getElementById("ph_upload_xq");
                               document.getElementById("ph_upload").removeChild(f);
                                _wd.hide("ph_upload");
                                _wd.hide("new_page");
                                toMenu("cl_photo");

                                console.log(msg);
                            }
                        }, function (msg) {
                            _wd.info("无法上传，请重试！" + msg, "bgc24");
                        });
                    } else {
                        _wd.info("毕业照最多上传10张！", "bgc24");
                    }
                }
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}
//获取所有班级档案
function get_cl_Photo(page, type) {
    var ph_img = document.getElementById("ph_img");
    var ph_video = document.getElementById("ph_video");
    var ph_word = document.getElementById("ph_word");
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        type: type,
        page: page,
        pagesize: 7
    };
    _wd.ajax_formdata(url + "/recordGroup/queryByType.do", true, para, function (msg) {
        if (m_Error(msg, "获取所有档案")) {
            var p = JSON.parse(msg).message;
            // console.log(p);
            if (p.length > 6) {
                var more_div = document.createElement("div");
                more_div.className = " FL ML";
                more_div.id = "ph_more_type" + type;
                more_div.onclick = function () {
                    switch (type) {
                        case 1:
                            ph_more_btn_img++;
                            get_cl_Photo(ph_more_btn_img, 1);
                            break;
                        case 2:
                            ph_more_btn_vdo++;
                            get_cl_Photo(ph_more_btn_vdo, 2);
                            break;
                        case 4:
                            ph_more_btn_wrd++;
                            get_cl_Photo(ph_more_btn_wrd, 4);
                            break;
                    }
                };
                var pa_idx = "ph_more_type" + type;
                if (document.getElementById(pa_idx)) {
                    document.getElementById(pa_idx).innerHTML = "";
                }
                more_div.innerHTML = "<div class='pic44  bgc9 AC ofh' id='more_btn_img" + type + "'>" +
                    "<img class='A41  bgc8 P2M' src='../images/icon/more.png' >" +
                    '</div>';
                switch (type) {
                    case 1:
                        _wd.insertAfter(more_div, ph_img);
                        break;
                    case 2:
                        _wd.insertAfter(more_div, ph_video);
                        break;
                    case 4:
                        _wd.insertAfter(more_div, ph_word);
                        break;
                }
            } else {
                var pa_id = "ph_more_type" + type;
                if (document.getElementById(pa_id)) {
                    var more_img = "more_btn_img" + type;
                    if (document.getElementById(more_img)) {
                        document.getElementById(pa_id).removeChild(document.getElementById(more_img));
                    }
                }
            }
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " FL ML class_files";
                div.id = "ph_" + v.id;
                div.onclick = function () {
                    addPhotos(v);
                };
                var imgHtml = "";
                switch (type) {
                    case 1:
                        imgSrc = "../images/icon/null_pic.png";
                        imgHtml = '<img class="W11 P1M H11 OFC"  src="' + imgSrc + '" alt="" onerror="_wd.noFind_Pic(this)">';
                        break;
                    case 2:
                        imgSrc = "../images/icon/null_video.png";
                        imgHtml =
                            '<img class="W11 P1M H11 OFC"  src="' + imgSrc + '" alt="" onerror="_wd.noFind_Pic(this)">';
                        break;
                    case 4:
                        imgSrc = "../images/icon/null_flw.png";
                        imgHtml = '<img class="W11 P1M H11 OFC"  src="' + imgSrc + '" alt="" onerror="_wd.noFind_Pic(this)">';
                        break;
                }
                div.innerHTML = '<div class="pic44  bgc9 AC ofh">' + imgHtml +
                    '</div>' +
                    '<div class="F2 ellips A41 PB1M AC color8 " data-id="cl_ph_name">' + v.name + '</div>';
                switch (type) {
                    case 1:
                        ph_img.appendChild(div);
                        break;
                    case 2:
                        ph_video.appendChild(div);
                        break;
                    case 4:
                        ph_word.appendChild(div);
                        break;
                }
                var imgurl = "";
                var para = {
                    token: _token,
                    userguid: _userguid,
                    cid: id,
                    gid: v.id,
                    page: 1,
                    pagesize: 1
                };
                _wd.ajax_formdata(url + "/record/queryByGid.do", true, para, function (msg) {
                    if (m_Error(msg, "获取每个文件夹第一张图片")) {
                        var p = JSON.parse(msg);
                        var img = div.querySelector("img");
                        imgurl = p.logoPath + s_guid + "/" + id + "/";
                        if (p.message.length > 0 && type === 1) {//相册中含有图片的使用相册首张作为封面
                            img.classList.remove("P1M");
                            img.src = imgurl + p.message[0].src;
                            // console.log(img.src);
                        }
                        // else if (p.message.length > 0 && type === 2){
                        //     img.classList.remove("P1M");
                        //     getVideoBlob(imgurl + p.message[0].src,function (s) {
                        //         img.src = s;
                        //     });
                        //
                        // }
                    }
                }, function (msg) {
                    _wd.info("错误！请重新登录！" + msg, "bgc24");
                });
            });
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}


function ph_type_list(type) {
    switch (type) {
        case 1:
            return "相片";
        case 2:
            return "视频";
        case 4:
            return "文件";
    }
}

//新建相册页面
function newPhoto(type) {
    if (flagCheck === 2) {
        var cont = document.getElementById("ph_new");
        cont.innerHTML = "";
        var h_tag = "";
        switch (type) {
            case 1:
                h_tag = "新建相册";
                break;
            case 2:
                h_tag = "新建视频集";
                break;
            case 4:
                h_tag = "新建文件夹";
                break;
        }
        var in_place = h_tag.substring(2, h_tag.length);
        var div = document.createElement("div");
        div.className = "W11";
        div.innerHTML = '      <div class="top0 H W11 AC bgct1 ffHT">' + h_tag +
            '            <div class="FL B4M H4M F2" onclick="_wd.hide(ph_new)">取消</div>' +
            '            <div class="FR B4M H4M F2 color8" onclick=""></div>' +
            '        </div>' +
            '        <div class="bgc10 W11 P1M AC">' +
            '            <input type="text" id="folder_name" class="AL H5M W11 F4  color8 bordBD1" placeholder="填写' + in_place + '名称"/>' +
            '<textarea id="folder_memo" class="W11 color8  ALP  bordBD1 ffWRYH " rows="5"  style="resize:none" placeholder="' + in_place + '描述（非必填）" ></textarea>' +
            // '            <input type="text" id="folder_memo" class="AL H3M W11 F2 italic color8 bordBD1" placeholder="' + in_place + '描述（非必填）"/>' +
            '            <div class="MT2 W54 MA AC bgcff rad03e P05M F3 color1 " onclick="addFolder(' + type + ')">完成创建</div>' +
            '        </div>';
        cont.appendChild(div);
        // dais.toggle("ph_new", 1);
        _wd.show("ph_new");
    } else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
}

//添加相册接口
function addFolder(type) {
    var fol_name = document.getElementById("folder_name").value;
    var folder_memo = document.getElementById("folder_memo").value;
    var para = {
        json: {
            sid: s_guid,
            cid: id,
            phone: _phone,
            type: type,
            name: fol_name,
            memo: folder_memo,
            date: new Date().getTime()
        },
        token: _token,
        userguid: _userguid,
    };
    _wd.ajax_formdata(url + "/recordGroup/insert.do", true, para, function (msg) {
        if (m_Error(msg, "创建文件夹")) {
            var p = JSON.parse(msg).result;
            console.log(JSON.parse(msg));
            if (p > 0) {
                _wd.hide("ph_new");
                // dais.toggle("ph_new", 0);
                toMenu("cl_photo");
            } else {
                console.log(msg);
                _wd.info("创建失败！", "bgc24");
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}


function ph_addMore($id, $page, $type) {
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        gid: $id,
        page: $page,
        pagesize: 18
    };
    _wd.ajax_formdata(url + "/record/queryByGid.do", true, para, function (msg) {
        if (m_Error(msg, "加载更多文件夹")) {
            var imgurl = JSON.parse(msg).logoPath + s_guid + "/" + id + "/";
            var p = JSON.parse(msg).message;
            console.log(p);
            // document.getElementById("builder").classList.remove("none");
            var ph_img = document.getElementById("ph_list");
            var ph_more = document.getElementById("ph_addMore");
            if (p.length === 0) {
                ph_more.innerText = "没有内容了";
            }
            else {
                if (p.length < 18) {
                    ph_more.innerText = "没有内容了";
                }
                p.forEach(function (v) {
                    var div = document.createElement("div");
                    switch ($type) {
                        case 1:
                            div.className = "pic33 FL ML ofh AC";
                            div.innerHTML =
                                '<img class=" W11 H11 P05M OFC"  src="' + imgurl + v.src + '" alt="" onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this)">';
                            break;
                        case 2:
                            // getVideoBlob( imgurl + v.src,function (s) {
                            div.className = "AC H24M MB ";
                            div.innerHTML = '<div class="W11"><div class="W11 AL P1M ellips">' + v.name + '</div>' +
                                // '<video class="W11 H21M " controls="controls"  preload="none" >' +
                                // ' <source src="' + imgurl + v.src + '">' +
                                // '<source src="video/xxx.mp4" type="video/mp4">'+
                                // '</video>' +

                                '  <video id="my-player" class="video-js W11 H21M" controls preload="none" poster="" data-setup=\'{}\'>' +
                                ' <source src="' + imgurl + v.src + '" type="video/mp4">' +
                                '<p class="vjs-no-js">' +
                                'To view this video please enable JavaScript, and consider upgrading to a web browser that' +
                                '<a href="http://videojs.com/html5-video-support/" target="_blank">' +
                                'supports HTML5 video' +
                                '</a>' +
                                '</p>' +
                                '</video>' +

                                '</div>';
                            // });
                            break;
                        case 4:
                            div.className = "FL  W11 ellips bordBD1 P1M F2";
                            div.innerHTML =
                                ' <li class=" W11 H2M F3" ><span class="W65 FL AL ellips" >' + v.name + '</span>' +
                                '<a class="W61 FR H2M B2M" href="' + imgurl + v.src + '" download="' + v.name + '">' +
                                '<img class="W61 FR H2M B2M" src="../images/icon/download.png"/></a></li> ' +
                                '<li class="W11 F2 AL color8"> ' +
                                '<div class="FL">上传者：' + v.phone + '</div>' +
                                '<div class="FR">日期：' + _wd.crtTimeFtt(v.date) + '</div>' +
                                '</li>';
                            break;
                    }
                    ph_img.appendChild(div);
                });
            }
            _wd.clear(ph_img);
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

/*
* 点击相册照片全屏显示
* */
function toFull_img(pic) {
    if (pic.classList.contains("P2M")) {
        _wd.info("图片加载失败！", "bgc24");
    } else {
        var s = document.getElementById("s_select");
        s.innerHTML = "";
        s.classList.remove("none");
        _wd.show(s);
        var div = document.createElement("div");
        div.className = "fix   W11 CHmax  ofa";
        div.id = "full_img";
        div.innerHTML = '<img src="' + pic.src + '" style="width: 100%;height: 100%">';
        s.appendChild(div);
        s.onclick = function () {
            _wd.hide(s);
        };
        var img = document.querySelector("#full_img>img");
        if (CH - img.clientHeight > 0) {
            img.style.paddingTop = (CH - img.clientHeight) / 2 + "px";
        }
    }
}

function cb_video(msg) {
    console.log(msg);
    var j = msg;
    if (j && j.result >= 0) {
        toMenu("cl_photo");
    } else {

    }
}

function addPhotos(o) {

    console.log(o);
    var record_id = o.id;
    var record_name = o.name;
    if (record_name.length > 10) {
        record_name = record_name.substring(0, 10) + "…";
    }
    var cont = document.getElementById("re_photo");
    cont.innerHTML = "";
    var div = document.createElement("div");
    div.className = "index100 absolute top0 left0  bgc9 W11 CHmin ofh";
    div.id = "detail_ph";
    var upLoad = "";
    if (o.type === 2) {
        upLoad = '<div  class="MA rad03e bgcff P05M C4M AC relative color1" id="add_photo_video" >上传视频</div>';
    } else {
        upLoad = '<div  class="MA rad03e bgcff P05M C4M AC relative color1" id="add_photo" >上传' + ph_type_list(o.type) +
            '</div>';
    }
    div.innerHTML = '  <div class="fix index100 top0 H bgct1 W11 AC ffHT " id="ph_name">' + record_name +
        '<div class="FL B4M H4M F2" id="ph_return_up"> <img  src="../images/icon/back_w.png" class="FL B4M H4M P1M" /></div>' +
        '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
        '</div>' +
        '<div class="bgc10 W11 MTH P1M">' +
        upLoad +
        '<input type="file" id="up_photo" multiple="multiple" accept="image/*" class="none" capture="camera" >' +
        '<div class="clear">' +
        '</div></div>' +
        '<div class=" W11 color8 P05M F2 bgc10 AL PL2M" id="ph_title">' + o.memo +
        '</div>' +
        '<div class="W11 bgc10" id="ph_list">' +
        '</div>' +
        '<div class="W11 H4M AC color8 F2 PT1M" id="ph_addMore">点击加载更多...</div>';
    if (o.type === 2) {
        div.querySelector("#add_photo_video").onclick = function () {
            _wit.postmessage({
                functionname: 'getresourcefiles',
                witparams: {
                    type: 2,
                    json: JSON.stringify(o)
                },
                callback: 'cb_video'
            });
        };
    }
    cont.appendChild(div);
    _wd.show(cont);
    document.getElementById("photo").classList.add("CHNH");
    document.getElementById("ph_return_up").onclick = function () {
        _wd.deleteChild("re_photo", "detail_ph");
        document.getElementById("photo").classList.remove("CHNH");
    };
    if (o.type === 2) {
        document.getElementById("up_photo").setAttribute("accept", "video/*");
    }
    if (o.type === 4) {
        document.getElementById("up_photo").removeAttribute("accept");
    }
    var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
    var isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
    if (isIos) {
        document.getElementById("up_photo").removeAttribute("capture");
    }
    ph_addMore(record_id, 1, o.type);
    var ph_more = document.getElementById("ph_addMore");
    var ph_more_number = 1;
    ph_more.onclick = function () {
        ph_more_number++;
        ph_addMore(record_id, ph_more_number, o.type);
    };
    if (o.type !== 2) {
        var input = document.getElementById("up_photo");
        input.value = "";
        var result;
        var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
        var fd;  //FormData方式发送请求
        var oSelect = document.getElementById("add_photo");
        // var oAdd = document.getElementById("add");
        var oInput = document.getElementById("up_photo");
        if (typeof FileReader === 'undefined') {
            // alert("抱歉，你的浏览器不支持 FileReader");
            input.setAttribute('disabled', 'disabled');
        } else {
            input.addEventListener('change', readFile, false);
        }

        function readFile() {
            fd = new FormData();
            var iLen = this.files.length;
            var index = 0;
            var cont = document.getElementById("ph_upload");
            // cont.innerHTML = "";
            var div = document.createElement("div");
            div.id = "ph_up_list" + record_id;
            div.className = "index100 absolute top0 left0  bgc10 W11 CHmin";
            div.innerHTML = '  <div class="fix index100 top0 H bgct1 W11 AC ffHT ">' +
                '<div class="FL B4M H4M F2" id="up_return">取消</div>' +
                '<div class="FR B4M H4M F2  " id="ph_upload_btn" >上传</div>' +
                '</div>' +
                // '<div class="H4M AC W11  colorA MTH" onclick="add_up_morePic()">添加照片</div>' +
                // '<div class="F2 AC W11 MT colorA" id="dbclick_delete"></div>' +
                '<div class="bgc10 W11 P05M MTH" id="ch_list">' +
                '</div>';
            cont.appendChild(div);
            _wd.show(cont);
            document.getElementById("detail_ph").classList.add("H1M");
            document.getElementById("up_return").onclick = function () {
                _wd.deleteChild("ph_upload", "ph_up_list" + record_id);
                document.getElementById("detail_ph").classList.remove("H1M");
            };
            _wd.show("ph_upload");
            // dais.toggle("ph_upload", 1);
            for (var i = 0; i < iLen; i++) {
                var reader = new FileReader();
                reader.index = i;
                fd.append("files", this.files[i]);
                var file_name = this.files[i].name;
                var file_size = this.files[i].size;
                var file_type = this.files[i].type;
                if (file_type === "") {
                    file_type = /\.[^.]+$/.exec(file_name);
                }
                console.log(file_name, file_type);
                if (o.type === 1) {
                    reader.readAsDataURL(this.files[i]);  //转成base64
                    reader.fileName = this.files[i].name;
                    reader.onload = function () {
                        var imgMsg = {
                            name: this.fileName,//获取文件名
                            base64: this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        };
                        dataArr.push(imgMsg);
                        result = ' <img class=" W11 H11 P05M OFC" src="' + this.result + '" onclick="toFull_img(this)"/> ';
                        // '<img class=" index99 relative H1M B1M topM" src="../images/icon/delete.png" id="delete_ph' + imgMsg.name + '" alt="">' +
                        var div1 = document.createElement('div');
                        // div1.index = index;
                        div1.innerHTML = result;
                        div1.className = "FL M05 pic33 ofh";
                        // div1.id = "delete_p" + imgMsg.name;
                        document.getElementById("ch_list").appendChild(div1);
                    }
                }
                /*    else if (o.type === 2) {
                        var videoSize = 0;
                        if (this.files[i].size > 1024 * 1024) {
                            videoSize = (Math.round(this.files[i].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                        }
                        else {
                            videoSize = (Math.round(this.files[i].size * 100 / 1024) / 100).toString() + 'KB';
                        }
                        result = ' <li class=" W11" >' + this.files[i].name + '</li> ' +
                            '<li class="W11 F2 AL color8">' + videoSize + '</li>';
                        var div2 = document.createElement('div');
                        div2.innerHTML = result;
                        div2.className = "FL  W11 ellips bordBD1";
                        document.getElementById("ch_list").appendChild(div2);
                    }*/
                else if (o.type === 4) {
                    var fileSize = 0;
                    if (this.files[i].size > 1024 * 1024) {
                        fileSize = (Math.round(this.files[i].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                    }
                    else {
                        fileSize = (Math.round(this.files[i].size * 100 / 1024) / 100).toString() + 'KB';
                    }
                    result = ' <li class=" W11" >' + this.files[i].name + '</li> ' +
                        '<li class="W11 F2 AL color8">' + fileSize + '</li>';
                    var div3 = document.createElement('div');
                    div3.innerHTML = result;
                    div3.className = "FL  W11 ellips bordBD1";
                    document.getElementById("ch_list").appendChild(div3);
                }
            }
            document.getElementById("ph_upload_btn").onclick = function () {

                if (file_size < 20971521) {
                    fd.append("json", JSON.stringify({
                        cid: id,
                        sid: s_guid,
                        gid: record_id,
                        phone: _phone,
                        type: o.type,
                        name: file_name,
                        src: "",
                        memo: file_type,
                        date: new Date().getTime(),
                        replay: ""
                    }));
                    fd.append("token", _token);
                    fd.append("userguid", _userguid);
                    console.log(fd);
                    _wd.ajax_formdata(url + "/record/insert.do", true, fd, function (msg) {
                        // console.log(msg);
                        // return;
                        if (m_Error(msg, "上传")) {
                            _wd.hide("re_photo");
                            _wd.deleteChild("ph_upload", "ph_up_list" + record_id);
                            toMenu("cl_photo");
                            document.getElementById("photo").classList.remove("CHNH");
                        }
                    }, function (msg) {
                        _wd.info("无法上传，请重试！" + msg, "bgc24");
                    });
                } else {
                    _wd.info("请上传小于20M的文件！", "bgc24");
                }

            }
        }

        oSelect.onclick = function () {
            oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
            //清空已选图片
            dataArr = [];
            index = 0;
            oInput.click();
        };
    }

}



