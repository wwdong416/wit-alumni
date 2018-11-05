/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
 */
var url = "http://121.43.233.185/alumnicloudweb";
var lo_url = "http://192.168.10.19:8080";
//获取地址栏中cid的值
var id = "33303822003301";
// if (_wd.getUrl()){
//     id = _wd.getUrl().Cid;
// }

//获取cid中的前七位就是guid
var s_guid = parseInt(id.substring(0, 7));

//返回值失败的情况
function m_Error(msg) {
    var p = JSON.parse(msg);
    if (p.result < 0) {
        _wd.info("服务器异常！", "bgc24");
        return false;
    }
    return true;
}

//班级信息
function class_message() {
    var para = {
        guid: s_guid,
    };
    _wd.ajax_formdata(url + "/school/queryByGuid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg);
            schoolname = p.message[0].name;
            var para = {
                guid: id,
            };
            _wd.ajax_formdata(url + "/class/queryByGuid.do", true, para, function (msg) {
                if (m_Error(msg)) {
                    var p = JSON.parse(msg);
                    classname = p.message[0].name;
                    master = p.message[0].master;

                    document.getElementById("class_name").innerText = schoolname + classname + "班";
                    document.getElementById("class_master").innerText = "班主任：" + master;
                }
            });
        }
    });
}

//添加通讯录
function cl_information() {
    daisWH(6, 6);//设置默认座位表
    var cont = document.getElementById("phone_list");
    cont.innerHTML = "";
    var para = {
        cid: id,
    };
    _wd.ajax_formdata(url + "/member/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " W11 H7M bordBD1";
                div.innerHTML = '<li class="absolute W11 H7M bordBD1 bgc10 ofh index9">' +
                    '<img class="FL B5M rad0 M" src="../images/pic1.png" alt=""> ' +
                    '<div class="FL  C8M MT05 LH2"> ' +
                    '<div class="FL W21 color876 bold ofh F3">' + v.name + '</div> ' +
                    '<div class="FR W21 AR color8 F3 ofh">' + v.dept + v.job + '</div> ' +
                    '<div class="FL W11 color8 F3 ellips AL">' + v.comp +
                    '</div></div></li>' +
                    '<div class="absolute left0 B7M H7M F4 AC LH4 bgc36 color1 ">详情</div>' +
                    '<div class="absolute right0 B7M H7M F4 AC LH4 bgc45 color1 ">打电话</div>"';
                var li = div.querySelector("li");
                SomeEvent(li, {
                    MOVE_LIMIT_BACK: true
                    , CW: CW
                    , S: M * 6
                    , L: M * 12
                    , MOVE_BACK: {_X: 10, X_: CW - 10}
                    , MOVE_LIMIT: true
                }, f, {});
                cont.appendChild(div);
            });
        }

    });

    var f = {
        A_L: function () {
            this.A_LL();
        },
        A_R: function () {
            this.A_LR();
        },
        A_O: function () {

        }
    }
}

//发布通知
function Re_notice() {
    var div = document.createElement("div");
    div.className = " W11 index99 fix bgc9 CH";
    div.innerHTML = '<div class="top0 H W11 AC ffHT bgc9 ">发布通知' +
        '    <div  class="FL B4M H4M F2" onclick="dais.toggle(re_notice,0)"> 取消</div>' +
        '    <div  class="FR B4M H4M F2 color8" id="n_release" onclick="in_notice()"> 发布</div>' +
        '</div><div class="bgc10 W11 F2 AL">' +
        '<div  class="FL W11 F3 H4M LH3   bordBD1  bgcddc  color876 bord_select AC" id="n_tag" data-t="radio" data-s="班务,探望,游玩,喜报,哀悼" />选择类型标签</div>' +
        '<input type="text" class=" FL H4M W11  ALP  bordBD1 " id="re_title" placeholder="输入标题"/>' +
        '<textarea class=" FL  W11  ALP  bordBD1 ffWRYH " rows="8"  style="resize:none"  id="re_content" placeholder="发布我的内容......" ></textarea>' +
        '<div class="W11 FL AR F1 colorA PR1M">最多输入250个字</div>' +
        '</div>';
    document.getElementById("re_notice").appendChild(div);
    dais.toggle("re_notice", 1);
    _wit.event.div_UI("s_select");
    //输入标题后 发布按钮 改变颜色
    document.getElementById("re_title").oninput = function () {
        var div = document.getElementById("n_release");
        if (this.value.length > 0) {
            if (document.getElementById("n_tag").innerText.indexOf("选择类型标签") > -1) {
                _wd.info("请选择类型标签！", "bgc44");
            } else {
                div.classList.remove("color8");
                div.classList.add("colorff");
            }
        } else {
            div.classList.remove("colorff");
            div.classList.add("color8");
        }

    };
}

function in_notice() {
    var type = parseInt(document.getElementById("n_tag").title);
    var title = document.getElementById("re_title").value;
    var notice = document.getElementById("re_content").value;
    console.log(type + "_" + title + "_" + notice);
    if (type !== NaN && title == "") {
        _wd.info("通知标签、标题不能为空", "bgc44");
    } else {
        var para = {
            json: {
                sid: id,
                cid: s_guid,
                phone: "18806097971",
                type: type,
                editor: "测试1",
                title: title,
                notice: notice,
                date: new Date().getTime(),
                replay: ""
            }
        };
        console.log(para.json);
        _wd.ajax_formdata(url + "/notice/insert.do", true, para, function (msg) {
            console.log(JSON.parse(msg));
            var p = JSON.parse(msg).result;
            if(p == 1){
                dais.toggle(re_notice,0);
                toMenu("cl_notice");
            }
        });
    }
}

//添加通知消息
function cl_notice() {
    document.getElementById("cont_notice").innerHTML = "";
    var para = {
        cid: s_guid,
        phone: "18806097971",
    };
    var tag_number = 1;
    _wd.ajax_formdata(url + "/notice/queryByGuid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " W11 AL";
                var id = "notice_" + v.id;
                var n_detail = v.notice;
                if (n_detail.length == 0 || typeof(n_detail) == "undefined") {
                    n_detail = "";
                }
                div.onclick = function () {
                    _wd.Show_Hidden(id);
                };
                // div.dataset.id = para.schooljson.sc_id;
                div.innerHTML = '  <div class="W11 P1M bordBD1">' +
                    '<div class="colorO  F3 FL italic W161 bold">' + tag_number++ + '</div>' +
                    '<div class="thicker">'+v.title+'</div>' +
                    '<div class="FR F2 colorA">'+_wd.crtTimeFtt(v.date)+'</div>' +
                    '<div class="FL P05M none MT05 W11 LH2 rad03e color8 bgcaf5" id="notice_' + v.id + '">' + n_detail +
                    '<div class="FR MT05" > 发布人：'+v.editor+'</div>' +
                    '</div>' +
                    '<div class="clear"></div>' +

                    '</div>';
                document.getElementById("cont_notice").appendChild(div);
            });
        }
    });

}
