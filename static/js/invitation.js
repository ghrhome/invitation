/**
 * Created by plocc on 16/7/16.
 */
var invitation=(function(it,$){
    var invitation=it;

    function _date(){
        var today=new Date();
        var targetDate=new Date("2016","6","30");

        var date=Math.floor((targetDate-today)/(60*60*24*1000));
        return date;
    }

    invitation.process_init=function(){

        setTimeout(function(){
            $("#processing").delay(1000).addClass("active");
        },600);

        setTimeout(function(){
            invitation.swiper_init();
            invitation.submit_init();
            $('#preloader').delay(350).fadeOut(function(){

            });
        },2000);
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
        var parking=$("#parking").val();
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
        if(parking==null||parking=="/"){
            //console.log(parking);
            alert("请选择是否需要停车");
            return false;
        }
        if(dinner==null||dinner=="/"){
            alert("请选择是否参加晚宴");
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
                var invitation_date={};
                invitation_date.name=$("#name").val().trim();
                invitation_date.phone=$("#phone").val().trim();
                invitation_date.parking=$("#parking").val();
                invitation_date.dinner=$("#dinner").val();

                invitation.loading();

                //ajax here
                //console.log(invitation_date);
                setTimeout(function(){
                    invitation.hideLoading();
                    _lockInput()
                });
            }
        });
    }
    invitation.init=function(){
        var body_height = parseInt($("body").css("height"));
        //console.log(body_height);

        var dateLast=_date();

        $("#date").html(dateLast+"<em>天</em>");
        var swiper_height = body_height;
        $("#invitation-main .swiper-container").css("height", swiper_height + "px");
        invitation.process_init();

    }

    return invitation;
})(invitation||{},jQuery);

$(document).ready(function(){
   invitation.init();
});