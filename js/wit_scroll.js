 function re_scroll() {
    var iScroll = new MyScroll('#wrap', {});
    iScroll.on('beforestart', function () {
        console.log('beforestart');
    });
    iScroll.on('scroll', function () {
        console.log('scroll');
    });
    iScroll.on('scrollend', function () {
        console.log('scrollend');
    })
}
(function () {
    function MyScroll(selector, options) {
        if (options === undefined) {
            options = {}
        }
        this.options = {};
        this.eventQueue = [];       //MyScroll对象绑定事件队列
        //默认参数，暂时没用到
        this.options.bounce = options.bounce || true;
        this.options.scrollX = options.scrollX || false;
        this.options.scrollY = options.scrollY || true;
        var wrapper = document.querySelector(selector);     //外包元素，overflow样式值要为auto
        var slider = wrapper.children[0];       //滑块元素
        var startY = 0, top = 0, disY = 0;      //一些初始值，top为滑块移动距离
        var that = this;
        slider.addEventListener('touchstart', start, false);
        slider.addEventListener('touchmove', move, false);
        slider.addEventListener('touchend', end, false);
        function start(e) {
            // e.preventDefault();
            that.eventQueue.forEach(function (json) {
                if (json.type === 'beforestart') {
                    json.fn();
                }
            });
            slider.style.transition = '';       //先清除滑块上的transition
            startY = e.targetTouches[0].clientY;    //该效果只写了纵向滑动的情况
            disY = startY - top;
        }
        function move(e) {
            // e.preventDefault();
            that.eventQueue.forEach(function (json) {
                if (json.type === 'scroll') {
                    json.fn();
                }
            });
            // console.log(wrapper.scrollTop)
            //当外包元素的scrollTop值为0时才有下拉效果
            if (wrapper.scrollTop === 0 && e.targetTouches[0].clientY - disY > 0) {
                top = e.targetTouches[0].clientY - disY;
                slider.style.transform = 'translateY(' + top + 'px)';
                document.getElementById("up_reload").classList.remove("none");
                if (e.targetTouches[0].clientY - disY > 100){
                    document.getElementById("up_reload").innerHTML = "松开刷新"
                }
                //当外包元素的scrollTop值为滑块元素的高减去外包元素的高时才有上拉效果
            } else if (wrapper.scrollTop === slider.offsetHeight - wrapper.offsetHeight && e.targetTouches[0].clientY - disY < 0) {
                top = e.targetTouches[0].clientY - disY;
                slider.style.transform = 'translateY(' + top + 'px)';
            }
        }
        function end() {
            that.eventQueue.forEach(function (json) {
                if (json.type === 'scrollend') {

                    json.fn();
                }
            });
            document.getElementById("up_reload").innerHTML = "  <img src=\"../images/icon/loading3.gif\" alt=\"\">";
            setTimeout(function () {
                if (top > 100){
                    window.location.reload();
                }
                top = 0;
                slider.style.transition = '500ms';
                slider.style.transform = 'translateY(' + top + 'px)';
            },800);

        }
    }
    //MyScroll对象绑定事件函数
    MyScroll.prototype.on = function (name, fn) {
        this.eventQueue.push({type: name, fn: fn});
    };
    window.MyScroll = MyScroll;
})();
