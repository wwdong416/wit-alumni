/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
 */
var url = "http://121.43.233.185/alumnicloudweb";
// var url = "http://192.168.10.13:8080";
//获取学校id
var s_guid = _wd.getUrl_sid().sid;
//获取班级id
var id = _wd.getUrl_sid().cid;

var _userguid, _token, _phone, _editor, _schoolName, _className;
//flagCheck表示成员状态  0：未加入班级 1：加入班级，审核状态 2：审核通过
var flagCheck = 0;

var myclass, myObject, myPrivacy, myPersocial, myEduJson;

var base64img = "";

console.log(s_guid, id);

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

//load返回触发事件
function callback(msg) {
    var info = msg.perinfo;
    //获取经历和个人信息
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

//没有加入班级的显示
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

//加入班级没有通过验证时的显示
function noChecked() {
    var cont = document.getElementById("addBtn");
    cont.classList.remove("none");
    cont.innerHTML = "";
    document.getElementById("index_tip").innerText = "";
    var div = document.createElement("div");
    div.className = "fix topH W11 MA rad03e F3 bgc104";
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
    var p = document.getElementById("new_page");
    p.setAttribute("data-hash", "classMsg");
    p.innerHTML = "";
    var div = document.createElement("div");
    div.className = "fix W11 CHmax bgc9  ofa";
    div.innerHTML = '<div class="fix top0 H W11 AC bgc10 ffHT">班级信息' +
        '    <div  class="FL B4M H4M F2" onclick="mob_hide(\'classMsg\')">' +
        '<img src="../images/icon/back_b.png" class="FL B4M H4M  P1M" > </div>' +
        '    <div  class="FR B4M H4M F2 color8">' +
        '</div>' +
        '</div>' +
        '<div class=" W11 F3 bgc10 MTH">' +
        '<div class="H21M FL W11"><img src="../images/class.jpg" alt="" class="W11 OFC H21M"  onclick="toFull_img(this)"></div>' +
        '<div class="W11 FL MT2 M F4 bold ellips">' + _schoolName + sdate + "届" + _className + '</div>' +
        '<div class="FL W11  H ">' +
        '<div class="FL W31 AL PL1M">学校</div>' +
        '<div  class="FR W32 AR  PR1M color8 ellips">' + _schoolName + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="FL W11  H ">' +
        '<div class="FL W31 AL PL1M">年届</div>' +
        '<div  class="FR W32 AR PR1M color8 ellips">' + sdate + '届</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="FL W11  H ">' +
        '<div class="FL W31 AL PL1M">班级</div>' +
        '<div  class="FR W32 AR PR1M color8 ellips">' + _className + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="FL W11 H ">' +
        '<div class="FL W31 AL PL1M">班主任</div>' +
        '<div  class="FR W32 AR PR1M color8 ellips">' + master + '</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '<div class="clear"></div>' +
        '</div>';
    p.appendChild(div);
    _wd.show(p);
    mob_show("classMsg");
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
        var p = document.getElementById("re_notice");
        p.innerHTML = "";
        p.setAttribute("data-hash", "reNotice");
        var div = document.createElement("div");
        div.className = " W11 index99 fix bgc9 CH";
        div.innerHTML = '<div class="top0 H W11 AC ffHT bgc10 ">发布通知' +
            '    <div  class="FL B4M H4M F2" onclick="mob_hide(\'reNotice\')"> 取消</div>' +
            '    <div  class="FR B4M H4M F2 color8" id="n_release" onclick="in_notice()"> 发布</div>' +
            '</div>' +
            '<div class="bgc10 W11 AL">' +
            '<div  class="FL W11 F3 H4M LH3   bordBD1  bgcddc  color876 bord_select AC" id="n_tag" title="-1" data-t="radio" data-s="班务,探望,游玩,喜报,哀悼" />选择类型标签</div>' +
            '<input type="text" class=" FL H4M W11 F3 ALP ffWRYH bordBD1 " id="re_title" placeholder="输入标题"/>' +
            '<textarea class=" FL  W11  ALP F3 bordBD1 ffWRYH " rows="8"  style="resize:none"  id="re_content" placeholder="发布我的内容......" ></textarea>' +
            '<div class="W11 FL AR F1 colorA PR1M">最多输入250个字</div>' +
            '</div>';
        document.getElementById("re_notice").appendChild(div);
        _wd.show("re_notice");
        mob_show('reNotice');
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
            console.log(JSON.parse(msg));
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
            pagesize: 10
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
            pagesize: 10
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
    console.log(p);
    var more_notice = document.getElementById("more_notice");
    if (page === 1 && p.length === 0) {
        more_notice.innerText = "点击发布通知即可发布班级通知";
    } else {
        if (p.length === 10) {
            more_notice.innerHTML = '<div onclick="getNoticeList(' + (page + 1) + ')">点击加载更多...</div>';
        } else {
            more_notice.innerText = "已经没有更多了！";
        }
    }
    p.forEach(function (v) {
        var div = document.createElement("div");
        div.className = " W11 AL";
        var n_detail = v.notice;
        if (n_detail.length === 0 || typeof(n_detail) === "undefined") {
            n_detail = "";
        }
        div.innerHTML = '  <div class="W11 P1M bordBD1">' +
            '<div onclick="get_notice_details(' + v.id + ')">' +
            '<div class="thicker F3"><b class="colorO F3 italic MR">' + tag_number++ + ' </b> ' + v.title + '</div>' +
            '<div class="W11 F2 MT05 colorA">' +
            '<div class="FL  W21 "> 发布人：' + v.editor + '</div>' +
            '<div class="FR  AR W21 ">' + _wd.crtTimeFtt(v.date) + '</div>' +
            '<div class="clear"></div>' +
            '</div></div>' +
            '<div class="FL P1M none MT05 W11  rad03e color8 bgcaf5" id="notice_' + v.id + '">' +
            '<div class="W11 FL F3">' + n_detail + '</div>' +
            '<div class="F2 FR  color1 PL1M PR1M MT rad03e bgc104" onclick="replay_id(' + v.id + ')">回复</div>' +
            '<div class="W11 FL">' +
            '<div class="FL AC replay_img_line"></div>' +
            '</div>' +
            '<div class="replay_list"></div>' +
            '</div>' +
            '<div class="clear"></div>' +

            '</div>';
        document.getElementById("cont_notice").appendChild(div);
    });
}

function get_notice_details(id) {
    var div_id = "notice_" + id;
    _wd.Show_Hidden(div_id);
    var p_div = document.querySelector("#" + div_id);
    p_div.querySelector(".replay_list").innerHTML = "";
    var para = {
        token: _token,
        userguid: _userguid,
        replay: id,
        page: 1,
        pagesize: 20
    };
    _wd.ajax_formdata(url + "/notice/queryByReplay.do", true, para, function (msg) {
        console.log(JSON.parse(msg));
        if (m_Error(msg, "加载回复通知")) {
            var j = JSON.parse(msg);
            var p = j.message;
            if (p.length > 0) {
                p_div.querySelector(".replay_img_line").innerHTML = '<img class="W32" src="../images/icon/lpl.png" alt="">';
                // var img = p_div.childNodes;
                // p_div.removeChild(img[2]);
            }
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = "FL W11 AL MT";
                div.innerHTML = '<div class="W11 word_break"><span class="active" onclick="classmatesMember(' + v.phone + ')">' + v.editor + ' : </span>' + v.notice + '</div>';
                p_div.querySelector(".replay_list").appendChild(div);
            })
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

function replay_id(re_id) {
    console.log(re_id);
    if (flagCheck === 2) {
        document.getElementById("keyboard").innerHTML = "";
        var div = document.createElement("div");
        div.className = "W11 ffWRYH CH fix index999 top0 bgca8b";
        div.innerHTML = ' <div class="CW CH  fix ofa " onclick="_wd.hide(this.parentNode);"></div>' +
            '<div class="flexbox relative W11 ">' +
            '<textarea id="notice_replay"   style="overflow: hidden"  placeholder="回复" class="FL C8M HN4M P05M M05 F3 W11" autofocus="autofocus"></textarea>  ' +
            '<div class="B6M P05M FR M05 AC bgbody" id="save_replay">发送</div></div> ';
        document.getElementById("keyboard").appendChild(div);
        _wd.show("keyboard");
        var text = document.getElementById("notice_replay");
        autoTextarea(text);// 调用
        document.getElementById("save_replay").onclick = function () {
            var notice = document.getElementById("notice_replay").value;
            if (notice.length < 250) {
                if (notice.charCodeAt(0) > 25106) {
                    _wd.info("回复内容存在非法字符，请重新输入！", "bgc5e");
                } else {
                    var para = {
                        json: {
                            sid: s_guid,
                            cid: id,
                            phone: _phone,
                            type: 9,
                            editor: _editor,
                            title: "",
                            notice: notice,
                            date: new Date().getTime(),
                            replay: re_id
                        },
                        token: _token,
                        userguid: _userguid,
                    };
                    _wd.ajax_formdata(url + "/notice/insert.do", true, para, function (msg) {
                        console.log(JSON.parse(msg));
                        if (m_Error(msg, "发布通知")) {
                            var p = JSON.parse(msg).result;
                            if (p === 1) {
                                _wd.hide("keyboard");
                                cl_notice();
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
            } else {
                _wd.info("回复内容不能超过250个字！", "bgc5e");
            }

        }
    } else {
        _wd.info("加入班级后才能发布通知！", "bgc5e");
    }
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
        cont += "<img class='A" + value_w + "1 rad03e ML AL' src='../images/icon/classmatespic.png' onerror=\"this.src ='../images/port03.jpg' \" id=c_headimg" + i + " onclick='change_info_logo(this)'>"
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

    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        page: 1,
        pagesize: 500
    };
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg, "获取班级成员")) {
            console.log(JSON.parse(msg));
            var p = JSON.parse(msg).message;
            var logoPath = JSON.parse(msg).logoPath;
            toMemberList(p, logoPath);
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });

    _wit.postmessage({
        functionname: "alumniMemberQuery",
        witparams: {cid: id},
        callbackparam: id,
        callback: "toAlumniMember"
    });      //获取本地通讯录
}

function toAlumniMember(j, p) {
    console.log("alumniMemberQuery", j);
    if (j.result >= 0) {
        toMember(p, j.message || []);

    } //else toMember(p);        //本地失败，直接生成成员列表
}            //
function toMember(cid, local) {
    const para = {
        token: _token,
        userguid: _userguid,
        page: 1,
        pagesize: 200,
        cid: cid
    };
//        console.log(para);
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        const j = JSON.parse(msg);
//            console.log(j, local);
        if (j.result >= 0 && j.message) {
            const l = j.message.filter(function (v) {
                return local.findIndex(function (vv) {
                    return v.phone === vv.phone;
                }) < 0;
            });
            console.log("newMemberList:", l);
            if (l.length > 0) {
                toLocal(l);
            }
        }
    });
}      //成员 已有成员填充
function toLocal(l) {
    console.log(l);
    const el = l.map(function (v) {
        v.id = 0;
        v.userguid = _userguid;
        return {
            entity: v,
            logo: ""
        };
    });
    _wit.postmessage({
        functionname: "alumniMemberInsert",
        witparams: {entity: JSON.stringify(el)},
        callback: "toInsert"
    });
}

function toInsert(j) {
    console.log("alumniMemberInsert:", j);
}

function toMemberList(p, logoPath) {
    var cont = document.getElementById("phone_list");
    cont.innerHTML = "";
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
        var isPhoneShow = "";
        if (flagCheck === 2) {
            isPhoneShow = '<div class="color8 ML ellips B11M FL"> ' + (v.phone ? "\u260E " : "") + v.phone + '</div>';
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
            isPhoneShow +
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

function getMember(t, d) {
    var tip = document.getElementById("member_list");
    // tip.innerText = "";
    console.log(tip);
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        page: 1,
        pagesize: 500
    };
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg, "获取班级成员")) {
            var p = JSON.parse(msg).message;
            var logoPath = JSON.parse(msg).logoPath;
            var s = d.title;
            if (t === 1) {
                if (s === "0") {
                    tip.innerText = "排序方式：按加入时间排序(正序)"
                    var l1 = p.reverse();
                    console.log(s);
                    toMemberList(l1, logoPath);
                    d.title = "1";

                } else {
                    tip.innerText = "排序方式：按加入时间排序(倒序)"
                    toMemberList(p, logoPath);
                    d.title = "0";

                }
            } else if (t === 2) {
                console.log(s);
                if (s === "0") {
                    tip.innerText = "排序方式：按公司名称排序(倒序)"
                    var l = p.slice(0);
                    l.sort(function (c, d) {
                        var i = 0, a = pinyin.getCamelChars(c.comp).toUpperCase(),
                            b = pinyin.getCamelChars(d.comp).toUpperCase(),
                            na = isNaN(a.charCodeAt(i)), nb = isNaN(b.charCodeAt(i));
                        return ((nb ? 0 : b.charCodeAt(i)) - (na ? 0 : a.charCodeAt(i)));
                    });
                    toMemberList(l, logoPath);
                    d.title = "1";

                } else {
                    tip.innerText = "排序方式：按公司名称排序(正序)"
                    var l = p.slice(0);
                    l.sort(function (c, d) {
                        var i = 0, a = pinyin.getCamelChars(c.comp).toUpperCase(),
                            b = pinyin.getCamelChars(d.comp).toUpperCase(),
                            na = isNaN(a.charCodeAt(i)), nb = isNaN(b.charCodeAt(i));
                        return ((na ? 0 : a.charCodeAt(i)) - (nb ? 0 : b.charCodeAt(i)));
                    });
                    toMemberList(l, logoPath);
                    d.title = "0";

                }

            } else if (t === 3) {
                if (s === "0") {
                    tip.innerText = "排序方式：按姓名排序(倒序)"
                    var l = p.slice(0);
                    l.sort(function (c, d) {
                        var i = 0, a = pinyin.getCamelChars(c.name).toUpperCase(),
                            b = pinyin.getCamelChars(d.name).toUpperCase(),
                            na = isNaN(a.charCodeAt(i)), nb = isNaN(b.charCodeAt(i));
                        return ((nb ? 0 : b.charCodeAt(i)) - (na ? 0 : a.charCodeAt(i)));
                    });
                    toMemberList(l, logoPath);
                    d.title = "1";

                } else {
                    tip.innerText = "排序方式：按姓名排序(正序)"
                    var l = p.slice(0);
                    l.sort(function (c, d) {
                        var i = 0, a = pinyin.getCamelChars(c.name).toUpperCase(),
                            b = pinyin.getCamelChars(d.name).toUpperCase(),
                            na = isNaN(a.charCodeAt(i)), nb = isNaN(b.charCodeAt(i));
                        return ((na ? 0 : a.charCodeAt(i)) - (nb ? 0 : b.charCodeAt(i)));
                    });
                    toMemberList(l, logoPath);
                    d.title = "0";

                }
            }

        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
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
    console.log(p);
    var cont = document.getElementById("classmates_page");
    cont.innerHTML = "";
    cont.setAttribute("data-hash", "classmatesPage");
    var div = document.createElement("div");
    div.className = "fix top0 F3  W11 CHmax bgc9 ofa";
    var msgHtml = '<div class="fix index100 top0 H bgc10 W11 AC ffHT ">' +
        '<div class="FL B4M H4M F2" id="exit_c_page" onclick="mob_hide(\'classmatesPage\');"> <img  src=\'../images/icon/back_b.png\' class="FL B4M H4M P1M" /></div>' +
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
                '<div class="H1M bgc9 W11 bordBDe6"></div>' +
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
                '                <div  class="W32 FR AR color8 ellips">' + p[0].birthday +
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
                '                <div  class="W32 FR AR P1M color8 ">' + addr +
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
    mob_show('classmatesPage');
}

var ph_more_btn_img = 1;//照片页数
var ph_more_btn_vdo = 1;//视频页数
var ph_more_btn_wrd = 1;//文件页数

//档案
function cl_photo() {
    if (flagCheck === 2) {
        getGra_ph();
        getPh_time();
        //添加毕业照小白点
    }
    else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
}

function getLately(d) {
    d.classList.add("bgc4");
    getPh_time();
}

function axis_time(d, obj) {
    // document.querySelector("#time_lately").classList.remove("bgc4");
    var div = document.getElementById(obj);
    if (div.className.indexOf("none") > -1) {
        d.classList.add("bgc4");
        div.classList.remove("none");
    } else {
        div.classList.add("none");
        d.classList.remove("bgc4");
    }
}

function getPh_Time() {
    document.querySelector("#axis_time").innerHTML = "";
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var mon = myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    console.log(year + "" + mon);
    for (var i = 0; i < 2; i++) {
        var div = document.createElement("div");
        div.className = "MT";
        div.innerHTML = '  <div class=" bdL P05M bgc4  bd_rad_r " onclick="axis_time(this,\'date_' + (year - i) + '\')">' + (year - i) + '</div>' +
            '                <div id="date_' + (year - i) + '" class="">' +
            '                </div>' +
            '            </div>';
        document.querySelector("#axis_time").appendChild(div);
        if (i === 0) {
            for (var j = 0; j < mon + 1; j++) {
                var div1 = document.createElement("div");
                div1.className = "bdL P05M month_axis";
                div1.setAttribute("data-id", "year" + (year - i));
                div1.innerHTML = (j + 1) + "月";
                document.querySelector("#date_" + year).appendChild(div1);
            }
        } else {
            for (var k = 0; k < 12; k++) {
                var div2 = document.createElement("div");
                div2.className = "bdL P05M month_axis";
                div2.setAttribute("data-id", "year" + (year - i));
                div2.innerHTML = (k + 1) + "月";
                document.querySelector("#date_" + (year - i)).appendChild(div2);
            }
        }
    }

}

function getPh_folder() {
    ph_more_btn_img = 1;
    ph_more_btn_vdo = 1;
    ph_more_btn_wrd = 1;
    var ph_img = document.getElementById("ph_img");
    ph_img.innerHTML = "";
    var ph_video = document.getElementById("ph_video");
    ph_video.innerHTML = "";
    var ph_word = document.getElementById("ph_word");
    ph_word.innerHTML = "";
    if (flagCheck === 2) {
        get_cl_Photo(ph_more_btn_img, 1);//获取相册
        get_cl_Photo(ph_more_btn_vdo, 2);//获取视频文件夹
        get_cl_Photo(ph_more_btn_wrd, 4);//获取文件
    }
    else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }

    var btn_time = document.getElementById("a_time");
    btn_time.classList.remove("active");
    var btn_folder = document.getElementById("a_folder");
    btn_folder.classList.add("active");
    var div_folder = document.getElementById("ph_folder");
    div_folder.className = "W11 FL";
    var div_time = document.getElementById("ph_time");
    div_time.className = "W11 FL none";
    dy_touch_down();
}


function getPh_time() {
    var btn_time = document.getElementById("a_time");
    btn_time.classList.add("active");
    var btn_folder = document.getElementById("a_folder");
    btn_folder.classList.remove("active");
    var div_folder = document.getElementById("ph_folder");
    div_folder.className = "W11 FL none";
    var div_time = document.getElementById("ph_time");
    div_time.className = "W11 FL ";
    var dy_photo = document.querySelector("#dy_ph_time");
    dy_photo.innerHTML = "";
    if (flagCheck === 2) {
        getPhoto_time(1);
        getPh_Time();
        getMon_axis();
    }
    else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }

    // getMorePH_time(1);
    //声明时间控件，回调选择的时间
    wit_date.call_back = function (a, b) {
        console.log(b.std);
        var year = _wd.getCut("-", 0, b.std);
        var month = _wd.getCut("-", 1, b.std);
        getMorePH_time(1, year, month);
    };
    console.log(dy_photo);
    // EventUtil.listenTouchDirection(dy_photo, true, dy_touch_up, "", dy_touch_down, "");
    dy_touch_up();
}

function dy_touch_up() {
    // console.log("up");
    var byz = document.getElementById("ph_byz");
    byz.classList.add("none");
    var ph_null = document.getElementById("ph_null");
    ph_null.className = "H4M";
    var ph_axis = document.getElementById("ph_axis");
    ph_axis.classList.add("CHN17M");
    ph_axis.classList.remove("H36M");
    var ph_nav = document.getElementById("ph_nav");
    ph_nav.classList.remove("top22M")
}

function dy_touch_down() {
    // console.log("down");
    var byz = document.getElementById("ph_byz");
    byz.classList.remove("none");
    var ph_null = document.getElementById("ph_null");
    ph_null.className = "H24M";
    var ph_axis = document.getElementById("ph_axis");
    ph_axis.classList.remove("CHN17M");
    ph_axis.classList.add("H36M");
    var ph_nav = document.getElementById("ph_nav");
    ph_nav.classList.add("top22M")
}

function newRecord($o) {
    console.log($o);
    if (flagCheck === 2) {
        var p_type = "-1", p_gid = "-1";
        if ($o) {
            p_type = $o.type;
            p_gid = $o.id;
        }
        var p = document.getElementById("new_page");
        p.innerHTML = "";
        p.setAttribute("data-hash", "newRecord");
        var div = document.createElement("div");
        div.className = " fix top0  W11 CHmax bgc9 ofa";
        div.innerHTML = '  <div class="fix top0 H bgc10 ffHT W11 AC ffHT ">上传档案' +
            '<div class="FL B4M H4M F2" onclick="mob_hide(\'newRecord\')"> <img  src="../images/icon/back_b.png" class="FL B4M H4M P1M" /></div>' +
            '<div class="FR B4M H4M F2 upload color8">上传</div>' +
            '</div>' +
            '<div class="FL MTH W11 H4M F3 bgcddc">' +
            '<div class="W31 P1M FL AC color876 bold upRecord" title=1>照片</div>' +
            '<div class="W31 P1M FL AC color876 bold upRecord" title=2>视频</div>' +
            '<div class="W31 P1M FL AC color876 bold upRecord" title=4>文件</div>' +
            '</div>' +
            '<div class="W11 FL">' +
            '<textarea class="W11 color8 F2 ALP   ffWRYH " id="ph_memo" rows="4"  style="resize:none" placeholder="说点什么..." ></textarea>' +
            '<div class="W11 H4M bgc10 P1M MT FL" onclick="_wd.Show_Hidden(\'list_folder_type\')">' +
            '<div class=" FL  F3 B10M" id="newR_choose_type">选择相册</div>' +
            '<b class="FR F2 color8 PR1M AR">&#62</b>' +
            '<div class="FR F3 B18M AR ellips color8 PR1M" id="choose_folder_name"></div>' +
            '</div>' +
            '<div class="W11 FL none bgc10 " id="list_folder_type" title="' + p_gid + '">' +
            '<div class="W11 H6M" id="add_newFolder" title="' + p_type + '">' +
            '<div class="FL B6M H6M ALP" ><img class="B6M H6M P05M" src="../images/icon/add_new.png" alt=""></div>' +
            '<div class="FL PL1M ML F3 color9f9" style="line-height: ' + 6 * M + 'px" id="newR_add_type">新建相册</div></div>' +
            '<div id="list_folder" class="W11"></div>' +
            '</div>' +
            '<div class="W11 FL MT" id="all_ph_folder"></div>' +
            '</div>';
        document.getElementById("new_page").appendChild(div);
        _wd.show("new_page");
        mob_show('newRecord');
        var btn_up = document.querySelectorAll(".upRecord"), dl = [];

        Array.prototype.forEach.call(btn_up, function (v) {
            v.onclick = function () {
                console.log(v);
                dl = [];
                document.getElementById("all_ph_folder").innerHTML = "";
                var menuname = document.getElementsByClassName("upRecord");
                for (var j = 0; j < menuname.length; j++) {
                    menuname[j].classList.remove("bgc8");
                }
                this.classList.add("bgc8");
                // document.querySelector("#choose_folder_name").innerHTML = "";
                var type = this.title;
                if (!$o) {
                    show_allFolder("list_folder", type);
                }
                document.querySelector("#add_newFolder").title = type;
                console.log(type);
                var h_tag = "相册";
                switch (type) {
                    case "1":
                        h_tag = "相册";
                        break;
                    case "2":
                        h_tag = "视频集";
                        break;
                    case "4":
                        h_tag = "文件夹";
                        break;
                }
                document.querySelector("#newR_choose_type").innerHTML = "选择" + h_tag;
                document.querySelector("#newR_add_type").innerHTML = "新建" + h_tag;
                var input = document.createElement("input");
                if (type === "1") {
                    input.accept = "image/*";
                } else if (type === "2") {
                    input.accept = "video/*";
                } else if (type === "4") {
                    input.accept = ".xls,.xlsx,.doc,.docx,.ppt,.pptx,.txt,.pdf";
                }
                input.type = "file";
                input.multiple = "multiple";
                console.log(input);
                input.onchange = function () {
                    console.log(this.files.length);
                    for (var l = 0; l < this.files.length; l++) {
                        var reader = new FileReader();
                        reader.onloadend = function (e) {
                            var div = document.createElement("div");
                            if (type === "1" || type === "5") {
                                var img = document.createElement("img");
                                img.src = e.srcElement.result;
                                img.className = " W11 H11 P05M OFC";
                                img.title = dl.length + 1;
                                img.onclick = function () {
                                    toFull_img(this)
                                };
                                div.className = "pic33 FL ML ofh AC relative";
                                div.innerHTML = "<img src=\"../images/icon/delete.png\" class=\"absolute top0 right0 B2M delete\"  alt=\"\">";
                                div.appendChild(img);
                                div.firstChild.onclick = function () {
                                    dl.splice(img.title - 1, 1);
                                    div.parentNode.removeChild(div);
                                    console.log(dl);
                                };
                                document.getElementById("all_ph_folder").appendChild(div);
                                dl.push(this);
                                console.log(dl);
                                if (dl.length > 0) {
                                    console.log(dl.length);
                                    document.querySelector("#new_page .upload").className = "FR B4M H4M F2 upload colorff"
                                }
                                // noinspection JSAnnotator
                                delete input;
                                // noinspection JSAnnotator
                                delete img;
                            } else if (type === "2" || type === "4") {
                                console.log(e, this);
                                var div2 = document.createElement('div');
                                div2.className = "FL W11 ";
                                div2.title = dl.length + 1;
                                var videoSize = 0;
                                if (this.size > 1024 * 1024) {
                                    videoSize = (Math.round(this.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                                }
                                else {
                                    videoSize = (Math.round(this.size * 100 / 1024) / 100).toString() + 'KB';
                                }
                                div2.innerHTML = '<div class="F3 C11M ellips FL H4M P1M">' + this.name + '</div><div class="FL F2 color8 B6M AR H4M P1M">' + videoSize + '</div>' +
                                    '<div class="FR B4M H4M"><img src="../images/icon/delete.png" class="P1M FR B4M H4M"  alt=""></div>' +
                                    '<video class="W11 H24" src="' + e.target.result + '"></video>';
                                // document.getElementById("ch_list").appendChild(div2);
                                div2.querySelector("img").onclick = function () {
                                    dl.splice(div2.title - 1, 1);
                                    div2.parentNode.removeChild(div2);
                                    console.log(dl);
                                };
                                document.getElementById("all_ph_folder").appendChild(div2);
                                dl.push(this);
                                console.log(dl);
                                if (dl.length > 0) {
                                    console.log(dl.length);
                                    document.querySelector("#new_page .upload").className = "FR B4M H4M F2 upload colorff"
                                }
                                // noinspection JSAnnotator
                                delete input;
                                // noinspection JSAnnotator
                                delete div2;
                            }
                        }.bind(event.target.files[l]);
                        //console.log(URL.createObjectURL(file.files[0]));
                        reader.readAsDataURL(event.target.files[l]);
                    }

                };
                input.click();
            }
        });

        document.querySelector("#new_page .upload").onclick = function () {
            var gid = document.querySelector("#list_folder_type").title;
            var type = document.querySelector("#add_newFolder").title;
            var memo = document.querySelector("#ph_memo").value;
            var h_tag = "相册";
            switch (type) {
                case "1":
                    h_tag = "相册";
                    break;
                case "2":
                    h_tag = "视频集";
                    break;
                case "4":
                    h_tag = "文件夹";
                    break;
            }
            if (dl.length > 0) {
                if (gid === "-1") {
                    _wd.info("请选择目标" + h_tag, "bgc5e");
                } else {
                    var fd = new FormData();
                    dl.forEach(function (v) {
                        console.log(v);
                        fd.append("files", v);
                        fd.append("json", JSON.stringify({
                            cid: id,
                            sid: s_guid,
                            gid: gid,
                            editor: myObject.per_full_name,
                            phone: _phone,
                            type: parseInt(type),
                            name: v.name,
                            src: "",
                            memo: memo,
                            date: new Date().getTime(),
                            replay: ""
                        }));
                    });
                    fd.append("token", _token);
                    fd.append("userguid", _userguid);
                    _wd.ajax_formdata(url + "/record/insert.do", true, fd, function (msg) {
                        if (m_Error(msg, "上传")) {
                            var p = JSON.parse(msg);
                            if (p.result > 0) {
                                _wd.info("上传成功", "bgc5e");
                                setTimeout(function () {
                                    _wd.hide("new_page");
                                    _wd.hide("re_photo");
                                    cl_photo();
                                }, 1000)
                            }
                        }
                    }, function (msg) {
                        _wd.info("无法上传，请重试！" + msg, "bgc24");
                    });
                }
            } else {
                _wd.info("请选择上传的文件", "bgc5e");
            }
        };

        var add_new = document.querySelector("#add_newFolder");
        add_new.onclick = function () {
            if (add_new.title === "-1") {
                _wd.info("请先选择上传文件类型！", "bgc5e");
            } else {
                newPhoto(parseInt(add_new.title));
            }
        };
        if ($o) {
            if ($o.type === 1 || $o.type === 5) {
                btn_up[0].click();
            } else if ($o.type === 2) {
                btn_up[1].click();
            } else if ($o.type === 4) {
                btn_up[2].click();
            }
            show_allFolder("list_folder", $o.type);
            document.querySelector("#choose_folder_name").innerHTML = $o.name;
        }
    } else {
        _wd.info("加入班级后才能发布通知！", "bgc5e");
    }
}


function show_allFolder(d, type) {
    var div = document.getElementById(d);
    div.innerHTML = "";
    // console.log(div);
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        type: type,
        page: 1,
        pagesize: 99
    };
    _wd.ajax_formdata(url + "/recordGroup/queryByType.do", true, para, function (msg) {
        if (m_Error(msg, "获取所有档案")) {
            var p = JSON.parse(msg).message;
            console.log(p);
            p.forEach(function (v) {
                var d = document.createElement("div");
                d.setAttribute("data-id", v.id);
                d.className = "W11 H6M FL relative";
                d.innerHTML =
                    '<div class="FL B6M H6M ALP"><img class="B6M H6M P05M" src="../images/icon/null_pic.png" alt=""></div>' +
                    '<div class="FL ML C8M PL1M F3 ellips bordTD1 folder_name" style="line-height: ' + 6 * M + 'px">' + v.name + '</div>' +
                    '<img class="B6M H6M absolute choose_list right0 P2M none" data-id="' + v.id + '" src="../images/icon/choose.png" alt="">';
                d.onclick = function () {
                    document.querySelector("#list_folder_type").title = v.id;
                    var choose = d.parentNode;
                    var re_ch = choose.querySelectorAll(".choose_list");
                    for (i = 0; i < re_ch.length; i++) {
                        re_ch[i].classList.add("none");
                    }
                    this.querySelector(".choose_list").classList.remove("none");
                    document.querySelector("#choose_folder_name").innerHTML = this.querySelector(".folder_name").innerHTML;
                    console.log();
                };
                div.appendChild(d);
            })
        }
    })
}


function getMon_axis() {
    var mon = document.querySelectorAll(".month_axis");
    for (var i = 0; i < mon.length; i++) {
        mon[i].classList.remove("active_time");
        (function (i) {
            mon[i].onclick = function () {
                var menuname = document.getElementsByClassName("month_axis");
                for (var j = 0; j < menuname.length; j++) {
                    menuname[j].classList.remove("active_time");
                }
                this.classList.add("active_time");
                var year = (this.getAttribute("data-id")).substring(4, 8);
                var month = this.innerText;
                var reg = /[\u4e00-\u9fa5]/g;
                month = Appendzero(month.replace(reg, ""));
                getMorePH_time(1, year, month);
            }
        })(i);
    }
}

var sameTime = "";

function getMorePH_time(page, y, m) {
    console.log(page, y, m);
    var para = {
        token: _token,
        userguid: _userguid,
        cid: id,
        time: y + "-" + m,
        page: page,
        pagesize: 30
    };
    console.log(para);
    _wd.ajax_formdata(url + "/record/queryByDate.do", true, para, function (msg) {
        if (m_Error(msg, "按时间获取档案")) {
            document.querySelector("#load_more_time_re").innerHTML = "";
            var p = JSON.parse(msg);
            var imgHtml = p.logoPath + s_guid + "/" + id + "/";
            var j = p.message;
            console.log(j);
            var dy_photo = document.querySelector("#dy_ph_time");
            var pageNumber = page + 1;
            console.log(pageNumber);
            var load_more = "";
            if (j.length === 0) {
                if (page === 1) {
                    dy_photo.innerHTML = ' <div class=" colorA W11 MT  AC ofh">没有找到此月发布的档案</div>';
                } else {
                    load_more = ' <div class="F2 colorA" >—————— 已经到底啦 ——————</div>';
                }
            }
            if (j.length > 0) {
                load_more = ' <div class="F2 colorA" onclick="getMorePH_time(' + pageNumber + ',' + y + ',' + m + ')">点击加载更多...</div>';
                if (page === 1) {
                    dy_photo.innerHTML = "";
                }
                j.forEach(function (v) {
                    var date = _wd.crtTimeFtt(v.date);
                    var div = document.createElement("div");
                    div.className = "MB";
                    var ph_title = '';
                    var ph_name = "";
                    if (v.editor) {
                        ph_name = v.editor;
                    } else {
                        ph_name = v.phone
                    }
                    var list_id = "dy_ph_list_time" + v.date;
                    if (sameTime !== date) {
                        console.log(sameTime, date);
                        ph_title = '  <div class="FL W11 H3M">' +
                            '                    <div class="FL H3M LH2 AL color876 bold W21 ellips" onclick="classmatesMember(' + v.phone + ')">' + ph_name + '</div>' +
                            '                    <div class="FR H3M LH25 AR W21 F2 colorA LH2 ellips">' + _wd.crtTimeYMD(v.date) + '</div>' +
                            '                </div>' +
                            '                <div class="FL W11 colorA F2">' +
                            '                    <div class="W43 FL AL ellips">' + v.memo + '</div>' +
                            '                    <div class="W41 FR AR ">' + _wd.crtTimeHM(v.date) + '</div>' +
                            '                    <div class="clear"></div>' +
                            '                </div>' +
                            '               <div class="FL W11" id="' + list_id + '">' +
                            '</div>';
                    } else {
                        // console.log(sameTime, date);
                        ph_title = '';
                    }
                    div.innerHTML = ph_title + '<div class="clear"></div>';
                    // console.log(div);
                    dy_photo.appendChild(div);
                    var d = document.createElement("div");
                    // d.className = "FL MT MR";
                    if (v.type === 1 || v.type === 5) {
                        d.className = "FL MT MR";
                        d.innerHTML =
                            '                    <div class="H12M B12M bgc9 AC ofh">' +
                            '                        <img class="W11 H11  OFC" src="' + imgHtml + v.src + '" alt=""' +
                            '                             onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this,' + "'" + encodeURI(JSON.stringify(v)) + "'" + ')">' +
                            '                    </div>' +
                            '                <div class="clear"></div>';
                    } else if (v.type === 4) {
                        d.className = "FL  MT MR";
                        d.innerHTML =
                            ' <div class="H4M  bgc9 FL">' +
                            '<div class="FL H4M B4M ">' +
                            '<img class="W11 H11 P05M OFC" src="../images/icon/file.png" alt="">' +
                            '</div>' +

                            '<div class="H4M FL B19M LH3 ellips color8 ">' + v.name + '</div>' +
                            '<div class="H4M FR B4M">' +
                            '<a class=" FR " href="' + imgHtml + v.src + '" download="' + v.name + '">' +
                            '<img class=" FR H4M B4M P1M" src="../images/icon/download.png" onerror="_wd.noFind_Pic(this)"/></a>' +
                            '</div>' +
                            '                    </div>' +
                            '                <div class="clear"></div>';
                    } else if (v.type === 2) {
                        d.className = "FL MT MR";
                        d.innerHTML =
                            '<div class=" H16M bgc9 AC ofh">' +
                            '<video class="W11 H16M" controls="controls" src="' + imgHtml + v.src + '"   preload="none" style="object-fit: fill;">' +
                            '</video>' +
                            '                    </div>' +
                            '                <div class="clear"></div>';
                    } else {
                        d.innerHTML = "";
                    }
                    // console.log(list_id, d);
                    if (dy_photo.querySelector("#" + list_id)) {
                        dy_photo.querySelector("#" + list_id).appendChild(d);
                    }

                    sameTime = date;
                })
            }
            console.log(p);
            document.querySelector("#load_more_time").innerHTML = load_more;
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}


/**
 * @return {string}
 */
function Appendzero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}

function getPhoto_time(page) {
    if (flagCheck === 2) {
        var para = {
            token: _token,
            userguid: _userguid,
            cid: id,
            page: page,
            pagesize: 10
        };
        console.log(para);
        _wd.ajax_formdata(url + "/record/queryByCid.do", true, para, function (msg) {
            if (m_Error(msg, "")) {
                document.querySelector("#load_more_time").innerHTML = "";
                var p = JSON.parse(msg);
                var imgHtml = p.logoPath + s_guid + "/" + id + "/";
                console.log(p);
                var j = p.message;
                var dy_photo = document.querySelector("#dy_ph_time");
                var pageNumber = page + 1;
                console.log(pageNumber);
                var load_more = "";
                if (j.length === 0) {
                    load_more = ' <div class="F2 colorA" >—————— 已经到底啦 ——————</div>';
                }
                if (j.length > 0) {
                    load_more = ' <div class="F2 colorA" onclick="getPhoto_time(' + pageNumber + ')">点击加载更多...</div>';
                    var sameTime;
                    j.forEach(function (v) {
                        var date = _wd.crtTimeFtt(v.date);
                        var div = document.createElement("div");
                        div.className = "MB";
                        var ph_title = '';
                        var ph_name = "";
                        if (v.editor) {
                            ph_name = v.editor;
                        } else {
                            ph_name = v.phone
                        }
                        var list_id = "dy_ph_list" + v.date;
                        if (sameTime !== date) {
                            ph_title = '  <div class="FL W11 H3M">' +
                                '                    <div class="FL H3M LH2 AL color876 bold W21 ellips" onclick="classmatesMember(' + v.phone + ')">' + ph_name + '</div>' +
                                '                    <div class="FR H3M LH25 AR W21  F2 colorA LH2 ellips">' + _wd.crtTimeYMD(v.date) + '</div>' +
                                '                </div>' +
                                '                <div class="FL W11 colorA F2">' +
                                '                    <div class="W43 FL AL ellips">' + v.memo + '</div>' +
                                '                    <div class="W41 FR AR ">' + _wd.crtTimeHM(v.date) + '</div>' +
                                '                    <div class="clear"></div>' +
                                '                </div>' +
                                '               <div class="FL W11" id="' + list_id + '">' +
                                '</div>';
                        }
                        div.innerHTML = ph_title + '<div class="clear"></div>';
                        dy_photo.appendChild(div);
                        var d = document.createElement("div");
                        // d.className = "FL MT MR";
                        if (v.type === 1 || v.type === 5) {
                            d.className = "FL MT MR";
                            d.innerHTML =
                                '                    <div class="H12M B12M bgc9 AC ofh">' +
                                '                        <img class="W11 H11  OFC" src="' + imgHtml + v.src + '" alt=""' +
                                '                             onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this,' + "'" + encodeURI(JSON.stringify(v)) + "'" + ')">' +
                                '                    </div>' +
                                '                <div class="clear"></div>';
                        } else if (v.type === 4) {
                            d.className = "FL  MT MR";
                            d.innerHTML =
                                ' <div class="H4M  bgc9 FL">' +
                                '<div class="FL H4M B4M ">' +
                                '<img class="W11 H11 P05M OFC" src="../images/icon/file.png" alt="">' +
                                '</div>' +

                                '<div class="H4M FL B19M LH3 ellips color8 ">' + v.name + '</div>' +
                                '<div class="H4M FR B4M">' +
                                '<a class=" FR " href="' + imgHtml + v.src + '" download="' + v.name + '">' +
                                '<img class=" FR H4M B4M P1M" src="../images/icon/download.png"/></a>' +
                                '</div>' +
                                '                    </div>' +
                                '                <div class="clear"></div>';
                        } else if (v.type === 2) {
                            d.className = "FL MT MR";
                            d.innerHTML =
                                '<div class=" H16M bgc9 AC ofh">' +
                                '<video class="W11 H16M" controls="controls" src="' + imgHtml + v.src + '"  preload="none" style="object-fit: fill;">' +
                                // ' <source src="' + imgHtml + v.src + '">' +
                                '</video>' +
                                '                    </div>' +
                                '                <div class="clear"></div>';
                        }
                        if (dy_photo.querySelector("#" + list_id)) {
                            dy_photo.querySelector("#" + list_id).appendChild(d);
                        }
                        sameTime = date;
                    })
                }
                document.querySelector("#load_more_time_re").innerHTML = load_more;
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    }
    else {
        _wd.info("加入班级后才能查看！", "bgc5e");
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
            console.log(p);
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
function isByz() {
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
                            editor: myObject.per_full_name,
                            name: "毕业照",
                            memo: "毕业照",
                            date: new Date().getTime()
                        },
                        token: _token,
                        userguid: _userguid,
                    };
                    _wd.ajax_formdata(url + "/recordGroup/insert.do", true, para, function (msg) {
                        if (m_Error(msg, "上传毕业照文件")) {
                            var p = JSON.parse(msg);
                            console.log(p);
                            if (p.result > 0) {
                                upBYZ(p.message);
                            }
                        }
                    });
                } else {
                    upBYZ(p[0]);
                }
            }
        }, function (msg) {
            _wd.info("错误！请重新登录！" + msg, "bgc24");
        });
    } else {
        _wd.info("加入班级后才能使用此功能！", "bgc5e");
    }
};

function upBYZ(o) {
    // _gra_id = p[0].id;
    var para1 = {
        token: _token,
        userguid: _userguid,
        cid: id,
        gid: o.id,
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
            cont.setAttribute("data-hash", "BYZ");
            var div = document.createElement("div");
            div.className = "fix top0  W11 CHmax bgc9 ofa";
            div.innerHTML = '  <div class="fix index100 top0 H bgc10 W11 AC ffHT ">毕业照' +
                '<div class="FL B4M H4M F2" onclick="mob_hide(\'BYZ\')"> <img  src="../images/icon/back_b.png" class="FL B4M H4M P1M" /></div>' +
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
            mob_show('BYZ');
            var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
            var isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
            if (isIos) {
                document.getElementById("up_photo_1").removeAttribute("capture");
            }
            var oSelect = document.getElementById("add_photo_byz");
            var oInput = document.getElementById("up_photo_1");
            var gra_photo = document.getElementById("gra_photo");
            // var upInput = document.getElementById("up_photo_1");
            // var result;
            // var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
            // var fd;  //FormData方式发送请求

            oSelect.onclick = function () {
                if (p.length < 10) {
                    oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
                    //清空已选图片
                    newRecord(o);
                } else {
                    _wd.info("毕业照上传数量已达上限！", "bgc24");
                }
            };
            // if (typeof FileReader === 'undefined') {
            //     // alert("抱歉，你的浏览器不支持 FileReader");
            //     upInput.setAttribute('disabled', 'disabled');
            // } else {
            //     upInput.addEventListener('change', readFile, false);
            // }
            var imgHtml = JSON.parse(msg).logoPath + s_guid + "/" + id + "/";
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = "   ofh AC";
                div.innerHTML =
                    '<img class=" W11 H11  OFC"  src="' + imgHtml + v.src + '" alt="" onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this,' + "'" + encodeURI(JSON.stringify(v)) + "'" + ')">';
                gra_photo.appendChild(div);
            });
            _wd.clear(gra_photo);
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
        cont.setAttribute("data-hash", "newFolder");
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
        div.innerHTML = '      <div class="top0 H W11 AC bgc10 ffHT">' + h_tag +
            '            <div class="FL B4M H4M F2" onclick="mob_hide(\'newFolder\')">取消</div>' +
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
        mob_show('newFolder')
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
            editor: myObject.per_full_name,
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
                if (document.querySelector("#list_folder")) {
                    show_allFolder("list_folder", type);
                }
                setTimeout(function () {
                    getPh_folder();
                }, 100);

            } else {
                console.log(msg);
                _wd.info("创建失败！", "bgc24");
            }
        }
    }, function (msg) {
        _wd.info("错误！请重新登录！" + msg, "bgc24");
    });
}

function getVideoBlob(url, callback) {
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
}

function getVideoImg(d) {
    console.log(d);
    var video = d.querySelectorAll("video");
    console.log(video);
    // for (var i = 0; i < video.length; i++) {
    //     video[i].addEventListener('loadeddata', function (e) {
    //         var obj = e.target;
    //         var scale = 0.8;
    //         var canvas = document.createElement("canvas");
    //         canvas.width = obj.videoWidth * scale;
    //         canvas.height = obj.videoHeight * scale;
    //         canvas.getContext('2d').drawImage(obj, 0, 0, canvas.width, canvas.height);
    //         obj.setAttribute("poster", canvas.toDataURL("image/png"));
    //         console.log(canvas.toDataURL("image/png"));
    //         console.log(obj);
    //     })
    // }
    for (var i = 0; i < video.length; i++) {
        var init = function () {
            video[i].addEventListener('loadeddata', function (e) {
                var obj = e.target;
                var scale = 0.8;
                var canvas = document.createElement("canvas");//创建一个canvas
                canvas.width = obj.videoWidth * scale;//设置canvas的宽度为视频的宽度
                canvas.height = obj.videoHeight * scale;//设置canvas的高度为视频的高度
                canvas.getContext('2d').drawImage(obj, 0, 0, canvas.width, canvas.height);//绘制图像
                var src = canvas.toDataURL("image/png");//将绘制的图像用img显示出来
                console.log(src);
            });
        };
        init();
    }
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
                                '<img class=" W11 H11 P05M OFC"  src="' + imgurl + v.src + '" alt="" onerror="_wd.noFind_Pic(this)" onclick="toFull_img(this,' + "'" + encodeURI(JSON.stringify(v)) + "'" + ')">';
                            break;
                        case 2:
                            // var f_pic = "";
                            // getVideoBlob( imgurl + v.src,function (s) {
                            //     console.log(s);
                            //     f_pic = s;
                            // });
                            div.className = "AC H24M MB ";
                            div.innerHTML = '<div class="W11 H21M "><div class="W11 AL P1M ellips">' + v.name + '</div>' +
                                '<video class="W11 H21M " controls="controls" src="' + imgurl + v.src + '"  preload="none" x5-video-player-type=h5 x5-video-player-fullscreen=true x5-video-orientation="portraint">' +
                                // ' <source src="' + imgurl + v.src + '">' +
                                '</video>' +

                                // '  <video id="my-player" class="video-js W11 H21M" controls preload="none" poster="" data-setup=\'{}\'>' +
                                // ' <source src="' + imgurl + v.src + '" type="video/mp4">' +
                                // '<p class="vjs-no-js">' +
                                // 'To view this video please enable JavaScript, and consider upgrading to a web browser that' +
                                // '<a href="http://videojs.com/html5-video-support/" target="_blank">' +
                                // 'supports HTML5 video' +
                                // '</a>' +
                                // '</p>' +
                                // '</video>' +
                                '</div>';
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
function toFull_img(pic, m) {
    if (pic.classList.contains("P2M")) {
        _wd.info("图片加载失败！", "bgc24");
    } else {
        var s = document.getElementById("s_select");
        s.innerHTML = "";
        s.classList.remove("none");
        var div = document.createElement("div");
        div.className = "fix  W11 CHmax  ofa";
        div.id = "full_img";
        if (m) {
            var v = JSON.parse(decodeURI(m));
            div.innerHTML = '<div class="H AC ellips PL1M PR1M">' + v.name + '</div><img src="' + pic.src + '" style="width: 100%;height: 100%"><div class="F2 P1M">' + v.memo + '</div>';
        } else {
            div.innerHTML = '<img src="' + pic.src + '" style="width: 100%;height: 100%">';
        }
        s.appendChild(div);
        s.onclick = function () {
            _wd.hide(s);
        };
        var img = document.querySelector("#full_img>img");
        img.onload = function () {
            console.log('width:' + img.width + ',height:' + img.height);
            if (CH - img.clientHeight > 0) {
                img.style.paddingTop = (CH - img.clientHeight) / 2 - 4 * M + "px";
            }
        };
        _wd.show(s);
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
    cont.setAttribute("data-hash", "addPhoto");
    var div = document.createElement("div");
    div.className = "index99 absolute top0 left0  bgc9 W11 CHmin ofh";
    div.id = "detail_ph";
    // var upLoad = "";
    // if (o.type === 2 && _wd.IsPC()) {
    //     upLoad = '<div  class="MA rad03e bgcff P05M C4M AC relative color1" id="add_photo_video" onclick="m_video(' + o + ')">上传视频</div>';
    // } else {
    //     upLoad = '<div  class="MA rad03e bgcff P05M C4M AC relative color1" id="add_photo" >上传' + ph_type_list(o.type) +
    //         '</div>';
    // }
    div.innerHTML = '  <div class="fix index100 top0 H bgc10 W11 AC ffHT " id="ph_name">' + record_name +
        '<div class="FL B4M H4M F2" id="ph_return_up"> <img  src="../images/icon/back_b.png" class="FL B4M H4M P1M" /></div>' +
        '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
        '</div>' +
        '<div class="bgc10 W11 MTH P1M">' +
        '<div  class="MA rad03e bgcff P05M C4M AC relative color1" id="add_photo" >上传' + ph_type_list(o.type) +
        '</div>' +
        // '<input type="file" id="up_photo" multiple="multiple" accept="image/*" class="none" capture="camera" >' +
        '<div class="clear">' +
        '</div></div>' +
        '<div class=" W11 color8 P05M F2 bgc10 AL PL2M" id="ph_title">' + o.memo +
        '</div>' +
        '<div class="W11 bgc10" id="ph_list">' +
        '</div>' +
        '<div class="W11 H4M AC color8 F2 PT1M" id="ph_addMore">点击加载更多...</div>';
    cont.appendChild(div);
    _wd.show(cont);
    mob_show("addPhoto");
    document.getElementById("photo").classList.add("CHNH");
    document.getElementById("ph_return_up").onclick = function () {
        _wd.deleteChild("re_photo", "detail_ph");
        document.getElementById("photo").classList.remove("CHNH");
        mob_hide("addPhoto");
    };
    // if (o.type === 2) {
    //     document.getElementById("up_photo").setAttribute("accept", "video/*");
    // }
    // if (o.type === 4) {
    //     document.getElementById("up_photo").removeAttribute("accept");
    // }
    // var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
    // var isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
    // if (isIos) {
    //     document.getElementById("up_photo").removeAttribute("capture");
    // }
    ph_addMore(record_id, 1, o.type);
    var ph_more = document.getElementById("ph_addMore");
    var ph_more_number = 1;
    ph_more.onclick = function () {
        ph_more_number++;
        ph_addMore(record_id, ph_more_number, o.type);
    };
    var oSelect = document.getElementById("add_photo");
    oSelect.onclick = function () {
        newRecord(o);
    };


    // var input = document.getElementById("up_photo");
    // input.value = "";
    // var result;
    // var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
    // var fd;  //FormData方式发送请求
    // var oSelect = document.getElementById("add_photo");
    // // var oAdd = document.getElementById("add");
    // var oInput = document.getElementById("up_photo");
    // if (typeof FileReader === 'undefined') {
    //     // alert("抱歉，你的浏览器不支持 FileReader");
    //     input.setAttribute('disabled', 'disabled');
    // } else {
    //     input.addEventListener('change', readFile, false);
    // }

    // function readFile() {
    //     fd = new FormData();
    //     var iLen = this.files.length;
    //     var index = 0;
    //     var cont = document.getElementById("ph_upload");
    //     // cont.innerHTML = "";
    //     var div = document.createElement("div");
    //     div.id = "ph_up_list" + record_id;
    //     div.className = "index100 absolute top0 left0  bgc10 W11 CHmin";
    //     div.innerHTML = '  <div class="fix index100 top0 H bgc10 W11 AC ffHT ">' +
    //         '<div class="FL B4M H4M F2" id="up_return">取消</div>' +
    //         '<div class="FR B4M H4M F2  " id="ph_upload_btn" >上传</div>' +
    //         '</div>' +
    //         // '<div class="H4M AC W11  colorA MTH" onclick="add_up_morePic()">添加照片</div>' +
    //         // '<div class="F2 AC W11 MT colorA" id="dbclick_delete"></div>' +
    //         '<div class="bgc10 W11 P05M MTH" id="ch_list">' +
    //         '</div>';
    //     cont.appendChild(div);
    //     _wd.show(cont);
    //     document.getElementById("detail_ph").classList.add("H1M");
    //     document.getElementById("up_return").onclick = function () {
    //         _wd.deleteChild("ph_upload", "ph_up_list" + record_id);
    //         document.getElementById("detail_ph").classList.remove("H1M");
    //     };
    //     _wd.show("ph_upload");
    //     // dais.toggle("ph_upload", 1);
    //     for (var i = 0; i < iLen; i++) {
    //         var reader = new FileReader();
    //         reader.index = i;
    //         fd.append("files", this.files[i]);
    //         var file_name = this.files[i].name;
    //         var file_size = this.files[i].size;
    //         var file_type = this.files[i].type;
    //         if (file_type === "") {
    //             file_type = /\.[^.]+$/.exec(file_name);
    //         }
    //         console.log(file_name, file_type);
    //         if (o.type === 1) {
    //             reader.readAsDataURL(this.files[i]);  //转成base64
    //             reader.fileName = this.files[i].name;
    //             reader.onload = function () {
    //                 var imgMsg = {
    //                     name: this.fileName,//获取文件名
    //                     base64: this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
    //                 };
    //                 dataArr.push(imgMsg);
    //                 result = ' <img class=" W11 H11 P05M OFC" src="' + this.result + '" onclick="toFull_img(this)"/> ';
    //                 // '<img class=" index99 relative H1M B1M topM" src="../images/icon/delete.png" id="delete_ph' + imgMsg.name + '" alt="">' +
    //                 var div1 = document.createElement('div');
    //                 // div1.index = index;
    //                 div1.innerHTML = result;
    //                 div1.className = "FL M05 pic33 ofh";
    //                 // div1.id = "delete_p" + imgMsg.name;
    //                 document.getElementById("ch_list").appendChild(div1);
    //             }
    //         }
    //         else if (o.type === 2) {
    //             var videoSize = 0;
    //             if (this.files[i].size > 1024 * 1024) {
    //                 videoSize = (Math.round(this.files[i].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    //             }
    //             else {
    //                 videoSize = (Math.round(this.files[i].size * 100 / 1024) / 100).toString() + 'KB';
    //             }
    //             result = ' <li class=" W11" >' + this.files[i].name + '</li> ' +
    //                 '<li class="W11 F2 AL color8">' + videoSize + '</li>';
    //             var div2 = document.createElement('div');
    //             div2.innerHTML = result;
    //             div2.className = "FL  W11 ellips bordBD1";
    //             document.getElementById("ch_list").appendChild(div2);
    //         }
    //         else if (o.type === 4) {
    //             var fileSize = 0;
    //             if (this.files[i].size > 1024 * 1024) {
    //                 fileSize = (Math.round(this.files[i].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    //             }
    //             else {
    //                 fileSize = (Math.round(this.files[i].size * 100 / 1024) / 100).toString() + 'KB';
    //             }
    //             result = ' <li class=" W11" >' + this.files[i].name + '</li> ' +
    //                 '<li class="W11 F2 AL color8">' + fileSize + '</li>';
    //             var div3 = document.createElement('div');
    //             div3.innerHTML = result;
    //             div3.className = "FL  W11 ellips bordBD1";
    //             document.getElementById("ch_list").appendChild(div3);
    //         }
    //     }
    //     document.getElementById("ph_upload_btn").onclick = function () {
    //         if (file_size < 20971521) {
    //             fd.append("json", JSON.stringify({
    //                 cid: id,
    //                 sid: s_guid,
    //                 gid: record_id,
    //                 phone: _phone,
    //                 type: o.type,
    //                 name: file_name,
    //                 src: "",
    //                 memo: file_type,
    //                 date: new Date().getTime(),
    //                 replay: ""
    //             }));
    //             fd.append("token", _token);
    //             fd.append("userguid", _userguid);
    //             console.log(fd);
    //             _wd.ajax_formdata(url + "/record/insert.do", true, fd, function (msg) {
    //                 // console.log(msg);
    //                 // return;
    //                 if (m_Error(msg, "上传")) {
    //                     _wd.hide("re_photo");
    //                     _wd.deleteChild("ph_upload", "ph_up_list" + record_id);
    //                     toMenu("cl_photo");
    //                     document.getElementById("photo").classList.remove("CHNH");
    //                 }
    //             }, function (msg) {
    //                 _wd.info("无法上传，请重试！" + msg, "bgc24");
    //             });
    //         } else {
    //             _wd.info("请上传小于20M的文件！", "bgc24");
    //         }
    //
    //     }
    // }

    // oSelect.onclick = function () {
    //     oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    //     //清空已选图片
    //     dataArr = [];
    //     index = 0;
    //     oInput.click();
    // };
    //

}



