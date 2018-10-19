onContentMenu="return false";
var CW,CH,Cmin,Cmax,DPR=1,orient,M,CW,HN,MYWIT={},FA=0,
	SW=screen.width,SH=screen.height,
    browser="ie",flag=9,AgentInfo = navigator.userAgent.toLowerCase(),
	Agents=["windows phone","android","iphone","ipad","macintosh"],
	browsername=["witknow","micromessenger","qq","firefox","chrome","safari","applewebkit","opera"];
for(var i=0;i<browsername.length;i++){if(AgentInfo.indexOf(browsername[i])>=0){browser=browsername[i];break;}}
if(typeof externalfun=="function"){flag=8}else{
	for(var v=0;v<Agents.length;v++){if(AgentInfo.indexOf(Agents[v])>=0){flag=v;break;}}
}
if(window.localStorage){ 
	MYWIT.FLR=localStorage.FLR||"右手";
	MYWIT.WFD=localStorage.WFD||"标屏";
	MYWIT.bgct1s=localStorage.skincolor1||"#07C";
	MYWIT.bgct2s=localStorage.skincolor2||"#4AF";
}
function cgset(nam,vals){
	event.srcElement.innerHTML=MYWIT[nam]=localStorage[nam]=vals[(vals.indexOf(event.srcElement.innerHTML)+1)%vals.length];
}

function add_css(str_css){
	var stlnow= document.getElementsByTagName("HEAD").item(0);
    var cssnow = document.getElementById("mystyle");
	if(cssnow!==null){try{stlnow.removeChild(cssnow);}catch(e){}}
	try {var mystl = document.createStyleSheet();//ie
  		mystl.id="mystyle"; mystl.cssText = str_css; }
 	catch (e){var mystl=document.createElement("style");	
	    mystl.id="mystyle"; mystl.type = "text/css";mystl.textContent = str_css;
 		document.getElementsByTagName("HEAD").item(0).appendChild(mystl);
	}
	if(typeof self_f=="function"){self_f()};
} 
function autocss(){
	var strcss,M0,D51,D41,D31,D21,D11;
	orient=window.orientation||"0";
	CW=document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth;
	CH=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
	Cmin=Math.min(CW,CH);Cmax=Math.max(CW,CH);
	DPR=flag==4?1:(flag<4?Math.max(Cmax/Math.max(SW,SH),Cmin/Math.min(SW,SH)):window.devicePixelRatio);
	if(flag>3){M=Math.max(SW,SH)/144}else{M=Math.min(Cmin/36,Cmax/54);};
	document.documentElement.style.fontSize=Math.floor(M*4)+"px";
	CW=Math.max(CW,M*36);
	WN=CW/M;HN=CH/M;
	D51=Math.floor((CW-M)/Math.floor((WN-1)/7)-M);
	D41=Math.floor((CW-M)/Math.floor((WN-1)/8)-M);
	D31=Math.floor((CW-M)/Math.floor((WN-1)/10)-M);
	D21=Math.floor((CW-M)/Math.floor((WN-1)/14)-M);
	D11=Math.floor((CW-M)/Math.floor((WN-1)/20)-M);
    strcss="html{font-size:"+Math.floor(M*4)+"px;}"
	strcss+=".F1{font-size:"+M*1+"px;}.F2{font-size:"+M*1.2+"px;}.F3{font-size:"+M*1.4+"px;}.F4{font-size:"+M*1.6+"px;}.F5{font-size:"+M*1.8+"px;}.F6{font-size:"+M*2+"px;}.F7{font-size:"+M*2.4+"px;}.F8{font-size:"+M*3+"px;}.F9{font-size:"+M*4+"px;}"
	strcss+=".rad1{border-radius:"+M+"px;}.rad2{border-radius:"+M*2+"px;}.rad05{border-radius:"+M*0.5+"px;}"
	strcss+=".BTN {width:"+M*6+"px;height:"+M*4+"px; line-height:"+M*4+"px;font-size:"+M*1.6+"px;text-align:center;}"
	strcss+=".POT {width:"+M*2+"px;height:"+M*2+"px;margin:"+M+"px;}.ICON {width:"+M*4+"px;height:"+M*4+"px;text-align:center;}"
	strcss+=".TEXT {width:100%;height:auto;text-align:left;padding-left:"+M+"px;padding-right:"+M+"px;}"
	strcss+=".top1{top:"+M+"px;}.top4{top:"+M*4+"px;}.top5{top:"+M*5+"px;} .top6{top:"+M*6+"px;} .top8{top:"+M*8+"px;}.top18{top:"+M*18+"px;}.top36{top:"+M*36+"px;} .topCH{top:"+CH+"px;}.topN4{top:"+M*-4+"px;} .topN8{top:"+M*-8+"px;}.topadv{top:"+(CW<CH?M*18:0)+"px;}"
	strcss+=".bottom4{bottom:"+M*4+"px;} .bottom6{bottom:"+M*6+"px;}.bottom10{bottom:"+M*10+"px;} .bottom13{bottom:"+M*13+"px;} .bottom3I{bottom:"+M*10.1+"px;} .bottom34{bottom:"+M*34+"px;}"
    strcss+=".left1{left:"+M+"px;}.left2{left:"+M*2+"px;} .left4{left:"+M*4+"px;}.left8{left:"+M*8+"px;} .left5{left:"+M*5+"px;}.left15{left:"+M*15+"px;}.leftN6{left:"+M*(-6)+"px;}.right1{right:"+M+"px;} .right2{right:"+M*2+"px;}.rightN2{right:"+M*-2+"px;}"
	strcss+=".CE36M{left:"+(CW*0.5-M*18)+"px;}.CE24M{left:"+(CW*0.5-M*12)+"px;}"
	strcss+=".M{margin:"+M+"px;}.M05{margin:"+M*0.5+"px;}.M2{margin:"+M*2+"px;}.MLT{margin-left:"+M+"px;;margin-top:"+M+"px;}.MRT{margin-top:"+M+"px;margin-right:"+M+"px;}.MT{margin-top:"+M+"px;}.MT05{margin-top:"+M*0.5+"px;}.MT06{margin-top:"+M*0.6+"px;}.MT2{margin-top:"+M*2+"px;}.MT4{margin-top:"+M*4+"px;}.MT5{margin-top:"+M*5+"px;}.MT8{margin-top:"+M*8+"px;}.MTN{margin-top:"+(-M)+"px;}.MTN2{margin-top:"+M*-2+"px;}.MTN4{margin-top:"+M*-4+"px;}.MTN8{margin-top:"+M*-8+"px;}.MB{margin-bottom:"+M+"px;}.MB4{margin-bottom:"+M*4+"px;}.MBN4{margin-bottom:"+M*-4+"px;}.ML{margin-left:"+M+"px;}.ML05{margin-left:"+M*0.5+"px;}.ML4{margin-left:"+M*4+"px;}.MLN2{margin-left:"+M*-2+"px;}.MLN4{margin-left:"+M*-4+"px;}.MR{margin-right:"+M+"px;}.MR2{margin-right:"+M*2+"px;}.MRN2{margin-right:"+M*-2+"px;}"
	strcss+=".P1{padding:"+M+"px;}.P05{padding:"+M*0.5+"px;}.P2{padding:"+M*2+"px;}.PT{padding-top:"+M+"px;}.PB{padding-bottom:"+M+"px;}.PB28{padding-bottom:"+M*28+"px;}.PL2{padding-left:"+M*2+"px;}.PL18{padding-left:18em;}.PR1{padding-right:"+M+"px;}.PR5{padding-right:"+M*5+"px;}"
	strcss+=".CHH {height:"+(CH+4*M)+"px;}.CHNH {height:"+(CH-4*M)+"px;}.CHN2H {height:"+(CH-8*M)+"px;}.CHN3H {height:"+(CH-12*M)+"px;}.HCW{height:"+CW+"px;}"
	strcss+=".H {height:"+M*4+"px;line-height:"+M*4+"px;font-size:"+M*1.6+"px;}.HI {height:"+M*3.4+"px;line-height:"+M*3.4+"px;font-size:"+M*1.6+"px;}"
	strcss+=".H1M { height:"+M+"px;}.H1_5M {height:"+M*1.5+"px;}.H2M { height:"+M*2+"px;}.H3M { height:"+M*3+"px;}.H4M { height:"+M*4+"px;}.H5M { height:"+M*5+"px;}.H6M { height:"+M*6+"px;}.H7M { height:"+M*7+"px;}.H8M { height:"+M*8+"px;}.H9M { height:"+M*9+"px;}"
	strcss+=".H10M { height:"+M*10+"px;}.H12M { height:"+M*12+"px;}.H14M { height:"+M*14+"px;}.H15M { height:"+M*15+"px;} .H16M { height:"+M*16+"px;}.H18M {height:"+M*18+"px;}";
	strcss+=".H21M {height:"+M*21+"px;}.H24M {height:"+M*24+"px;}.H26M {height:"+M*26+"px;}.H27M {height:"+M*27+"px;}.H28M {height:"+M*28+"px;}"
	strcss+=".H30M {height:"+M*30+"px;}.H32M {height:"+M*32+"px;}.H35M {height:"+M*35+"px;}.H36M {height:"+M*36+"px;}.H38M {height:"+M*38+"px;}.H40M {height:"+M*40+"px;}.H48M {height:"+M*48+"px;}.H64M {height:"+M*64+"px;}"
	strcss+=".HN4M {min-height:"+M*4+"px;}.HX12M {max-height:"+M*12+"px;}.HX24M {max-height:"+M*24+"px;}.HX36M {max-height:"+M*36+"px;}.HX48M {max-height:"+M*48+"px;}"
	strcss+=".H_li {height:"+(CW<CH?(M*46):(M*30))+"px;}.H14T7 {height:"+(CW<CH?(M*14):(M*8))+"px;}";
	strcss+=".B1M{width:"+M+"px;}.B2M{width:"+M*2+"px;}.B3M{width:"+M*3+"px;}.B4M{width:"+M*4+"px;}.B5M{width:"+M*5+"px;}.B6M{width:"+M*6+"px;}.B7M{width:"+M*7+"px;}.B8M{width:"+M*8+"px;}.B9M{width:"+M*9+"px;}"
	strcss+=".B10M {width:"+M*10+"px;}.B11M { width:"+M*11+"px;}.B12M { width:"+M*12+"px;}.B13M { width:"+M*13+"px;}.B14M { width:"+M*14+"px;}.B15M { width:"+M*15+"px;}.B16M { width:"+M*16+"px;}.B18M { width:"+M*18+"px;}.B19M { width:"+M*19+"px;}"
	strcss+=".B24M { width:"+M*24+"px;}.B32M { width:"+M*32+"px;}.B34M { width:"+M*34+"px;}.B36M { width:"+M*36+"px;}.B38M { width:"+M*38+"px;}"
	strcss+=".B48M { width:"+M*48+"px;}.B54M { width:"+M*54+"px;}.B64M { width:"+M*64+"px;}.B06M { width:"+M*0.6+"px;} .B05M { width:"+M*0.6+"px;}"
	strcss+=".C1M {width:"+(CW-M)+"px;}.C2M {width:"+(CW-2*M)+"px;}.C3M {width:"+(CW-3*M)+"px;}.C4M {width:"+(CW-4*M)+"px;}.C5M {width:"+(CW-5*M)+"px;}.C6M {width:"+(CW-6*M)+"px;}.C7M {width:"+(CW-7*M)+"px;}.C8M {width:"+(CW-8*M)+"px;}.C9M {width:"+(CW-9*M)+"px;}.C10M {width:"+(CW-10*M)+"px;}"
	strcss+=".C11M {width:"+(CW-11*M)+"px;}.C12M {width:"+(CW-12*M)+"px;}.C13M {width:"+(CW-13*M)+"px;}.C14M {width:"+(CW-14*M)+"px;}.C15M {width:"+(CW-15*M)+"px;}.C16M {width:"+(CW-16*M)+"px;}.C17M {width:"+(CW-17*M)+"px;}.C18M {width:"+(CW-18*M)+"px;}.C19M {width:"+(CW-19*M)+"px;}"
	strcss+=".C20M {width:"+(CW-20*M)+"px;}.C21M {width:"+(CW-21*M)+"px;}.C22M {width:"+(CW-22*M)+"px;}.C23M {width:"+(CW-23*M)+"px;}.C24M {width:"+(CW-24*M)+"px;}.C28M {width:"+(CW-28*M)+"px;}.C36M {width:"+(CW<M*48?CW:(CW-36*M))+"px;}"
	strcss+=".C9MT2 {width:"+(CW<57*M?(CW-9*M):(CW*0.5-8.5*M))+"px;}.C12MT2 {width:"+(CW<57*M?(CW-12*M):(CW*0.5-11.5*M))+"px;}.C13MT2 {width:"+(CW<57*M?(CW-13*M):(CW*0.5-12.5*M))+"px;}.C15MT2 {width:"+(CW<57*M?(CW-15*M):(CW*0.5-14.5*M))+"px;}.C17MT2 {width:"+(CW<57*M?(CW-17*M):(CW*0.5-16.5*M))+"px;}.C18MT2 {width:"+(CW<57*M?(CW-18*M):(CW*0.5-17.5*M))+"px;}.C21MT2 {width:"+(CW<57*M?(CW-21*M):(CW*0.5-20.5*M))+"px;}.C6MQ{width:"+(CW*0.5-6*M)+"px;}"
	strcss+=".A11 {width:"+(CW-2*M)+"px;}.A21 {width:"+(CW*0.5-1.5*M)+"px;}.A31{width:"+(CW*0.333-1.33*M)+"px;}.A32 {width:"+(CW*0.666-1.66*M)+"px;}.A41{width:"+(CW*0.25-1.25*M)+"px;}.A43{ width:"+(CW*0.75-1.75*M)+"px;}.A51 {width:"+(CW*0.2-1.2*M)+"px;}.A52 {width:"+(CW*0.4-1.4*M)+"px;}.A53 {width:"+(CW*0.6-1.6*M)+"px;}.A54{width:"+(CW*0.8-1.8*M)+"px;}.A61{width:"+(CW*0.166-1.22*M)+"px;}"
	strcss+=".A1T2 {width:"+(CW<57*M?(CW-2*M):(CW*0.5-1.5*M))+"px;}.A2T4 { width:"+(CW<57*M?(CW*0.5-1.5*M):(CW*0.25-1.25*M))+"px;}.A3T6 { width:"+(CW<57*M?(CW*0.333-1.333*M):(CW*0.1666-1.1666*M))+"px;}.A4T8 { width:"+(CW<60*M?(CW*0.25-1.25*M):(CW*0.125-1.125*M))+"px;}"
	strcss+=".C2W{width:"+CW*2+"px;}.WNS{width:"+(CW+17)+"px;} .CW1T2{width:"+(CW<CH?100:50)+"%;}.B36MC {width:"+(CW<CH?CW:36*M)+"px;}";
	strcss+=".PLA {width:100%; height:"+(CW*0.25+3.8*M)+"px;}.PA3 {width:"+(CW*0.333-1.33*M)+"px; height:"+(CW*0.25-M)+"px;float:left;margin-left:1px;}.PB3{width:"+(CW*0.333-1.33*M)+"px;height:"+(CW*0.5-M)+"px;float:left;margin-left:"+M+"px;}"
	strcss+=".W2H {width:"+(CW>CH?CW*0.5:CW)+"px;height:"+(CW>CH?CH:CH*0.5)+"px;}.B3T6 {width:"+(CW*0.7*M>CH?6*M:3*M)+"px;}"
	strcss+=".aside {width:"+(CW*0.7>CH?50:100)+"%; height:"+(CW*0.7>CH?7.2:3.7)+"%;float:left;}"
	strcss+=".D21 {width:"+D21+"px;}.D31 {width:"+D31+"px;}.D41 {width:"+D41+"px;}.D51 {width:"+D51+"px;}"
	strcss+=".pic21 { width:"+D21+"px; height:"+D21*0.75+"px;}.pic22 { width:"+D21+"px; height:"+D21+"px;}.pic23 { width:"+D21+"px; height:"+D21*1.33+"px;}.pic23n{ width:"+D21+"px; height:"+(D21*1.33+6)+"px;}"
	strcss+=".pic32 { width:"+D31+"px; height:"+D31*0.75+"px;}.pic33 { width:"+D31+"px; height:"+D31+"px;}.pic34 { width:"+D31+"px; height:"+D31*1.33+"px;}.pic35n{ width:"+D31+"px; height:"+(D31*1.33+6)+"px;}"
	strcss+=".pic43{ width:"+D41+"px; height:"+D41*0.75+"px;}.pic44 { width:"+D41+"px; height:"+D41+"px;}.pic45 { width:"+D41+"px; height:"+D41*1.33+"px;}.pic45n{ width:"+D41+"px; height:"+(D41*1.33+3)+"px;}";
	strcss+=".col1{width:"+(CW<CH?CW:6*M)+"px; height:"+(CW<CH?4*M:(CH-4*M))+"px; }.col2 {width:"+(CW<CH?CW:(CW-6*M))+"px;height:"+(CW<CH?(CH-4*M):CH)+"px;}"
	strcss+=".navpadding{padding-left:"+Math.floor((CW%8)*0.5)+"px;padding-top:1px}.topadv{top:"+(CW<CH?M*18:0)+"px;}.CCVi { width:"+(CW<44*M?CW:(CW<58*M?(CW*0.5):(CW-36*M)))+"px; height:"+4.5*M+"px;line-height:"+4.5*M+"px;font-size:"+1.5*M+"px; text-align:left; padding-left:0.5em; overflow:hidden;}";
	strcss+=".bgct1{color:#fff; background-color:"+MYWIT.bgct1s+";} .bgct2{color:#000; background-color:"+MYWIT.bgct2s+";}";
	strcss+=".FLR{float:"+(MYWIT.FLR=="右手"?"left":"right")+";} .FRL{float:"+(MYWIT.FLR=="右手"?"right":"left")+";}"
	strcss+=".ABLR{"+(MYWIT.FLR=="右手"?"left:0":"right:0")+";}.ABRL{"+(MYWIT.FLR=="右手"?"right:0":"left:0")+";}"
	strcss+=".CW{width:"+CW+"px;}.CH{height:"+CH+"px;}.Fscreen{z-index:9999;width:"+CW+"px;height:"+CH+"px;top:0px;}"
	add_css(strcss); 
}
function loadimg(){
	var imgtags=document.getElementsByTagName('img');
	for(var i=0; i<imgtags.length;i++){
		if(!imgtags[i].src&&imgtags[i].dataset.src)imgtags[i].src=imgtags[i].dataset.src;
		if(imgtags[i].name=="picauto")imgtags.onload=autoimgsize(imgtags[i]);
	}
} 
function loadbgc(s,d){var tobj=d?document.getElementById(d):document.body;
	tobj.style.backgroundImage="url("+s+")";}
function hrefs(h){
	var f=flag==3?2:flag, a=h.split('||'), n=a[0].indexOf(f);
	if(n>=0){location.href=a[n+1];
}}
function srcid(d,s) {
    document.getElementById(d).src=s?s:"";
    document.getElementById(d).style.display=s?"block":"none";
	console.log(d+":"+s);
}
function openwindow(d){	
	d=d.indexOf("http")<0?"http://"+d:d;window.open(d);
}
function closewindow(){
	if(window!=window.parent){window.parent.hide('s_select')}
	else{window.opener=null;window.open('','_self');window.close();
	if(browser=="witknow")postmessage({functionname:"closeappwindow",callback: "success"});}
}	
function onclickid(d,n){
	var ob=(typeof d!="object")?document.getElementById(d):d;
	if(n>=0)ob=ob.children[n];ob.click();
}
function onfocusid(d){
	var ob=(typeof d!="object")?document.getElementById(d):d;
	ob.focus();
}
function mouse_S(){
	var objs=document.querySelectorAll("[class*=ofhy]");
	for(var i=0;i<objs.length;i++){
		objs[i].addEventListener("mousewheel",function(e){
			if(this.scrollLeft>0&&this.scrollLeft<(this.scrollWidth-this.offsetWidth)){event.preventDefault();}
    	this.scrollLeft += e.wheelDelta * (-0.125);})
}}
function show(){
	for(var i=0;i<arguments.length;i++){
	var ob=(typeof arguments[i]!="object")?document.getElementById(arguments[i]):arguments[i];ob.classList.remove('none');}
}
function hide(){
	for(var i=0;i<arguments.length;i++){
	var ob=(typeof arguments[i]!="object")?document.getElementById(arguments[i]):arguments[i];ob.classList.add('none');}
}
function togg(d,t) {
	var ob=d?((typeof d!="object")?document.getElementById(d):d):event.srcElement.nextSibling;
	if(t){event.srcElement.innerHTML=ob.classList.contains("none")?t[0]:t[1];}
	ob.classList.toggle("none");
}
function no_detail(d,t){//详情全展开或隐藏
	var ob=(typeof d!="object")?document.getElementById(d):d;
	p=ob.querySelectorAll("DETAILS");
	t=t||event.srcElement.title;event.srcElement.title=t*-1;
	for(var i=0,ln=p.length;i<ln;i++){p[i].open=t==1?true:false;}
}
function onbright(ob,t){
	actobj=ob||event.srcElement;
	actobj.classList.toggle("bright",t);
}
function offbrightall(d){//全取消
	var ob=(typeof d!="object")?document.getElementById(d):d;
	p=ob.querySelectorAll(".bright");
	for(var i=0,ln=p.length;i<ln;i++){onbright(p[i],false);}
}
function showcld(t){
	var eo=event.srcElement,so=eo.nextSibling.nextSibling,
	soc=so.children,t=t?t:(so.classList.contains("none")?false:true);
	eo.classList.toggle("rotate90",t);
	so.classList.toggle("none",t);	
	for(var i=0,ln=soc.length;i<ln;i=i+2){
		soc[i].click();
	}
}
function showfulltxt(){event.srcElement.classList.toggle("ellips5");}
function R_show(d,s) {
	if(s||!d){var eob=event.srcElement,eobs=eob.parentNode.children,ln=eobs.length;
		for(var i=0;i<ln;i++){eobs[i].classList.toggle("bgca5",false);}
		eob.classList.toggle("bgca5",true)};	
    if(d){var eob =(typeof d!="object")?document.getElementById(d):d,eobs=eob.parentNode.children,ln=eobs.length;
		for(var i=0;i<ln;i++){eobs[i].classList.toggle('none',true)}
		eob.classList.toggle('none',false)}
	eob.title&&(eob.parentNode.title=eob.title);
}
function spreadshow(d,t){var ob=document.getElementById(d);
	ob.style.display=ob.style.display=="block"?"none":"block";
	document.getElementById(t).src=ob.style.display=="none"?"../img/btn/add.png":"../img/btn/subtract.png";
}
function hidden() {for(var i in arguments){
	var obj=(typeof arguments[i]!="object")?document.getElementById(arguments[i]):arguments[i];
	obj.style.display = "hidden" ; }
}
function fadein(d) {var c_n=0,v=0.1,d=d?d:document.body;show(d); fadei(d);
    function fadei(d){C_S('opacity',v,d);v += 0.05; c_n += 1;
        if (c_n < 20) {setTimeout(function(){fadei(d)},40)}
}}
function fadeout(d) {var c_n=0,v=0.9,d=d?d:document.body; fadeo(d);
    function fadeo(d){C_S('opacity', v, d);v -= 0.05; c_n += 1;
        if (c_n < 20) {setTimeout(function (){fadeo(d)},40)}else{hide(d)}
}}
function A_innerHTML(d,c){
	ob=(typeof d!="object")?document.getElementById(d):d;
	document.getElementById(d).innerHTML=c||"";show(d);
}	
function clearval(){
	if(arguments.length==0){last_obj.value=""}
	else{for(var z in arguments){document.getElementById(arguments[z]).value="";}}
}	
function C_S(stylename,value,d) {
	var ob=(typeof d!="object")?document.getElementById(d):d;
    ob.style[stylename]=value;
}
function A_C(d,c){
	if(d.className.indexOf(c)<0){d.className=d.className+" "+c;}else{d.className=d.className.replace(eval("/"+c+"/i"),"")}
}
function R_C(d,c1,c2){
	var ob=(typeof d!="object")?document.getElementById(d):d;
    if(ob.className.indexOf(c1)>=0){
		ob.className=ob.className.replace(eval("/"+c1+"/i"),c2)
	}else if(ob.className.indexOf(c2)>=0){
		ob.className=ob.className.replace(eval("/"+c2+"/i"),c1)}
}
function tog_fun() {
var eobj=event.srcElement,tex=eobj.dataset.tex.split('|'),
	funs=eobj.dataset.fun.split('|'),n=tex.indexOf(eobj.innerHTML);
	if(n>=0&&tex.length==funs.length){n=(n+1)%tex.length;
    	eobj.parentNode.parentNode.title=eobj.innerHTML=tex[n]; eval(funs[n]+"()");}
}
function C_byC_D1(){var cont="";
    for (var i=0; i<arguments[2].length; i++) {
        cont += arguments[1][0]+i+arguments[1][1]+arguments[2][i]+ arguments[1][2]}; 
    document.getElementById(arguments[0]).innerHTML = cont;
}
function C_byC_D2(d,cs,dt,n){
	var cont="",ob=(typeof d!="object")?document.getElementById(d):d;
    for (var i = 0; i<dt.length; i++){cont+=cs[0];
        for (var z=1; z<cs.length; z++) {cont+=dt[i][z-1]+cs[z];}} 
    ob.innerHTML = cont;
	if(n>=0)ob.children[n].click();
}

function set(nam, val1, val2) {
    val = event.srcElement.innerHTML == val1 ? val2 : val1;
    localStorage.setItem(nam, val);
    event.srcElement.innerHTML = val;
}
function compare(property){
    return function(a,b){
        var val1 = a[property],val2 = b[property];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);val2 = Number(val2);}
		if(val1==""){return true}else if(val2==""){return false};
        return val1 > val2;
    }
}
function set_title(d,v) {document.getElementById(d).title=v}

function add_child(d,tg,cs,inh){
	var cld= document.createElement(tg);
    cld.className = cs; cld.innerHTML = inh;
	document.getElementById(d).appendChild(cld);
}
function add_childB(d,tg,cs,inh,nobj){
	var ob=(typeof d!="object")?document.getElementById(d):d,
	cld= document.createElement(tg);
    cld.className = cs;
	if(tg=="INPUT"||tg=="TEXTAREA"){cld.placeholder=inh}else{cld.innerHTML = inh};
	ob.insertBefore(cld,nobj);
}
function removeobj(d,n){
	if(n&&n=="name"){var obs=document.getElementsByName(d),ln=obs.length;
		for(var i=0;i<ln;i++){obs[i].parentNode.removeChild(obs[i])}}
	else{ob=d?((typeof d!="object")?document.getElementById(d):d):event.srcElement.parentNode;
		ob.parentNode.removeChild(ob);}
}
function del_parent(d){
	if(d){var dobj=document.getElementsByName(d),ln=dobj.length;
		for(var i=0;i<ln;i++){dobj[i].parentNode.parentNode.removeChild(dobj[i].parentNode)}}
	else{event.srcElement.parentNode.parentNode.removeChild(event.srcElement.parentNode)}
}
function slideTo(n,d) {
	var obj=d?document.getElementById(d):event.srcElement;console.log(obj);
	obj.parentNode.parentNode.scrollTop=obj.offsetTop-(n?M*n:0);
}	
function scrollto(h,d){
var sobj=d?document.getElementById(d):document.body;
	sobj.scrollTop=M*(h?h:0);
}
function appset(nam, val1, val2){
	var val=event.srcElement.innerHTML==val1?val2:val1;
    localStorage.setItem(nam, val);  event.srcElement.innerHTML = val;
	postmessage({functionname:nam,witparam:{"param":val},callback:"callback"});
}//改变框架设置
timecount=function (d,a,c,f){
	var ms,state=1,then=new Date().getTime()+(c?c*1000:0), 
	sHMS=function (){
		ms=parseInt(0.001*(c?(then-new Date().getTime()):(new Date().getTime()-then)));
		document.getElementById(d).innerHTML=(parseInt(ms/3600)<10?"0":"")+parseInt(ms/3600)+a[0]+(parseInt(ms/60)%60<10?"0":"")+parseInt(ms/60)%60+a[1]+(ms%60<10?"0":"")+ms%60+a[2]};
	timestart=function (){sHMS();
		if(c&&f&&ms<=0){eval(f+"()")}
		else if(state==1){setTimeout("timestart()",1000)}};
	timestop=function (){state=0; sHMS();return ms;}
	timestart();
}
function P_V(d){
	var vobj=document.getElementById("inputmess"); 
	if(last_obj.tagName=="INPUT"){last_obj.value=vobj.innerHTML||vobj.value||"";}
else{last_obj.innerHTML=vobj.innerHTML||vobj.value||"";}
	last_obj.title=vobj.title||"";
	if(d){localStorage.setItem(d,vobj.title)};
	hide("s_select");document.body.style.overflow="auto";
	if(last_obj.dataset.finp){eval(last_obj.dataset.finp+"()")}
}
function p_addr(msg){
	try {var msgs=msg.message;
		if(last_obj.tagName=="INPUT"){last_obj.value=msgs.output_txt;}
		else{last_obj.innerHTML=msgs.output_txt;};
		last_obj.title=msgs.output_value;
	} catch (ex){alert("error:"+ex);}
	if(last_obj.dataset.finp){eval(last_obj.dataset.finp+"()")}
	last_obj.blur();
}

var last_val,outtype,date_geshi,date,cDays;
var date_show_type="阳历",year=2016,month=1,day=1,hour=0,minute=0;
var cYear,cMonth,cDay,monString=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","腊月"],dayString=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","廿十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"],date_sli=['year','month','day','hour','minute','second','week'],madd=[0,31,59,90,120,151,181,212,243,273,304,334],astroString=["魔蝎座","水瓶座","双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座"],astroN=["21","20","21","21","22","22","23","24","24","24","23","22"];
var CalendarData=[0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95,0x6AA,0xAD5,0x209DA,0x4B6,0x614AE,0xA4E,0xD26,0x51D26,0xD53,0x5AA,0x30D6A,0x96D,0x11095D,0x4AD,0xA4D,0x61A4B,0xD25,0xD52,0x51B54,0xB5A,0x56D,0x2095B,0x49B,0x71497,0xA4B,0xAA5,0x516A5,0x6D2,0xADA,0x30AB6,0x937,0x8092F,0x497,0x64B,0x60D4A,0xEA5,0x6B2,0x4156C,0xAAE,0x92E,0x3192E,0xC96,0x71A95,0xD4A,0xDA5,0x50B55,0x5EA,0xA6D,0x40A5D,0x52D,0x8152B,0xA95,0xB4A,0x616AA,0xAD5,0x55A,0x414BA,0xA5B,0x52B,0x21527,0x693,0x70E53,0x6AA,0xAD5,0x509B5,0x4B6,0xA57,0x40A4E,0xD26,0x81D6A,0xD52,0xDAA,0x60D6A,0x56D,0x4AE,0x4149D,0xA5D,0xD15,0x21B25,0xD52,0x70B52,0xB5D,0x55D,0x5095B,0x49B,0xA4B,0x41A4B,0xAA5,0x916A5,0x6D3,0xAD6,0x60AB6,0x937,0x497,0x41C97,0x74B,0x6A5];
function c_date(n,gs,me){
	last_obj=event.srcElement;
    last_val=last_obj.title||((me==1&&localStorage.inputdate)?localStorage.inputdate:new Date().Format('yyyy-MM-dd hh:mm:ss'));
//获得默认时间
	if(browser=="witknow"&&flag<5){
		postmessage({functionname: "gettimesel",witparams:{mgc:n,showtype:gs,initime:last_val},callback:"p_time"});}else{c_date1(n,gs,me);}
}
function c_date1(n,gs,me){
	document.body.style.overflow="hide";
	outtype=n;date_geshi=gs;formattype="";
var nl=n.length;
	date=new Date(last_val.rtrim(".0").replace(/\-/g, "/"));
	set_ymdhm(date);
var cont='<div class="W11 H11 bgca" onClick="hide(&quot;s_select&quot;)"></div><div id="sle" class="fix bottom0 W11 H35M bgc102 PB1"><div id="change_table" class="none index99 fix bottom0 FL W11 H35M bgc102 AC" ></div><div class="FL MLT A51 H4M F3 AC bgc36" onclick="change_date_type()">'+date_show_type+'</br>阳历</div>';
    cont+='<div id="inputmess" class="FL MLT A53 H AC bgc9" ></div><div id="tt" class="FR MRT A51 H AC bgc16 color1" onclick="P_V(&quot;inputdate&quot;)">确认</div><div id="scr_pp" class="FL ML A11 H28M" ><div class="no_event index999 absolute bottom13 W11 H bgc59 alpha2"></div>';
	for(var i=0;i<nl;i++){cont+='<div id="'+date_sli[n.charAt(i)]+'" name="s" class="ofa FL MT H11 W'+nl+'1 bgc'+(1+i)+'" ></div>'}	document.getElementById('s_select').innerHTML=cont+'</div></div>';
	show('s_select');C_scrolli(0);
}	

function p_time(msg){var msgs=msg.message;
	last_obj.innerHTML=msgs.output_txt||"";
	localStorage.inputdate=last_obj.title=msgs.output_value||"";
	if(last_obj.dataset.finp){eval(last_obj.dataset.finp+"()")}
}
function creat_date(n,gs,me){
	last_obj=event.srcElement;
    last_val=event.srcElement.title||((me==1&&localStorage.inputdate)?localStorage.inputdate:new Date().Format('yyyy-MM-dd hh:mm:ss'));console.log(last_val);
	if(browser=="witknow"&&flag<4){	
		postmessage({functionname: "gettimesel",witparams:{mgc:n,showtype:gs,initime:last_val},callback:"pass_time"});}else{creat_date1(n,gs,me);}
}
function pass_time(msg){
	try {var msgs=msg.message;
		last_obj.value=msgs.output_txt;
		localStorage.inputdate=last_obj.title=msgs.output_value;
	} catch (ex){alert("error:"+ex);}
	if(last_obj.dataset.finp){eval(last_obj.dataset.finp+"()")}
}
function set_ymdhm(d){
	year=d.getFullYear();month=d.getMonth()+1;day=d.getDate();
	hour=d.getHours();minute=d.getMinutes();second=d.getSeconds();
}
function creat_date1(n,gs,me){
	document.body.style.overflow="hide";
	outtype=n;date_geshi=gs;formattype="";
var nl=n.length;
	date=new Date(last_val.rtrim(".0").replace(/\-/g, "/"));
	set_ymdhm(date);
	if(n.indexOf(1)<0){month=1}
	if(n.indexOf(2)<0){day=1}
	if(n.indexOf(3)<0){hour=0}
	if(n.indexOf(4)<0){minute=0}
	if(n.indexOf(5)<0){second=0}
var cont='<div class="W11 H11 bgca" onClick="hide(&quot;s_select&quot;)"></div><div id="sle" class="fix bottom0 W11 H35M bgc102 PB1"><div id="change_table" class="none index99 fix bottom0 FL W11 H35M bgc102 AC" ></div><div class="FL MLT A51 H4M F3 AC bgc36" onclick="change_date_type()">'+date_show_type+'</br>阳历</div>';
    cont+='<div id="inputmess" class="FL MLT A53 H AC bgc9 bord0" ></div><div id="tt" class="FR MRT A51 H AC bgc16 color1" onclick="P_V(&quot;inputdate&quot;)">确认</div><div id="scr_pp" class="FL ML A11 H28M" ><div class="no_event index999 absolute bottom13 W11 H bgc59 alpha2"></div>';
	for(var i=0;i<nl;i++){cont+='<div id="'+date_sli[n.charAt(i)]+'" name="s" class="ofa FL MT H11 W'+nl+'1 bgc'+(1+i)+'" ></div>';}
	document.getElementById('s_select').innerHTML=cont+'</div></div>';
	show('s_select');C_scrolli(0);
}
var formi=[1920,1,1,0,0],formj=[200,12,30,24,60]
function C_scrolli(k){
	var ye=outtype[k],scrp=document.getElementById("scr_pp").children[k+1];
	if(ye==2){var w=(new Date(year,month-1,1)).getDay();
		formj[2]=new Date(year,month,0).getDate();};
var cont="<ul class='FL W11 color1'><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li>";
	for(i=0;i<formj[ye];i++){var j=i+formi[ye];
	cont+="<li class='W11 H AC "+(ye==3&&i>12?"colorY":"")+((ye==2&&(j+w)%7<2)?" colorR":"")+"' data-v="+j+" onclick='turn()' >"+(j<10?("0"+j):j)+(ye==3?":":"")+"</li>"};
	scrp.innerHTML=cont+"<li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li></ul>";
	scrp.scrollTop=M*4*(eval(date_sli[ye])-eval(formi[ye]));
	scrp.addEventListener('touchend',alladjust,false); 
	if(k<outtype.length-1){C_scrolli(k+1)}else{displaydate("inputmess")};
}
function turn(){
	var	eob=event.srcElement,ppobj=eob.parentNode.parentNode;
	ppobj.scrollTop=eob.offsetTop-eob.parentNode.offsetTop-M*12;	
	eval(ppobj.id+"="+eob.dataset.v);
	if((ppobj.id=="year"||ppobj.id=="month")&&outtype.indexOf(2)>=0){C_scrolli(outtype.indexOf(2))}else{displaydate("inputmess")}
}
function alladjust(){
	var ob=event.srcElement.name=="s"?event.srcElement:event.srcElement.parentNode.parentNode;
	setTimeout(function(){ob.childNodes[0].childNodes[Math.round(0.25*ob.scrollTop/M)+3].click();},500); 		
}
function displaydate(d,da,t){
	var outtext="",tob=document.getElementById(d);
	if(da){date=da;set_ymdhm(da);}else{date=new Date(year,month-1,day,hour,minute)};
	tob.title = date.Format('yyyy-MM-dd hh:mm:ss');
	if(date_show_type=="农历"&&outtype.indexOf('012')>=0){TOCNDate(date,d)}
	else{for(var i=0;i<outtype.length;i++){var dxt=eval(date_sli[outtype[i]]);
			outtext+=(dxt>9?dxt:"0"+dxt)+(date_geshi[i]?date_geshi[i]:"");
		};
		if(date_geshi.indexOf('周')>=0){outtext+="周"+"日一二三四五六".charAt(date.getDay())};
		if(tob.tagName=="INPUT"){tob.value=outtext;}else{tob.innerHTML=outtext;}
	}
}
function GetBit(m, n) {return (m >> n) & 1;}
function e2c(D){
	var total, m, n, k,isEnd = false;
    var tmp = D.getYear(); if (tmp<1900) {tmp += 1900;}
    total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[D.getMonth()]+D.getDate()-38;
    if (D.getYear()%4 == 0 && D.getMonth() > 1) {total++;}
    for (m=0; ;m++){k = (CalendarData[m] < 0xfff)?11:12;//闰月
       for (n=k;n>=0;n--){cDays=29+GetBit(CalendarData[m],n);
		   if(total<=cDays){isEnd = true; break;}
      	   total=total-cDays;}
    	if (isEnd) break;}
	cYear=1921+m; cMonth=k-n+1;	cDay=total;
	if(k==12){var mon=Math.floor(CalendarData[m]/0x10000);
		monString.splice(mon,0,"闰"+monString[mon-1])};
}
function TOCNDate(D,d){e2c(D);
	var tob=document.getElementById(d),tmp=cYear+"甲乙丙丁戊己庚辛壬癸".charAt((cYear-4)%10)+"子丑寅卯辰巳午未申酉戌亥".charAt((cYear-4)%12)+"("+"鼠牛虎兔龙蛇马羊猴鸡狗猪".charAt((cYear-4)%12)+")年 "+monString[cMonth-1]+dayString[cDay-1];
	if(tob.tagName=="INPUT"){tob.value=tmp}else{tob.innerHTML=tmp}
}
function pas_zodi(){
	if(document.getElementById('zodiac')){document.getElementById('zodiac').value=document.getElementById('birth_day').value.split("(")[1].split(")")[0];};
	if(document.getElementById('astro')){document.getElementById('astro').value=astroString[(month-1+Math.floor(day/astroN[month-1]))%12];}
}
function change_date_type(){
	date_show_type=date_show_type=="阳历"?"农历":"阳历";
	 event.srcElement.innerHTML=date_show_type+"</br>阳历";
	displaydate("inputmess");
}
function down_timer(){//倒计时
	var ts =0.001*(new Date(arguments[0])- new Date()),
	dd = parseInt(ts/ 3600/24),hh = parseInt(ts /3600%24), 
	mm = parseInt(ts/60%60),ss = parseInt(ts%60);
	dd = checkTime(dd); hh = checkTime(hh); mm = checkTime(mm);ss = checkTime(ss);
	document.getElementById(arguments[1]).innerHTML=dd+"天"+hh+"时"+mm+"分"+ss+"秒";  
}  
function checkTime(i){if(i<10){i = "0" + i;}; return i;}  
function shortDate(d){console.log(d);
	return (d.toDateString()===new Date().toDateString()?d.Format("hh:mm"):d.Format("MM-dd hh:mm"))
}
function returndate(t,da){
	var outtext="";
	if(da){date=new Date(da.rtrim(".0").replace(/\-/g, "/"))}else{date = new Date()};
	year=date.getFullYear(); month=date.getMonth()+1;day=date.getDate();
	hour=date.getHours();minute=date.getMinutes();
	week="周"+"日一二三四五六".charAt(date.getDay());
	if(!t)t="// : ";
	for(var i=0;i<t.length;i++){if(i==6){outtext+=week}else{
			if(t[i]!="@"){var dxt=eval(date_sli[i]);
				outtext+=(dxt>9?dxt:"0"+dxt)+t[i];}}}
	return outtext;
}
function DateAdd0(i,n,date) {//日期加减
	var geshi=['FullYear','Month','Date','Hours','Minutes','Seconds'];
	if(!date){date=new Date()}else{date=new Date(date.rtrim(".0").replace(/\-/g, "/"))};
	n=n>=0?n:1;console.log(n);
	eval("date.set"+geshi[i]+"("+(eval("date.get"+geshi[i]+"()")+n)+")");
	return date.Format('yyyy-MM-dd hh:mm:ss'); eval(obj.dataset.efd+"()")
}
function DateDif(i,date1,date0) {//返回两个日期之间的差值
	var geshi=[1000,60000,3600000,86400000,2629743832.8,31556925993.6];
	if(!date1){date1=new Date()}else{date1=new Date(date1.rtrim(".0").replace(/\-/g, "/"))};
	if(!date0){date0=new Date()}else{date0=new Date(date0.rtrim(".0").replace(/\-/g, "/"))};
	return (date0-date1)/geshi[i]; 
}
var potitle,uln=0,ulnl,nextobj,LIST,rep_mes="",repln=-2,scrollable=true;
function c_addr(nl,area){
	if(browser=="witknow"){
		last_obj=event.srcElement;
		var	old=(last_obj.title)?(last_obj.value||last_obj.innerHTML):"浙江-杭州-上城区-清波街道";
		rep_mes=old.split("-");
		if(flag<5){	postmessage({functionname: "getseladdress",witparams:{ileve:nl,areacode:area,iniaddress:old},callback: "p_addr"});
		}else{c_addr1(nl,area);}
	}else{}
}
function c_addr1(nl,area){
	ulnl=nl;document.body.style.overflow="hide";
	repln=rep_mes.length;
	var cont='<div class="W11 H11 bgca" onClick="hide(&quot;s_select&quot;)"></div><div class="fix bottom0 W11 H35M bgc102"><div class="FL MLT C9M H AC bgc9 ofa"><div id="inputmess" class="W11 H" >上拖查看邮编区号</div><div id="ref_inf" class="W11 H">邮编区号</div></div><div class="FL MLT BTN bgc16" onclick="P_V()">确认</div><div id="sle" class="FL MLT A11 H28M" ><div class="no_event index999 absolute bottom13 W11 H bgc59 alpha2"></div>';
	for(var i=0;i<nl;i++){cont+='<div id="ul'+i+'" name="s" class="ofa FL H11 W'+nl+'1 bgc'+(1+i)+'" ></div>'}	
	document.getElementById('s_select').innerHTML=cont+'</div></div>';//设置滚轮框架
	document.getElementById("inputmess").innerHTML=last_obj.value;
	show('s_select');
	refo=document.getElementById('ref_inf');
	inpm=document.getElementById('inputmess');
	cobj=document.getElementById("sle").children;
	getarea(1,area);
}
function scroll_cent(ev){
	var	eob=ev.srcElement,ppobj=eob.parentNode.parentNode;
	ppobj.scrollTop=eob.offsetTop-eob.parentNode.offsetTop-M*12;	
	ppobj.title=eob.innerHTML||"";	
}
function getarea(j,po){
	if(scrollable==true){scroll_cent(event);potitle=po||"";	uln=j;
		if(event.srcElement.title=='lasto'&&event.srcElement.nextSibling.innerHTML){inpm.title=refo.innerHTML=event.srcElement.parentNode.title}
		else if(po!==undefined){inpm.title=refo.innerHTML=po};
	 	if(j>ulnl){
			var tex="";
			for(var i=1;i<=ulnl;i++){if(cobj[i].title)tex+=cobj[i].title+"-";}
			inpm.innerHTML=tex;	
	 	}else if(po===undefined||po>999999){getcont();
	 	}else {var a=(po==11||po==12||po==31||po==50)?po*10000:((po>9999)?po*1000:po*100),
			b=(po==11||po==12||po==31||po==50)?a+9999:((po>9999)?a+999:a+99); 
		    postmessage({functionname: "getaddress",witparams:{x:a,y:b},callback:"getcont"});		
	 scrollable=false;}
	 }
}
function getcont(){
	scrollable=true;repln--;
var m=(repln>-2)?3:4,LIST=(arguments[0])?arguments[0].message:[];
	nextobj=document.getElementById('sle').children[uln];uln++;
var	cont="<ul class='FL W11 AC color1'><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' ></li><li class='W11 H' onclick='getarea("+uln+")' title='lasto'></li>";
	for (var i=0;i<LIST.length;i++){
		cont+="<li class='W11 H bordT ofh' onclick='getarea("+uln+","+LIST[i].addr_id+")'>"+LIST[i].addr_name+"</li>";
		if(rep_mes[0]!=""&&LIST[i].addr_name==rep_mes[0]){
			m=(i+4);rep_mes.shift();}
	};
	cont+="<li class='none' onclick='getarea("+uln+")' ></li><li class='W11 H' ><li class='W11 H' ></li><li class='W11 H' ></li></ul>";		
	nextobj.innerHTML=cont;
	nextobj.children[0].title=potitle;
	nextobj.addEventListener('touchend',alladjust,false);
	nextobj.addEventListener('mousewheel',alladjust,false);
	nextobj.childNodes[0].childNodes[m].click();
}
function code2addr(a){var v;
	if(a>999999){v=code2a(a);a=Math.ceil(a/1000)};
	if(a>9999){v=code2a(a)+v;a=Math.ceil(a/100)};
	if(a>99){v=code2a(a)+v;a=Math.ceil(a/100)};
	v=code2a(a)+v;
	return v;
}
function c_title(n,d){//修改title
	var ob=(typeof d!="object")?document.getElementById(d):d;
	ob.title=n;	
}