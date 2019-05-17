/**
 * @author W.Dong
 * @date 2018/10/26
 * @Description: 监听触摸的方向
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent) element.attachEvent("on" + type, handler);
        else element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent) element.detachEvent("on" + type, handler);
        else element["on" + type] = handler;
    },
    /**
     * @param target 要绑定监听的目标元素
     * @param isPreventDefault 是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback 向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback 向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback 向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback 向左滑动的监听回调（若不关心，可以不传，或传false）*/
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;

        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    // var spanX = event.changedTouches[0].pageX - startX;
                    // var spanY = event.changedTouches[0].pageY - startY;
                    // // console.log(spanY);
                    // if (Math.abs(spanX) > Math.abs(spanY)) { //认定为水平方向滑动
                    //     if (spanX > 30) { //向右
                    //         if (rightCallback) {
                    //             rightCallback();
                    //             // console.log("right");
                    //         }
                    //
                    //     } else if (spanX < -30) { //向左
                    //         if (leftCallback) {
                    //             leftCallback();
                    //             // console.log("left");
                    //         }
                    //     }
                    // } else { //认定为垂直方向滑动
                    //     console.log(spanY);
                    //     if (spanY > 10) { //向下
                    //         if (downCallback) {
                    //             downCallback();
                    //             // console.log("down");
                    //         }
                    //     } else if (spanY < -10) {//向上
                    //         if (upCallback) {
                    //             upCallback();
                    //             // console.log("up");
                    //         }
                    //     }
                    // }
                    // break;
                    // case "touchmove": //阻止默认行为
                    //     if (isPreventDefault) event.preventDefault();
                    //     break;

                    var endx, endy;
                    endx = event.changedTouches[0].pageX;
                    endy = event.changedTouches[0].pageY;
                    // var direction = this.getDirection(startX, startY, endx, endy);

                    var angx = endx - startX;
                    var angy = endy - startY;
                    var result = 0;

                    //如果滑动距离太短
                    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                        return result;
                    }
                    var angle = Math.atan2(angy, angx) * 180 / Math.PI;
                    console.log(angle);
                    if (angle >= -170 && angle <= -45) {
                        result = 1;
                    } else if (angle > 15 && angle < 135) {
                        result = 2;
                    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                        result = 3;
                    } else if (angle >= -45 && angle <= 45) {
                        result = 4;
                    }
                    switch (result) {
                        case 0:
                            // alert("未滑动！");
                            break;
                        case 1:
                            // alert("向上！")
                            if (upCallback) {
                                upCallback();
                                console.log("up");
                            }
                            break;
                        case 2:
                            // alert("向下！")
                            if (downCallback) {
                                downCallback();
                                console.log("down");
                            }
                            break;
                        case 3:
                            // alert("向左！")
                            if (leftCallback) {
                                leftCallback();
                                console.log("left");
                            }
                            break;
                        case 4:
                            // alert("向右！")
                            if (rightCallback) {
                                rightCallback();
                                console.log("right");
                            }
                            break;
                        default:
                    }
            }
        }
    }
};
//使用的时候很简单，只需要向下面这样调用即可
// 其中下面监听的是整个DOM
// up, right, down, left为四个回调函数，分别处理上下左右的滑动事件
//  EventUtil.listenTouchDirection(document, true, "", tou_right, "", tou_left);
