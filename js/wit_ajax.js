// 数据交互接口JavaScript Document
var _u,self_url='self',mywindow=window;
function allcallback(f,a,u){//组合成层级对象，指向当前的函数所在的窗口
	if(u=="self"){eval(f)(a)}else{
		var self_urls=u.split("@"),ln=self_urls.length,
		mywin=document.getElementById(self_urls[ln-1]).contentWindow;
		for(var i=ln;i>2;i--){mywin=mywin.document.getElementById(self_urls[i-2]).contentWindow}
 		mywin[f](a);}
}
function postback(){if(flag==4||flag==9){//不是慧脑浏览器，生成登录界面
	document.getElementById('s_select').innerHTML='<div id="form" class="absolute topadv ffWRYH" ><input id="user" class="FL MLT C9MT2 H AC" placeholder="请输入账号" /><div class="FL MLT BTN bgc93" onclick="location.href=&quot;../com/reg.html&quot;" >注册</div><input id="password" class="FL MLT C9MT2 H AC" placeholder="请输入密码"/><div class="FL MLT MB BTN bgc165" onclick="login_Up()">登录</div></div>';	
	show('s_select');}else{permis_prompt()}
}
function getselfurl(){//获取当前窗口的层级路径，每层iframe必须设置相同的id和name;
	if(mywindow.parent!=mywindow){self_url+="@"+mywindow.name;
	mywindow=mywindow.parent;getselfurl()}else{return;}
}
getselfurl();
function alertmes(t){console.log(t);var a=document.getElementById("alertm0");
	if(a){a.innerHTML=t;show("alertm");//网页弹窗
	}else{alert(t)}//系统弹窗
}  
function error(d){alertmes(d)}//通用提交失败提示
function success(d){alertmes(d.message);}//通用提交成功提示
function postmessage(obj){
	obj.classname=self_url;
    var json=JSON.stringify(obj);
    try{window.webkit.messageHandlers.witwebview.postMessage(json);//IOS
    }catch(e){
		try{window.witwebview.postMessage(json);//安卓
		}catch(e){
			try{witwebview.postMessage(json);
			}catch(e){return -1}}}
	return 1;
}
function cleancache(u){postmessage({functionname: "cleancache"})}//清除缓存
function startwitbrowser(u){console.log(u);//调用慧脑浏览器
	var tg=document.createElement("textarea");tg.value=u;
	document.body.appendChild(tg);
	tg.setSelectionRange(0,u.length);tg.focus();//光标选中范围
	document.execCommand("Cut","false",null);tg.blur();
	if(browser=="micromessenger"||browser=="qq"){
		location.href="http://sj.qq.com/myapp/detail.htm?apkName=com.witknow.witbrowser"}else{location.href="witbrowser://com.witknow.witbrowser?json="+u;}
}
function permis_prompt(s){//权限提示下载APP
	var sr=s||location.href;
	if(browser=="micromessenger"||browser=="qq"){startwitbrowser(sr)}
	else{document.getElementById('s_select').innerHTML='<div class="W11 H11 bgc2 ofa" ><div class="FL M A11 F4 LH2 indent">当前浏览器权限不够，不能上传、点赞和连续获取数据，请登录慧脑浏览器，体验互联网新技术新理念带来全新世界!<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 慧脑浏览器提供所有合作网页免登录获得发帖、点赞、查看更多资料、购物和快递等功能；并防止恶意代码后台下载、屏蔽流氓广告插入、阻击顽固性恶意网页跳转等功能，是用户利益的坚定维护者!</div><div class="FL MTH F4 LH15 ALP colorY">请复制下面的网址然后打开慧脑浏览器，粘贴到网址输入栏</div><input class="FL ML A11 H ALP" value="'+sr+'"><div class="FL MLT A1T2 H AC rad bgc105" onClick="startwitbrowser(&quot;'+sr+'&quot;)">我已安装慧脑浏览器</div><div class="FL MLT A1T2 H AC rad bgc35" onClick="hrefs(&quot;912||http://www.witknow.com/down/witpc.exe||http://www.witknow.com/down/witbrowser.apk||https://itunes.apple.com/cn/app/hui-nao-liu-lan-qi/id1153888743?mt=8&quot;)">我还没安装慧脑浏览器</div></div>';
	show('s_select');}
}
function give_thumb(k,d,n){console.log(n);//点赞
	if(browser=="witknow"){if(!_u||!_u.user_guid){alert("请先登陆")}
		else if(window.navigator.cookieEnabled){
			var mycookie=new WITCookie(),thable=mycookie.GetCookie(k+d);
			if(thable==1){return}else{var np=_u.userpower?n*Math.round(_u.userpower*0.01):n;
				var eobj=event.srcElement,extime=new Date(),map = new Map(),url="http://121.43.233.185/mavenwitbrowser/"+k+".do";
				extime.setDate(extime.getDate()+1);
				if(eobj.tagName!="DIV")eobj=eobj.parentNode;
				eobj.nextSibling.innerHTML=parseInt(eobj.nextSibling.innerHTML)+Math.abs(n);
				map.put("id",d);map.put("thumb",np);
				map.put("token",_u.token);map.put("userguid",_u.user_guid);
				WITAJAX.ajaxmap(map,url,success,error);console.log(map);
				mycookie.SetCookie(k+d,1,extime);}
		}else{alert("请取消禁用cookie")}
	}else{permis_prompt()}
}
function give_thumc(k,d,n){console.log(n);//点赞
	if(browser=="witknow"){if(!_u||!_u.user_guid){alert("请先登陆")}
		else if(window.navigator.cookieEnabled){
			var mycookie=new WITCookie(),thable=mycookie.GetCookie(k+d);
			if(thable==1){return}else{
				var np=_u.userpower?n*Math.round(_u.userpower*0.01):n,
				eobj=event.srcElement,extime=new Date(),map = new Map();
				extime.setDate(extime.getDate()+1);
				eobj.previousSibling.innerHTML=parseInt(eobj.previousSibling.innerHTML)+Math.abs(n);
				map.put("id",d);map.put("thumb",np);
				map.put("token",_u.token);map.put("userguid",_u.user_guid);
				WITAJAX.ajaxmap(map,k,success,error);console.log(map);
				mycookie.SetCookie(k+d,1,extime);}
		}else{alert("请取消禁用cookie")}
	}else{permis_prompt()}
}	
function HttpReq(url,form,success){
	var XMLHttpReq = new XMLHttpRequest();
	XMLHttpReq.addEventListener("error", function(){console.log(XMLHttpReq.status);
		var txt=XMLHttpReq.status==404?"链接地址异常":(XMLHttpReq.status == 400?"参数异常":(XMLHttpReq.status == 500?"服务器异常":"网络异常"));	error("status:"+XMLHttpReq.status+txt)}, false);
	XMLHttpReq.addEventListener("abort", function(){error("提交被取消,status:"+XMLHttpReq.status);}, false);
	XMLHttpReq.open("post", url, true);
	XMLHttpReq.onreadystatechange = function () {
	if(XMLHttpReq.readyState==4&&XMLHttpReq.status==200){success(WITJSON.parse(XMLHttpReq.responseText));}};
	XMLHttpReq.send(form);
}
function WitDate(date){return date?new Date(date.rtrim(".0").replace(/\-/g, "/")):new Date()}//日期转换，满足IOS
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var WITAJAX={
	ajaxmap:function(map,url,success,error){
		form = new FormData();
		var params="",array = map.keySet();
		for(var i=0;i<array.length;i++){
			if(typeof map.get(array[i])=="undefined") continue;
			if(typeof map.get(array[i])!="object"){form.append(array[i],map.get(array[i]));
			}else if(map.get(array[i])instanceof FormData){
				for(var value of map.get(array[i]).values()){
					form.append(array[i],value); }
			}else if(map.get(array[i]).type=="file"&&map.get(array[i]).value!=""){form.append(array[i],map.get(array[i]).files[0]);
			}else if(map.get(array[i])instanceof Array||map.get(array[i]) instanceof NodeList){ for(var z=0;z<map.get(array[i]).length;z++){
		    		if(map.get(array[i])[z].type=="file"&&map.get(array[i])[z].value!=""){var zfile=map.get(array[i])[z].files;
					for(var j=0;j<zfile.length;j++){
						form.append(array[i],map.get(array[i])[z].files[j]);}
	 		}}}
	 		else {form.append(array[i],WITJSON.stringify(map.get(array[i])));}
		}
		HttpReq(url,form,success);
	},
	ajaxmapget:function(map,url,success,error){
		var params="", array = map.keySet();
    	for(var i=0;i<array.length;i++) {
			 params+=(i==0?"":"&")+array[i]+"="+((typeof map.get(array[i])!="object")?map.get(array[i]):WITJSON.stringify(map.get(array[i]))); 
		}
		var XMLHttpReq = new XMLHttpRequest();
		XMLHttpReq.addEventListener("error", function(){error("提交出错，请检查网址或者参数是否都正确，以及是否被禁止跨域,status:"+XMLHttpReq.status);}, false);
		XMLHttpReq.addEventListener("abort", function(){error("提交被取消,status:"+XMLHttpReq.status);}, false);
		XMLHttpReq.open("get", url+"?"+params, true);
		XMLHttpReq.onreadystatechange = function () {
		if (XMLHttpReq.readyState==4 && XMLHttpReq.status==200) {success(WITJSON.parse(XMLHttpReq.responseText));}else{error("网络异常")};}
		XMLHttpReq.send(null);
	},
	maptourlparams:function(map){
		var params="",array = map.keySet();
		for(var i=0;i<array.length;i++) {
			 params=((params!=="")?params+"&":"")+array[i]+"="+((typeof map.get(array[i])!="object")?map.get(array[i]):WITJSON.stringify(map.get(array[i])));
		}
		return params;
	},
	encodebase64:function (input) {
		var chr1,chr2,chr3,enc1,enc2,enc3,enc4,output="",i=0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {enc3 = enc4 = 64;} 
			else if (isNaN(chr3)) {enc4 = 64;}
			output += _keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
	return output;
	},
	decodebase64:function (input) {
		var chr1,chr2,chr3,enc1,enc2,enc3,enc4,output="",i=0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {output +=String.fromCharCode(chr2);}
			if (enc4 != 64) {output +=String.fromCharCode(chr3);}
		}
		output = _utf8_decode(output);
		return output;
	}
}
function _utf8_encode(string) {var utftext = "";
	string = string.replace(/\r\n/g,"\n");
	for (var n=0; n<string.length; n++) {var c=string.charCodeAt(n);
		if (c < 128) {utftext += String.fromCharCode(c);} 
		else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
	}}
	return utftext;
}
function _utf8_decode(utftext) {var string="",i=0,c=c1=c2=0;
	while (i<utftext.length) {c = utftext.charCodeAt(i);
		if (c < 128) {string += String.fromCharCode(c);i++;
		} else if((c > 191) && (c < 224)) {	c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));i+=2;
		} else {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
			i += 3;
		}
	}
	return string;
}
function Map(){this.container = new Object();}
Map.prototype.put = function(key, value){this.container[key] = value;}
Map.prototype.get = function(key){return this.container[key];}
Map.prototype.keySet = function(){
	var count = 0,keyset = new Array();
	for (var key in this.container) {
		if (key == 'extend') {continue;}
		keyset[count] = key;count++;}
	return keyset;
}
Map.prototype.size = function() {
	var count = 0;
	for (var key in this.container) {
		if(key == 'extend'){continue;}// 跳过object的extend函数
		count++;}
	return count;
}
Map.prototype.remove = function(key) {delete this.container[key];}
Map.prototype.toString = function(){
	var str = "";
	for(var i=0,keys=this.keySet(),len=keys.length;i<len;i++){
		str+=keys[i]+"="+this.container[keys[i]]+";\n";}
	return str;
}
function geturlparams(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}	

if(typeof WITJSON !== "object"){WITJSON = {}}(
	function () {"use strict";
		var rx_one = /^[\],:{}\s]*$/,
		rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		rx_four = /(?:^|:|,)(?:\s*\[)+/g,
		rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		function f(n){return n<10?"0"+n:n}
		function this_value(){ return this.valueOf()}
		if(typeof Date.prototype.toWITJSON !== "function") {
			Date.prototype.toWITJSON = function () {
				return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
			};
			Boolean.prototype.toWITJSON = this_value;
			Number.prototype.toWITJSON = this_value;
			String.prototype.toWITJSON = this_value
		}
		var gap,indent,meta,rep;
	    function quote(string) {
			rx_escapable.lastIndex = 0;
			return rx_escapable.test(string)?"\""+string.replace(
				rx_escapable,function (a){
					var c = meta[a];
					return typeof c === "string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
				})+"\"":"\""+string+"\""
		}
    function str(key, holder) {
        var i,k,v,length,partial,mind = gap,value = holder[key];
        if (value && typeof value === "object" && typeof value.toWITJSON === "function") {value = value.toWITJSON(key)}
        if (typeof rep === "function") {value = rep.call(holder, key, value)}
        switch (typeof value) {
        case "string": return quote(value);
        case "number": return isFinite(value)?String(value):"null";
        case "boolean":
        case "null": return String(value);
        case "object":
            if (!value) {return "null" }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value)==="[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i]; v = str(k, value);
                        if(v){partial.push(quote(k) + (gap ? ": " : ":") + v)}
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {partial.push(quote(k)+(gap?":":":")+v)}
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof WITJSON.stringify !== "function") {
        meta = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r","\"": "\\\"","\\": "\\\\"};
        WITJSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {indent += " "}
            } else if (typeof space === "string") {indent = space}
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("WITJSON.stringify")
            }
            return str("", {"": value})
        }
    }
    if (typeof WITJSON.parse !== "function") {
        WITJSON.parse = function (text, reviver) {var j;
            function walk(holder, key) {
                var k,v,value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value){
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v=walk(value, k);
                            if(v !== undefined){value[k] = v}
                            else{delete value[k]}
                }}}
                return reviver.call(holder, key, value)
            }
            text = String(text);
			if(text.search(/[^"]\d{16}\d*[,\]\}]/g) >= 0) {
   		         text = text.replace(/(:)(\d{16}\d*)/,':\"$2\"');}
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if(rx_one.test(text.replace(rx_two,"@").replace(rx_three, "]").replace(rx_four,""))){ j = eval("(" + text + ")");
                return (typeof reviver==="function")?walk({"":j},""):j
			}
            throw new SyntaxError("WITJSON.parse")
        }
    }
}());

String.prototype.trim = function (v) {
        return this.replace(eval("/^"+(v?("\\"+v):"\\s")+"*|"+(v?("\\"+v):"\\s")+"*$"+ "/g"), "");};
    String.prototype.ltrim = function (v) {
        return this.replace(eval("/^" + (v ? ("\\" + v) : "\\s") + "*/g"), "");};
    String.prototype.rtrim = function (v) {
        return this.replace(eval("/(" + (v ? ("\\" + v) : "\\s") + "*$)/g"), "");};
String.prototype.left = function (length_){	return this.substring(0,length_);}
String.prototype.right = function (length_){  
	var _from = this.length - length_;  
	if (_from < 0) _from = 0;  
	return this.substring(this.length - length_, this.length);  
}; 
function WITCookie(){ 
	this.GetCookie = function(key){ 
		var cookie=document.cookie,cookieArray=cookie.split(';'),getvalue=""; 
		for(var i = 0;i<cookieArray.length;i++){ 
			if(cookieArray[i].trim().substr(0,key.length) == key){ 
				getvalue = cookieArray[i].trim().substr(key.length + 1); 
				break;} 
		} 
		return getvalue; 
	}; 
	this.GetChild = function(cookiekey,childkey){ 
		var child = this.GetCookie(cookiekey),childs = child.split('&'),getvalue=""; 
		for(var i = 0;i < childs.length;i++){ 
			if(childs[i].trim().substr(0,childkey.length) == childkey){ 				getvalue = childs[i].trim().substr(childkey.length+1); 
				break;} 
		} 
		return getvalue; 
	}; 
	this.SetCookie = function(key,value,expire,domain,path){ 
		var cookie = ""; 
		if(key != null && value != null)cookie += key + "=" + value + ";"; 
		if(expire != null)cookie += "expires=" + expire.toGMTString() + ";"; 
		if(domain != null)cookie += "domain=" + domain + ";"; 
		if(path != null)cookie += "path=" + path + ";"; 
		document.cookie = cookie; 
	}; 
	this.Expire = function(key){ 
		expire_time = new Date(); 
		expire_time.setFullYear(expire_time.getFullYear() - 1); 
		var cookie = " " + key + "=e;expires=" + expire_time + ";" 
		document.cookie = cookie; 
	} 
}	
Date.prototype.Format = function (fmt){ 
	var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(), "s+":this.getSeconds(),"w+":"日一二三四五六".charAt(this.getDay()),"q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds()};
	if (/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));
	for (var k in o)if(new RegExp("("+k+")").test(fmt))fmt=fmt.replace(RegExp.$1, (RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));
	return fmt;
}//输入格式（yyMMdd hh:mm）输出日期
function witLoadJS(e,t){//后加载js,e路径,t继发函数
	var n=document.createElement("script");
	n.src=URL.createObjectURL(e),
	n.onload=t,
	document.body.appendChild(n)
}	
function createtable(nj){postmessage({functionname: "createtable",witparams:nj,callback: "callback",token:"TOKEN"});
}//创建本地数据表
var char64="klmU7yTQOvMdeUKBgN8AXa4jPt3V1u2xZYJp6E$zirFq0GLwRh95fbDsnCI#coSH";
function c10t64(d){var e="";
	for(var i=0;d>0;i++){e+=char64[d%64];d=Math.floor(d/64);}
	return e;
}
function c64t10(d){var e=0,ln=d.length;
	for(var i=ln-1;i>=0;i--){e=(e*64+char64.indexOf(d[i]));}
	return e;
}
function clone(obj){//克隆对象
    if (null==obj||"object"!=typeof obj) return obj;
    if (obj instanceof Date){var copy=new Date();copy.setTime(obj.getTime());return copy;}
    if (obj instanceof Array){var copy = [];
        for (var i=0,len=obj.length; i<len; ++i){copy[i] = clone(obj[i]);}
		return copy;}
    if (obj instanceof Object){var copy = {};
        for (var attr in obj) {if (obj.hasOwnProperty(attr))copy[attr]=clone(obj[attr]);}
		return copy;}
}
function select_person(){
	var eobj=event.srcElement.tagName=="IMG"?event.srcElement.parentNode:event.srcElement;
	lastobj=eobj.previousSibling;
	if(flag!=8){postmessage({functionname: 'selectperson',callback: 'setperson'})}else{window.open('http://www.witknow.com/c/select.html?t=setperson');}
}        
function setperson(m){if(m){
	lastobj.value=m[0].per_full_name;lastobj.title=m[0].user_phone;
	for(var i=1;i<m.length;i++){
		lastobj.value+=","+m[i].per_full_name;lastobj.title+=","+m[i].user_phone;}
	}
}//调用人脉

var paystyle='<ul id="paystyle" class="clear" title=2><div class="W11 H6M bord_ck0" onclick="selectpay(1)"><img src="../img/a/bank/alipay0.png" class="FL M B3M no_event" /><div class="FL MT C12M F4 LH1 ALP no_event">支付宝支付</div><div class="FL C12M F2 LH25 color8 ALP bordB no_event">推荐有支付宝账号的用户使用</div></div><div class="W11 H6M bord_ck1" onclick="selectpay(2)"><img src="../img/a/bank/weipay0.png" class="FL M B3M no_event" /><div class="FL MT C12M F4 LH1 ALP no_event">微信支付</div><div class="FL C12M F2 LH25 color8 ALP bordB no_event">推荐安装微信6.0.2以上版本</div></div></ul>',//<div class="clear W11 H6M bordB bord_ck0"><img src="../img/btn/squre0.png" class="FR POT" /><img src="../img/a/bank/unionpay0.png" class="FL M B3M" /><div class="FL C12M F4 LH25 ALP">银行卡支付<div><div class="FL C12M F2 LH1 color8 ALP">安全极速支付，无需开通网银<div></div>
	paywaittext='<div class="M0 W11 H11 AC bgca" ><div class="MA A11 MTH H24M bgc10 PB1M rad05e"><div class="W11 H ALP bordB ffHT">支付提示<li class="FR H B4M AC" onclick="hide(&quot;s_select&quot;)">X</li></div><p class="AC F4">请在新打开的页面完成支付</P><li class="F3 LH2 colorA">• 完成支付前请不要关闭此窗口</li><li class="F3 LH2 colorA">• 支付完成后，请根据结果选择</li></div>';
	
function selectpay(t){// 选择支付方式
	var ob=document.getElementById("paystyle"),obs=ob.children;
	for(var i=0,ln=obs.length;i<ln;i++){
	    if(obs[i].className.indexOf("bord_ck1")>=0){obs[i].className=obs[i].className.replace(eval("/"+"bord_ck1"+"/i"),"bord_ck0")}}
	event.srcElement.classList.toggle("bord_ck1",true);
	ob.title=t;
}
function payresult(){//发起支付
	var fee=document.getElementById('WIDtotal_fee').value;
	if(fee>0){var map=new Map(),t=document.getElementById("paystyle").title;
		map.put("userguid",_u.user_guid);map.put("totalamount",fee);
		map.put("witnum","A");
		if(t==1){map.put("weburl","http://www.witknow.com/com/payback.html");
			WITAJAX.ajaxmap(map,"http://121.43.233.185/mavenwitlinkweb/alipay/recharge.do",successpay,error);
			document.getElementById("s_select").innerHTML=paywaittext;
			show("s_select");
		}else{WITAJAX.ajaxmap(map,"http://www.witknow.com/mavenwitlinkweb/weixinpay/recharge.do",successp1,error);						}	
	}else{alert("请输入充值金额")}
}
function successp1(){alert(WITJSON.stringify(arguments[0]));
	window.location.href=arguments[0].payweb;//打开支付地址，调用微信支付
}

function successpay(d){var ret=d.result;
	if(ret==2){	_payform=WITAJAX.decodebase64(d.message);
		document.getElementById("s_select").innerHTML='<div class="M0 W11 H11 AC bgca " ><div class="MA A11 MTH H24M bgc10 PB1M rad05e"><div class="W11 H ALP bordB ffHT">支付提示<li  class="FR H B4M AC" onclick="hide(&quot;s_select&quot;,&quot;paypage&quot;)">X</li></div><div class="MTH MA B24M H rad03e border" onclick="cancelpay()">取消支付</div><div id="okpay" class="MT MA B24M H rad03e borderO colorO" onclick="window.open(&quot;payweb.html&quot;)">请点击继续支付</div><div class="MT MA B24M H rad03e borderO colorO" onclick="hide(&quot;s_select&quot;)">更换支付方式</div><div class="MT MA B24M H rad03e borderO colorO" onclick="history.go(0)">我已完成支付</div></div>';
		document.getElementById("okpay").click();
	}else if(ret==1){closewindow()}
	else if(ret==-2){
		document.getElementById("s_select").innerHTML='<div class="M0 W11 H11 AC bgca" ><div class="MA MTH B34M H27M bgc10 rad05e"><div class="W11 H ALP bordB ffHT">支付提示<li class="FR H B4M AC" onclick="hide(&quot;s_select&quot;,&quot;paypage&quot;)">X</li></div><p class="AC F4">支付未完成，请确认扣款是否成功</P><li class="ML F2 LH2 ALP colorA">• 如扣款成功，可能因网络不佳导致订单状态更新延迟，请勿重复支付</li><li class="ML F2 LH2 ALP colorA" >• 如未扣款，请选择其他支付方式或稍后再试</li><li class="F3 LH2 ffHT colorA" >若有其他疑问，请联系<span class="colorB">在线客服</span></li><div class="MA B32M"><div class="FL MLT B13M H rad03e borderO colorO" onclick="cancelpay()">取消支付</div><div class="FR MRT B16M H rad03e borderO colorO" onclick="hide(&quot;s_select&quot;)">重新选择支付方式</div></div></div>';}
	else if(ret==6){hide("s_select");alert(d.message)}	
	else{alert(d.message)}
}//触发支付的返回结果

function continuebuy22(d){
	if(d.result==0){
	var map = new Map();
	map.put("userphone",d.userphone);
 	map.put("userpassword",last_user.userpassword);
	map.put("weburl","http://www.witknow.com/select_code.html");console.log(map);
   WITAJAX.ajaxmap(map,"http://121.43.233.185/mavenwitlinkweb/alipay/continuebuying.do",successpay,error);}else{window.close()}
}//继续支付

function docsize(s){//返回文件大小
	if(s>1073741824){return s/1073741824+"G"}
	else if(s>1048576){return s/1048576+"M"} 
	else if(s>1024){return s/1024+"K"} 
	else {return s+""} 
}
function toDir(){//生成初始文件目录
	externalfun.getpath(function (msg){
		var l = JSON.parse(msg);
		if (l && l.length >= 0) {
			for (var i in l) {
				var div = document.createElement("div");
				div.innerHTML='<div class="clear W11 H5M ALP bgc9 bordB" src=""><img name="icoadd" src="../img/btn/add.png" class="FR M05 B4M H4M none" data-t="+" onclick="displaysub()" /><div class="FL C51 F3 LH2 ellips">' + l[i].Name + 
				'</div><div class="FL C51 F2 LH15 colorA ofa"><ul class="W200P">' +
				'<li name="doc_type" class="B41 FL ellips">' + l[i].Type + 
				'</li><li name="doc_size" class="B51 FL ellips">' + docsize(l[i].TotalSize)+ 
				'</li><li name="creat_date" class="B31 FL ellips">' + (l[i].CreationTime ? l[i].CreationTime : "") + '</li>' +
				'</ul></div></div>' +
				'<div name="subli" class="none W11"></div>';
				_wrap.appendChild(div);
				void function (i) {
					div.querySelector("img").addEventListener("click", function () {
						var t = this.parentNode.nextElementSibling;
						if (t.childElementCount <= 0) {
							toList(l[i].FullName, t);
						} else {
							Array.prototype.forEach.call(t.children, function (v) {
								var d = v.querySelector("div[name=subli]");
								if (d && d.childElementCount <= 0)
									toList(v.dataset.path, d);
							});
						}
					}, false);
				}(i);
			}
			Array.prototype.forEach.call(_wrap.children, function (v, i) {
				var syn = l[i].FullName.search(/Pictures$/i) >= 0;
				toList(l[i].FullName, v.querySelector("div[name=subli]"), syn);
			});
		}
	});
}  
function toList($path, $dom, $syn) {
        var path = $path, dom = $dom ? $dom : _wrap, syn = $syn;
        externalfun.getpath(function (msg) {
            var l = JSON.parse(msg);
            console.log(path, l);
            if (l && l.length >= 0 && dom.childElementCount <= 0) {
                for (var i in l) {
                    if (l[i].IsHidden) continue;
                    if (syn) {
                        var div = document.createElement("div");
                        div.dataset.path = l[i].FullName;
                        div.dataset.type = l[i].Type;
                        div.dataset.name = l[i].Name;
                        div.className = "FL MLT pic33 bg_cover";
                        div.style.backgroundImage = "url(" + l[i].FullName.replace(/\\/g, "/") + ")";
                        dom.appendChild(div);
                        _pic_list.push(l[i]);
                    } else {
                        var div = document.createElement("div"), bgc = "bgc" + (Number(dom.previousElementSibling.className.replace(/.*bgc(\d*).*/i, "$1")) + 10);
                        div.dataset.path = l[i].FullName;
                        div.innerHTML = '<div class="clear W11 H5M ALP ' + bgc + ' bordB">' +
                                (l[i].IsDirectory ? '<img name="icoadd" src="../img/btn/add.png" class="FR M05 B4M H4M none" data-t="+" onclick="displaysub();" />' : '') +
                                '<div class="FL C51 F3 LH2 ellips">' + l[i].Name + '</div>' +
                                '<div class="FL C51 F2 LH15 colorA ofa">' +
                                '<ul class="W200P">' +
                                '<li name="doc_type" class="B41 FL ellips">' + l[i].Type + '</li>' +
                                '<li name="doc_size" class="B51 FL ellips">' + (l[i].TotalSize ? (l[i].TotalSize / (1024 * 1024 * 1024)).toFixed() + "GB" : "") + '</li>' +
                                '<li name="creat_date" class="B31 FL ellips">' + (l[i].CreationTime ? l[i].CreationTime : "") + '</li>' +
                                '</ul></div></div>';
                        if (l[i].IsDirectory) {
                            div.innerHTML += '<div name="subli" class="none W11"></div>';
                            void function (i) {
                                div.querySelector("img").addEventListener("click", function () {
                                    var t = this.parentNode.nextElementSibling;
                                    if (t.childElementCount <= 0) {
                                        toList(l[i].FullName, t);
                                    } else {
                                        Array.prototype.forEach.call(t.children, function (v) {
                                            var d = v.querySelector("div[name=subli]");
                                            if (d && d.childElementCount <= 0)
                                                toList(v.dataset.path, d);
                                        });
                                    }
                                }, false);
                            }(i);
                        } else {
                            div.dataset.type = l[i].Type;
                            div.dataset.name = l[i].Name;
                            if (_pic_type.some(function (v) {
                                        return l[i].Type.search(v) >= 0;
                                    })) {
                                _pic_list.push(l[i]);
                            }   //图片，添加队列
                        }
                        dom.appendChild(div);
                    }
                }
                dom.previousElementSibling.querySelector("img").classList.remove("none");
            }
        }, path);
    }   //生成文件目录——(路径，填充对象，填充方式-图片，目录)

   