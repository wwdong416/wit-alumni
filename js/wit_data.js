/**
 * @author W.Dong
 * @date 2018/11/2
 * @Description:数据交互接口
*/
var url ="http://192.168.10.19:8080";
var id = _wd.getUrl().Cid;
var s_guid = parseInt(id.substring(0,7));
console.log(s_guid);
function m_Error(msg) {
    var p = JSON.parse(msg);
    if (p.result < 0){
        _wd.info("服务器异常！", "bgc24");
        return false;
    }
return true;
}
//班级信息
function class_message() {
    var classname = "";
    var para = {
        guid: s_guid,
    };
    var para1 = {
        guid: id,
    };
    _wd.ajax_formdata(url+"/school/queryByGuid.do", true, para, function (msg) {
        console.log(JSON.parse(msg));
       if (m_Error(msg)){
           var  p = JSON.parse(msg);
           classname = p.message[0].name;
       }else
       {
           console.log(1);
       }


    });
    _wd.ajax_formdata(url+"/class/queryByGuid.do", true, para1, function (msg) {
        console.log(JSON.parse(msg));
        if (m_Error(msg)){
            var  p = JSON.parse(msg);
            classname += p.message[0].name;
            console.log(classname);
            document.getElementById("class_name").innerText = classname+"班";
            document.getElementById("class_master").innerText = "班主任："+p.message[0].master;
        }

    });

}

function cl_information() {
    daisWH(6, 6);//设置默认座位表
    //添加通讯录
    var cont = document.getElementById("phone_list");
    cont.innerHTML = "";

    var para = {
        cid: id,
    };
    _wd.ajax_formdata(url+"/member/queryByCid.do", true, para, function (msg) {
        console.log(JSON.parse(msg));
        if (m_Error(msg)){
            var  p = JSON.parse(msg).message;
            p.forEach(function (v) {
                var div = document.createElement("div");
                div.className = " W11 H7M bordBD1";
                div.innerHTML = '<li class="absolute W11 H7M bordBD1 bgc10 ofh index9">' +
                    '<img class="FL B5M rad0 M" src="../images/pic1.png" alt=""> ' +
                    '<div class="FL  C8M MT05 LH2"> ' +
                    '<div class="FL W21 color876 bold ofh F3">'+v.name+'</div> ' +
                    '<div class="FR W21 AR color8 F3 ofh">'+v.dept+v.job+'</div> ' +
                    '<div class="FL W11 color8 F3 ellips AL">' +v.comp+
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
