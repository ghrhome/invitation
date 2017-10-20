/**
 * Created by whobird on 17/10/20.
 */
/*<div id="soundcontainer">
    <audio id="bgsound" loop="loop" src="http://qn.media.epub360.com/materials/audio/b6aba15c82f2bd59d514b8349f6db69b.mp3">
        <source src="http://qn.media.epub360.com/materials/audio/b6aba15c82f2bd59d514b8349f6db69b.mp3"> </audio>
</div>*/


$script(player_modules,'player');
$script.ready('player',function(){
    var _i=window.setInterval(function(){
        if(window.start_player){
            if(loadmodules.length){
                $script(loadmodules, 'modules');
                $script.ready('modules',function() {
                    console.log('loaded');
                    if(!window.js_loaded) {
                        window.js_loaded=true;
                        window.start_player();
                    }
                })
            }
            else{
                if(!window.js_loaded) {
                    window.js_loaded=true;
                    window.start_player();
                }
            }
            clearInterval(_i);
        }
    },50);
})

var bookTitle =  '昊美术馆开幕邀请函';
var msgContent = '邀请您出席昊美术馆开馆展MANIFESTO宣言'; // 微信转发短语
var msgTitle = '昊美术馆开幕邀请函'; // 微信转发标题
var shareTitle = '昊美术馆开幕邀请函'; // 微信分享朋友圈标题
var appid = '';
// 微信分享图片
var imgUrl = 'http://qn.media.epub360.com/book/covermini/ccff0416365352adbf3396d4c1f4846f_256.png';
if (window.location.protocol != 'https:' && imgUrl.indexOf(window.location.protocol) < 0){
    if (imgUrl[0]=='.'){
        imgUrl =  '/' + imgUrl;
    }
    imgUrl = window.location.protocol + '//' + window.location.host + imgUrl;
}

var localUrl = window.location.origin + window.location.pathname;
var localSearch = window.location.search;

// 微信分享网址
var message_link = localUrl + localSearch;
var message_hash = window.location.hash;












