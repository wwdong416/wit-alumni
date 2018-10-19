//表单及图片处理 JS
var xmm=1;
function clearid(d){//清空对应id或父亲的前面对象的值（表单内容），并隐藏自己
	if (d){document.getElementById(d).value = "" }
    else{event.srcElement.previousSibling.value=""; event.srcElement.nextSibling.style.display="block";}
}	
function _init(d){//监听input
    var inputs=d?document.getElementById(d).getElementsByTagName("input"):document.getElementsByTagName("input"),ln=inputs.length;
    for (var i=0;i<ln;i++){inputs[i].addEventListener("focus", ffocus, false);}
}
function ffocus(event){//获得焦点后继发
	last_obj=event.srcElement;//console.log(last_obj);
	if(last_obj.dataset.rol){document.getElementById(last_obj.dataset.rol).scrollTop=last_obj.offsetTop-M;
	}else{document.documentElement.scrollTop=last_obj.offsetTop-(CW<CH?M*5:M);}
	if(last_obj.dataset.qkb=="del"){last_obj.nextSibling.style.display=last_obj.value?"block":"none";};//删除键在有内容时出现
	if(last_obj.dataset.t){
		var s,objvl,cont="",t=last_obj.dataset.t,
		objv=last_obj.value.split(","),objt=last_obj.title.split(",");
		if(t=="web"){
			cont+="<div class='W11 H8M bgc102'><div class='W11 F4 LH2 AC '> 联网选择器</div><input id='inputmess' type='text' class='FL ML C9M H ALP' placeholder='输入自定义选项' value='"+last_obj.value+"'/><div class='FR MR BTN bgc16' onClick='P_V()'>确定</div></div><iframe class='clear W11 CHN2H ofa' src='"+last_obj.dataset.s+"' ></iframe>";}
		else{
			cont+='<div class="W11 H11 bgca" onClick="hide(&quot;s_select&quot;)"></div><ul id="sle" class="fix bottom0 W11 CHmax bgc102 PB ofa">';
			if(last_obj.dataset.s!==undefined||last_obj.dataset.arr){var arr;
				if(last_obj.dataset.arr){arr=eval(last_obj.dataset.arr);}
				else{arr=last_obj.dataset.s.split(",")};
				var liwidth=(arr.length<9?"A1T2":(arr.length<19?"A2T4":(arr.length<37?"D31":"D41")));
				if(t=="check"){cont+="<li class='FR MRT F4 LH2 AC bgc16 ALP "+liwidth+"' onClick='checkli(2)'>确认</li>";}
				else if(t=="radios"||t=="checks") {cont+="<input id='new_li' type='text' class='FL MLT C9M F4 LH2 ALP' placeholder='输入自定义选项' value='"+(arr.indexOf(objv[0])<0?objv[0]:"")+"' onfocus='R_C(&quot;sle&quot;,&quot;bottom0&quot;,&quot;top0&quot;)'/><div class='FR MRT B6M F4 LH2 AC bgc16' onClick='checkli(1)'>确定</div>";};
				for(var i=0;i<arr.length;i++){
					cont+="<li title='"+i+"' class='FL MLT F4 LH2 ellips ALP "+liwidth+(t=="radio"?" rad ":" radem ")+(objt.indexOf(i+"")>=0||objv.indexOf(arr[i])>=0?"bgc56":"bgc10")+" '>"+arr[i]+"</li>"};
				cont+='</ul></div>';}
		}
		document.getElementById("s_select").innerHTML=cont;
		show("s_select");
		objli=document.getElementById("s_select").getElementsByTagName('li');
		for(var i=0;i<objli.length;i++){objli[i].addEventListener('click',checkli,false);}
	}
	if(last_obj.getAttribute("readonly"))last_obj.blur();
	document.querySelector('body').addEventListener('touchend', function(e){if(e.target.tagName!='INPUT'){last_obj.blur();}}); //ipad的bug
}
function P_selector(){//上传新建选项
	checkli();
var new_V= document.getElementById("new_li").value;
	if(last_obj.dataset.t=="radios"){last_obj.value =new_V;last_obj.title =-1}
	else{last_obj.value =(new_V==""?"":(new_V+","))+last_obj.value};
	hide("s_select");
}

function checkli(d){//多选
	var obj=event.srcElement,objs=obj.parentNode.getElementsByTagName('LI'),
	t=last_obj.dataset.t=="check"||last_obj.dataset.t=="checks"?2:1,
	last_T=d==1?document.getElementById("new_li").value:(t==1?obj.innerHTML:""),
	last_tit=d==1?-1:(t==1?obj.title:"");
	if(t==2){
		if(d!=1&&d!=2){var src_C = obj.className,
			src_C1 = src_C.replace(/bgc10/i,'bgc56'),
			src_C0 = src_C.replace(eval("/"+'bgc56'+"/i"),"bgc10");		
			obj.className=(src_C==src_C1)?src_C0:src_C1;return }
		for(var i=0;i<objs.length;i++){
			if(objs[i].className.indexOf("bgc56")>=0){last_T +=objs[i].innerHTML+",";last_tit+=objs[i].title+",";}
		} 
	} console.log(last_T+":"+last_tit);
    last_obj.value=last_T;last_obj.title=last_tit;hide("s_select");	
	if(last_obj.dataset.finp){eval(last_obj.dataset.finp+"()")}
}	
function selbrt(t,ob){console.log(t)//t：0-去选，1-选中，2-反选，3-独选,4-必选,5-多选
	var eob=ob||event.srcElement,obp=eob.parentNode,obs=obp.children;
	tp=t==0?false:t==1?true:t==3?(eob.classList.contains("bright")?false:true):"";
	if(t==5){var tl="";eob.classList.toggle("bright");
		for(var i=0,ln=obs.length;i<ln;i++){
			tl+=obs[i].classList.contains("bright")?obs[i].title:"";}
		obp.title=tl;
	}else if(t>2){
		for(var i=0,ln=obs.length;i<ln;i++){
			obs[i].classList.toggle("bright",false);}
		obp.title=tp==true?eob.title:"";
	}console.log(tp);
	if(!t||t<5)eob.classList.toggle("bright",tp);
}
function C_radio(k){//创建嵌入式选项	
	var radio_ul=document.getElementsByName("S_input");
	for (var j=0;j<radio_ul.length;j++){	
		if(radio_ul[j].dataset.s){var t=radio_ul[j].dataset.t;
			var arr=radio_ul[j].dataset.s.split(",");cont="";
			var a_title=radio_ul[j].title.split(",");
			for(var i=0;i<arr.length;i++){var k_cont=k==1?("<img class='FR POT' src='../img/btn/"+(t=="radio"?"radio":"check")+(a_title.indexOf(arr[i])>=0?"_1":"_0")+".png' />"):"";
			cont+="<li onClick='radio("+k+")' class='FL MLT H A21 AL"+(t=="radio"?" rad ":" radem ")+(a_title.indexOf(arr[i])>=0?"bgc56":"bgc10")+" ' >"+arr[i]+k_cont+"</li>"};
			radio_ul[j].innerHTML+=cont;
			if(radio_ul[j].title){var titles=radio_ul[j].title.split(",");
				if(arr.indexOf(titles[0])<0){
					radio_ul[j].getElementsByTagName('INPUT')[0].value=radio_ul[j].title[0]}}}
}}
	
function radio(m){//嵌入式单选事件触发效果
	var last_T ="";obj=event.srcElement;src_C = event.srcElement.className;
	src_C0 = src_C.replace(eval("/"+'bgc56'+"/i"),"bgc10");
	src_C1 = src_C.replace(/bgc10/i,'bgc56');
	objs=obj.parentNode.getElementsByTagName('LI');
	if(obj.parentNode.dataset.t=="check"){
		if(m==1)obj.getElementsByTagName('IMG')[0].src=(src_C==src_C1)?"../img/btn/check_0.png":"../img/btn/check_1.png";
		obj.className=(src_C==src_C1)?src_C0:src_C1;
		for(var i=0;i<objs.length;i++){
			if(objs[i].className.indexOf("bgc56")>=0){last_T += objs[i].innerHTML + ",";}} 
		}
	else{
		for(var j=0;j<objs.length;j++){objs[j].className = src_C0;
			if(m==1)objs[j].getElementsByTagName('IMG')[0].src="../img/btn/radio_0.png";};
		if(m==1)obj.getElementsByTagName('IMG')[0].src=(m==0&&src_C==src_C1)?"../img/btn/radio_0.png":"../img/btn/radio_1.png";
		last_T=(m==0&&src_C==src_C1)?"":event.srcElement.innerHTML;
		obj.className =(m==0&&src_C==src_C1)?src_C0:src_C1;
		}
	if(obj.parentNode.getElementsByTagName('INPUT')){
		last_T = obj.parentNode.getElementsByTagName('INPUT')[0].value + ","+last_T;}
    	obj.parentNode.title = last_T;	
	eval(obj.parentNode.dataset.f);
	}

function cancel_li(){//自定输入栏有内容时取消已选选项	
	var last_T=event.srcElement.parentNode.title=event.srcElement.value;
	if(last_T.length>0){var	objs=obj.parentNode.getElementsByTagName('LI');
		for(var j=0;j<objs.length;j++){objs[j].className = src_C0}}	
	}

function apprice(m,n,d){//评星级
	var cont="",pobj=d?document.getElementById(d):event.srcElement.parentNode; 
	for (var i=0;i<m;i++){
		if(i>n){cont+="<div class='FL ACP' onClick='apprice("+m+","+i+")'>☆</div>"}
		else{cont+="<div class='FL ACP colorR' onClick='apprice("+m+","+i+")'>★</div>"}
	}
	pobj.innerHTML=cont;pobj.dataset.v=n;
}
function inp_xchange(){//变速横向滑杆,前一个对象显示输入值，
	var prob=obj.previousSibling,bt=prob.title,xn=Math.max(0,Math.min(4,Math.round(0.25*(y-startY)/M))),xm=Math.max(0,Math.min(12,Math.floor(3*Math.log(bt)/Math.log(10)+1-xn)));
	if(xmm!=xm){xmm=xm;prob.title=bt=prob.innerHTML;
		objx0=obj.offsetLeft;startX=x;};//变速
	prob.innerHTML=(bt*1+[0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50,100][xm]*Math.ceil((x-startX)/M)).toFixed([2,2,2,1,1,1,0,0,0,0,0,0,0][xm]);
}
function inp_ychange(){//变速纵向滑杆
	var prob=obj.previousSibling,bt=prob.title,xn=Math.max(0,Math.min(4,Math.round(0.25*(startX-x)/M))),xm=Math.max(0,Math.min(12,Math.floor(3*Math.log(bt)/Math.log(10)+1-xn)));
	if(xmm!=xm){xmm=xm;prob.title=bt=prob.innerHTML;
		objy0=obj.offsetTop;startY=y;};//变速
	prob.innerHTML=(bt*1+[0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50,100][xm]*Math.ceil((y-startY)/M)).toFixed([2,2,2,1,1,1,0,0,0,0,0,0,0][xm]);
}	
function getvalue(){var eob=event.srcElement;//滑动输入动态显示数值;
	eob.previousSibling.innerHTML=eob.previousSibling.value=eob.value;
}
function textheight(h){//自动调整多行输入栏的高度
	var eb=event.srcElement,ln=eb.value.length;
	eb.style.height=(1.5*Math.floor(ln*M*1.6/(eb.offsetWidth-M*3))+2.5)+"em"; 
	eb.style.maxHeight=h*1.6+1+"em"; 
}


//图片处理JS-----------------------------
var URL=window.URL||window.webkitURL||window.mozURL||window.msURL;
var video,obj,canv,ctx,eobjp,start,startX,startY,objx0,objy0,tform=[0,0,1,0],scale0,angle0,imgOri,
objw,objh,clipt;
var faced,facedata,facedataln,faced1,facedata1,imgsizet={tp:"jpeg",w:512,h:0,url:""};
var objli,himgsrc;
function selectpic(d,t){console.log(d,t);//生成图片选择界面
	last_obj=d?((typeof d!="object")?document.getElementById(d):d):event.srcElement;
	document.getElementById("s_select").innerHTML='<iframe id="imgsel" name="imgsel" class=" none index2000 fix top0 W11 CH bgc0 ofa" src=""></iframe><div class="W11 H11 AC bgc0"><video id="video" class="none relative W11"></video><img id="rep_img" class="absolute top0 left0 W11 no_event" onload="imgtouchst(&quot;witcvs&quot;)" src='+(last_obj.src||"../img/adv/imgedit1.jpg")+'><canvas id="witcvs" class="none fix top0 left0 W11 no_event"></canvas><div id="clip" class=" none index2000 fix top0 borderO W11 H36M colorR no_select"><div class="absolute top0 left0 BTN border"  onmousedown="m_clip(1)" ontouchstart="m_clip(1)">左上角</div><div class="absolute MA abs0 BTN border" onclick="clipimg(&quot;rep_img&quot;)" >裁剪</div><div class="absolute bottom0 right0 BTN border" ontouchstart="m_clip(-1)" onmousedown="m_clip(-1)">右下角</div><div id="intxt" class="none absolute top0 left0 H W11"><textarea id="iptxt" class="FL HN4M C4M F4 LH15 ALP" placeholder="输入文字"></textarea><div class="FR H B4M bgc15" onClick="edit_txt()">&radic;</div></div><img id="rep_img2" class="none"/><div id="outxt" class="none absolute top0 left0 F8 W11"></div></div><div class="fix bottom0 W11 no_select"><ul id="menu2" class="FL W11 bordB AC F4 LH25 bgc38">请点击相册、相机或云图以获取图片</ul><div id="sbmenu1" class="FL C6M H AC bgc92 ofa"><ul class="nowrap inlineT vaM"><li class="inlineB BTN" onClick="hide(&quot;s_select&quot;); A_innerHTML(&quot;s_select&quot;)" >&lt;</li><li class="inlineB BTN" onClick="srcid(&quot;imgsel&quot;&quot;http://www.witknow.com/com/webimg.html#1&quot;);R_show()">云图</li><li class="inlineB BTN " onclick="R_show(); getCamer()">相机</li><li class="inlineB BTN" onclick="R_show();add_img(&quot;rep_img&quot;)">相册</li><li class="inlineB BTN" onClick="turn_right(&quot;rep_img&quot;)">左转</li><li id="btnclip" class="inlineB BTN bgs50" onclick="R_show();togg(&quot;clip&quot;);A_innerHTML(&quot;menu2&quot;,&quot;拖动边角块调整边界，再点击中间的裁剪键&quot;)">裁剪</li><li class="inlineB BTN" onClick="adjcolor_menu(&quot;menu2&quot;)">调色</li><li class="inlineB BTN" onClick="ad_text(&menu2&)">加字</li><li class="inlineB BTN" onClick="ad_bord(&menu2&)">加框</li></ul></div><div class="FR BTN bgc92 bordL" onClick="return_img()">OK</div></div></div>';
	show("s_select");
	if(t&&last_obj.src=="")document.getElementById("sbmenu1").children[0].children[t].click();
}  
function return_img(){//回传所选中的图片
	if(eobjp.classList.contains("none")==false){console.log(1);clipimg()}
	else if(canv.classList.contains("none")){console.log(2);clipimg0()};
    last_obj.src = canv.toDataURL("image/"+imgsizet.tp,0.7);
	if(last_obj.dataset.thumb){imgthumb(canv,last_obj.dataset.thumb)}
    show(last_obj);A_innerHTML("s_select"); hide("s_select");
}
function ablepublish(){publish_able=true;}//允许上传
function add_img(d){//从相册中选图
	ninput=document.createElement("INPUT");
	ninput.type="file";ninput.accept="image/*";
	ninput.onchange=function(){
		if(window.URL){obj=document.getElementById(d);
			obj.src=URL.createObjectURL(ninput.files[0]);
			show(d);
	}}
	ninput.click();
}
function photo_back(d,a){//手机返回图片
	document.getElementById(JSON.parse(a).id).src=d.message[0];
}
function getCamer(d){//调用摄像头
if(browser=="witknow"&&flag==1){
	postmessage({functionname:"openCamera",callback:"getCameraimg"})
	}else{    
	video=document.getElementById('video');
	video.addEventListener('touchstart',imgtouchStart,false);
	canv=document.getElementById(d);ctx=canv.getContext('2d');  
	document.getElementById('menu2').innerHTML='<div class="FL BTN" id="closev" >关相机</div><div class="FL C12M H AC bordLR" onclick="snap_photo()" >截图</div><div class="FR BTN" onclick="liveVideo()">直播</div>';
	liveVideo();
}} 
function getCameraimg(s){//APP返回相机处理过的图片
	document.getElementById('rep_img').src=s;
	show('rep_img');
}				
function liveVideo(){hide("rep_img");show("video");
	canv=document.getElementById('canvas'),ctx=canv.getContext('2d');  
	navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia;
	navigator.getUserMedia({video:true},function(stream){  
		video.src=URL.createObjectURL(stream)||stream; video.play();
		document.getElementById('closev').addEventListener('click',function (){stopStream(stream);})
		video.addEventListener('loadeddata', function (){
			canv.width=video.videoWidth;canv.height=video.videoHeight;}, false);
	}, 
	function(error){console.log(error.name||error);});  
}
function stopStream(stream){hide('canvas');A_innerHTML("menu2");
	stream.getVideoTracks()[0].stop();
}
function snap_photo(){hide("video");//点击截图	
	ctx.drawImage(video,0,0,canv.width,canv.height);  
    obj=document.getElementById('rep_img');
	obj.src=document.getElementById('canvas').toDataURL('image/jpeg',0.7);
	show(obj);
}
function imgtouchst(d){//选择图片成功后，设置复原
	canv=document.getElementById(d);ctx=canv.getContext('2d');ctx.save();
	obj=event.srcElement;show(obj);hide(d);
	eobjp=document.getElementById('clip');
	obj.addEventListener('touchstart',imgtouchStart,false);
	document.getElementById("btnclip").style="display:inline-block;";
	document.getElementById('menu2').innerHTML="通过裁剪和调色可以使图片更符合使用";
	tform=[0,0,1,0];turn_right("rep_img",0);
	document.getElementById('sbmenu1').scrollLeft=M*18;
/*	EXIF.getData(obj, function(){EXIF.getAllTags(obj); 
		imgOri= EXIF.getTag(obj,'Orientation')||1;console.log(imgOri); 
		var degree=(imgOri-1)%4*Math.PI/2,imgw=obj.width,imgh=obj.height;
		if(imgOri!=1){switch(imgOri){
			case 6: canv.width = imgh;canv.height = imgw;ctx.rotate(degree);
				ctx.drawImage(this, 0,-imgh,imgw,imgh );break;// 旋转90度
			case 3: canv.width = imgw;canv.height = imgh;ctx.rotate(degree);
				ctx.drawImage(this, imgw,-imgh,imgw,imgh);break;// 旋转180度
			case 8:canv.width = imgh;canv.height = imgw;ctx.rotate(degree);
				ctx.drawImage(this,-imgw,0,imgw,imgh);break;// 旋转-90度
		}
		ctx.restore();
		document.getElementById("rep_img2").src=canv.toDataURL("image/jpeg",0.7);
		console.log(document.getElementById("rep_img2").src);
	}});*/
}
function turn_right(d,a){//旋转d图片a角度
	obj=document.getElementById(d);console.log(a,tform);
	tform[3]=(tform[3]-(a==undefined?90:a))%360;console.log(tform);
	tform[1]=(obj.width-obj.height)/2;
	obj.style.webkitTransform="translate("+tform[0]+"px,"+tform[1]+"px) scale("+tform[2]+") rotate("+tform[3]+"deg)";console.log(tform);
	var ori=-tform[3]/90%2;
	eobjp.style.top=(1-ori)*tform[1]+"px";
	eobjp.style.left=(ori)*tform[1]+"px";
	eobjp.style.width=(ori==0?obj.offsetWidth:obj.offsetHeight)+"px";
	eobjp.style.height=Math.min(M*54,(ori==0?obj.offsetHeight:obj.offsetWidth))+"px";
}

function imgtouchStart(ev){console.log(987);//图片调形
	if (ev.touches.length==1){start=true;
		objx0=tform[0],objy0=tform[1];
		startX=ev.touches[0].clientX; startY=ev.touches[0].clientY;
		obj.addEventListener('touchmove',imgtouchMove, false)} 
	else if(ev.touches.length==2){start=false;ev.preventDefault();
		obj.addEventListener('touchmove',imggesturechange, false);
		startX=ev.touches[0].clientX-ev.touches[1].clientX;
		startY=ev.touches[0].clientY-ev.touches[1].clientY;
		angle0=tform[3]+Math.atan2(startX,startY)*180/Math.PI;
		scale0=tform[2];
	}
}
function imgtouchMove(ev){//图片移位
	if(ev.touches.length==1&&start==true){ev.preventDefault();
		tform[0]=objx0+ev.changedTouches[0].clientX-startX,
		tform[1]=objy0+ev.changedTouches[0].clientY-startY;
		obj.style.webkitTransform="translate("+tform[0]+"px,"+tform[1]+"px) scale("+tform[2]+") rotate("+tform[3]+"deg)";
}}
function imggesturechange(ev){//图片缩放旋转
	if(ev.touches.length==2){ev.preventDefault();
	var startX1=ev.touches[0].clientX-ev.touches[1].clientX,
	startY1=ev.touches[0].clientY-ev.touches[1].clientY;
	tform[2]=scale0*(300+Math.abs(startX1)+Math.abs(startY1*0.2))/(300+Math.abs(startX)+Math.abs(startY*0.2));
   	tform[3]=angle0-Math.atan2(startX1,startY1)*180/Math.PI;
	obj.style.webkitTransform="translate("+tform[0]+"px,"+tform[1]+"px) scale("+tform[2]+") rotate("+tform[3]+"deg)";
}}
function m_clip(t){//开始裁剪e.stopPropagation() || e.cancelBubble
	eobj=event.srcElement;clipt=t;down=true;
	eobj.addEventListener('touchmove',clipMove,false);
	eobj.addEventListener('mouseup',clipstop,false);
	eobj.addEventListener('mouseleave',clipstop,false);
	eobj.addEventListener('mousemove',clipMove,false);
	startX=event.clientX||event.touches[0].clientX,
	startY=event.clientY||event.touches[0].clientY;
	objx0=eobjp.offsetLeft;objy0=eobjp.offsetTop;
	objw=eobjp.offsetWidth;objh=eobjp.offsetHeight;
}
function clipMove(ev){//移动裁剪
	if(down==true&&(ev.clientX||ev.touches.length==1)){ev.preventDefault();
		var mX=(ev.clientX||ev.touches[0].clientX)-startX,
		mY=(ev.clientY||ev.touches[0].clientY)-startY;
		if(clipt==1){eobjp.style.left=objx0+mX+"px";eobjp.style.top=objy0+mY+"px";}
		eobjp.style.width=objw-mX*clipt+"px";
		eobjp.style.height=objh-mY*clipt+"px";	
}}
function clipstop(ev){down=false;
	eobj.removeEventListener("mousemove",clipMove);}

function clipimg(d){//切割图片
	ctx=canv.getContext("2d");
	var eobjp0=eobjp||document.getElementById("magic_img"),
	objw=obj.offsetWidth,objh=obj.offsetHeight,imgw=imgsizet.w,
	eobjpw=eobjp0.offsetWidth,scc=imgw/eobjpw,
	x0=scc*(tform[0]-eobjp0.offsetLeft+objw*0.5),
	y0=scc*(tform[1]-eobjp0.offsetTop+objh*0.5);
	canv.width=imgw;canv.height=imgw*eobjp0.offsetHeight/eobjpw;
	console.log(eobjpw+":"+canv.height);
	ctx.save();	ctx.translate(x0,y0);
	ctx.rotate(tform[3]*Math.PI/180);
	ctx.translate(-x0,-y0);
	ctx.drawImage(obj,0,0,obj.naturalWidth,obj.naturalHeight,x0-0.5*objw*tform[2]*scc,y0-0.5*objh*tform[2]*scc,objw*tform[2]*scc,objh*tform[2]*scc);
	ctx.restore();
	show(canv);hide(d);
	if(d=="rep_img"){hide("clip")};
}		
function clipimg0(){
	var imgw=imgsizet.w;ctx=canv.getContext("2d");//图片转画布
	canv.width=imgw;canv.height=imgw*obj.naturalHeight/obj.naturalWidth;
	ctx.drawImage(obj,0,0,canv.width,canv.height);
	hide('rep_img');show(canv);
}
function adjcolor_menu(d){R_show();console.log(d);//调色菜单    
	document.getElementById(d).innerHTML='<input id="adjcolor_range" type="range" max="50" min="-50" step="1" class="FL W11 H MB bgc8" onInput="change_imgc('+d+')" /><li class="FL W51 H" title=3 onclick="color_begin()">亮度</li><li class="FL W51 H" title=0  onclick="color_begin()">红</li><li class="FL W51 H" title=1  onclick="color_begin()">绿</li><li class="FL W51 H" title=2  onclick="color_begin()">兰</li><li class="FL W51 H" title=4  onclick="color_begin()">对比</li>';
	if(d=="magic2menu"){console.log(ctx);if(!ctx){console.log(d);clipimg('myimg')}}
	else{console.log(221);if(eobjp.style.display=="block"){console.log(222);clipimg('reg_img')}else if(!ctx){console.log(223);clipimg0()};
		hide("clip","btnclip");}
	onclickid(d,1);
}
function color_begin(){R_show();//调色
	document.getElementById("adjcolor_range").value=0;console.log(ctx);
	faced=ctx.getImageData(0,0,canv.width,canv.height);facedata=faced.data;
	faced1=ctx.getImageData(0,0,canv.width,canv.height);facedata1=faced1.data;
	facedataln=facedata1.length;console.log(facedataln);
}
function change_imgc(d){console.log(d);//调色
	var n=-1*event.srcElement.value,
	k=parseInt(d.title);console.log(n+":"+k);
	if(k==3){for(var i=0;i<facedataln;i+=4){
		facedata[i]=facedata1[i]-n;
		facedata[i+1]=facedata1[i+1]-n;
		facedata[i+2]=facedata1[i+2]-n;}}
	else if(k==4){for(var i=0;i<facedataln;i+=4){
		facedata[i]=facedata1[i]*(1-n/100)-1.28*n;
		facedata[i+1]=facedata1[i+1]*(1-n/100)-1.28*n;
		facedata[i+2]=facedata1[i+2]*(1-n/100)-1.28*n}}
	else{for(var i=k;i<facedataln;i+=4){facedata[i]=facedata1[i]-n;}}
	ctx.putImageData(faced,0,0);console.log(ctx);
}

function tocanvas(d,b){//把图片画在画布上,如果有b,则生成缩略图
	var img0=event.srcElement;
	canv=document.getElementById(d);ctx=canv.getContext("2d");
	canv.width = 512;canv.height = 512*img0.naturalHeight/img0.naturalWidth;
	ctx.drawImage(img0,0,0,canv.width,canv.height);
	show(d);
	if(b){imgthumb(canv,b)}
}
function imgthumb(imgt,b){//生成缩略图
	var canv2=document.createElement('canvas'),ctx2=canv2.getContext("2d"),
		imghw=imgt.tagName=="IMG"?imgt.naturalHeight/imgt.naturalWidth:imgt.height/imgt.width,st=eval("imgsizet"+b);
		canv2.width=st.w;
		canv2.height=st.h==0?st.w*imghw:st.h;
		ctx2.drawImage(imgt,0,0,canv2.width,canv2.height);console.log(st.tp);
		st.url=canv2.toDataURL("image/"+st.tp,0.7);console.log(st.url);
}
function add_imgs(d){//多选图片
	/*if(flag<4){//手机端
		postmessage({functionname: 'selectphoto',callback: 'photos_back',callbackparam:JSON.stringify({id:d})})
	}else{}*/
		ninput=document.createElement("INPUT");ninput.type="file";
		ninput.accept="image/*";ninput.setAttribute("multiple",true);
		ninput.onchange=function(){if(window.URL){
				for(var j=0,ln=ninput.files.length;j<ln;j++){
					var nimg=document.createElement("IMG");
					nimg.src=window.URL.createObjectURL(ninput.files[j]);
					nimg.onload=function(){shotimg(d)};}}
		}
		ninput.click();	
}
function photos_back(d,a){//手机返回图片
	var ninput=d.message,id=JSON.parse(a).id;
	for(var j=0,ln=ninput.length;j<ln;j++){
		var nimg=document.createElement("IMG");
		nimg.src=ninput[j];
		nimg.onload=function(){shotimg(id)};
	}
}
function shotimg(d){//imgw控制最大宽度,imgh控制最大高度
	var newimg=event.srcElement,imgw=imgsizet.w,imgh=imgsizet.h,
	iw=newimg.naturalWidth, ih=newimg.naturalHeight,iwh=iw/ih,
	canvas=document.createElement("canvas");console.log(imgsizet+":"+iw+":"+ih);
	if(imgw!=0&&imgh!=0){var imgwh=imgw/imgh;
		canvas.width=iwh>imgwh?(iw<imgw?iw:imgw):(ih<imgh?iw:imgh*iwh);
		canvas.height=iwh>imgwh?(iw<imgw?ih:imgw/iwh):(ih<imgh?ih:imgh);
	}else if(imgw!=0){
		canvas.width=iw<imgw?iw:imgw;canvas.height=iw<imgw?ih:imgw/iwh;
	}else if(imgh!=0){
		canvas.width=ih<imgh?iw:imgh*iwh;canvas.height=ih<imgh?ih:imgh;
	}else{canvas.width=iw;canvas.height=ih;}
	canvas.getContext("2d").drawImage(newimg,0,0,canvas.width,canvas.height);
	if(d){var newli=document.createElement("DIV"),
		lastimg=document.getElementById(d);
		newli.innerHTML='<img name="'+d+'" class="FL H18M MLT" /><img src="../img/btn/del2.png" class="FL MLN4 MT B4M" onclick="del_parent()"/>';
		lastimg.parentNode.insertBefore(newli,lastimg);
		newli.children[0].src=canvas.toDataURL("image/"+imgsizet.tp,0.7);}
}
function add_files(d){var lastimg=document.getElementById(d);
	ninput=document.createElement("INPUT");
	ninput.type="file";ninput.name="newfile";ninput.className="none H W11";
	ninput.accept="image/*";ninput.setAttribute("multiple",true);
	lastimg.parentNode.appendChild(ninput);
	ninput.onchange=function(){
		if(URL){var eo=event.srcElement,files=eo.files,ln=files.length;console.log(ln);
			for(var j=0;j<ln;j++){var newli=document.createElement("DIV");			
				newli.innerHTML='<img name="'+d+'" class="FL MLT B34M" /><img name="delimg" src="../img/btn/del2.png" class="relative FL MLN4 MT B4M"  onclick="del_prefile(&quot;'+files[j].name+'&quot;)"/>';
				lastimg.parentNode.insertBefore(newli,lastimg);
				newli.children[0].src=URL.createObjectURL(ninput.files[j]);
				nf_formdata.set(files[j].name,files[j]);
			}
	}}
	ninput.click();
}//从相册中选图
var nf_formdata = new FormData();
function handleFiles(d){//带预览的文件提交
var eobj=event.srcElement,files=eobj.files,ln=files.length;console.log(files);
	for(var i=0;i<ln;i++){
		var cs=files[i].type.indexOf("image")==0?0:1;
		var newli=document.createElement("DIV");newli.name=d;	
			newli.innerHTML=(cs==0?'<img class="FL H18M MLT" />':'<div class="FL MLT H A11 bgc9 PR5" ></div>')+'<img src="../img/btn/del2.png" class="FL MLN4 MT B4M" onclick="del_prefile(&quot;'+files[i].name+'&quot;)"/>';
			eobj.parentNode.insertBefore(newli,eobj);
		if(cs==0){newli.children[0].src=window.URL.createObjectURL(files[i]);} 
		else{newli.children[0].innerHTML=files[i].name}
		nf_formdata.set(files[i].name,files[i]);
	}
//	for(var value of nf_formdata.values()){console.log(value);}
}
function del_prefile(k){console.log(k);//文件删除；
	del_parent();
	nf_formdata.delete(k);
//	for(var value of nf_formdata.values()){console.log(value);}
}

function handleimg(d){//简单的图片转base64和预览
	var file = event.srcElement.files[0],reader = new FileReader(),
	img=d?document.getElementById(d):event.srcElement.previousSibling;
	reader.onload = (function(aImg){return function(e){aImg.src=e.target.result;};})(img);
	reader.readAsDataURL(file);
}
function img2card(d) {//名片识别
	var img=document.getElementById(d),sc=Math.sqrt(img.naturalWidth*img.naturalHeight)/800,
    cvs=document.createElement("canvas");
	cvs.width=img.naturalWidth/sc; cvs.height=img.naturalHeight/sc;
    cvs.getContext("2d").drawImage(img,0,0,cvs.width,cvs.height);
	var base64image=cvs.toDataURL("image/jpeg",0.7), map = new Map();
	map.put("base64image",base64image.substring(23));console.log(map);
    WITAJAX.ajaxmap(map,"http://121.43.233.185/mavenwitbrowser/witorc/orccard.do",showtext,error);
}
function showtext(d){//名片文字显示
	var txt="";console.log(d);
	if(d.comp[0])txt+="公司："+d.comp[0]+"<br>";
	if(d.comp[1])txt+="comp："+d.comp[1]+"<br>"
	if(d.dept[0])txt+="部门："+d.dept[0]+"<br>"
	if(d.title[0])txt+="职务："+d.title[0]+"<br>"
	if(d.name[0])txt+="姓名："+d.name[0]+"<br>"
	if(d.mobile[0])txt+="手机："+d.mobile[0]+"<br>"
	if(d.tel[0])txt+="电话："+d.tel[0]+"<br>"
	if(d.fax[0])txt+="传真："+d.fax[0]+"<br>"
	if(d.addr[0])txt+="地址："+d.addr[0]+"<br>"
	if(d.email[0])txt+="email："+d.email[0]+"<br>"
	if(d.web[0])txt+="网址："+d.web[0]+"<br>"
	if(d.im[0])txt+="QQ："+d.im[0]+"<br>"
	if(d.other)txt+="其它："+d.other;
	document.getElementById("cardtext").value=txt;
}	

function input_R(d,c){//单选
	var obj=event.srcElement,objp=obj.parentNode,obgc=obj.style.backgroundColor,objs=objp.getElementsByTagName('LI');
	if(objp.dataset.val!=obj.innerHTML){
		objp.dataset.val=obj.innerHTML;objp.title=obj.title;
		for(var j=0;j<objs.length;j++){objs[j].style.backgroundColor='';}
		obj.style.backgroundColor='#FFB';}
	else{obj.style.backgroundColor='';objp.dataset.val='';objp.title=0}
}

function checkfn(){var eobj=event.srcElement;//切换选择状态
	eobj.title=eobj.title==0?1:0;
	eobj.classList.toggle("bord_check1");
	eobj.classList.toggle("bord_check0");
}
function addnumber(n,f){console.log(n);//数字加减
	var mobj=n==1?event.srcElement.previousSibling:event.srcElement.nextSibling;
	mobj.value=mobj.value-n;
	if(mobj.value<0)mobj.value=0;
	console.log(mobj.value);
	if(f){eval(f+"("+mobj.title+","+mobj.value+")")}
}
function selectbyimgs(a){//根据图片的单选列表
	var cont='<div class="W11 H11 bgc2" >',c=eval(a);
	last_obj=event.srcElement;
	for(var i=0,ln=c.length;i<ln;i++){
		cont+='<div class="FL MLT D31 F4 LH2 AC" onclick="selectbyimg('+a+","+i+')" >'+c[i][0]+'<img src="'+c[i][1]+'" class="D31" /></div>';};
	document.getElementById('s_select').innerHTML=cont+'</div>';
	show('s_select');
}
function selectbyimg(a,j){//根据选中的图片返回结果
	c=eval(a);	last_obj.title=j;
	last_obj.children[0].innerHTML=c[j][0];
	last_obj.children[1].src=c[j][1];
	hide('s_select');
}
 
var rep_mes="";
function rolsel_bya(d){//根据数组生成滚轮
	last_obj=event.srcElement;rep_mes=last_obj.value;
	var cont1="";
	for(var k in d){cont1+='<div id="ul'+k+'" class="ofa FL ML A'+d.length+'1 H11 bgc'+k+'"><ul class="W11 AC"><li class="W11 H12M bordB"></li>';
		for(var i in d[k]){cont1+='<li class="W11 H bordB" onclick="scroll_centv('+k+')">'+d[k][i]+'</li>';}
		cont1+='<li class="W11 H12M"></li></ul></div>'};
	document.getElementById('s_select').innerHTML='<div class="W11 H11 bgca" onClick="hide(&quot;s_select&quot;);clearval()"></div><div class="fix bottom0 W11 H35M bgc102"><div id="inputmess" class="FL MLT C9M H AC bgc9 bord0">'+rep_mes+'</div><div class="FL MLT BTN bgc16" onclick="P_V()">确认</div><div id="sle" class="FL MT CW H28M ofa" ><div class="no_event index999 absolute bottom13M W11 H bgc59 alpha2"></div>'+cont1+'</div></div>';	show('s_select');
	for(var j in d){var nextobj=document.getElementById('sle').children[j-(-1)];
		nextobj.addEventListener('touchend',stop_scroll,false);
		nextobj.addEventListener('mousewheel',stop_scroll,false);
		nextobj.children[0].children[d[j].indexOf(rep_mes[j])+1].click();}
}//
function scroll_centv(u){var eobj=event.srcElement;
	eobj.parentNode.parentNode.scrollTop=eobj.offsetTop-eobj.parentNode.offsetTop-Math.floor(M*12);
	rep_mes=rep_mes.split("");rep_mes.splice(u,1,eobj.innerHTML);
	rep_mes=document.getElementById("inputmess").innerHTML=rep_mes.join('');
}//移动当前标签到中央，更新选中值
function stop_scroll(){var obj=event.srcElement.parentNode.parentNode;
	setTimeout(function(){obj.childNodes[0].childNodes[Math.round(obj.scrollTop/H)+1].click();},1000);	
}//滚动后延时启动点击，获得刹车
 
function setinterfn(t1, t2, fn, ar) { console.log(t1);
    snowFlakeDiv = document.createElement('div');
    snowFlakeDiv.className = 'index999 fix top0';
    document.body.appendChild(snowFlakeDiv);
    var it1 = setInterval(function (){eval(fn+"('"+ar+"')")}, t1);
    if (t2>0)setTimeout(function (){clearInterval(it1);
        document.body.removeChild(snowFlakeDiv);
    }, t2);
}//设置间隔
//地图API
function setgps(d){//app直接返回gps
	if(d.result>=0&&d.message){localgps=d.message;
		var obg=document.getElementById("gps");
		if(obg.tagName=="INPUT"){obg.value=localgps.lng+","+localgps.lat;
		}else{obg.innerHTML="经纬度("+localgps.lng+","+localgps.lat+")";}
}}
function get_GPS(d){//地址查GPS
	var gt=postmessage({functionname: "getlocation",witparams:{gps:document.getElementById("gps").value,ad:document.getElementById("adcode").value},callback: "setgps"})
	if(gt==-1){getgpsfrombaidu();}
}