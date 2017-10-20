$(window).load(function() {
    // Page Preloader
    $('#preloader').delay(350).fadeOut(function(){

    });
});

$(document).ready(function() {
    var body_height = parseInt($("body").css("height"));
    console.log(body_height);
    //var body_width=$("body").css("width");
    var swiper_height = body_height;

    $("#invitation-main .swiper-container").css("height", swiper_height + "px");

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function (swiper) { //
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画

        },
        onSlideChangeEnd: function (swiper) {

            console.log(swiper.activeIndex);
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            if (swiper.activeIndex == 1) {

                $("#slide-main .shake-hand").removeClass("animated tada");
                console.log($("#slide-main .swiper-title"));
                $("#slide-main .swiper-title").removeClass("animated bounceInDown").hide();
                $("#slide-main .swiper-flows").removeClass("animated zoomIn").hide();
            } else {
                // $("#slide-main .shake-hand").removeClass("animated").addClass("animated tada");
                setTimeout(function () {
                    $("#slide-main .shake-hand").removeClass("animated").addClass("animated tada");
                }, 1000);
                $("#slide-main .swiper-title").removeClass("animated").show().addClass("animated bounceInDown");
                $("#slide-main .swiper-flows").removeClass("animated").show().addClass("animated zoomIn");
            }
        }
    });


});