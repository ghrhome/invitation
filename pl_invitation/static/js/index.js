/**
 * Created by whobird on 17/4/22.
 */

var main=(function($,main){
    var main=main;

    main.swiperInit=function() {

        var mySwiper = new Swiper('.swiper-container', {
            //slidesPerView: 'auto',
            speed:800,
            //autoplay:true,
            slidesPerView: 1,
            observer: true,
            observerParents: true,
            pagination : '.swiper-pagination',
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            //mousewheelControl: true,
            onSlideChangeStart: function(swiper){

            },
            onSlideChangeEnd: function(swiper){
                var index=swiper.activeIndex;
                $(".swiper-anim").removeClass("animated fadeInRight");
                $("#slide-"+index).find(".swiper-anim").addClass("animated fadeInRight");
            },

        });//end mySwiper

        $("#btn-section-next").on("click",function(){

            mySwiper.slideTo(1);
        });

        $("#btn-section-prev").on("click",function(){

            mySwiper.slideTo(0);
        });
    }//end swiperInit
    main.head_init=function(){
        $("#header").headroom({
            "offset": 60,
            "tolerance": 5,
            "classes": {
                "initial": "animated",
                "pinned": "slideInDown",
                "unpinned": "slideOutUp"
            }
        });

        $("#contact-btn").on("click",function(){
           // $("#nav-menu").dropdown("hide");
            $("#ys-navbar-collapse").collapse("hide");
        });
    };
    main.ani_init=function(){
        // init controller
        var controller = new ScrollMagic.Controller();
        // init controller
        // build scenei
        var scene_1 = new ScrollMagic.Scene({triggerElement: "#section-1"})
            .on("enter",function(){
                $("#section-1").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-1").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_2 = new ScrollMagic.Scene({triggerElement: "#section-2"})
            .on("enter",function(){
                $("#section-2").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-2").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_3 = new ScrollMagic.Scene({triggerElement: "#section-3"})
            .on("enter",function(){
                $("#section-3").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-3").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_4 = new ScrollMagic.Scene({triggerElement: "#section-4"})
            .on("enter",function(){
                $("#section-4").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-4").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_5 = new ScrollMagic.Scene({triggerElement: "#section-5"})
            .on("enter",function(){
                $("#section-5").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-5").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);
        var scene_6 = new ScrollMagic.Scene({triggerElement: "#section-6"})
            .on("enter",function(){
                $("#section-6").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-6").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_6Plus = new ScrollMagic.Scene({triggerElement: "#section-6-plus"})
            .on("enter",function(){
                $("#section-6-plus").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-6-plus").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);

        var scene_7 = new ScrollMagic.Scene({triggerElement: "#section-7"})
            .on("enter",function(){
                $("#section-7").find(".swiper-anim").addClass("animated fadeInUp");
            })
            .on("leave",function(){
                $("#section-7").find(".swiper-anim").removeClass("animated fadeInUp");
            })
            .addTo(controller);


    };

    main.thumbnail_init=function(){
        var index=0;
        setInterval(function(){

            $(".thumbnail").each(function(){
                $(this).find(".thumbnail-img").eq(index).addClass("animated fadeOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
                    $(this).removeClass("active animated fadeOut")
                });
            });
            index=(index+1)%2;
            $(".thumbnail").each(function(){
                $(this).find(".thumbnail-img").eq(index).addClass("active animated fadeIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
                    $(this).removeClass("animated fadeIn")
                });
            })
        },7000);
    };

    main.thumbnail_stop=function(){
        $(".thumbnail-img").removeClass("active");
        $(".thumbnail").each(function(){
            $(this).find(".thumbnail-img").eq(0).addClass("active");
        });
    };

var url= encodeURIComponent(location.href.split('#')[0]);

    main.share=function(){
        //http://plocc.powerlong.com/mobileWeb//admin/wechat/getWechatParameters.htm
        //$.get("http://plocc.powerlong.com/mobileWeb//admin/wechat/getWechatParameters.htm",function(data){
        $.get("http://plocc.powerlong.com/mobileWeb//admin/wechat/getWechatParameters.htm?url="+url,function(data){
            console.log(data);
		if(data.code==0){
                var wData=data.data;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wData.appId, // 必填，公众号的唯一标识
                    timestamp: wData.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wData.nonceStr, // 必填，生成签名的随机串
                    signature: wData.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }else{
                return false;
            }


        });


        wx.onMenuShareTimeline({
            title: '悦商科技', // 分享标题
            link: 'http://www.yueworld.cn', // 分享链接
            imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: '悦商科技', // 分享标题
            desc: '基于资产打造层层管理系统，从资管到商管，一路贯通', // 分享描述
            link: 'http://www.yueworld.cn', // 分享链接
            imgUrl: 'http://www.yueworld.cn/static/images/yue_350.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

    };
    main.init=function(){
        $("img.lazy").lazyload({
            event : "sporty",
            effect : "fadeIn"
        });
        main.head_init();
        main.share();
        //main.thumbnail_init();
        main.ani_init();
        $('#preloader').delay(350).fadeOut(function(){
            $("img.lazy").trigger("sporty");
            $("#slide-0").find(".swiper-anim").addClass("animated fadeInRight");
        });

        main.swiperInit();
    };
    return main;
})(jQuery,main||{});

$(document).ready(function(){
   main.init();
});
