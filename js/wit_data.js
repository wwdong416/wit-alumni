/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
 */
var url = "http://121.43.233.185/alumnicloudweb";
//http://121.43.233.185/alumnicloudweb
// var url = "http://192.168.10.5:8080";
//获取地址栏中cid的值
var id = "33303822003301";
//33303822003301
//33303822009303
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
        page: 1,
        pagesize: 5
    };
    _wd.ajax_formdata(url + "/school/queryByGuid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg);
            schoolname = p.message[0].name;
            var para = {
                guid: id,
                page: 1,
                pagesize: 5
            };
            _wd.ajax_formdata(url + "/class/queryByGuid.do", true, para, function (msg) {
                if (m_Error(msg)) {
                    var p = JSON.parse(msg);
                    console.log(p);
                    classname = p.message[0].name;
                    master = p.message[0].master;
                    document.getElementById("class_name").innerText = schoolname + classname + "班";
                    document.getElementById("class_master").innerText = "班主任：" + master;
                }
            });
        }
    });
}

//首页通知
function cl_index() {
    var f_notice = document.getElementById("first_notice");
    document.getElementById("index_notice").innerHTML = "";
    f_notice.innerHTML = "";
    var para = {
        cid: id,
        page: 1,
        pagesize: 5
    };
    _wd.ajax_formdata(url + "/notice/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            console.log(JSON.parse(msg));
            f_notice.innerText = p[0].title;
            var sameTime;
            p.forEach(function (v) {
                var date = _wd.crtTimeFtt(v.date);
                var nowDate = new Date();
                var nowTime = nowDate.toLocaleDateString();//获取当前时间
                var showTime = nowTime.split("/").join("-");//将时间改成2018-10-14格式
                var YMD = date.substring(0, 10);//获取数据中时间的年月日
                var HM = date.substring(11, date.length);
                var DF_time = _wd.getDateDF(showTime, YMD);//计算两者时间差天数
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
                if (sameTime != YMD) {
                    timeTitle = '<div class="AC colorA PB1M PT1M flexbox" id="index_time">' +
                        '                <img class="W31 FL" src="../images/icon/line-min.png" alt="">' +
                        '                <div class="W51 FL">' + YMD + '</div>' +
                        '                <img class="W31 FL" src="../images/icon/line-min.png" alt="">' +
                        '            </div>';
                }
                var div = document.createElement("div");
                var id = "index_n_" + v.id;
                var n_detail = v.notice;
                if (n_detail.length == 0 || typeof(n_detail) == "undefined") {
                    n_detail = "";
                }
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
        }
    });
}

//发布通知页面
function Re_notice() {
    document.getElementById("re_notice").innerHTML = "";
    var div = document.createElement("div");
    div.className = " W11 index99 fix bgc9 CH";
    div.innerHTML = '<div class="top0 H W11 AC ffHT bgc9 ">发布通知' +
        '    <div  class="FL B4M H4M F2" onclick="dais.toggle(re_notice,0)"> 取消</div>' +
        '    <div  class="FR B4M H4M F2 color8" id="n_release" onclick="in_notice()"> 发布</div>' +
        '</div><div class="bgc10 W11 F2 AL">' +
        '<div  class="FL W11 F3 H4M LH3   bordBD1  bgcddc  color876 bord_select AC" id="n_tag" title="-1" data-t="radio" data-s="班务,探望,游玩,喜报,哀悼" />选择类型标签</div>' +
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

//发布通知接口
function in_notice() {
    var type = parseInt(document.getElementById("n_tag").title);
    var title = document.getElementById("re_title").value;
    var notice = document.getElementById("re_content").value;
    console.log(type + "_" + _wd.getBLen(title) + "_" + notice.length);
    if (type < 0 || title.length <= 0) {
        _wd.info("通知标签、标题不能为空", "bgc44");
    } else if (_wd.getBLen(title) > 50) {
        _wd.info("标题不能超过25个字！", "bgc44");
    } else if (_wd.getBLen(notice) > 500) {
        _wd.info("内容不能超过250个字！", "bgc44");
    } else {
        var para = {
            json: {
                sid: s_guid,
                cid: id,
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
            if (p == 1) {
                dais.toggle(re_notice, 0);
                toMenu("cl_notice");
            } else {
                _wd.info("发布失败，请重试！", "bgc24");
            }
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
    var para = {
        cid: id,
        // phone: "18806097971",
        page: page,
        pagesize: 20
    };
    _wd.ajax_formdata(url + "/notice/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            console.log(JSON.parse(msg));
            var more_notice = document.getElementById("more_notice");
            if (p.length < 20 && p.length > 0) {
                more_notice.innerText = "—————— END ——————";
            } else if (p.length == 0) {
                more_notice.innerText = "已经没有更多了！";
                more_btn = 1;
            } else {
                more_notice.innerText = "点击加载更多";
            }
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
                div.innerHTML = '  <div class="W11 P1M bordBD1">' +
                    '<div class="thicker F3"><b class="colorO F3 italic MR">' + tag_number++ + ' </b> ' + v.title + '</div>' +
                    '<div class="FR F2 MT05 colorA">' + _wd.crtTimeFtt(v.date) + '</div>' +
                    '<div class="FL P1M none MT05 W11  rad03e color8 bgcaf5" id="notice_' + v.id + '">' +
                    '<div class="LH2 F3">' + n_detail + '</div>' +
                    '<div class="FR F2" > 发布人：' + v.editor + '</div>' +
                    '</div>' +
                    '<div class="clear"></div>' +

                    '</div>';
                document.getElementById("cont_notice").appendChild(div);
            });
        }
    });
}

//点击更多加载下一页列表
var div = document.getElementById("more_notice");
div.onclick = function () {
    more_btn++;
    getNoticeList(more_btn);
};

//添加通讯录
function cl_information() {
    daisWH(6, 6);//设置默认座位表
    var cont = document.getElementById("phone_list");
    cont.innerHTML = "";
    var para = {
        cid: id,
        page: 1,
        pagesize: 50
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
            console.log("1");
        },
        A_R: function () {
            console.log("2");
        },
        A_O: function () {

        }
    }
}

//档案
function cl_photo() {
    get_cl_Photo(1);//获取相册
    get_cl_Photo(2);//获取视频文件夹
    get_cl_Photo(4);//获取文件
    //添加毕业照小白点
    add_photoindex();
}

function get_cl_Photo(type) {
    var ph_img = document.getElementById("ph_img");
    ph_img.innerHTML = "";
    var ph_video = document.getElementById("ph_video");
    ph_video.innerHTML = "";
    var ph_word = document.getElementById("ph_word");
    ph_word.innerHTML = "";
    var para = {
        cid: id,
        type: type,
        page: 1,
        pagesize: 7
    };
    _wd.ajax_formdata(url + "/recordGroup/queryByType.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            console.log(JSON.parse(msg));
            var more_div = document.createElement("div");
            more_div.className = " FL ML";

            more_div.innerHTML =
                "<img class='A41  bgc8 P2M'  src='../images/icon/more.png' >" ;
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " FL ML";
                div.id = "ph_" + v.id;
                div.onclick = function () {
                    addPhotos(v.id, v.name, v.phone, v.date);
                };
                div.innerHTML =
                    '<img class="A41  bgc9 P2M"  src="../images/icon/null-photos.png" alt="">' +
                    '<div class="F2 ellips A41 PB1M AC color8">' + v.name + '</div>';
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
            });
            switch (type) {
                case 1:
                    ph_img.appendChild(more_div);
                    break;
                // case 2:
                //     ph_video.appendChild(div);
                //     break;
                // case 4:
                //     ph_word.appendChild(div);
                //     break;
            }
        }
    });
    _wd.clear(ph_img);
    _wd.clear(ph_video);
    _wd.clear(ph_word);
}

//新建相册页面
function newPhoto(type) {
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
    div.innerHTML = '      <div class="top0 H W11 AC bgc9 ffHT">' + h_tag +
        '            <div class="FL B4M H4M F2" onclick="dais.toggle(ph_new,0)">取消</div>' +
        '            <div class="FR B4M H4M F2 color8" onclick=""></div>' +
        '        </div>' +
        '        <div class="bgc10 W11 P1M AC">' +
        '            <input type="text" id="folder_name" class="AL H5M W11 F4  color8 bordBD1" placeholder="填写' + in_place + '名称"/>' +
        '<textarea id="folder_memo" class="W11 color8  ALP  bordBD1 ffWRYH " rows="5"  style="resize:none"  id="re_content" placeholder="' + in_place + '描述（非必填）" ></textarea>' +
        // '            <input type="text" id="folder_memo" class="AL H3M W11 F2 italic color8 bordBD1" placeholder="' + in_place + '描述（非必填）"/>' +
        '            <div class="MT2 W54 ma  AC bgcff rad03e P05M F3 color1 " onclick="addFolder(' + type + ')">完成创建</div>' +
        '        </div>';
    cont.appendChild(div);
    dais.toggle("ph_new", 1);
}

//添加相册接口
function addFolder(type) {
    var fol_name = document.getElementById("folder_name").value;
    var para = {
        json: {
            sid: s_guid,
            cid: id,
            phone: "18806097971",
            type: type,
            name: fol_name,
            memo: "",
            date: new Date().getTime()
        }
    };
    _wd.ajax_formdata(url + "/recordGroup/insert.do", true, para, function (msg) {
        var p = JSON.parse(msg).result;
        console.log(JSON.parse(msg));
        if (p > 0) {
            dais.toggle("ph_new", 0);
            toMenu("cl_photo");
        } else {
            _wd.info("创建失败！", "bgc24");
        }
    });
}

function addPhotos($id, $name, $phone, $date) {
    var record_id = $id;
    console.log(record_id);
    var record_name = $name;
    console.log(record_id);
    var para = {
        cid: id,
        gid: record_id,
        page: 1,
        pagesize: 20
    };
    console.log(para);
    _wd.ajax_formdata(url + "/record/queryByGid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var imgurl = JSON.parse(msg).logoPath;
            var p = JSON.parse(msg).message;
            console.log(p);
            // console.log(p.message);

            // console.log(ph_name.length);
            if (record_name.length > 10) {
                record_name = record_name.substring(0, 10) + "…";
            }
            var cont = document.getElementById("re_photo");
            cont.innerHTML = "";
            var div = document.createElement("div");
            div.className = "W11";
            div.innerHTML = '  <div class="top0 H W11 AC ffHT " id="ph_name">' + record_name +
                '<div class="FL B4M H4M F2" onclick="dais.toggle(re_photo,0)"><b class="F3 ">&lt;</b>返回</div>' +
                '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
                '</div>' +
                '<div class="bgc10 W11 P1M">' +
                '<div class="FL W43 color8 P05M AL ellips" id="ph_title">' + record_name +
                '</div>' +
                '<div  class="FR  rad03e bgcff P05M W41 AC relative" id="add_photo" >上传照片' +
                '</div>' +
                '<input type="file" id="up_photo" multiple="multiple" accept="image/*" class="none" capture="camera" >' +

                '<div class="clear">' +
                '</div>' +

                '</div>' +
                '<div class="W11 bgc10" id="ph_list">' +

                '</div>' +
                '<div class=" bgc10 P1M  F2  W11 colorA"><div class="FL W42 ellips">创建者：' + $phone + '</div><div class="FR W42 ellips AR">' + _wd.crtTimeFtt($date) + '</div><div class="clear"></div> </div>';
            cont.appendChild(div);
            dais.toggle("re_photo", 1);
            var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            if (isIos) {
                document.getElementById("up_photo").removeAttribute("capture");
            }
            var ph_img = document.getElementById("ph_list");
            if (p.length == 0){
                ph_img.innerHTML ='';
            }else{
                ph_img.innerHTML = "";
                p.forEach(function (v) {
                    var div = document.createElement("div");
                    div.className = "pic33 FL ML ofh P05M";
                    div.onclick = function () {
                    };
                    div.innerHTML =
                        '<img class="AC" src="' + imgurl + v.src + '" alt="" onerror="_wd.noFind_Pic(this)">';
                    ph_img.appendChild(div);
                    var img = div.getElementsByTagName('img')[0];
                    img.onload = function () {
                        var nowHeight = ReSizePic(this,D31); //设置图片大小
                        this.parentNode.style.display = 'block';
                        var oParent = this.parentNode;
                        if (nowHeight) {
                            oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
                        }
                    };
                });
                _wd.clear(ph_img);
            }
            var input = document.getElementById("up_photo");
            input.value = "";
            var result;
            var dataArr = []; // 储存所选图片的结果(文件名和base64数据)
            var fd;  //FormData方式发送请求
            var oSelect = document.getElementById("add_photo");
            // var oAdd = document.getElementById("add");
            var oSubmit = document.getElementById("submit");
            var oInput = document.getElementById("up_photo");
            if (typeof FileReader === 'undefined') {
                // alert("抱歉，你的浏览器不支持 FileReader");
                input.setAttribute('disabled', 'disabled');
            } else {
                input.addEventListener('change', readFile, false);
            }　　　　　//handler
            function readFile() {
                fd = new FormData();
                var iLen = this.files.length;
                var index = 0;
                var cont = document.getElementById("ph_upload");
                cont.innerHTML = "";
                var div = document.createElement("div");
                div.className = "W11";
                div.innerHTML = '  <div class="top0 H W11 AC ffHT bgc9">' +
                    '<div class="FL B4M H4M F2" onclick="dais.toggle(ph_upload,0)">&lt;&nbsp;返回</div>' +
                    '<div class="FR B4M H4M F2 color8 " id="ph_upload_btn" onclick="Re_insert(1,up_photo,' + record_id + ')">上传</div>' +
                    '</div>' +
                    '<div class="F2 AC W11 MT colorA" id="dbclick_delete"></div>' +
                    '<div class="bgc10 W11 P05M" id="ch_list">' +
                    '</div>';
                cont.appendChild(div);
                dais.toggle("ph_upload", 1);
                for (var i = 0; i < iLen; i++) {
                    if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　//判断上传文件格式
                        return alert("上传的图片格式不正确，请重新选择");
                    }
                    var reader = new FileReader();
                    reader.index = i;
                    fd.append(i, this.files[i]);
                    reader.readAsDataURL(this.files[i]);  //转成base64
                    reader.fileName = this.files[i].name;
                    reader.onload = function (e) {
                        var imgMsg = {
                            name: this.fileName,//获取文件名
                            base64: this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        };
                        dataArr.push(imgMsg);
                        result = '<div class="pic44 AC"> <img class="relative" src="' + this.result + '" alt=""/></div>   ';
                        var div1 = document.createElement('div');
                        div1.innerHTML = result;
                        var upload_btn = document.getElementById("ph_upload_btn");
                        if (div1.innerHTML.length > 0) {
                            document.getElementById("dbclick_delete").innerText = "长按图片删除！";
                            upload_btn.classList.add("colorff");
                            upload_btn.classList.remove("color8");
                        } else {
                            upload_btn.classList.add("color8");
                            upload_btn.classList.remove("colorff");
                        }
                        div1.className = "FL M05 pic44 ofh";
                        document.getElementById("ch_list").appendChild(div1)
                        // document.getElementsByTagName('body')[0].appendChild(div1);  　　//插入dom树
                            var img = div1.getElementsByTagName('img')[0];
                        img.onload = function () {
                            var nowHeight = ReSizePic(this,D41); //设置图片大小
                            this.parentNode.style.display = 'block';
                            var oParent = this.parentNode;
                            if (nowHeight) {
                                oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
                            }
                        };
                        div1.ontouchstart = function () {
                            // 长按事件触发
                            timeOutEvent = setTimeout(function () {
                                this.remove();                  // 在页面中删除该图片元素
                                delete dataArr[this.index];  // 删除dataArr对应的数据
                            }, 400);
                        };

                        //     ondblclick = function () {
                        //     this.remove();                  // 在页面中删除该图片元素
                        //     delete dataArr[this.index];  // 删除dataArr对应的数据
                        // };
                        index++;
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
            function ReSizePic(ThisPic,width) {
                var RePicWidth = width; //这里修改为您想显示的宽度值
                var TrueWidth = ThisPic.width; //图片实际宽度
                var TrueHeight = ThisPic.height; //图片实际高度
                if (TrueWidth > TrueHeight) {
                    //宽大于高
                    var reWidth = RePicWidth;
                    ThisPic.height = reWidth;
                } else {
                    //宽小于高
                    var reHeight = RePicWidth;
                    ThisPic.width = reHeight;
                }
            }
        }
    });

    //
    //
    // oAdd.onclick=function(){
    //     oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
    //     oInput.click();
    // }
}

function Re_insert(type, ipt_id, gid) {
    var fd = new FormData();
    fd.append("json", JSON.stringify({
        cid: parseInt(id),
        sid: s_guid,
        gid: gid,
        phone: "18806097971",
        type: type,
        name: "测试图片",
        src: "",
        memo: "测试备注",
        date: new Date().getTime(),
        replay: ""
    }));
    Array.prototype.forEach.call(ipt_id.files, function (v) {
        console.log(v);
        fd.append("files", v);
    });
    console.log(fd);
    _wd.ajax_formdata(url + "/record/insert.do", true, fd, function (msg) {
        dais.toggle(ph_upload, 0);
    }, function (msg) {
        _wd.info("无法上传，请重试！", "bgc24");
    });
}
