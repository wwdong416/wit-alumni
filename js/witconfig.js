/* Author: ljj
 特殊配置
 */

var _cefQuery = typeof cefQuery != "undefined" ? true : false;
var _externalfun = typeof externalfun != "undefined" ? true : false;
var _sex_img = '../img/a/sex.jpg';
var _male_img = '../img/a/male.jpg';
var _female_img = '../img/a/female.jpg';
var _comp_img = '../img/a/factory.png';
var _imgpath = _externalfun ? externalfun.getimagepath() : "";

var _wit = {
    witknow: window.navigator.userAgent.indexOf("witknow") >= 0,
    guid: _externalfun ? externalfun.getitem("userguid") : localStorage.getItem("userguid"),
    userphone: _externalfun ? externalfun.getitem("userphone") : localStorage.getItem("userphone"),
    token: _externalfun ? externalfun.getitem("token") : localStorage.getItem("token"),
    imagepath: _externalfun ? externalfun.getitem("imagepath") : localStorage.getItem("imagepath"),
    imgpath: _externalfun ? externalfun.getimagepath() : localStorage.getItem("imgpath"),
    path: {
        local: "http://192.168.1.101:8080/",
        server: "http://121.43.233.185/"
    },
    cookie: function ($fun) {
        var fun = $fun, para = {
            userguid: _wit.guid,
            token: _fun.getCK("token")
        };
        _fun.ajax_formdata(_wit.path.server + "user/checktoken.do", true, para, function (msg) {
            console.log(msg);
        });
    },
    initObject: function (o) {
        var guid = _wit.guid;
        o.user_guid = guid;
        o.perobjectjson = {
            "local_id": 0,
            "user_phone": -1,
            "per_addr_list_id": 0,
            "per_unit_log": "",
            "per_portrait": "",
            "per_sex": 0,
            "per_group": "",
            "per_favorite": "",
            "per_phone2": 0,
            "per_phone1": 0,
            "per_phone0": 0,
            "per_range": 100,
            "per_position": "",
            "per_dept": "",
            "per_unit_pinyin": "",
            "per_unit_name": "",
            "per_unit_short_name": "",
            "per_pinyin": "",
            "per_allpinyin": "",
            "per_full_name": "",
            "per_nick_name": "",
            "per_last_name": "",
            "per_first_name": "",
            "per_english_name": "",
            "per_tel": "",
            "per_home_tel": "",
            "per_fax": "",
            "per_email": "",
            "per_email2": "",
            "per_qq": "",
            "per_webchat": "",
            "per_web": "",
            "per_yellow_page": "",
            "per_address": "",
            "per_unit_address": "",
            "per_unit_english_name": "",
            "per_unit_tel": "",
            "user_guid": guid,
            "per_portrait_life": "",
            "per_portrait_social": "",
            "per_industry": "",
            "per_busi_info": "",
            "per_other_url": "",
            "per_stage": "",
            "per_private": 0,
            "per_memo": "",
            "per_other_json": ''
        };
        o.perconsumeobjectjson = {
            "per_consume_id": 0,
            "per_addr_list_id": 0,
            "per_dress_size": -1,
            "per_height": -1,
            "per_shoulder_width": -1,
            "per_bust": -1,
            "per_pants_size": -1,
            "per_beltline": -1,
            "per_buttocks": -1,
            "per_pants_height": -1,
            "per_shoes_size": -1,
            "per_cigarette": "",
            "per_cigarette_num": -1,
            "per_wine": "",
            "per_wine_num": -1,
            "per_tea": "",
            "per_flavor": "",
            "per_cuisines": "",
            "per_food": "",
            "per_snacks": "",
            "per_pet": "",
            "per_toys": "",
            "per_private": 0,
            "per_user_guid": guid,
            "local_per_id": 0,
            "local_id": 0
        };
        o.perprivacyobjectjson = {
            "per_privacy_id": 0,
            "per_addr_list_id": 0,
            "per_ident": "",
            "per_country": "",
            "per_ancestral": "",
            "per_census_addr": "",
            "per_nation": "",
            "per_faith": "",
            "per_party": "",
            "per_party_position": "",
            "per_education": "",
            "per_job_title": "",
            "per_occupation": "",
            "per_speciality": "",
            "per_bank_name": "",
            "per_bank_count": "",
            "per_alipay": "",
            "local_per_id": 0,
            "local_id": 0,
            "per_private": 0,
            "per_user_guid": guid
        };
        o.persocialinforobjectjson = {
            "per_social_infor_id": 0,
            "per_addr_list_id": 0,
            "per_contact_purpose": "",
            "per_giving_field": "",
            "per_marriage": -1,
            "per_children": -1,
            "per_birth_date": "",           //出生年月
            "per_birthday": "",             //阳历生日
            "per_birth_lunar": "",          //阴历生日
            "per_zodiac": -1,
            "per_constellation": -1,
            "per_enneagram": "",
            "per_character": "",
            "per_sport_hobby": "",
            "per_ent_hobby": "",
            "per_leisure_hobby": "",
            "per_culture_hobby": "",
            "per_read_hobby": "",
            "per_read_time": -1,
            "per_tv_hobby": "",
            "per_tv_time": -1,
            "per_like_idol": "",
            "per_motto": "",
            "per_user_guid": guid,
            "local_per_id": 0,
            "local_id": 0,
            "per_private": 0
        };
        o.perexpjobjson = "";
        o.perexpeducationjson = "";
        o.perexpotherjson = "";
    },
    initCard: function (o) {
        var guid = _wit.guid;
        o.user_guid = guid;
        o.per_addr_list = {
            "local_id": 0,
            "user_phone": -1,
            "per_addr_list_id": 0,
            "per_unit_log": "",
            "per_portrait": "",
            "per_sex": 0,
            "per_group": "",
            "per_favorite": "",
            "per_phone2": 0,
            "per_phone1": 0,
            "per_phone0": 0,
            "per_range": 100,
            "per_position": "",
            "per_dept": "",
            "per_unit_pinyin": "",
            "per_unit_name": "",
            "per_unit_short_name": "",
            "per_pinyin": "",
            "per_allpinyin": "",
            "per_full_name": "",
            "per_nick_name": "",
            "per_last_name": "",
            "per_first_name": "",
            "per_english_name": "",
            "per_tel": "",
            "per_home_tel": "",
            "per_fax": "",
            "per_email": "",
            "per_email2": "",
            "per_qq": "",
            "per_webchat": "",
            "per_web": "",
            "per_yellow_page": "",
            "per_address": "",
            "per_unit_address": "",
            "per_unit_english_name": "",
            "per_unit_tel": "",
            "user_guid": guid,
            "per_portrait_life": "",
            "per_portrait_social": "",
            "per_industry": "",
            "per_busi_info": "",
            "per_other_url": "",
            "per_stage": "",
            "per_private": 0,
            "per_memo": "",
            "per_other_json": ''
        };
        o.per_consume = {
            "per_consume_id": 0,
            "per_addr_list_id": 0,
            "per_dress_size": 0,
            "per_height": 0.0,
            "per_shoulder_width": 0.0,
            "per_bust": 0.0,
            "per_pants_size": 0,
            "per_beltline": 0.0,
            "per_buttocks": 0.0,
            "per_pants_height": 0.0,
            "per_shoes_size": 0.0,
            "per_cigarette": "",
            "per_cigarette_num": 0,
            "per_wine": "",
            "per_wine_num": 0,
            "per_tea": "",
            "per_flavor": "",
            "per_cuisines": "",
            "per_food": "",
            "per_snacks": "",
            "per_user_guid": guid,
            "per_toys": "",
            "per_private": 0,
            "per_pet": "",
            "local_per_id": 0,
            "local_id": 0
        };
        o.per_privacy = {
            "per_privacy_id": 0,
            "per_addr_list_id": 0,
            "per_ident": "",
            "per_country": "",
            "per_ancestral": "",
            "per_census_addr": "",
            "per_nation": "",
            "per_faith": "",
            "per_party": "",
            "per_party_position": "",
            "per_education": "",
            "per_job_title": "",
            "per_occupation": "",
            "per_speciality": "",
            "per_bank_name": "",
            "per_bank_count": "",
            "per_alipay": "",
            "local_per_id": 0,
            "local_id": 0,
            "per_private": 0,
            "per_user_guid": guid
        };
        o.per_social_infor = {
            "per_social_infor_id": 0,
            "per_addr_list_id": 0,
            "per_contact_purpose": "",
            "per_giving_field": "",
            "per_marriage": 0,
            "per_children": 0,
            "per_birth_date": "",           //出生年月
            "per_birthday": "",             //阳历生日
            "per_birth_lunar": "",          //阴历生日
            "per_zodiac": 0,
            "per_constellation": 0,
            "per_enneagram": "",
            "per_character": "",
            "per_sport_hobby": "",
            "per_ent_hobby": "",
            "per_leisure_hobby": "",
            "per_culture_hobby": "",
            "per_read_hobby": "",
            "per_read_time": 0,
            "per_tv_hobby": "",
            "per_tv_time": 0,
            "per_like_idol": "",
            "per_user_guid": guid,
            "per_motto": "",
            "local_per_id": 0,
            "local_id": 0,
            "per_private": 0
        };
        o.per_exp_job = "";
        o.per_exp_education = "";
        o.per_exp_other = "";
    },
    postmessage: function (obj) {
        obj.classname = "self";
        var json = JSON.stringify(obj);
        try {
            window.webkit.messageHandlers.witwebview.postMessage(json);//IOS
        }
        catch (e) {
            try {
                window.witwebview.postMessage(json);//Android-pc
            }
            catch (e) {
                try {
                    witwebview.postMessage(json);//PC
                }
                catch (e) {
                    obj.callback && eval(obj.callback + "({result:-1,status:0,message:'直接调用'},'" + obj.callbackparam + "')");   //web
                    //throw e
                }
            }
        }
    },
    /*———————————extend—————————————*/
    //浅度拷贝
    extend: function (o, n, override) {
        for (var p in n) {
            if (n.hasOwnProperty(p)) {
                if (n[p] == "" || n[p] == -1 || n[p] == undefined) continue;
                if (!o.hasOwnProperty(p) || override) o[p] = n[p];
            }
        }
    },
    //深度拷贝
    extendDeep: function (o, n, override) {
        for (var p in n) {
            if (o.hasOwnProperty(p) && typeof (o[p]) == "object") {
                _wit.extendDeep(o[p], n[p], override);
                continue;
            }
            if (n[p] == "" || n[p] == -1 || n[p] == undefined) continue;
            if (!o.hasOwnProperty(p) || override) o[p] = n[p];
        }
    },
    //浅度覆盖
    override: function (o, n, override) {//override——n如果为对象是否会覆盖o
        for (var p in o) {
            if (n.hasOwnProperty(p)) {
                if (n[p] == "" || n[p] == -1 || n[p] == undefined) continue;
                if (typeof n[p] != "object" || override) o[p] = n[p];
            }
        }
    },
    //深度覆盖
    overrideDeep: function (o, n, override) {
        for (var p in o) {
            if (n.hasOwnProperty(p) && typeof (o[p]) == "object") {
                _wit.overrideDeep(o[p], n[p], override);
                continue;
            }
            if (n[p] == "" || n[p] == -1 || n[p] == undefined) continue;
            if (n.hasOwnProperty(p) && (typeof n[p] != "object" || override)) o[p] = n[p];
        }
    },
    //+4 demo
    demo1: function () {
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.extend(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.extend(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.extendDeep(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.extendDeep(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.override(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.override(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.overrideDeep(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _wit.overrideDeep(x, y, true);
        console.log(x);
    },

    modelSelect: function ($d, $f) {
        var d = typeof $d == "string" ? document.querySelector("#" + $d) : $d, f = $f;
        var t = d.dataset.t || "radio", tt = t == "radio" ? "radio" : "check",
            s = d.dataset.s.split(","), ss = tt == "check" ? d.dataset.ss.split(",") : d.dataset.ss.split(",")[0];
        s.forEach(function (v) {
            var li = document.createElement("li"), index = ss.indexOf(v);
            li.className = 'FL MLT H A21 AL ' + tt + (index >= 0 ? " bgc56 " : " bgc10 ");
            li.innerHTML = '<span class="FL ML H">' + v + '</span><img class="FR POT" src="../img/btn/' + tt + (index >= 0 ? "_1" : "_0") + '.png" />';
            li.onclick = function () {
                var select = this.classList.contains("bgc56");
                if (select && tt != "radio") {
                    ss.splice(index, 1);
                    d.dataset.ss = ss.join(",");
                    this.className = this.className.replace(/bgc56/i, "bgc10");
                } else if (tt == "radio") {
                    d.dataset.ss = v;
                    Array.prototype.forEach.call(d.querySelectorAll("li"), function (vv) {
                        vv.className = vv.className.replace(/bgc56/i, "bgc10");
                        vv.querySelector("img").src = "../img/btn/radio_0.png";
                    });
                    this.className = this.className.replace(/bgc10/i, "bgc56");
                    this.querySelector("img").src = "../img/btn/radio_1.png";
                    return;
                } else {
                    ss.push(v);
                    d.dataset.ss = ss.join(",");
                    this.className = this.className.replace(/bgc10/i, "bgc56");
                }
                this.querySelector("img").src = "../img/btn/" + tt + (select ? "_0" : "_1") + ".png";
            };
            d.appendChild(li);
        });
    },      //生成嵌入式选择模版（可多选）
    event: {
        input_del: function ($cb) {
            var list = document.querySelectorAll("input[data-t~='clear']"), cb = $cb || function () {
                    console.log("clear call back;");
                };
            Array.prototype.forEach.call(list, function (v, i) {
                var del = v.nextElementSibling && v.nextElementSibling.title == "quick";
                if (!del) {
                    var t = v.nextElementSibling, p = v.parentNode;
                    var div = document.createElement("div");
                    div.className = "FL MLNH B4M H ofa alpha " + (v.classList.contains("MT") || v.classList.contains("MLT") ? "MT" : "");
                    div.title = "quick";
                    div.innerHTML = '<img title="del" src="../img/btn/del.png" class="FL B4M H">';
                    del = p.insertBefore(div, t);
                } else del = v.nextElementSibling;
                if (v.value.trim().length > 0) del.classList.remove("none");
                else del.classList.add("none");
                del.addEventListener("click", function () {
                    v.value = "";
                    cb(v, i, list);
                    this.classList.add('none');
                }, false);
                v.addEventListener("input", function () {

                    if (this.value.trim().length > 0) del.classList.remove("none");
                    else del.classList.add("none");
                }, false);
            });
        },       //自定义输入栏——删除×
        input_limit: function () {
            var list = document.querySelectorAll("input[data-tt],textarea[data-tt]"), $this = this;
            Array.prototype.forEach.call(list, function (v, i) {
                var t = v.dataset.tt.split(/[ ,-]/);
                if (t.indexOf("up") >= 0) {
                    v.removeEventListener("focus", $this.binder.up);
                    v.addEventListener("focus", $this.binder.up, false);
                }
                if (t.indexOf("number") >= 0) {
                    var input = v.oninput, keydown = v.onkeydown;
                    //console.log(input, keydown);
                    v.onkeydown = function () {
                        var key = event.keyCode || event.which, ctrl = event.ctrlKey;
                        //console.log(key);
                        var ctrlList = [65, 67, 86, 90];//ctrl+a,c,v,z
                        var otherList = [8, 9, 37, 38, 39, 40, 46];//backspace-tag-←↑→↓-delete
                        if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) return true;
                        else if (otherList.indexOf(key) >= 0) return true;
                        else if (ctrl && (ctrlList.indexOf(key) >= 0)) return true;
                        if (keydown) keydown();
                        return false;
                    };
                    v.oninput = function () {
                        v.value = v.value.replace(/\D/g, "");
                        if (input) input();
                    }
                }
                if (t.indexOf("enter") >= 0) {
                    var link = v.dataset.enter;
                    if (!link) return false;
                    v.removeEventListener("keydown", $this.binder.enter, false);
                    v.addEventListener("keydown", $this.binder.enter, false);
                }
                if (t.indexOf("nochina") >= 0) {
                    var input = v.oninput, keydown = v.onkeydown;
                    v.oninput = function () {
                        if (/[\u4E00-\uD7FB]/g.test(v.value))
                            v.value = v.value.replace(/[\u4E00-\uD7FB]/g, '');      //个人测试目前最大中文编码：D7EE-ퟮ
                        if (input) input();
                    }
                }
            });
        },        //输入栏——输入限制
        input_UI: function ($d, $f) {         //自定义输入栏——单选-多选(自定义)——遮罩层，回调
            var list = document.querySelectorAll("input[data-t]"),
                d = typeof $d == "string" ? document.querySelector("#" + $d) : $d;
            var f = $f || function () {
                };
            Array.prototype.forEach.call(list, function (v) {
                var t = v.dataset.t;
                if (!t || ["radio", "radios", "check", "checks"].indexOf(t) < 0) return;
                var click_ = function () {
                    var s = (v.dataset.arr && eval(v.dataset.arr).join(",")) || v.dataset.s, html = "";
                    if (t == "web") {
                        html += "" +
                            "<div class='W11 H8M bgc102'>" +
                            "<div class='W11 F4 LH2 AC '>联网选择器</div>" +
                            "<input id='inputmess' type='text' class='FL ML C9M H ALP' placeholder='输入自定义选项' value='" + last_obj.value + "'/>" +
                            "<div class='FR MR BTN bgc16' onClick='P_V()'>确定</div>" +
                            "</div>" +
                            "<iframe class='clear W11 CHN2H ofa' src='" + s + "' ></iframe>";
                    } else {
                        html += '<div id="UI_bk" class="W11 H11 bgca"></div>' +
                            '<div id="UI_content" class="fix bottom0 W11 CHmax bgc102 PB1M ofa">';
                        if (s || s == "") {
                            var arr = s.split(",").filter(function (v) {
                                return v != "";
                            }), vl = v.value.split(",").filter(function (v) {
                                return v != "";
                            });
                            var liwidth = arr.length < 9 ? "A1T2" : (arr.length < 17 ? "D21" : "D31");
                            if (t == "radio") {
                            } else if (t == "radios") {
                                html += "<div id='UI_confirm' class='FR MRT H bgc16 ALP " + liwidth + "'>确认</div>";
                            } else if (t == "check" || t == "checks") {
                                var v_arr = v.value.split(","), sub = [];
                                for (var v_i in v_arr) {
                                    if (arr.indexOf(v_arr[v_i]) < 0) sub.push(v_arr[v_i]);
                                }
                                html += "<input id='UI_new' type='text' class='FL MLT C9M H ALP' placeholder='输入自定义选项' value='" + sub.join(",") + "'/>" +
                                    "<div id='UI_confirm' class='FR MRT BTN bgc16'>确定</div>";
                            }
                            for (var i = 0; i < arr.length; i++) {
                                html += "<li class='FL MLT H ALP ellips " + liwidth + (t == "radio" ? " rad " : " radem ") + (vl.indexOf(arr[i]) >= 0 ? "bgc56" : "bgc10") + " '>" + arr[i] + "</li>"
                            }
                            html += '</div></div>';
                        }
                    }
                    d.innerHTML = html;
                    _fun.show(d);
                    var top = document.documentElement.scrollTop;       //保存当前scrollTop，还原可以滚动时还原滚动高度
                    var ttop = this.offsetTop;
                    var ch = document.documentElement.clientHeight;     //用于计算向上滚动
                    //document.body.style.position = "fixed";              //兼容移动端除了chrome外浏览器hidden无法生效，不过会导致回到页首
                    document.body.style.overflow = "hidden";
                    d.querySelector("#UI_bk").onclick = function () {
                        _fun.hide(d);
                        document.body.style.position = "";
                        document.body.style.overflow = "";
                        document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                        f(-1);
                    };
                    if (d.querySelector("#UI_confirm")) {
                        var n = d.querySelector("#UI_new");
                        n && (n.onfocus = function () {
                            var ui = document.querySelector("#UI_content");
                            ui.classList.remove("bottom0");
                            ui.classList.add("top0");
                        });
                        d.querySelector("#UI_confirm").onclick = function () {
                            v.title = -1;
                            var opt = "";
                            if (t == "check") {
                                opt = n.value.trim("").trim(",");
                                v.value = opt;
                            } else if (t == "checks") {
                                var sl = d.querySelectorAll("#UI_content li[class*=bgc56]"), nv = n.value.trim().trim(","),
                                    sv = Array.prototype.map.call(sl, function (v) {
                                        return v.innerHTML;
                                    }).join(",").trim(",");
                                v.value = (nv + "," + sv).trim(",");
                            } else if (t == "radios" || t == "radio") {
                                opt = v.value;
                            }
                            f(-1, opt, v);
                            _fun.hide(d);
                            document.body.style.position = "";
                            document.body.style.overflow = "";
                            document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                        };
                    }
                    var lilist = d.querySelectorAll("li");
                    Array.prototype.forEach.call(lilist, function (vv, ii) {
                        var click = function () {
                            if (t == "radio" || t == "check") {
                                _fun.hide(d);
                                document.body.style.position = "";
                                document.body.style.overflow = "";
                                document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                                if (vv.classList.contains("bgc56")) {
                                    v.value = "";
                                    v.title = -1;
                                } else {
                                    v.value = vv.innerHTML;
                                    v.title = ii;
                                }
                                f(ii, vv.innerHTML, v);
                            } else if (t == "radios" || t == "checks") {
                                var vl = v.value.trim().trim(",").split(",");
                                if (vv.classList.contains("bgc56")) {
                                    vl.splice(vl.indexOf(vv.innerHTML), 1);
                                    v.value = vl.join(",").trim(",");
                                } else {
                                    vl.push(vv.innerHTML);
                                    v.value = vl.join(",").trim(",");
                                }
                                this.classList.toggle("bgc56");
                                this.classList.toggle("bgc10");
                            }
                        };
                        vv.removeEventListener("click", click, false);
                        vv.addEventListener("click", click, false);
                    });
                };
                v.removeEventListener("click", click_, false);
                v.addEventListener("click", click_, false);
                v.addEventListener("focus", function () {
                    v.blur();
                })
            });
        },     //自定义UI选择栏——INPUT
        div_UI: function ($d, $f) {         //自定义输入栏——单选-多选(自定义)——遮罩层，回调
            var list = document.querySelectorAll("div[data-t]"),
                d = typeof $d == "string" ? document.querySelector("#" + $d) : $d;
            var f = $f || function () {
                };
            Array.prototype.forEach.call(list, function (v) {
                var t = v.dataset.t;
                if (!t || ["radio", "radios", "check", "checks"].indexOf(t) < 0) return;
                var click_ = function () {
                    var s = (v.dataset.arr && eval(v.dataset.arr).join(",")) || v.dataset.s, html = "";
                    if (t == "web") {
                        html += "" +
                            "<div class='W11 H8M bgc102'>" +
                            "<div class='W11 F4 LH2 AC '>联网选择器</div>" +
                            "<input id='inputmess' type='text' class='FL ML C9M H ALP' placeholder='输入自定义选项' value='" + last_obj.value + "'/>" +
                            "<div class='FR MR BTN bgc16' onClick='P_V()'>确定</div>" +
                            "</div>" +
                            "<iframe class='clear W11 CHN2H ofa' src='" + s + "' ></iframe>";
                    } else {
                        html += '<div id="UI_bk" class="W11 H11 bgca"></div>' +
                            '<div id="UI_content" class="fix bottom0 W11 CHmax bgc102 PB1M ofa">';
                        if (s || s == "") {
                            var arr = s.split(",").filter(function (v) {
                                return v != "";
                            }), vl = v.innerHTML.split(",").filter(function (v) {
                                return v != "";
                            });
                            var liwidth = arr.length < 9 ? "A1T2" : (arr.length < 17 ? "D21" : "D31");
                            if (t == "radio") {
                            } else if (t == "radios") {
                                html += "<div id='UI_confirm' class='FR MRT H bgc16 ALP " + liwidth + "'>确认</div>";
                            } else if (t == "check" || t == "checks") {
                                var v_arr = v.innerHTML.split(","), sub = [];
                                for (var v_i in v_arr) {
                                    if (arr.indexOf(v_arr[v_i]) < 0) sub.push(v_arr[v_i]);
                                }
                                !v.title && (sub = []);
                                html += "<input id='UI_new' type='text' class='FL MLT C9M H ALP' placeholder='输入自定义选项' value='" + sub.join(",") + "'/>" +
                                    "<div id='UI_confirm' class='FR MRT BTN bgc16'>确定</div>";
                            }
                            for (var i = 0; i < arr.length; i++) {
                                html += "<li class='FL MLT H ALP ellips " + liwidth + (t == "radio" ? " rad " : " radem ") + (vl.indexOf(arr[i]) >= 0 ? "bgc56" : "bgc10") + " '>" + arr[i] + "</li>"
                            }
                            html += '</div></div>';
                        }
                    }
                    d.innerHTML = html;
                    _fun.show(d);
                    var top = document.documentElement.scrollTop;                   //保存当前scrollTop，还原可以滚动时还原滚动高度
                    var ttop = this.offsetTop;
                    var ch = document.documentElement.clientHeight;      //用于计算向上滚动
                    //document.body.style.position = "fixed";              //兼容移动端除了chrome外浏览器hidden无法生效，不过会导致回到页首
                    document.body.style.overflow = "hidden";
                    d.querySelector("#UI_bk").onclick = function () {
                        _fun.hide(d);
                        document.body.style.position = "";
                        document.body.style.overflow = "";
                        document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                        f(-1);
                    };
                    if (d.querySelector("#UI_confirm")) {
                        var n = d.querySelector("#UI_new");
                        n.onfocus = function () {
                            var ui = document.querySelector("#UI_content");
                            ui.classList.remove("bottom0");
                            ui.classList.add("top0");
                        };
                        d.querySelector("#UI_confirm").onclick = function () {
                            v.title = -1;
                            var opt = "";
                            if (t == "check") {
                                opt = n.value.trim("").trim(",");
                                if (opt.length <= 0) {
                                    n.focus();
                                    return;
                                }
                                v.innerHTML = opt;
                            } else if (t == "checks") {
                                var sl = d.querySelectorAll("#UI_content li[class*=bgc56]"), nv = n.value.trim().trim(","),
                                    sv = Array.prototype.map.call(sl, function (v) {
                                        return v.innerHTML;
                                    }).join(",").trim(",");
                                v.innerHTML = (nv + "," + sv).trim(",");
                            } else if (t == "radios" || t == "radio") {
                                opt = v.innerHTML;
                            }
                            f(-1, opt, v);
                            _fun.hide(d);
                            document.body.style.position = "";
                            document.body.style.overflow = "";
                            document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                        };
                    }
                    var lilist = d.querySelectorAll("li");
                    Array.prototype.forEach.call(lilist, function (vv, ii) {
                        var click = function () {
                            if (t == "radio" || t == "check") {
                                _fun.hide(d);
                                document.body.style.position = "";
                                document.body.style.overflow = "";
                                document.documentElement.scrollTop = ttop - ch / 2 + M * 5;
                                if (vv.classList.contains("bgc56")) {
                                    v.innerHTML = "";
                                    v.title = -1;
                                } else {
                                    v.innerHTML = vv.innerHTML;
                                    v.title = ii;
                                }
                                f(ii, vv.innerHTML, v);
                            } else if (t == "radios" || t == "checks") {
                                var vl = v.innerHTML.trim().trim(",").split(",");
                                if (vv.classList.contains("bgc56")) {
                                    vl.splice(vl.indexOf(vv.innerHTML), 1);
                                    v.innerHTML = vl.join(",").trim(",");
                                } else {
                                    vl.push(vv.innerHTML);
                                    v.innerHTML = vl.join(",").trim(",");
                                }
                                this.classList.toggle("bgc56");
                                this.classList.toggle("bgc10");
                            }
                        };
                        vv.removeEventListener("click", click, false);
                        vv.addEventListener("click", click, false);
                    });
                };
                v.removeEventListener("click", click_, false);
                v.addEventListener("click", click_, false);
                v.addEventListener("focus", function () {
                    v.blur();
                })
            });
        },       //自定义UI选择栏——DIV
        input_readonly: function () {
            var il = document.querySelectorAll("input[readonly]");
            Array.prototype.forEach.call(il, function (v) {
                v.addEventListener("focus", function () {
                    this.blur();
                }, false);
            });
        },     //兼容ios不接受input的readonly属性
        select_start: function ($fun) {
            var select = $fun || false;
            document.body.onselectstart = function () {
                return select;
            };
        },
        context_menu: function ($fun) {
            var select = $fun || false;
            document.body.oncontextmenu = function () {
                return select;
            };
        },
        binder: {
            up: function () {
                var t = this.offsetTop, d = this.dataset.rol && document.querySelector("#" + d), r = this.dataset.tar, f = this.dataset.call;
                if (f) {
                    eval(f + "(this)");
                } else if (d) {
                    d.scrollTop = t - (CW < CH ? M * 9 : M * 4);
                } else {
                    document.documentElement.scrollTop = t - (CW < CH ? M * 9 : M * 4); //4M为一般情况下的fix高度预留
                    document.body.scrollTop = t - (CW < CH ? M * 9 : M * 4);
                }
            },          //
            enter: function () {
                var key = event.keyCode || event.which, link = this.dataset.enter;
                if (key == 13) document.querySelector("#" + link).click();
                return false;
            }
        }                           //特殊事件句柄
    },          //特殊事件处理

    //
    winclose: function () {
        this.postmessage({
            functionname: "closeappwindow",
            callback: "window.close"
        });
    },
    /*———————————base—————————————*/
    $: function ($q) {
        var q = $q.trim();
        if (q.search(/^\#/g) >= 0) return document.querySelector(q);
        else if (q.search(/^\./g) >= 0) return document.querySelectorAll(q);
        else if (q.search(/^\[/g) >= 0) return document.querySelectorAll(q);
        else return document.querySelectorAll(q)
    }
};

var _fun = {

    _sto: null, //setTimeout全局
    /*———————————function—————————————*/
    //
    doClick: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.click();
    },                     //句柄点击
    clearId: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (obj) {
            switch (obj.tagName) {
                case "IMG":
                    obj.src = "";
                    break;
                case "INPUT":
                    obj.value = "";
                    break;
                default:
                    obj.innerHTML = "";
                    break;
            }
        }
    },                     //清除对象内容
    show: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (obj.classList.contains("none")) obj.classList.remove("none");
        if (obj.style.display == "none") obj.style.display = "";
        return this;
    },                        //对象显示（display）
    hide: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.classList.add("none");
        obj.style.display = "none";
        return this;
    },                        //对象隐藏（display）
    toggle: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        var syn = obj.classList.contains("none") || obj.style.display == "none";
        if (syn) {
            obj.classList.remove("none");
            obj.style.display = "";
        } else {
            obj.classList.add("none");
            obj.style.display = "none";
        }
        return this;
    },                      //对象切换显示（display）
    slider: function ($obj, $para) {
        var obj = $obj, para = $para;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        for (var i in para) {
            if (!obj[i]) obj[i] = para[i][0];
            else {
                var ix = para[i].indexOf(obj[i]) >> 0;
                //console.log(para[i], i, obj[i], ix);
                obj[i] = para[i][(ix + 1) % para[i].length];
            }
        }
    },               //对象切换显示:para({img:[1,2,3]})
    radioClick: function ($dom, $attrObject, $allOff, $callback, $initIndex) {
        var d = $dom, attr = $attrObject || {attr: {on: "", off: ""}}, syn = $allOff,
            fun = $callback || function () {

                }, initIndex = $initIndex;
        if (typeof d == "string") d = document.querySelector("#" + d);
        d.dataset.radio = initIndex || -1;
        var dl = d.children;
        if (dl.length > 0) {
            Array.prototype.forEach.call(dl, function (v, i) {
                v.onclick = function () {
                    var index = d.dataset.radio, refresh = false;
                    var attr_;              //当属性为数组列表时，保存上次存在的对象，省略相同属性时选用
                    //console.log(index, i, syn);
                    if (index == i) {
                        syn && (d.dataset.radio = -1);       //可以空选
                        refresh = true;
                    } else d.dataset.radio = i;
                    if (typeof attr == "object" && attr instanceof Array) {
                        Array.prototype.forEach.call(dl, function (v, k) {
                            if (attr[k]) attr_ = attr[k];
                            var theAttr = attr[k] || attr_;
                            for (var j in theAttr) {
                                v[j] = theAttr[j].off;
                            }
                        });
                    } else {
                        Array.prototype.forEach.call(dl, function (v) {
                            for (var j in attr) {
                                v[j] = attr[j].off;
                            }
                        });
                    }
                    index = d.dataset.radio >> 0;
                    if (index >= 0) {
                        if (typeof attr == "object" && attr instanceof Array) {
                            var theAttr = attr[index] || attr_;
                            for (var j in theAttr) {
                                v[j] = theAttr[j].on;
                            }
                        } else
                            for (var j in attr) {
                                v[j] = attr[j].on;
                            }
                        fun({d: d, index: index, refresh: refresh});
                    }
                }
            });
        }
    },      //单选——被动事件绑定型（attrObject：切换属性 attrObject-PS: {className:{on:"",off:""}}，allOff：是否重选， callback：回调， initIndex：初始化索引）
    radio: function ($parent, $obj, $paraY, $paraN, $none, $fun, $initIndex) {
        var obj = $obj, parent = $parent, paraY = $paraY, paraN = $paraN, none = $none, fun = $fun, initIndex = $initIndex;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (typeof parent == "string") parent = document.querySelector("#" + parent);
        var list = parent.children, radio = parent.dataset.radio || initIndex, index = initIndex, fresh = false;       //记录索引和重复选中
        for (var i in list) {
            if (i == "length") break;
            if (typeof paraN == "object" && paraN instanceof Array) {
                for (var ii in paraN[i]) {
                    list[i][ii] = paraN[i][ii];
                }
            }   //paraN为数组情况——即外部非选中dom有着不同的属性
            else {
                for (var ii in paraN) {
                    list[i][ii] = paraN[ii];
                }
            }   //paraN为对象情况——即外部非选中dom有着共同的属性
            if (obj === list[i]) {
                index = i;
                parent.dataset.radio = i;
                if (radio == i) {
                    fresh = true;
                    if (none) continue;  //允许无选情况
                }   //重复选中
                for (var ii in paraY) {
                    obj[ii] = paraY[ii];
                }   //置换唯一属性（选中）
            }
        }
        if (fun) fun({index: index, former: radio, refresh: fresh});
    },      //单选——（para:父对象-目标对象-目标属性 如{className:'',name:''}-其他属性 如{className:'',name:''}-允许无选-回调）
    radioShow: function ($parent, $obj) {
        var obj = $obj, parent = $parent;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (typeof parent == "string") parent = document.querySelector("#" + parent);
        var list = parent.children;
        for (var i in list) {
            if (i == "length") break;
            if (obj == list[i]) {
                _fun.show(list[i]);
                continue;
            }
            _fun.hide(list[i]);
        }
    },          //单选切换显示
    radioFun: function ($p, $t, $y, $n) {
        var t = $t, p = $p, y = $y || function () {

            }, n = $n || function () {

            }, l;
        typeof t == "string" && (t = document.getElementById(t));
        typeof p == "string" && (p = document.getElementById(p));
        l = p.children;
        Array.prototype.forEach.call(l, function (v, i, d) {
            v == t ? y(v, i, d) : n(v, i, d);
        });
    },          //单选回调
    radioClass: function ($d, $c) {
        var d = $d, c = $c.split(","), p = d.parentNode;
        Array.prototype.forEach.call(p.children, function (v) {
            c.forEach(function (vv) {
                v.classList.remove(vv);
            });
        });
        c.forEach(function (vv) {
            d.classList.add(vv);
        });
    },                //单选切换（classList——单class简易版）
    html: function ($obj, $html) {
        var obj = $obj, html = $html;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.innerHTML = html;
    },                 //内容填充
    visishow: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.classList.remove("hidden");
        obj.style.visiable = "";
    },                    //切换内容
    visihide: function ($obj) {
        var obj = $obj;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        obj.classList.add("hidden");
        obj.style.visiable = "hidden";
    },
    getPara: function ($obj) {
        var obj = $obj, para = {};
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        Array.prototype.forEach.call(obj.querySelectorAll("[data]"), function (v) {
            var tag = v.tagName;
            if (tag == "INPUT" || tag == "TEXTAREEA") para[v.id] = v.value;
            else if (tag == "IMG") para[v.id] = v.src;
            else para[v.id] = v.innerHTML;
        });
        return para;
    },                     //自动生成提交表单对象
    previewImage: function (file, para, id, callback, loading) {
        if (file.files && file.files[0]) {
            loading && this.toLoading();
            var img = id;
            if (typeof id == "string") img = document.querySelector("#" + id);
            img.onload = function () {
                loading && this.toLoading(-1);
                img.width = para.width ? para.width : 320;
                img.height = para.height ? para.height : 240;
                callback && callback(file.files[0], img, para);
            }.bind(this);
            var reader = new FileReader();
            reader.onloadend = function (e) {
                console.log(img, e, reader, this);
                var base64 = reader.result;
                //var blob = this.base64ToBlob(base64);
                //img.src = URL.createObjectURL(blob);
                img.src = base64;
            }.bind(this);
            //console.log(URL.createObjectURL(file.files[0]));
            reader.readAsDataURL(file.files[0]);
        }
    },      //图片上传预览
    compressImage: function ($img, $para, $mime, $callback) {
        var img = $img, para = $para, fun = $callback, mime = $mime;
        if (typeof img == "string") img = document.querySelector("#" + img);
        if (typeof fun != "function") fun = function () {
        };
        if (typeof para != "object") para = {width: 480, height: 270, quality: 100};

        var files = event.target.files;
        for (var j = 0, f; f = files[j]; j++) {
            //console.log(f.size);
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onloadend = function () {
                //return function (e) {
                var i = document.createElement("img");
                i.src = event.target.result;
                i.onload = function () {
                    if (img.tagName == "IMG") img.src = _fun.compress(i, para, mime).src;
                    else if (img.tagName == "DIV") img.style.backgroundImage = "url(" + _fun.compress(i, para, mime).src + ")";
                    img.onload = function () {
                        fun();
                    };
                    //fun();
                };
                //};
            };
            reader.readAsDataURL(f);
        }
    },         //前端图片压缩
    compressListImage: function ($d, $para, $mime, $callback) {
        var d = $d, para = $para, fun = $callback, mime = $mime;
        if (typeof d == "string") d = document.querySelector("#" + d);
        if (typeof fun != "function") fun = function () {
        };
        if (typeof para != "object") para = {width: 480, height: 270, quality: 100};

        var files = event.target.files, list = [];
        for (var j in files) {
            if (j == "length") break;
            var f = files[j];
            if (!f.type.match('image.*')) {
                continue;
            }
            var img = document.createElement("img");
            list.push(img);
            var reader = new FileReader();
            void function (img) {
                reader.onloadend = function (e) {
                    var i = document.createElement("img");
                    i.src = e.target.result;
                    i.onload = function () {
                        img.src = _fun.compress(i, para, mime).src;
                        fun(img);
                        //d.appendChild(img);
                    };
                };
            }(img);
            reader.readAsDataURL(f);
        }
        return list;
    },       //前端批量图片压缩
    compress: function ($res, $para, $mime) {
        var s = $res, m = $mime, p = $para;
        var mime_type = "image/jpeg";
        if (m != undefined && m == "png") {
            mime_type = "image/png";
        }
        var cvs = document.createElement('canvas');
        var iw = s.width, ih = s.height, iwh = iw / ih, pwh = p.width / p.height;
        console.log(s.width, s.height, iwh, p.width, p.height, pwh);
        if (p.width && p.height) {
            console.log("w-h");
            cvs.width = iwh > pwh ? (iw > p.width ? p.width : iw) : (ih > p.height ? p.height * iwh : ih * pwh);
            cvs.height = iwh > pwh ? (iw > p.width ? p.width / iwh : iw / pwh) : (ih > p.height ? p.height : ih);
        } else if (p.width) {//固定宽
            console.log("w");
            cvs.width = iw > p.width ? p.width : iw;
            cvs.height = iw > p.width ? p.width / iwh : ih;
        } else if (p.height) {//固定高
            console.log("h");
            cvs.height = ih > p.height ? p.height : ih;
            cvs.width = ih > p.height ? p.height * iwh : iw;
        } else {
            console.log(3);
            cvs.width = iw;
            cvs.height = ih;
        }
        console.log(cvs.width, cvs.height);
        cvs.getContext("2d").drawImage(s, 0, 0, cvs.width, cvs.height);
        var newImageData = cvs.toDataURL(mime_type, (p ? p.quality : 100) / 100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        console.log(newImageData);
        return result_image_obj;
    },      //图片压缩算法
    lazyload: function () {
        var dl = document.querySelectorAll("[lazy]");
        Array.prototype.forEach.call(dl, function (v) {
            if (!v.src || v.src.length <= 0) v.src = v.dataset.src;
        })
    },                        //资源后加载

    base64ToBlob: function (urlData) {
        var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var aBuffer = new ArrayBuffer(bytes.length);
        var uBuffer = new Uint8Array(aBuffer);
        for (var i = 0; i < bytes.length; i++) {
            uBuffer[i] = bytes.charCodeAt(i) & 0xFF;
        }
        return new Blob([uBuffer], {type: 'image/jpeg'});
    },              //base64——blob

    /*———————————data—————————————*/
    toInfo: function ($d) {
        var d = $d || document, dl = d.querySelectorAll("[data]"), o = {};
        Array.prototype.forEach.call(dl, function (v) {
            var k = v.dataset.id, t = v.getAttribute("data") || "value";
            switch (v.tagName.toUpperCase()) {
                case "INPUT":
                    o[k] = v[t].trim();
                    break;
                case "IMG":
                    o[k] = v.src.replace(/data:image.*;base64,/ig, "");
                    break;
                case "TEXTAREA":
                    o[k] = v.value.trim();
                    break;
                case "DIV":
                    t = v.getAttribute("data") || "innerHTML"
                    o[k] = v[t];
                    break;
            }
        });
        return o;
    },
    getStyle: function ($obj, $attr) {
        var obj = $obj, attr = $attr;
        if (typeof obj == "string") obj = document.querySelector("#" + obj);
        if (obj.currentStyle) {
            return attr && obj.currentStyle[attr] || obj.currentStyle;
        } else {
            return attr && window.getComputedStyle(obj, null)[attr] || window.getComputedStyle(obj);
        }
    },              //获取最终style
    getLS: function ($key) {
        var k = $key;
        return localStorage.getItem(k);
    },                        //获取localStorage
    setLS: function ($key, $value) {
        var k = $key, v = $value;
        localStorage.setItem(k, v);
    },                //设置localStorage
    addLS: function ($k, $v, $n) {
        var k = $k, v = $v, n = $n;
        var ls = JSON.parse(localStorage.getItem(n)), o = {};
        if (!ls) {
            o[k] = v;
            localStorage.setItem(n, JSON.stringify(o));
        } else {
            o[k] = v;
            localStorage.setItem(n, JSON.stringify(o));
        }
    },                  //添加localStorage（多为Object格式）
    delLS: function ($key) {
        var k = $key;
        localStorage.removeItem(k);
    },                        //删除localStorage
    dbinder: function ($d, $v) {
        var d = $d, v = $v, binder = {};
        if (!d) {
            console.log("双向绑定失败！不存在该DOM对象");
            return;
        } else if (typeof d == "string") {
            d = document.querySelector("#" + d);
        }
        Object.defineProperty(binder, 'value', {
            configurable: true,
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (n) {
                value = n;
                d.value = value;
            }
        });
        binder.value = v;
        d.addEventListener("input", function () {
            binder.value = this.value;
            console.log(binder.value);
        }, false);
        return binder;
    },                    //数据双向绑定
    parse: function (t) {
        if (t.search(/[^"]\d{16}\d*[,\]\}]/g) >= 0) {
            t = t.replace(/(:)(\d{16}\d*)/, ':\"$2\"');
        }
        return JSON.parse(t);
    },                           //自定义JSON处理——精度
    toPara: function ($s) {
        var s = $s, o = {};
        s.ltrim("?").split("&").forEach(function (v) {
            o[v.split("=")[0]] = v.split("=")[1];
        });
        return o;
    },                         //格式化URL字符串
    addCK: function ($k, $v, $n, $dt) {
        var k = $k, v = $v, n = $n, dt = $dt;
        var exp = new Date();
        if (n) {
            exp.setDate(exp.getDate() + n);
        } else if (dt) {
            exp = new Date(dt);
        } else {
            document.cookie = k + "=" + v;
            return;
        }
        document.cookie = k + "=" + v + ";expires=" + exp.toUTCString();
    },             //添加cookie——kv值，n天数偏移量，dt指定过期日期
    getCK: function ($k) {
        var k = $k, reg = new RegExp("(^| )" + k + "=([^;]*)(;|$)"), arr = document.cookie.match(reg);
        return arr && arr[2];
    },                          //获取cookie
    delCK: function ($k, $v) {
        var exp = new Date(), k = $k, v = $v;
        exp.setTime(exp.getTime() - 1);
        document.cookie = k + "=" + v + ";expires=" + exp.toUTCString();
    },                      //删除cookie

    /*———————————extend—————————————*/
    extend: function (o, n, override) {
        for (var p in n)
            if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
    },             //浅度拷贝
    extendDeep: function (o, n, override) {
        for (var p in n) {
            if (o.hasOwnProperty(p) && typeof (o[p]) == "object" && !(o[p] instanceof Array)) {
                _fun.extendDeep(o[p], n[p], override);
                continue;
            }
            if (!o.hasOwnProperty(p) || override) {
                //console.log(p, o[p], n[p]);
                o[p] = n[p];
            }
        }
    },         //深度拷贝
    override: function (o, n, override) {             //override——n如果为对象是否会覆盖o
        for (var p in o)
            if (n.hasOwnProperty(p) && (typeof n[p] != "object" || n[p] instanceof Array || override)) o[p] = n[p];
    },           //浅度覆盖
    overrideDeep: function (o, n, override) {
        for (var p in o) {
            if (n.hasOwnProperty(p) && typeof (o[p]) == "object" && !(o[p] instanceof Array)) {
                _fun.overrideDeep(o[p], n[p]);
                continue;
            }
            if (n.hasOwnProperty(p) && (typeof n[p] != "object" || n[p] instanceof Array || override)) o[p] = n[p];
        }
    },       //深度覆盖
    //+4 demo
    demo1: function () {
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.extend(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.extend(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.extendDeep(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.extendDeep(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.override(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.override(x, y, true);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.overrideDeep(x, y);
        console.log(x);
        var x = {x: 1, z: {zx: 2}}, y = {x: 3, y: 4, z: {zx: 5, zy: 6}, zz: 7};
        _fun.overrideDeep(x, y, true);
        console.log(x);
    },

    insertBefore: function (parent, newChild) {
        if (parent.firstChild) {
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            parent.appendChild(newChild);
        }
        return parent;
    },     //dom插入

    /*——————————UI———————————————*/
    scrollX: function ($obj) {
        var obj = typeof $obj == "string" ? document.querySelector("#" + $obj) : $obj;
        obj.addEventListener("mousewheel", function (e) {
            this.scrollLeft += e.wheelDelta * (-1);
            e.preventDefault();
            e.stopPropagation();
        });
    },                     //domX轴鼠标滚轮滚动

    /*——————————限定使用————————————*/
    toFirst: function ($g, $k) {
        var $this = this, g = $g, k = $k, ls = JSON.parse(localStorage.getItem("helpList")), hl = ls && ls[g] ? ls : function () {
            var o = ls || {};
            o[g] = function () {
                var o = {};
                o[k] = 0;
                return o;
            }();
            return o;
        }();
        if (!hl || !hl[g] || !hl[g][k]) {
            $this.show("first");
        }
        Array.prototype.forEach.call(document.querySelectorAll("#first img"), function (v) {
            v.onclick = function () {
                hl[g][k] = 1;
                localStorage.setItem("helpList", JSON.stringify(hl));
                $this.hide("first");
            };
        });
    },                   //初次帮助提示
    toAlert: function ($t, $lt) {
        var t = $t, lt = $lt, d = document.querySelector("#toAlert");
        if (d) {
            var div = d.querySelector("div");
            d.classList.remove("none");
            if (div.style.display == "none") div.style.display = "";
            div.innerHTML = t;
        } else {
            var div = document.createElement("div");
            div.className = "CW CH fix index999";
            div.id = "toAlert";
            div.innerHTML = '<div class="AC fix F6 bgc9 P2M MTH rad05e LSP" style="width:60%;top:35%;left:20%;">' + t + '</div>';
            this.insertBefore(document.body, div);
            //document.body.appendChild(div);
        }
        setTimeout(function () {
            if (d) d.classList.add("none");
            else document.querySelector("#toAlert").classList.add("none");
        }, lt ? lt : 1500);
    },                  //自定义警告——自动生成
    toError: function ($url, $time) {
        var url = $url, time = $time;
        this.toAlert("参数异常！", time || 1500);
        setTimeout(function () {
            location.href = (url || "../com/error.html");
        }, time || 1500);
    },              //自定义错误——自动生成
    toLoading: function ($time, $img, $modal) {
        var $this = this, img = $img || "../img/other/witing2.gif", d = document.querySelector("#toLoading"), time = $time || 5000, modal = $modal;
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
            div.innerHTML = '<img src="' + img + '" class="B8M relative ' + (modal ? "" : "top40") + '">';
            $this.insertBefore(document.body, div);
            $this._sto = setTimeout(function () {
                if (div) {
                    document.body.removeChild(div);
                    //$this.toAlert("访问超时！", 1500);
                }
            }, time);
        }
    },    //自定义进度——自动生成：time/超时时间，img/进度条图片地址,modal/是否模态窗口
    toConfirm: function ($t, $call, $para) {
        var $this = this, t = $t, callback = $call, d = document.querySelector("#toConfirm"), p = $para || {yes: "是", no: "否"};
        if (d) {
            document.body.removeChild(d);
        }
        var div = document.createElement("div");
        div.className = "CW CH fix top0 index99 ofa bgca";
        div.id = "toConfirm";
        div.innerHTML = '<div class="CW CH fix ofa bgc2 alpha"></div>' +
            '<div class="relative A11 ML MT2H bgc2 P2M rad05e LSP">' +
            '<div class="FL MT AC C6M F4 LH2 clear" id="confirmT">' + t + '</div>' +
            '<li class="FL AC F4 LH2 MTH B9M bgc9 rad" id="confirmY">' + p.yes + '</li>' +
            '<li class="FR AC F4 LH2 MTH B9M bgc9 rad" id="confirmN">' + p.no + '</li>' +
            '<div class="clear"></div>' +
            '</div>';
        $this.insertBefore(document.body, div);
        div.querySelector("#confirmY").onclick = callback;
        div.querySelector("#confirmY").addEventListener("click", function () {
            document.body.removeChild(div);
        });
        div.querySelector("#confirmN").onclick = function () {
            document.body.removeChild(div);
        };
    },       //自定义确认——自动生成
    toDownList: function (a, f) {
        var div = document.createElement("div"), d = document.querySelector("#s_downList");
        if (!d) {
            div.id = "s_downList";
            div.className = "W11 CH fix top0 bgca index99 none";
            div.innerHTML = '<div class="absolute"></div>';
            a.parentNode.insertBefore(div, a);
//            document.body.appendChild(div);
            d = document.querySelector("#s_downList");
        }
        d.onclick = function () {
            if (event.target == this) {
                _fun.hide(d);
                document.body.style.position = "";
                document.body.style.overflow = "";
            }
        };
        var t = a.offsetTop, da = d.children[0];
        da.style.bottom = "0px";
        //da.style.top = t + "px";
        //document.body.style.position = "fixed";              //兼容移动端除了chrome外浏览器hidden无法生效，不过会导致回到页首
        document.body.style.overflow = "hidden";
        _fun.show(d);
        f(da, d);
    },                  //自定义下拉菜单——自动生成

    //ajax提交
    //para：method(GET/POST),url(请求路径),async(TRUE/FALSE是否异步),func(回调函数),para(POST传递参数)
    ajax_submit: function (method, url, async, func, para, error) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest()
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                //console.log(xmlhttp);
                if (xmlhttp.status == 200) {
                    var msg = xmlhttp.responseText, Jmsg = JSON.parse(xmlhttp.responseText);
                    func(msg, Jmsg);
                }
                else
                    error();
            }
        };
        xmlhttp.open(method, url, async);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.send(method == "POST" ? (para == null ? "" : para) : "");
    },
    //ajax提交-formdata
    //para：url(请求路径),async(TRUE/FALSE是否异步),para(POST传递参数-object),func(回调函数-成功),error(回调-失败),file(文件流),
    ajax_formdata: function (url, async, para, func, error, file, noloading) {
        var xmlhttp, $this = this;
        var form = new FormData();
        if (para) {
            for (var i in para) {
                if (typeof para[i] == "object") {
                    form.append(i, JSON.stringify(para[i]));
                    continue;
                }
                form.append(i, para[i]);
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
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    !noloading && $this.toLoading(0);
                    var msg = xmlhttp.responseText;
                    func(msg);
                }
                else {
                    !noloading && $this.toLoading(0);
                    var funerr = error || function () {
                            $this.toAlert("网络异常！", 1500);
                        };
                    funerr();
                }
            }
        };
        xmlhttp.send(form);
    },

    //异常处理
    using: function (fun, err) {
        err = err || function () {

            };
        try {
            fun();
        } catch (ex) {
            console.warn(ex);
            err(ex);
        }
    }
};

~function () {
    String.prototype.toggle = function (array) {
        var ret = $this = this, len = array.length;
        array.some(function (v, ix) {
            if ($this == v) ret = array[(ix + 1) % len];
        });
        return ret;
    };
    String.prototype.trim = function (v) {
        //return this.replace(/(^\s*)|(\s*$)/g, "");
        //return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        v = (v || "\\s").replace(/(\W)/g, "\\$1").replace("\\\\", "\\");
        return this.replace(new RegExp("^" + v + "*" + "|" + v + "*$", "g"), "");
    };
    String.prototype.ltrim = function (v) {
        //return this.replace(/(^\s*)/g, "");
        v = (v || "\\s").replace(/(\W)/g, "\\$1").replace("\\\\", "\\");
        return this.replace(new RegExp("^" + v + "*", "g"), "");
    };
    String.prototype.rtrim = function (v) {
        //return this.replace(/\s*$/g, "");
        v = (v || "\\s").replace(/(\W)/g, "\\$1").replace("\\\\", "\\");
        return this.replace(new RegExp(v + "*$", "g"), "");
    };
    String.prototype.params = function (v) {
        var s = this, o = {}, t = v || "&";
        s.ltrim("?").split(t).forEach(function (v) {
            o[v.trim().split("=")[0]] = v.trim().split("=")[1];
        });
        return o;
    };
    String.prototype.charLength = function () {
        return this.replace(/[^\x00-\xff]/g, "aa").length;
    };      //获取字节长度（中文算2字节）
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

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function (predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    k++;
                }
                return -1;
            }
        });
    }
    if (!Array.prototype.some) {
        Object.defineProperty(Array.prototype, 'some', {
            value: function (predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var thisArg = arguments[1];
                for (var i in o) {
                    var v = o[i];
                    if (predicate.call(thisArg, v, i, o)) {
                        return true;
                    }
                }
                return false;
            }
        });
    }
    if (!Array.prototype.removeSave) {
        Object.defineProperty(Array.prototype, 'removeSave', {
            value: function () {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var t = Object(this), l = [];
                for (var i in t) {
                    l.indexOf(t[i]) < 0 && (l.push(t[i]));
                }
                return l;
            }
        });
    }
    if (!Object.prototype.values) {
        Object.defineProperty(Object.prototype, 'values', {
            value: function () {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var t = Object(this), l = [];
                for (var i in t) {
                    l.push(t[i]);
                }
                return l;
            }
        });
    }
}();

//externalfun.updateuserclass(488,externalfun.base64encode(JSON.stringify({"list":{"group":[["亲戚",["家属","亲属","族亲","表亲","姻亲","亲家","宗亲","远亲"]],["老乡",["邻居","同村","同乡","同县","同市","同省"]],["同学",["小学","初中","高中","大学","老师","校友"]],["同事",["科室"]],["客户",["黄金","普通","潜在"]],["供应商",["服务","设备","主材","零星","物流","候选"]],["行业",["领导","老板","人才"]],["政府",["省部","地市","区县","乡镇"]],["朋友",["知己","同党","教友","同行","同趣","球友","牌友","网友"]],["服务",["家政","教育","健康","生活","购物","娱乐"]],["爱人",["同事","同学","朋友"]],["孩子",["老师","同学"]],["其他",["其他"]]],"cata":["亲戚","同乡","同学","同事","朋友"]}})));
