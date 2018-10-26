/*自适应样式代码Author: zhengzhe; 2016-5-27; V0.0.7*/
onContentMenu = "return false";
onselectstart = "return false";//屏蔽选中
var MYWIT = {}, browser = "ie", orient, DPR, CW, CH, SW, SH, N, M, H, FA = 0, flag = 9;

function getbrowser() {//判断网页在何种设备中打开
    var AgentInfo = navigator.appVersion.toLowerCase(),
        Agents = ["window","windows phone", "android", "iphone", "ipad", "macintosh"];
    browsername = ["witknow", "micromessenger", "qq", "firefox", "chrome", "safari", "applewebkit", "opera"];
    for (var i = 0; i < browsername.length; i++) {
        if (AgentInfo.indexOf(browsername[i]) >= 0)browser = browsername[i]
    }
    ;
    if (typeof externalfun == "function" || browser == "witknow") {
        flag = 8
    } else {
        for (var v = 0; v < Agents.length; v++) {
            if (AgentInfo.indexOf(Agents[v]) >= 0) {
                flag = v;
                break;
            }
        }
    }
}
getbrowser();



if (window.localStorage) {
    MYWIT.TND = localStorage.TND || "日间";
    MYWIT.FLR = localStorage.FLR || "右手";
    MYWIT.WFD = localStorage.WFD || "标屏";
    MYWIT.bgct1s = localStorage.skincolor1 || "#07C";
    MYWIT.bgct2s = localStorage.skincolor2 || "#4AF";
}
//navigator.onLine==true;是否在线
function autocss() {
    var WN, WN1, W1, Cmin, Cmax, navlength, strcss;
    orient = window.orientation || 0;
    CW = document.documentElement.clientWidth || window.innerWidth;
    CH = document.documentElement.clientHeight || window.innerHeight;
    DPR = SW / CW * SH / CH > DPR ? DPR : 1;
    if (window.localStorage) {
        if (localStorage.getItem("witknow_m")) {
            FA = JSON.parse(localStorage.getItem("witknow_m"));
        }
        else if (typeof externalfun == "function") {
            FA = externalfun.getitem("m") ? JSON.parse(externalfun.getitem("m")) : 0
        }
    } else {//if(location.href.indexOf("index.html")<0){window.open("../help/h_99.html")}
    }
    if (typeof externalfun == "function") {
        M = FA.M;
        var config = JSON.parse(externalfun.getsetting());
        MYWIT.FLR = config.IsLeft ? "右手" : "左手";
        if (config.Bgc) {
            MYWIT.bgct1s = config.Bgc.split(",")[0] || MYWIT.bgct1s;
            MYWIT.bgct2s = config.Bgc.split(",")[1] || MYWIT.bgct2s;
        }
    } else if (flag > 3) {
        M = Math.max(SW, SH) / 144
    } else {
        M = Math.min(Math.max(CW, CH) / 54, Math.min(CW, CH) / 36)
    }
    M = M || 10;
    H = M * 4;
    N = Math.floor(CW / (M * 7));
    F_scale = 100;
    Cmin = Math.min(CW, CH);
    Cmax = Math.max(CW, CH);
    D51 = Math.floor((CW - M) / Math.floor((CW - M) / (M * 7)) - M);
    D41 = Math.floor((CW - M) / Math.floor((CW - M) / (M * 8)) - M);
    D31 = Math.floor((CW - M) / Math.floor((CW - M) / (M * 10)) - M);
    D21 = Math.floor((CW - M) / Math.floor((CW - M) / (M * 14)) - M);
    D11 = Math.floor((CW - M) / Math.floor((CW - M) / (M * 20)) - M);
    navlength = document.getElementById("nav") ? document.getElementById("nav").getElementsByTagName("li").length : 6;
    //strcss = "body{font-size:" + F_scale + "%;}"
//文字大小
    strcss += "body{font-size:" + M * 1.4 + "px;} .F1{font-size:" + M * 1 + "px;}.F2{font-size:" + M * 1.2 + "px;}.F3{font-size:" + M * 1.4 + "px;}.F35{font-size:" + M * 1.5 + "px;}.F4{font-size:" + M * 1.6 + "px;}.F5{font-size:" + M * 1.8 + "px;}.F6{font-size:" + M * 2 + "px;}.F7{font-size:" + M * 2.4 + "px;}.F8{font-size:" + M * 3 + "px;}.F9{font-size:" + M * 4 + "px;}"
//间距大小
    strcss += ".M {margin:" + M + "px;} .M05 {margin:" + M * 0.5 + "px;}.MLT {margin-left:" + M + "px; margin-top:" + M + "px;}.MRT {margin-top:" + M + "px; margin-right:" + M + "px;}"
    strcss += ".MT {margin-top:" + M + "px;}.MT05 {margin-top:" + 0.5 * M + "px;}.MT2 {margin-top:" + 2 * M + "px;}.MT07{margin-top:" + M * 0.7 + "px;} .MTH" +
        " {margin-top:" + H + "px; } .MTHM { margin-top:" + M * 5 + "px; } .MT2H { margin-top:" + M * 8 + "px; }"
    strcss += ".MTNH {margin-top:" + (-M * 4) + "px; }.MTN2H {margin-top:" + (-M * 8) + "px; }.MTNM {margin-top:" + (-M) + "px; }.MTNMH{margin-top:" + (-M * 5) + "px;}.MTN2M{margin-top:" + (-M * 2) + "px;}.MTN36M{margin-top:" + (-M * 36) + "px; }.MTN10M{margin-top:" + (-M * 10) + "px; }"
    strcss += ".MB {margin-bottom:" + M + "px;}.MBH {margin-bottom:" + M * 4 + "px;} .MBNH{margin-bottom:" + (-H) + "px;}";
    strcss += ".ML {margin-left:" + M + "px;} .MLH {margin-left:" + H + "px;} .MLNM {margin-left:" + (-M) + "px;}.MLN2M{margin-left:" + (-M * 2) + "px; }" +
        " .MLNH{margin-left:" + (-H) + "px;}.MLNW {margin-left:" + (-CW) + "px;} " +
        ".MR {margin-right:" + M + "px;} .MRH {margin-right:" + H + "px;} .MLN2H{margin-left:" + (M * -8) + "px;}" +
        " .MRN2M{margin-right:" + (-M * 2) + "px; }"
    strcss += ".MLC {margin-left:" + (CW > M * 57 ? 0 : (CW * 0.5 - M * 18)) + "px;} .MRC {margin-right:" + (CW > M * 57 ? 0 : (CW * 0.5 - M * 18)) + "px;}";
//内间距
    strcss += ".P05M {padding:" + M * 0.5 + "px;}.P1M {padding:" + M + "px;} .P2M { padding:" + M * 2 + "px; }.PT1M{padding-top:" + M + "px;}.PT2M{padding-top:" + M * 2 + "px;}.PT05M{padding-top:" + M * 0.5 + "px;}.PB1M { padding-bottom:" + M + "px; }.PLA4 {padding-left:" + 0.5 * (CW % (M * 8)) + "px;}.PTA{padding-top:" + (CW < CH ? M * 24 : M * 6) + "px;}"
    strcss += ".PL1M {padding-left:" + M * 1 + "px; }.PL2M {padding-left:" + M * 2 + "px; }.PR1M {padding-right:" + M + "px; }.PR1MH { padding-right:" + (M + H) + "px; } .PR2MH { padding-right:" + (M + H * 2) + "px; }"
    strcss += ".radM {border-radius:" + M + "px; }"
//位置
    strcss += ".topM{top:" + M + "px;} .topH{top:" + H + "px;}.top5M{top:" + M * 5 + "px;} .top6M{top:" + M * 6 + "px;} .top2H{top:" + H * 2 + "px;} .topCH{top:" + CH + "px;} .topN2H{top:" + (-2 * H) + "px;}.topadv{top:" + (CW < CH ? M * 18 : 0) + "px;}"
    strcss += ".top18M{top:" + M * 18 + "px;}.top36M{top:" + M * 36 + "px;}"
    strcss += ".bottomH{bottom:" + H + "px;} .bottom10M{bottom:" + M * 10 + "px;} .bottom13M{bottom:" + M * 13 + "px;} .bottom13{bottom:" + M * 13 + "px;}" +
        " .bottom34M{bottom:" + M * 34 + "px;}"
    strcss += ".leftM{left:" + M + "px;}.left2M{left:" + M * 2 + "px;} .leftH{left:" + H + "px;} .left5M{left:" + M * 5 + "px;}" +
        ".rightM{right:" + M + "px;} .right2M{right:" + M * 2 + "px;}.rightN2M{right:" + (-M * 2) + "px;}"
    strcss += ".CE36M{left:" + (CW * 0.5 - M * 18) + "px;}.CE24M{left:" + (CW * 0.5 - M * 12) + "px;}"
//常用按键或标签
    strcss += ".rad1{border-radius:" + M + "px;}.rad2{border-radius:" + M * 2 + "px;}.rad05{border-radius:" + M * 0.5 + "px;}"
    strcss += ".BTN {width:" + M * 6 + "px;height:" + H + "px; line-height:" + H + "px;font-size:" + M * 1.6 + "px;text-align:center;}"
    strcss += ".navb{width:" + Math.max(M * 6, CW / navlength) + "px; text-align:center;} .navbH{width:" + Math.max(M * 6, (CW - M * 4) / navlength) + "px; text-align:center;}.navpadding { padding-left:" + Math.floor((CW % (M * 8)) * 0.5) + "px;}"
    strcss += ".BTNA {height:" + H + "px; text-align:center;}"
    strcss += ".BTNF {width:" + D51 + "px; text-align:center;}"
    strcss += ".POT {width:" + M * 2 + "px;height:" + M * 2 + "px;margin:" + M + "px;}.ICON {width:" + M * 4 + "px;height:" + M * 4 + "px;}"
    strcss += "#bbar {width:" + CW + "px;bottom:0;}"
    strcss += ".menu {width:" + CW + "px;height:auto;position:fixed;top:" + H + "px;}"
    strcss += ".TEXT {width:100%;height:auto;text-align:left;padding-left:" + M + "px;padding-right:" + M + "px;}"
//固定高度
    strcss += ".H {height:" + H + "px;line-height:" + H + "px;font-size:" + M * 1.6 + "px;}"
    strcss += ".H1M { height:" + M + "px;}.H2M { height:" + M * 2 + "px;}.H3M { height:" + M * 3 + "px;}.H4M { height:" + M * 4 + "px;}.H5M { height:" + M * 5 + "px;}.H6M { height:" + M * 6 + "px;}.H7M { height:" + M * 7 + "px;}.H8M { height:" + M * 8 + "px;}.H9M { height:" + M * 9 + "px;}"
    strcss += ".H10M { height:" + M * 10 + "px;}.H12M { height:" + M * 12 + "px;}.H14M { height:" + M * 14 + "px;}.H15M { height:" + M * 15 + "px;} .H16M { height:" + M * 16 + "px;}.H18M {height:" + M * 18 + "px;}";
    strcss += ".H21M {height:" + M * 21 + "px;}.H24M {height:" + M * 24 + "px;}.H26M {height:" + M * 26 + "px;}.H27M {height:" + M * 27 + "px;}.H28M {height:" + M * 28 + "px;}"
    strcss += ".H30M {height:" + M * 30 + "px;}.H32M {height:" + M * 32 + "px;}.H35M {height:" + M * 35 + "px;}.H36M {height:" + M * 36 + "px;}.H38M {height:" + M * 38 + "px;}.H40M {height:" + M * 40 + "px;}.H48M {height:" + M * 48 + "px;}.H64M {height:" + M * 64 + "px;}"
    strcss += ".H8T4 {height:" + (CW < CH ? 8 * M : 4 * M) + "px}"
//补余高度
    strcss += ".CH{ height:" + CH + "px;}.CHmax{ max-height:" + CH + "px;}.CHNH {height:" + (CH - H) + "px;}.CHN2H {height:" + (CH - H * 2) + "px;}.HCW{" + " height:" + CW + "px;}"
    strcss += ".CHN5M {height:" + (CH - M * 5) + "px;}.CHN17M {height:" + (CH - M * 17) + "px;}"
    strcss += ".CHmin {min-height:" + CH + "px;} .CHNHmin {min-height:" + (CH - H) + "px;}"
    strcss += ".HN4M {min-height:" + M * 4 + "px;}.HX12M {max-height:" + M * 12 + "px;}.HX24M {max-height:" + M * 24 + "px;}.HX36M {max-height:" + M * 36 + "px;}"
    strcss += ".H_li {height:" + (CW < CH ? (M * 46) : (M * 30)) + "px;}.H14T7 {height:" + (CW < CH ? (M * 14) : (M * 8)) + "px;}";
//正比宽度，有间距
    strcss += ".A11 { width:" + (CW - M * 2) + "px;}.A21 { width:" + (CW * 0.5 - M * 1.5) + "px;}.A31{ width:" + (CW * 0.333 - M * 1.33) + "px;}.A32 { width:" + (CW * 0.666 - M * 1.66) + "px;}.A41 { width:" + (CW * 0.25 - M * 1.25) + "px;}.A43 { width:" + (CW * 0.75 - M * 1.75) + "px;}.A51 { width:" + (CW * 0.2 - M * 1.2) + "px;}.A52 { width:" + (CW * 0.4 - M * 1.4) + "px;}.A53 { width:" + (CW * 0.6 - M * 1.6) + "px;}.A54{ width:" + (CW * 0.8 - M * 1.8) + "px;}.A61 { width:" + (CW * 0.166 - M * 1.22) + "px;}.A71{width:" + (CW * 0.14285714 - M * 1.125) + "px;}.A81{width:" + (CW * 0.125 - M * 1.1111) + "px;}"
    strcss += ".A1T2 { width:" + (CW < M * 57 ? (CW - M * 2) : (CW * 0.5 - M * 1.5)) + "px;}.A2T4 { width:" + (CW < M * 57 ? (CW * 0.5 - M * 1.5) : (CW * 0.25 - M * 1.25)) + "px;}.A4T8 { width:" + (CW < M * 60 ? (CW * 0.25 - M * 1.25) : (CW * 0.125 - M * 1.125)) + "px;}"
//固定宽度
    strcss += ".B1M { width:" + M + "px;}.B2M { width:" + M * 2 + "px;}.B3M { width:" + M * 3 + "px;}.B4M {width:" + M * 4 + "px;}.B5M {width:" + M * 5 + "px;}.B6M{width:" + M * 6 + "px;}.B7M { width:" + M * 7 + "px;}.B8M { width:" + M * 8 + "px;}.B9M { width:" + M * 9 + "px;}"
    strcss += ".B10M { width:" + M * 10 + "px;}.B12M { width:" + M * 12 + "px;}.B13M { width:" + M * 13 + "px;}.B14M { width:" + M * 14 + "px;}.B15M { width:" + M * 15 + "px;}.B16M { width:" + M * 16 + "px;}.B18M { width:" + M * 18 + "px;}.B19M { width:" + M * 19 + "px;}"
    strcss += ".B24M { width:" + M * 24 + "px;}.B32M { width:" + M * 32 + "px;}.B34M { width:" + M * 34 + "px;}.B36M { width:" + M * 36 + "px;}.B38M { width:" + M * 38 + "px;}"
    strcss += ".B64M { width:" + M * 64 + "px;}.B06M { width:" + M * 0.6 + "px;} .B05M { width:" + M * 0.5 + "px;}"
//补余大小按键，有间距
    strcss += ".CW { width:" + CW + "px;} .C2W { width:" + CW * 2 + "px;} .CWS{width:" + (CW + 17) + "px;} .CW1T2 {width:" + (CW < CH ? 100 : 50) + "%;}";
    strcss += ".C3M { width:" + (CW - M * 3) + "px;}.C4M { width:" + (CW - M * 4) + "px;}.C6M { width:" + (CW - M * 6) + "px;}.C8M { width:" + (CW - M * 8) + "px;}" +
        ".C9M { width:" + (CW - M * 9) + "px;}.C10M { width:" + (CW - M * 10) + "px;}.C11M { width:" + (CW - M * 11) + "px;}"
    strcss += ".C12M { width:" + (CW - M * 12 - 1) + "px;}.C15M { width:" + (CW - M * 15) + "px;}.C17M { width:" + (CW - M * 17) + "px;}"
    strcss += ".C18M { width:" + (CW - M * 18) + "px;}.C19M { width:" + (CW - M * 19) + "px;}.C20M { width:" + (CW - M * 20) + "px;}.C21M { width:" + (CW - M * 21) + "px;}.C22M { width:" + (CW - M * 22) + "px;}.C23M { width:" + (CW - M * 23) + "px;}.C24M { width:" + (CW - M * 24) + "px;}"
    strcss += ".C36M { width:" + (CW < CH ? CW : (CW - M * 36)) + "px;}"
    strcss += ".C9MT2 { width:" + (CW < M * 57 ? (CW - M * 9) : (CW * 0.5 - M * 8.5)) + "px;}"
    strcss += ".C12MT2 { width:" + (CW < M * 57 ? (CW - M * 12) : (CW * 0.5 - M * 11.5)) + "px;}.C13MT2 { width:" + (CW < M * 57 ? (CW - M * 13) : (CW * 0.5 - M * 12.5)) + "px;}"
    strcss += ".C15MT2 { width:" + (CW < M * 57 ? (CW - M * 15) : (CW * 0.5 - M * 14.5)) + "px;}"
    strcss += ".C17MT2 { width:" + (CW < M * 57 ? (CW - M * 17) : (CW * 0.5 - M * 16.5)) + "px;}.C18MT2 { width:" + (CW < M * 57 ? (CW - M * 18) : (CW * 0.5 - M * 17.5)) + "px;}"
    strcss += ".C21MT2 {width:" + (CW < 57 * M ? (CW - 21 * M) : (CW * 0.5 - 20.5 * M)) + "px;}"
    strcss += ".C6MQ{ width:" + (CW * 0.5 - M * 6) + "px;}"
    strcss += ".C6Max{ max-width:" + (CW - M * 6) + "px;}"
//图片大小
    strcss += ".PLA { width:100%; height:" + (CW * 0.25 + M * 3.8) + "px;}"//三图横排
    strcss += ".PA3  { width:" + (CW * 0.333 - M * 1.33) + "px; height:" + (CW * 0.25 - M) + "px;float:left;margin-left:" + M + "px;}.PB3{width:" + (CW * 0.333 - M * 1.33) + "px; height:" + (CW * 0.5 - M) + "px;float:left;margin-left:" + M + "px;}"
    strcss += ".pica { max-width:" + CW + "px; max-height:" + CH + "px; }";
//横竖切换的宽度
    strcss += ".W2H { width:" + (CW > CH ? CW * 0.5 : CW) + "px;height:" + (CW > CH ? CH : CH * 0.5) + "px;}"
    strcss += ".B3T6 { width:" + (CW * 0.7 > CH ? M * 6 : M * 3) + "px;}"//用于侧面索引
    strcss += ".B3T6C { width:" + (CW * 0.7 > CH ? (CW - M * 6) : (CW - M * 3)) + "px;}"//用于侧面索引
    strcss += ".aside {width:" + (CW * 0.7 > CH ? 50 : 100) + "%; height:" + (CW * 0.7 > CH ? 7.2 : 3.7) + "%;float:left;}"//用于侧面索引按键大小
//与列数有关的图片大小
    strcss += ".D21 { width:" + D21 + "px;}.D31 { width:" + D31 + "px;}.D41 { width:" + D41 + "px;}.D51 { width:" + D51 + "px;}"
    strcss += ".pic21 { width:" + D21 + "px; height:" + D21 * 0.75 + "px;}"
    strcss += ".pic22 { width:" + D21 + "px; height:" + D21 + "px;}"
    strcss += ".pic23 { width:" + D21 + "px; height:" + D21 * 1.33 + "px;}.pic23n{ width:" + D21 + "px; height:" + (D21 * 1.33 + M * 6) + "px;}"
    strcss += ".pic32 { width:" + D31 + "px; height:" + D31 * 0.75 + "px;}"
    strcss += ".pic33 { width:" + D31 + "px; height:" + D31 + "px;}"
    strcss += ".pic34 { width:" + D31 + "px; height:" + D31 * 1.33 + "px;}.pic35n{ width:" + D31 + "px; height:" + (D31 * 1.33 + M * 6) + "px;}"
    strcss += ".pic43 { width:" + D41 + "px; height:" + D41 * 0.75 + "px;}"
    strcss += ".pic44 { width:" + D41 + "px; height:" + D41 + "px;}"
    strcss += ".pic45 { width:" + D41 + "px; height:" + D41 * 1.33 + "px;}.pic45n{ width:" + D41 + "px; height:" + (D41 * 1.33 + M * 3) + "px;}";
    strcss += ".col1 {width:" + (CW < CH ? CW : M * 6) + "px; height:" + (CW < CH ? H : (CH - H)) + "px; }"//横屏时行变列；
    strcss += ".col2 {width:" + (CW < CH ? CW : (CW - M * 6)) + "px;}"//横屏时行变列；
    strcss += ".colW {width:" + (W1 + M) + "px; height:" + CH + "px; }"
    strcss += ".colWc {width:" + (CW - M * 7) + "px; height:" + CH + "px; }"
    strcss += ".colB41 {width:" + M * 8 + "px; height:" + (CH - H) + "px; }"
    strcss += ".colC41 {width:" + (CW - M * 8) + "px; height:" + (CH - H) + "px; }"
//横竖屏转向的容器
    strcss += ".R_menu { width:" + (CW < CH ? CW : M * 6) + "px; height:" + (CW < CH ? M * 4 : CH) + "px;}"
    strcss += ".R_wrap { width:" + (CW < CH ? CW : (CW - M * 6)) + "px; height:" + (CW < CH ? (CH - M * 4) : CH) + "px;}"
    strcss += ".R_inlineB {" + (CW < CH ? "display:inline-block;" : "") + "}";
//页尾链接和广告
    strcss += ".CCVi { width:" + (CW < M * 44 ? CW : (CW < M * 58 ? (CW * 0.5) : (CW - M * 36))) + "px; height:" + M * 4.5 + "px;line-height:" + M * 4.5 + "px;font-size:" + M * 1.5 + "px; text-align:left; padding-left:0.5em; overflow:hidden;}";//相关链接
    strcss += ".Mlink { position:relative; top:" + (CW < M * 58 ? -M * 18 : 0) + "px;}"	//相关链接的位置
    strcss += ".Madvb { position:relative; top:" + (CW < M * 44 ? M * 18 : (CW < M * 58 ? M * 9 : 0)) + "px;}"//底部广告图位置
//与用户设置有关的样式
    strcss += ".bgct1{color:#fff; background-color:" + MYWIT.bgct1s + ";} .bgct2{color:#000; background-color:" + MYWIT.bgct2s + ";}";
    strcss += ".TND{background-color:" + (MYWIT.TND == "夜间" ? "#000" : "#EEE") + ";color:" + (MYWIT.TND == "夜间" ? "#EEF" : "#000") + ";}";
    strcss += ".FLR{float:" + (MYWIT.FLR == "右手" ? "left" : "right") + ";} .FRL{float:" + (MYWIT.FLR == "右手" ? "right" : "left") + ";}"
    strcss += ".ABLR{" + (MYWIT.FLR == "右手" ? "left:0" : "right:0") + ";}.ABRL{" + (MYWIT.FLR == "右手" ? "right:0" : "left:0") + ";}"
    add_css(strcss);
    if (typeof self_f == "function") {
        self_f()
    }
    ;
}
/*function add_css(str_css) {
 var mystyle=document.getElementById("mystyle");
 if(mystyle==null){
 try{mystyle=document.createElement("style");mystyle.id="mystyle";
 mystyle.type = "text/css";mystyle.textContent = str_css;
 document.getElementsByTagName("HEAD").item(0).appendChild(mystyle);
 }catch (e){mystyle=document.createStyleSheet();
 mystyle.id="mystyle"; mystyle.cssText=str_css; }
 }else{try{mystyle.textContent = str_css;}catch(e){mystyle.cssText = str_css;}}
 }
 function add_css(str_css) {
 var mystylenow= document.getElementsByTagName("HEAD").item(0);
 var mystylecssnow = document.getElementById("mystyle");
 if(mystylecssnow!==null){
 try{mystylenow.removeChild(mystylecssnow);}catch(e){}};
 try{var mystyle = document.createElement("style");mystyle.id="mystyle";
 mystyle.type = "text/css"; mystyle.textContent = str_css;
 mystylenow.appendChild(mystyle);
 }catch (e){var mystyle = document.createStyleSheet();
 mystyle.id="mystyle"; mystyle.cssText = str_css; }
 }*/
function add_css(str_css) {
    var mystylenow = document.getElementsByTagName("HEAD").item(0);
    var mystylecssnow = document.getElementById("mystyle");
    if (mystylecssnow !== null) {
        try {
            mystylenow.removeChild(mystylecssnow);
        } catch (e) {
        }
    }
    try {
        var mystyle = document.createStyleSheet();
        mystyle.id = "mystyle";
        mystyle.cssText = str_css;
    }//ie
    catch (e) {
        var mystyle = document.createElement("style");
        mystyle.id = "mystyle";
        mystyle.type = "text/css";
        mystyle.textContent = str_css;
        document.getElementsByTagName("HEAD").item(0).appendChild(mystyle);
    }
}//Firefox,Opera,Safari,Chrome
//后加载图片
function loadimg() {
    var imgtags = document.getElementsByTagName('img');
    for (var i = 0; i < imgtags.length; i++) {
        if (!imgtags[i].src && imgtags[i].dataset.src)
            imgtags[i].src = imgtags[i].dataset.src
    }
}
function loadbgc(s, d) {
    var tobj = d ? document.getElementById(d) : document.body;
    tobj.style.backgroundImage = "url(" + s + ")";
}
function autoimgsize() {
    var pica = document.getElementsByName("picauto");
    for (var i = 0; i < pica.length; i++) {
        var iw = pica[i].width;
        ih = pica[i].height;
        iwh = iw / ih;
        if (iwh * CH > CW) {
            pica[i].style.width = (iw > CW ? (CW) : (iw < CW * 0.5 ? CW * 0.5 : iw)) + "px";
        }
        else {
            pica[i].style.width = (ih > CH ? CH : (ih < CH * 0.5 ? CH * 0.5 : ih)) * iwh + "px";
        }
        pica[i].style.marginLeft = ((CW * 0.5) - parseInt(pica[i].style.width) * 0.5) + "px";
    }
}//图片自适应
//调整标签宽度\位置和样式
function adj_nav(d, n) {
    console.log(n);
    var objp = document.getElementById(d), objc = objp.children, ww = (CW - M * 4 - objp.offsetWidth) / objc.length;
    for (var i = 0; i < objc.length; i++) {
        objc[i].style.minWidth = objc[i].offsetWidth + ww + "px"
    }
    ;
    if (n != "undefined") {//objc[n].click();
        objc[n].style.opacity = 0.5;
        if (n > 2) {
            objp.parentNode.scrollLeft = objc[n - 2].offsetLeft
        }
        ;
    }
    ;
}
function ifweixin() {
    if (browser == "micromessenger" || browser == "qq") {
        var newdiv = document.createElement("div");
        newdiv.className = "index1000 fix top0 W11 CH bgca ";
        newdiv.id = "qqweixin";
        newdiv.innerHTML = "<p class='W11 H8M F5 bgc58'>请点击↗右上角菜单，选择用其它浏览器（慧脑浏览器）打开本网页</p><div class='MLT A11 H AC bgc105' onclick='hide(&quot;qqweixin&quot;)'>当前不是微信浏览器和QQ浏览器</div>";
        document.body.appendChild(newdiv);
        var hrs = location.href.split("#id=");
        if (hrs[hrs.length - 1] != "weixin") {
            location.href = location.href + "#id=weixin"
        }
        ;
    }
}//在微信中打开
function hrefs(h) {
    var f = flag == 3 ? 2 : flag, a = h.split('||'), n = a[0].indexOf(f);
    if (n >= 0) {
        location.href = a[n + 1]
    }
}
//function hengshuping(){if(window.orientation!=orient){autocss()}}
//window.addEventListener("orientationchange",hengshuping,false);
