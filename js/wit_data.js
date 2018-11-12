/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
 */
var url = "http://121.43.233.185/alumnicloudweb";
var lo_url = "http://192.168.10.19:8080";
//获取地址栏中cid的值
var id = "33303822009303";
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

function in_notice() {
    var type = parseInt(document.getElementById("n_tag").title);
    var title = document.getElementById("re_title").value;
    var notice = document.getElementById("re_content").value;
    console.log(type + "_" + title.length + "_" + notice);
    if ( type < 0 || title.length <= 0) {
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
            if (p == 1) {
                dais.toggle(re_notice, 0);
                toMenu("cl_notice");
            }
        });
    }
}

//添加通知消息
function cl_notice() {
    document.getElementById("cont_notice").innerHTML = "";
    var para = {
        cid: id,
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
                    '<div class="thicker F3"><b class="colorO F3 italic MR">'+  tag_number++ +' </b> ' + v.title + '</div>' +
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

function cl_photo() {
    //添加照片
    var ph_img = document.getElementById("ph_img");
    ph_img.innerHTML = "";
    var ph_video = document.getElementById("ph_video");
    ph_video.innerHTML = "";
    var ph_word = document.getElementById("ph_word");
    ph_word.innerHTML = "";
    var para = {
        cid: id,
    };
    _wd.ajax_formdata(url + "/record/queryByCid.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg).message;
            console.log(p);
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " FL ML";
                div.onclick = function () {
                    addPhotos(v.id);
                };
                div.innerHTML = '<div id="ph_' + v.id + '">' +
                    '<img class="A41  bgc9 P05M" src="../images/icon/addpic.png" alt="">' +
                    '<div class="F2 ellips A41 PB1M AC color8">' + v.name + '</div></div>';
                switch (v.type) {
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
            _wd.clear(ph_img);
            _wd.clear(ph_video);
            _wd.clear(ph_word);
        }
    });
    //添加毕业照小白点
    add_photoindex();
}

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
        '            <input type="text" id="folder_name" class="AL H5M W11 F4 italic color8 bordBD1" placeholder="输入' + in_place + '名称"/>' +
        '            <div class="MT2 W54 ma  AC bgcff rad03e P05M F3" onclick="addFolder(' + type + ')">完成创建</div>' +
        '        </div>';
    cont.appendChild(div);
    dais.toggle("ph_new", 1);
}

function addFolder(type) {
    var fol_name = document.getElementById("folder_name").value;
    var para = {
        json: {
            sid: s_guid,
            cid: id,
            phone: "18806097971",
            type: type,
            name: fol_name,
            src: "",
            memo: "",
            date: new Date().getTime(),
            replay: ""
        }
    };
    _wd.ajax_formdata(url + "/record/insert.do", true, para, function (msg) {
        var p = JSON.parse(msg).result;
        if (p > 0) {
            dais.toggle("ph_new", 0);
            toMenu("cl_photo");
        } else {
            _wd.info("创建失败！", "bgc24");
        }
    });
}

function addPhotos($id) {
    var record_id = $id;
    console.log(record_id);
    var para = {
        id: record_id,
    };
    console.log(para);
    _wd.ajax_formdata(url + "/record/queryById.do", true, para, function (msg) {
        if (m_Error(msg)) {
            var p = JSON.parse(msg);
            console.log(p);
            console.log(p.message);
            var ph_name = p.message.name;
            console.log(ph_name.length);
            if (ph_name.length > 10) {
                ph_name = ph_name.substring(0, 10) + "…";
            }
            var cont = document.getElementById("re_photo");
            cont.innerHTML = "";
            var div = document.createElement("div");
            div.className = "W11";
            div.innerHTML = '  <div class="top0 H W11 AC ffHT " id="ph_name">' + ph_name +
                '<div class="FL B4M H4M F2" onclick="dais.toggle(re_photo,0)"><b class="F3 ">&lt;</b>返回</div>' +
                '<div class="FR B4M H4M F2 color8" onclick=""></div>' +
                '</div>' +
                '<div class="bgc10 W11 P1M">' +
                '<div class="FL W43 color8 P05M AL ellips" id="ph_title">' + p.message.name +
                '</div>' +
                '<div  class="FR  rad03e bgcff P05M W41 AC relative" id="add_photo" >上传照片' +
                '</div>' +
                '<input type="file" id="up_photo" multiple="multiple" accept="image/*" class="none" capture="camera" >' +
                '<div class="clear">' +
                '</div>' +
                '</div>' +
                '<div class="W11 bgc10 PT1M" id="ph_list">' +

                '</div>';
            cont.appendChild(div);
            dais.toggle("re_photo", 1);
            var ua = navigator.userAgent.toLowerCase(); //判断是否是苹果手机，是则是true
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            if (isIos) {
                document.getElementById("up_photo").removeAttribute("capture");
            }
            var ph_img = document.getElementById("ph_list");
            ph_img.innerHTML = "";
            test.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " FL ML";
                div.onclick = function () {
                };
                div.innerHTML =
                    '<img class="A41 PB1M" src="../images/pic2.png" alt="">';
                ph_img.appendChild(div);
            });
            _wd.clear(ph_list);
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
                alert("抱歉，你的浏览器不支持 FileReader");
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
                    '<div class="FR B4M H4M F2 color8" onclick="">上传</div>' +
                    '</div>' +
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
                        console.log(imgMsg);
                        result = '<div class="pic44 AC"> <img class="relative" src="' + this.result + '" alt=""/></div>   ';
                        var div1 = document.createElement('div');
                        div1.innerHTML = result;
                        div1.className = "FL border M05 pic44 ofh";
                        document.getElementById("ch_list").appendChild(div1)
                        // document.getElementsByTagName('body')[0].appendChild(div1);  　　//插入dom树
                        var img = div1.getElementsByTagName('img')[0];
                        img.onload = function () {
                            var nowHeight = ReSizePic(this); //设置图片大小
                            this.parentNode.style.display = 'block';
                            var oParent = this.parentNode;
                            if (nowHeight) {
                                oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
                            }
                        };
                        div1.onclick = function () {
                            var r = confirm("确认删除？");
                            if (r == true) {
                                this.remove();                  // 在页面中删除该图片元素
                                delete dataArr[this.index];  // 删除dataArr对应的数据
                            }
                        };
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

            function ReSizePic(ThisPic) {
                var RePicWidth = D41; //这里修改为您想显示的宽度值
                var TrueWidth = ThisPic.width; //图片实际宽度
                var TrueHeight = ThisPic.height; //图片实际高度
                if (TrueWidth > TrueHeight) {
                    //宽大于高
                    var reWidth = RePicWidth;
                    ThisPic.width = reWidth;
                    //垂直居中
                    var nowHeight = TrueHeight * (reWidth / TrueWidth);
                    return nowHeight;  //将图片修改后的高度返回，供垂直居中用
                } else {
                    //宽小于高
                    var reHeight = RePicWidth;
                    ThisPic.height = reHeight;
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


