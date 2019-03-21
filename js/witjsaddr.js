/* 地址滚轮JavaScript Document Author: zhengzhe; 2015-10-30; V0.1.1 Adapter: 2016-11-1
 */
var potitle, uln, ulnl, last_obj, nextobj, LIST, rep_mes = "", repln = -2, scrollable = true;
var myevent = null;     //postmessage 传递后会丢失event句柄，因此无奈添加全局变量来保存第一次调用的句柄
function creat_addr(nl, area) {
    last_obj = event.srcElement;
    var old_adress = last_obj.value || last_obj.innerHTML || "";
    myevent = event;
    console.log(nl,area,old_adress);
    _wit.postmessage({
        functionname: "getseladdress",
        witparams: {ileve: nl, areacode: area, iniaddress: old_adress},
        callbackparam: JSON.stringify({nl: nl, area: area}),
        callback: "pass_addr"
    });
}
function pass_addr(msg, msg1) {
    if (msg.result >= 0) {
        try {
            var msgs = msg.message;
            if (last_obj.tagName == "INPUT") last_obj.value = msgs.output_txt;
            else last_obj.innerHTML = msgs.output_txt;
            last_obj.title = msgs.output_value;
            last_obj.blur();
        } catch (ex) {
            alert("error:" + ex);
        }
        if (last_obj.dataset.finp) {
            eval(last_obj.dataset.finp + "()")
        }
    } else {
        var params = JSON.parse(msg1);
        var nl = params.nl, area = params.area;
        if (typeof externalfun == "function") {
            creat_addr1(nl, area);
        }
        else {
            _fun.toAlert("请使用慧脑浏览器！");
            //var js = document.createElement("script");
            //js.src = "../js/addr_china.js";
            //document.body.appendChild(js);
            //js.onload = function () {
            //    creat_addr1(nl, area);
            //}
        }
    }
}
function creat_addr1(nl, area) {//nl代表列数，area代表行政区域范围，如33代表浙江；
    //last_obj=event.srcElement;
    document.body.style.overflow = "hidden";
    ulnl = nl;
    P_Value = function () {
        _fun.hide('s_select');
        if (last_obj.tagName == "INPUT") last_obj.value = document.getElementById("inputmess").innerHTML.rtrim("-");
        else last_obj.innerHTML = document.getElementById("inputmess").innerHTML.rtrim("-");
        last_obj.title = document.getElementById("ref_inf").innerHTML;
        if (last_obj.dataset.finp) {
            eval(last_obj.dataset.finp + "()")
        }
        document.body.style.overflow = "auto";
    }//传值给输入栏
    scroll_cent = function () {
        var ev = event ? event : myevent;
        ev.srcElement.parentNode.parentNode.scrollTop = ev.srcElement.offsetTop - ev.srcElement.parentNode.offsetTop - Math.floor(M * 12);
        ev.srcElement.parentNode.parentNode.title = ev.srcElement.innerHTML ? ev.srcElement.innerHTML : "";
    }//移动当前标签到中央
    stop_scroll = function () {
        var obj = event.srcElement.parentNode.parentNode, H = M * 4;
        setTimeout(function () {
            obj.childNodes[0].childNodes[Math.round(obj.scrollTop / (H)) + 3].click();
        }, 500);
    }
    show_result = function () {
        var tex = "",
            cobj = document.getElementById("sle").children;
        for (var i = 1; i <= nl; i++) {
            if (cobj[i].title)tex += cobj[i].title + "-";
        }
        document.getElementById("inputmess").innerHTML = tex.rtrim("-");
    }//显示选中的结果
    if (last_obj.innerHTML || last_obj.value) {
        rep_mes = (last_obj.innerHTML || last_obj.value).split("-");
        repln = rep_mes.length;
    }
    ;//获取原有地址
    var cont = '<div class="W11 H11 bgca" onClick="_fun.hide(&quot;s_select&quot);document.body.style.overflow = &quot;auto&quot;"></div><div class="fix bottom0 W11 H35M bgc102"><div class="FL MLT C9M H AC bgc9 ofa"><div id="inputmess" class="W11 H" >上拖查看邮编区号</div><div id="ref_inf" class="W11 H">邮编区号</div></div><div class="FL MLT BTN bgc16" onclick="P_Value()">确认</div><div id="sle" class="FL MLT A11 H28M" ><div class="no_event index999 absolute bottom13 W11 H bgc59 alpha2"></div>';
    for (var i = 0; i < nl; i++) {
        cont += '<div id="ul' + i + '" name="s" class="ofa FL H11 W' + nl + '1 bgc' + (1 + i) + '" ></div>'
    }
    document.getElementById('s_select').innerHTML = cont + '</div></div>';//设置滚轮框架
    document.getElementById("inputmess").innerHTML = last_obj.innerHTML;
    _fun.show('s_select');
    if (typeof externalfun == "function") {//慧脑PC浏览器
        getarealist(1, area)
    }
    else {//addr_china.js作为数据库
        getaddrlist = function (j, po) {
            scroll_cent(event ? event : myevent);
            if (myevent.srcElement.title == 'lasto' && myevent.srcElement.nextSibling.innerHTML) {
                document.getElementById('ref_inf').innerHTML = myevent.srcElement.parentNode.title
            }
            else if (po !== undefined) {
                document.getElementById('ref_inf').innerHTML = po
            }
            ;//传递行政代码
            nextobj = document.getElementById('sle').children[j];
            if (j > ulnl) {
                show_result();
            }
            else {
                j++;
                repln--;
                console.log(repln);
                var m = (repln > -2) ? 3 : 4,
                    cont = "<ul class='FL W11 AC color1'><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' onclick='getaddrlist(" + j + ")' title='lasto' >";
                if (po === undefined || po > 999999) {
                }
                else {
                    lnth = addr_china.length;
                    uln = 0;
                    a = (po == 11 || po == 12 || po == 31 || po == 50) ? po * 10000 : ((po > 9999) ? po * 1000 : po * 100),
                        b = (po == 11 || po == 12 || po == 31 || po == 50) ? a + 9999 : ((po > 9999) ? a + 999 : a + 99);
                    for (var i = 0; i < lnth; i = i + 2) {
                        if (addr_china[i] > b) {
                            break
                        }
                        else if (addr_china[i] > a) {
                            uln++;
                            cont += "<li class='W11 H bordB ofh' onclick='getaddrlist(" + j + "," + addr_china[i] + ")'>" + addr_china[i + 1] + "</li>"
                        }
                        ;
                        if (rep_mes[0] && addr_china[i + 1] == rep_mes[0]) {
                            m = (uln + 3);
                            rep_mes.shift();
                        }
                    }
                }
                ;
                cont += "<li class='none' onclick='getaddrlist(" + j + ")'><li class='W11 H'></li><li class='W11 H' ></li><li class='W11 H' ></li></ul>";
                nextobj.innerHTML = cont;
                nextobj.children[0].title = po;
                nextobj.addEventListener('touchend', stop_scroll, false);
                nextobj.addEventListener('mousewheel', stop_scroll, false);
                nextobj.childNodes[0].childNodes[m].click();
            }
        }
        getaddrlist(1, area);
    }
}
function getarealist(j, po) {
    var ev = event ? event : myevent;
    if (scrollable == true) {
        scroll_cent(ev);
        potitle = po;
        uln = j;
        if (ev.srcElement.title == 'lasto' && ev.srcElement.nextSibling.innerHTML) {
            document.getElementById('ref_inf').innerHTML = ev.srcElement.parentNode.title
        }
        else if (po !== undefined) {
            document.getElementById('ref_inf').innerHTML = po
        }
        ;//传递行政代码
        if (j > ulnl) {
            show_result();
        }
        else if (po === undefined || po > 999999) {
            getcontent()
        }
        else {
            var a = (po == 11 || po == 12 || po == 31 || po == 50) ? po * 10000 : ((po > 9999) ? po * 1000 : po * 100),
                b = (po == 11 || po == 12 || po == 31 || po == 50) ? a + 9999 : ((po > 9999) ? a + 999 : a + 99);
            console.log(JSON.stringify({functionname: "getaddress", witparams: {x: a, y: b}, callback: "getcontent"}));
            _wit.postmessage({functionname: "getaddress", witparams: {x: a, y: b}, callback: "getcontent"});
            scrollable = false;
        }
    }
}
function getcontent() {
    scrollable = true;
    var LIST = (arguments[0]) ? arguments[0].message : [];
    repln--;
    var m = (repln > -2) ? 3 : 4;
    nextobj = document.getElementById('sle').children[uln];
    uln++;
    var cont = "<ul class='FL W11 AC color1'><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' onclick='getarealist(" + uln + ")' title='lasto'></li>";
    for (var i = 0; i < LIST.length; i++) {
        cont += "<li class='W11 H bordT ofh' onclick='getarealist(" + uln + "," + LIST[i].addr_id + ")'>" + LIST[i].addr_name + "</li>";
        if (rep_mes[0] != "" && LIST[i].addr_name == rep_mes[0]) {
            m = (i + 4);
            rep_mes.shift();
        }
    }
    ;
    cont += "<li class='none' onclick='getarealist(" + uln + ")' ></li><li class='W11 H' ><li class='W11 H' ></li><li class='W11 H' ></li></ul>";
    nextobj.innerHTML = cont;
    nextobj.children[0].title = potitle;
    nextobj.addEventListener('touchend', stop_scroll, false);
    nextobj.addEventListener('mousewheel', stop_scroll, false);
    nextobj.childNodes[0].childNodes[m].click();
}//生成选项
