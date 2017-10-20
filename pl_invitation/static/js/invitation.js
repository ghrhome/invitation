/**
 * Created by plocc on 16/7/16.
 */
var invitation=(function(it,$){
    var invitation=it;

    invitation.process_init=function(){
        invitation.swiper_init();
        invitation.submit_init();
        $('#preloader').delay(350).fadeOut(function(){

        });
    };

    invitation.loading=function(){
        $(".ys-mobile").append('<div class="modal-backdrop-loading fade" style="opacity: 0.25"></div>').find(".modal-backdrop-loading").addClass("show");
        $(".ui-loader").fadeIn();
    };

    invitation.hideLoading=function(){
        $(".modal-backdrop-loading").fadeOut(function(){
            $(this).remove();
        });
        $(".ui-loader").fadeOut(300);
    };

    invitation.swiper_init=function(){
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            onInit: function (swiper) { //
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画

            },
            onSlideChangeEnd: function (swiper) {

                //console.log(swiper.activeIndex);
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                if (swiper.activeIndex == 1) {

                } else {

                }
            }
        });
    };
    function _checkMobile(phonenum){

        if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phonenum))){
            return false;
        }else{
            return true;
        }
    }
    function _valadation(){
        var name=  $("#name").val().trim();
        var phone=$("#phone").val().trim();
        var partner=parseInt($("#partner").val()||0);
        //console.log(parking);
        var dinner=$("#dinner").val();
        if(name==null||name==""||name.length<=1){
            alert("请输入完整姓名");
            return false;
        }
        if(phone==null||phone==""||!_checkMobile(phone)){
            alert("请输入正确手机号码");
            return false;
        }
        if(partner==NaN){
            //console.log(parking);
            alert("请输正确的同行人数");
            return false;
        }


        return true;
    };

    function _lockInput(){
        $("#slide-sub-invitation").find("input").attr("disabled",true).end().find("select").attr("disabled",true);
        $("#invitation-submit").text("您的信息已登记").unbind().on("click",function(e){
            e.preventDefault();
        });
    }
    invitation.submit_init=function(){
        $("#invitation-submit").on("click",function(e){
            e.preventDefault();
            if(_valadation()){
                var invitation_data={};
                invitation_data.name=$("#name").val().trim();
                invitation_data.phone=$("#phone").val().trim();
                invitation_data.num=parseInt($("#partner").val())||0;
                invitation.loading();

                //ajax here
                //console.log(invitation_date);
                var _data=JSON.stringify(invitation_data);
                $.ajax({
                    type: "POST",
                    url: "http://www.powerlongmuseum.com/artWeb/receipt/saveReceipt.htm", //orderModifyStatus
                    data: {"data":_data},
                    dataType:"json",
                    success: function(data){
                        if(data.code==0||data.code=='0'){
                            alert("报名成功，感谢您的参与")
                            invitation.hideLoading();
                            _lockInput();
                        }else{
                            var msg=data.msg;
                            alert(msg);
                            invitation.hideLoading();
                        }

                    },
                    error: function(data){
                        var msg=data.data.msg
                        alert(msg);
                        invitation.hideLoading();
                    }
                });

            }
        });
    }


    function _setWx(){
        var curUrl=location.href.split("#")[0];
        var baseUrl='http://www.powerlongmuseum.com/artWeb/authLink/1/occ/getJsApiConfig1.htm';

        //这里接口要改下，不需要关注，只要拿到wxData就好了。

        $.get(baseUrl+'?data={"url":"'+curUrl+'"}').then(function(res){
            console.log(res);
            res=JSON.parse(res);
            var data=res.data;
            var code=res.code;

            if(code=='0'){
                _setWxFunc(data);

            }else{
                console.log("-------------code not 0");
                //alert('网络错误，请重试')
            }

    });



    }

    function _setWxFunc(wxData){
        /*
      *-------------------------- 微信分享 ----------------------
      */
        /*  if (process.env.NODE_ENV === 'production') {*/

        //3G2BZ-SAHCD-ZGJ4R-HVUQY-YQ2VZ-STBK2

            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: '宝龙美术馆开幕邀请函', // 分享标题
                    link: 'http://www.powerlongmuseum.com/invitation/', // 分享链接
                    desc: "诚邀莅临",
                    imgUrl: 'http://www.powerlongmuseum.com/invitation/static/images/plart_350.png', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareTimeline({
                    title: '宝龙美术馆开幕邀请函', // 分享标题
                    desc: '诚邀莅临', // 分享描述
                    link: 'http://www.powerlongmuseum.com/invitation/', // 分享链接
                    imgUrl: 'http://www.powerlongmuseum.com/invitation/static/images/plart_350.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxData.appId, // 必填，公众号的唯一标识
                timestamp: wxData.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
                signature: wxData.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
    }

    function _setNav(){
        var center=new qq.maps.LatLng(31.157670,121.356900);
        var map = new qq.maps.Map(
            document.getElementById("qqnav"),
            {
                center: center,
                zoom: 16,
                draggable: false,
                scrollwheel: false,
                disableDoubleClickZoom: false,
                disableDefaultUI: true    //禁止所有控件
            }
        );
        var marker = new qq.maps.Marker({
            position: center,
            map: map
        });
    };

    invitation.init=function(){
        var body_height = parseInt($("body").css("height"));
        var body_width=parseInt($("body").css("width"));

        $("#slide-info .slide-content-bg").css({
            "width":body_width+"px",
            "height":body_width+"px",
            "margin-top":(-1)*body_width/2+"px",
            "margin-left":(-1)*body_width/2+"px"
        });
        //console.log(body_height);
        var swiper_height = body_height;
        $("#invitation-main .swiper-container").css("height", swiper_height + "px");
        invitation.process_init();
        _setWx();
        _setNav();
    };

    return invitation;
})(invitation||{},jQuery);

$(document).ready(function(){
   invitation.init();
});