/*————单触屏v1.0版——————
 * nTouch - javascript + css3
 * author:liujingjing
 * editTime:2016-1-18
 * Copyright (c) No for fun
 */

//tar para fun prevent
function SomeEvent(t, p, f, e) {

    var startX, startY, timeS, _t = t;
    var endX, endY, timeE, zIndex;
    var _touch = false;
    var _p = {
        X: 0,                                   //初始坐标
        Y: 0,                                   //初始坐标

        S: 50,                                  //short
        L: 300,                                 //long
        //ST: 200,                              //short time
        LT: 300,                                //long time

        CW: 0,                                  //limit width-最大长度
        CH: 0,                                  //limit height-最大高度

        CLICK_LENGTH: 10,                     //点击判断-距离
        CLICK_TIME: 300,                      //点击判断-时间

        MOVE: true,                            //移动
        MOVE_DIR: "X",                         //移动方向
        MOVE_LIMIT_BACK: false,              //超出屏幕回滚(针对iframe)
        MOVE_LIMIT: false,                    //垂直限制——横向/纵向
        MOVE_LIMIT_PRE: {X: 10, Y: 10},       //垂直限制——横向/纵向——限制长度
        MOVE_MAX: {_X: -10000, X_: 10000, _Y: -10000, Y_: 10000},       //移动距离限制
        MOVE_BACK: {_X: -10000, X_: 10000, _Y: -10000, Y_: 10000},       //移动距离自动返回
        MOVE_CONTINUE: false,                 //保留上次移动距离
        PREVENT: true,                         //是否阻止源生事件
        PROPAGATION: false,
        UP_BACK: true,                         //移动结束是否回滚
        PARENT: null,                          //事件是否触发在其他对象
        TRANSFORM: false,                     //是否启用transform变换
        TARGET: function () {
            return true;
        }             //阻止触发的传入函数
    };
    var _f = {
        INIT: function () {
            //console.log("init");
        },
        A_L: function () {
            console.log("Left!");
        },
        A_R: function () {
            console.log("Right!");
        },
        A_T: function () {
            console.log("Top!");
        },
        A_B: function () {
            console.log("Bottom!");
        },
        A_LL: function () {
            _f.A_L(_e);
            console.log("Long Left!");
        },
        A_LR: function () {
            _f.A_R(_e);
            console.log("Long Right!");
        },
        A_LTop: function () {
            console.log("Long Top!");
        },
        A_LB: function () {
            console.log("Long Bottom!");
        },
        //A_T: function () { console.log("Time"); },
        A_LT: function () {
            console.log("Long Time");
        },
        A_O: function () {
            console.log("other/click");
        },
        A_F: function () {
            console.log("final");
        }
    };
    var _e = {"e1": null, "e2": null, "e3": null};
    _extend(_p, p, true);
    _extend(_f, f, true);
    _extend(_e, e, true);
    var _pos = {X: _p.X, Y: _p.Y};

    (_p.PARENT ? _p.PARENT : _t).ontouchstart = touchStart;
    (_p.PARENT ? _p.PARENT : _t).onmousedown = mouseDown;

    _f.INIT();
    function mouseDown(ev) {
        console.log(_touch);
        if (_touch) {
            _touch = false;     //重置
            return;
        }
        _p.PREVENT && ev.preventDefault();
        _p.PROPAGATION && ev.stopPropagation();
        if (_p.MOVE_CONTINUE) {
            if (_p.TRANSFORM) {
                _pos.X = _t.style.transform.replace(/translateX\((-*\d+)px\)/, "$1") | 0;
                _pos.Y = _t.style.transform.replace(/translateY\((-*\d+)px\)/, "$1") | 0;
            } else {
                _pos.X = _t.style.left.rtrim("px") | 0;
                _pos.Y = _t.style.top.rtrim("px") | 0;
            }
        }
        if (!_p.TARGET(ev)) {
            return;
        }
        _t.style.zIndex = 1;
        startX = ev.clientX;
        startY = ev.clientY;
        timeS = new Date().getTime();
        zIndex = _t.style.zIndex;
        document.addEventListener('mousemove', mouseMove, false);
        document.addEventListener('mouseup', mouseUp, false);
    }

    function touchStart(ev) {
        //ev.preventDefault();
        _touch = true;
        _t.style.zIndex = 1;
        if (_p.MOVE_CONTINUE) {
            if (_p.TRANSFORM) {
                _pos.X = _t.style.transform.replace(/translateX\((-*\d+)px\)/, "$1") | 0;
                _pos.Y = _t.style.transform.replace(/translateY\((-*\d+)px\)/, "$1") | 0;
            } else {
                _pos.X = _t.style.left.rtrim("px") | 0;
                _pos.Y = _t.style.top.rtrim("px") | 0;
            }
        }
        if (ev.touches.length == 1) {
            startX = ev.touches[0].clientX;
            startY = ev.touches[0].clientY;
            timeS = new Date().getTime();
            zIndex = _t.style.zIndex;
            //document.addEventListener('touchmove', touchMove, false);
            _t.addEventListener('touchmove', touchMove, {passive: false});      //兼容ios系统句柄绑在document上无法remove
            _t.addEventListener('touchend', touchEnd, false);                   //  因此绑在目标_t上
        }
    }

    function mouseOut(ev) {
        ev.preventDefault();
        _t.style.zIndex = "";
        upBack();
        document.removeEventListener('mousemove', mouseMove, false);
        document.removeEventListener('mouseup', mouseUp, false);
    }

    function mouseMove(ev) {
        //ev.preventDefault();
        if (_p.MOVE) {
            var x = ev.clientX, y = ev.clientY;
            if (_p.MOVE_LIMIT_BACK && (x <= _p.MOVE_BACK._X || x >= _p.MOVE_BACK.X_)) {
                upBack();
                document.removeEventListener('mousemove', mouseMove, false);
                document.removeEventListener('mouseup', mouseUp, false);
                return;
            }//拖出边界限制
            if (_p.MOVE_LIMIT_BACK && (y <= _p.MOVE_BACK._Y || y >= _p.MOVE_BACK.Y_)) {
                upBack();
                document.removeEventListener('mousemove', mouseMove, false);
                document.removeEventListener('mouseup', mouseUp, false);
                return;
            }//拖出边界限制
            if (_p.MOVE_DIR.indexOf("XY") >= 0) {
                if (_pos.X + x - startX >= _p.MOVE_MAX._X && _pos.X + x - startX <= _p.MOVE_MAX.X_) {
                    _p.TRANSFORM ? _t.style.transform = "translateX(" + (_pos.X + x - startX) + "px)" : _t.style.left = _pos.X + x - startX + "px";
                }
                if (_pos.Y + y - startY >= _p.MOVE_MAX._Y && _pos.Y + y - startY <= _p.MOVE_MAX.Y_) {
                    _p.TRANSFORM ? _t.style.transform = "transalteY(" + (_pos.Y + y - startX) + "px)" : _t.style.top = _pos.Y + y - startY + "px";
                }
            } else if (_p.MOVE_DIR.indexOf("X") >= 0) {
                if (Math.abs(y - startY) - Math.abs(x - startX) > _p.MOVE_LIMIT_PRE.X && _p.MOVE_LIMIT) {
                    //ev.preventDefault();
                    document.removeEventListener('mousemove', mouseMove, false);
                    document.removeEventListener('mouseup', mouseUp, false);
                    _p.UP_BACK && upBack();
                    return;
                }
                if (_pos.X + x - startX >= _p.MOVE_MAX._X && _pos.X + x - startX <= _p.MOVE_MAX.X_)
                    _p.TRANSFORM ? (_t.style.transform = "translateX(" + (_pos.X + x - startX) + "px)") : _t.style.left = _pos.X + x - startX + "px";
            } else if (_p.MOVE_DIR.indexOf("Y") >= 0) {
                if (Math.abs(x - startX) - Math.abs(y - startY) > _p.MOVE_LIMIT_PRE.Y && _p.MOVE_LIMIT) {
                    //ev.preventDefault();
                    document.removeEventListener('mousemove', mouseMove, false);
                    document.removeEventListener('mouseup', mouseUp, false);
                    return;
                }
                if (_pos.Y + y - startY >= _p.MOVE_MAX._Y && _pos.Y + y - startY <= _p.MOVE_MAX.Y_)
                    _p.TRANSFORM ? _t.style.transform = "transalteY(" + (_pos.Y + y - startX) + "px)" : _t.style.top = _pos.Y + y - startY + "px";
            }
        }
    }

    function touchMove(ev) {
        if (ev.touches.length == 1 && _p.MOVE) {
            var x = ev.changedTouches[0].clientX, y = ev.changedTouches[0].clientY;
            if (_p.MOVE_LIMIT_BACK && (x <= _p.MOVE_BACK._X || x >= _p.MOVE_BACK.X_)) {
                upBack();
                _t.removeEventListener('touchmove', touchMove, false);
                _t.removeEventListener('touchend', touchEnd, false);
                return;
            }//拖出边界限制
            if (_p.MOVE_LIMIT_BACK && (y <= _p.MOVE_BACK._Y || y >= _p.MOVE_BACK.Y_)) {
                upBack();
                _t.removeEventListener('touchmove', touchMove, false);
                _t.removeEventListener('touchend', touchEnd, false);
                return;
            }//拖出边界限制
            if (_p.MOVE_DIR.indexOf("XY") >= 0) {
                if (_pos.X + x - startX >= _p.MOVE_MAX._X && _pos.X + x - startX <= _p.MOVE_MAX.X_) {
                    _p.TRANSFORM ? _t.style.transform = "translateX(" + (_pos.X + x - startX) + "px)" : _t.style.left = _pos.X + x - startX + "px";
                }
                if (_pos.Y + y - startY >= _p.MOVE_MAX._Y && _pos.Y + y - startY <= _p.MOVE_MAX.Y_) {
                    _p.TRANSFORM ? _t.style.transform = "transalteY(" + (_pos.Y + y - startX) + "px)" : _t.style.top = _pos.Y + y - startY + "px";
                }
            } else if (_p.MOVE_DIR.indexOf("X") >= 0) {
                console.log(Math.abs(y - startY) - Math.abs(x - startX) > _p.MOVE_LIMIT_PRE.X, _p.MOVE_LIMIT);
                if (Math.abs(y - startY) - Math.abs(x - startX) > _p.MOVE_LIMIT_PRE.X && _p.MOVE_LIMIT) {
                    //ev.preventDefault();
                    _t.removeEventListener('touchmove', touchMove, false);
                    _t.removeEventListener('touchend', touchEnd, false);
                    _p.UP_BACK && upBack();
                    return;
                }
                if (_pos.X + x - startX >= _p.MOVE_MAX._X && _pos.X + x - startX <= _p.MOVE_MAX.X_) {
                    _p.TRANSFORM ? _t.style.transform = "translateX(" + (_pos.X + x - startX) + "px)" : _t.style.left = _pos.X + x - startX + "px";
                }
            } else if (_p.MOVE_DIR.indexOf("Y") >= 0) {
                if (Math.abs(x - startX) - Math.abs(y - startY) > _p.MOVE_LIMIT_PRE.Y && _p.MOVE_LIMIT) {
                    //ev.preventDefault();
                    _t.removeEventListener('touchmove', touchMove, false);
                    _t.removeEventListener('touchend', touchEnd, false);
                    return;
                }
                if (_pos.Y + y - startY >= _p.MOVE_MAX._Y && _pos.Y + y - startY <= _p.MOVE_MAX.Y_) {
                    _p.TRANSFORM ? _t.style.transform = "transalteY(" + (_pos.Y + y - startX) + "px)" : _t.style.top = _pos.Y + y - startY + "px";
                }
            }
        }
    }

    function mouseUp(ev) {
        console.log("mouseup");
        _t.style.zIndex = "";
        endX = ev.clientX, endY = ev.clientY, timeE = new Date().getTime();
        _e.MOVE = {X: endX - startX, Y: endY - startY};     //回调属性
        _e.p = _p;
        if (_p.MOVE_DIR.indexOf("X") >= 0) {
            if (startX - endX > _p.L) {
                _f.A_LL(_e);
                noClick();
            }
            else if (startX - endX > _p.S) {
                _f.A_L(_e);
                noClick();
            }
            else if (endX - startX > _p.L) {
                _f.A_LR(_e);
                noClick();
            }
            else if (endX - startX > _p.S) {
                _f.A_R(_e);
                noClick();
            }
            //以下为时间和点击，下面代码会做出避免重复执行
            else if (timeE - timeS > _p.LT && (Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2) {
                _f.A_LT(_e);
                noClick();
            }
            else if ((Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2 && (timeE - timeS) < _p.CLICK_TIME) {
                _f.A_O(_e);
                haveClick();
            }
        }
        if (_p.MOVE_DIR.indexOf("Y") >= 0) {
            if (startY - endY > _p.L) {
                _f.A_LTop(_e);
                noClick();
            }
            else if (startY - endY > _p.S) {
                _f.A_T(_e);
                noClick();
            }
            else if (endY - startY > _p.L) {
                _f.A_LB(_e);
                noClick();
            }
            else if (endY - startY > _p.S) {
                _f.A_B(_e);
                noClick();
            }
            else {          //避免XY重复执行——时间和点击
                if (_p.MOVE_DIR.indexOf("X") < 0) {
                    if (timeE - timeS > _p.LT && (Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2) {
                        _f.A_LT(_e);
                        noClick();
                    } else if ((Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2 && (timeE - timeS) < _p.CLICK_TIME) {
                        _f.A_O(_e);
                        haveClick();
                    }
                }
            }
        }

        if (_p.UP_BACK) {
            upBack();
            _pos.X = _p.X;
            _pos.Y = _p.Y;
        }
        else {
            _pos.X = parseInt(_p.TRANSFORM ? _t.style.transform.replace(/translateX\((-*\d+)px\)/, "$1") : _t.style.left.replace("px", ""));
            _pos.Y = parseInt(_p.TRANSFORM ? _t.style.transform.replace(/translateY\((-*\d+)px\)/, "$1") : _t.style.top.replace("px", ""));
        }
        _f.A_F(_e);
        document.removeEventListener('mousemove', mouseMove, false);
        document.removeEventListener('mouseup', mouseUp, false);
    }

    function touchEnd(ev) {
        console.log("touchend");
        _t.style.zIndex = "";
        endX = ev.changedTouches[0].clientX, endY = ev.changedTouches[0].clientY, timeE = new Date().getTime();
        _e.MOVE = {X: endX - startX, Y: endY - startY};     //回调属性
        _e.p = _p;
        if (_p.MOVE_DIR.indexOf("X") >= 0) {
            if (startX - endX > _p.L) {
                _f.A_LL(_e);
                noClick();
            }
            else if (startX - endX > _p.S) {
                _f.A_L(_e);
                noClick();
            }
            else if (endX - startX > _p.L) {
                _f.A_LR(_e);
                noClick();
            }
            else if (endX - startX > _p.S) {
                _f.A_R(_e);
                noClick();
            }
            else if (timeE - timeS > _p.LT && (Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2) {
                _f.A_LT(_e);
                noClick();
            }
            //else if (timeE - timeS > _p.ST) { _f.A_T(_e); noClick(); }
            else if ((Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2 && (timeE - timeS) < _p.CLICK_TIME) {
                _f.A_O(_e);
                haveClick();
            }
        }
        if (_p.MOVE_DIR.indexOf("Y") >= 0) {
            if (startY - endY > _p.L) {
                _f.A_LTop(_e);
                noClick();
            }
            else if (startY - endY > _p.S) {
                _f.A_T(_e);
                noClick();
            }
            else if (endY - startY > _p.L) {
                _f.A_LB(_e);
                noClick();
            }
            else if (endY - startY > _p.S) {
                _f.A_B(_e);
                noClick();
            }
            else {          //避免XY重复执行——时间和点击
                if (_p.MOVE_DIR.indexOf("X") < 0) {
                    if (timeE - timeS > _p.LT && (Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2) {
                        _f.A_LT(_e);
                        noClick();
                    } else if ((Math.abs(startX - endX) + Math.abs(startY - endY)) < _p.CLICK_LENGTH * 2 && (timeE - timeS) < _p.CLICK_TIME) {
                        _f.A_O(_e);
                        haveClick();
                    }
                }
            }
        }

        if (_p.UP_BACK) {
            upBack();
            _pos.X = _p.X;
            _pos.Y = _p.Y;
        }
        else {
            _pos.X = parseInt(_p.TRANSFORM ? _t.style.transform.replace(/translateX\((-*\d+)px\)/, "$1") : _t.style.left.replace("px", ""));
            _pos.Y = parseInt(_p.TRANSFORM ? _t.style.transform.replace(/translateY\((-*\d+)px\)/, "$1") : _t.style.top.replace("px", ""));
        }
        _f.A_F(_e);
        _t.removeEventListener('touchmove', touchMove, false);
        _t.removeEventListener('touchend', touchEnd, false);
    }

    function upBack() {
        if (_p.MOVE_DIR.indexOf("X") >= 0) {
            _p.TRANSFORM ? _t.style.transform = "translateX(" + _pos.X + "px)" : _t.style.left = _pos.X + "px";
        }
        if (_p.MOVE_DIR.indexOf("Y") >= 0) {
            _p.TRANSFORM ? _t.style.transform = "translateY(" + _pos.X + "px)" : _t.style.top = _pos.Y + "px";
        }
    }

    function noClick() {
        _t.onclick = function () {
            return false;
        }
    }

    function haveClick() {
        _t.onclick = function () {
        }
    }
}

var _extend = function (o, n, override) {
    for (var p in n) if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
};
var _extendDeep = function (o, n, override) {
    for (var p in n) {
        if (o.hasOwnProperty(p) && typeof (o[p]) == "object") {
            _extendDeep(o[p], n[p], override);
            continue;
        }
        if (!o.hasOwnProperty(p) || override) o[p] = n[p];
    }
};
var _override = function (o, n, override) {//override——n如果为对象是否会覆盖o
    for (var p in o) if (n.hasOwnProperty(p) && (typeof n[p] != "object" || override)) o[p] = n[p];
};
var _overrideDeep = function (o, n, override) {
    for (var p in o) {
        if (n.hasOwnProperty(p) && typeof (o[p]) == "object") {
            _overrideDeep(o[p], n[p]);
            continue;
        }
        if (n.hasOwnProperty(p) && (typeof n[p] != "object" || override)) o[p] = n[p];
    }
};
