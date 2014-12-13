// jplayer的url
var g_jp_url = 'http://img.spriteapp.cn';

//第三方登录入口（显示、隐藏）
function showlogin(exp_uri){    
    exp_uri = exp_uri || '';  
    if (typeof(g_exp_uri) != 'undefined' && exp_uri)
        g_exp_uri = exp_uri;

    jQuery('#cboxLoadedContent').css({left:0});
    jQuery('#cboxLoadedContent').css({right:0});
    jQuery('#cboxOverlay').show();
    jQuery('#cboxLoadedContent').show();
    document.body.style.overflow = "hidden";    
}

function hideLogin(){
    jQuery('#cboxOverlay').hide();
    jQuery('#cboxLoadedContent').hide();    
    document.body.style.overflow = "auto";    
}

//登录事件触发, exp_uri - 期望返回的地址
function login(platform){
  platform = platform || 'weibo';
  
  var href = '';
  //回调地址  
  var redirect_uri = "http://www.budejie.com/oauth_login.php?platform="+platform;
  //存储原始地址
  var original_uri = document.location.href;
  if (typeof(g_exp_uri) != 'undefined' && g_exp_uri)
    original_uri = 'http://' + document.location.host + g_exp_uri;
  document.cookie  = "original_uri="+ escape(original_uri) +";domain=.budejie.com;path=/"; 
  
  if(platform == 'qzone'){
    var scope = 'add_t,add_pic_t';    
    href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100336987&state=1&redirect_uri=" + redirect_uri + "&scope=" + scope;
  }else if(platform == 'tqq'){
    href="https://open.t.qq.com/cgi-bin/oauth2/authorize?client_id=801437726&response_type=code&redirect_uri=" + redirect_uri;
  }else if(platform == "weibo"){
    href="https://api.weibo.com/oauth2/authorize?client_id=2566540592&redirect_uri=" + redirect_uri;
  }
  location.href = href;
} 

//退出事件触发
function logout(platform, id){
    id        = id || '';
    platform  = platform || 'weibo';
    var size  = jQuery('.login_unbind').size();
    if(size <= 1)
      return false;    
    
    var href = 'http://api.budejie.com/api/api_open.php?c=user&a=unbind&id=' +id+ "&type=" + platform;
    
    jQuery.getJSON(href+'&callback=?',function(data){
      var href = '/space/binding';
      location.href = href;
    })
}

//退出确认事件
function confirm_logout(){
  if(confirm("您确定要退出吗？")){
    document.cookie = "oauth_user=;domain=.budejie.com;path=/";
    document.cookie = "login=0;domain=.budejie.com;path=/";
    location.reload();
  }  
}

//收藏功能
function do_bookmark(uid, tid){ 
 if(uid != '' && uid != 0){
    var href    = 'http://api.budejie.com/api/api_open.php?c=bookmark&a=add&uid='+ uid +"&ids="+ tid;
    var haveDo  = check_do('bookmark', tid);
    
    if(!haveDo){    
      jQuery.getJSON(href+'&callback=?',function(data){
        if(!isNaN(data.result) && data.result == 1){
          jQuery('#no_bookmark-'+tid).parent().hide();
          jQuery('#bookmark-'+tid).parent().show();  
          cookie_add('bookmark', tid);          
        }else{
          alert('收藏失败');
        }
      })
    }    
  }else{
    showlogin();
  }
}

//取消收藏
function do_cancelBookmark(uid, tid){
  if(uid != '' && uid != 0){
    var href    = 'http://api.budejie.com/api/api_open.php?c=bookmark&a=delete&uid='+ uid +"&ids="+ tid;
    jQuery.getJSON(href+'&callback=?',function(data){
      if(!isNaN(data.result) && data.result == 1){        
        if(jQuery('#post-'+tid).length > 0){        
          jQuery('#post-'+tid).remove();           
          var leng   = jQuery(".web_left").length;
          var page_l = jQuery(".budejie_ye label").length;
          var page_a = jQuery(".budejie_ye a").length;
            
          if(leng == 1 && page_l <= 1 && page_a == 0){          
            jQuery("#pages").hide();
            jQuery(".web_left").show();
          }
        }else{          
          jQuery('#bookmark-'+tid).parent().hide();
          jQuery('#no_bookmark-'+tid).parent().show();          
        }
        cookie_delete('bookmark', tid);        
      }else{
        alert('取消收藏失败');
      }
    })
  }else{
    showlogin();
  }
}

//顶功能
function do_love(uid, tid){
  if(uid != '' && uid != 0){
    var href    = 'http://api.budejie.com/api/api_open.php?c=post&a=love&id=' + tid;          
    var haveDo  = check_do('ding', tid);
    if(!haveDo){
      haveDo = check_do('cai', tid);
    }
    
    if(!haveDo){
      jQuery.getJSON(href+'&callback=?',function(result){
        if(!isNaN(result) && result > 0){
          jQuery('#loveNum-'+tid).text(result);          
          jQuery('#loveNum-'+tid).parent().removeClass('no_love');
          jQuery('#loveNum-'+tid).parent().addClass('love');          
          cookie_add('ding', tid);
        }else{
          alert('顶操作失败');
        }
      })
    }   
  }else{
    showlogin();
  }
}

//顶评论功能
function do_cmt_love(uid, cid){
  if(uid != '' && uid != 0){
    var href    = 'http://api.budejie.com/api/api_open.php?c=comment&a=like&cid='+ cid +"&userID="+ uid;          
    var haveDo  = check_do('cmt_ding', cid);
    var count   = jQuery('#cmtLoveNum-'+cid).text();              
    count = parseInt(count)+1;
    
    if(!haveDo){
      jQuery.getJSON(href+'&callback=?',function(result){
        if(!isNaN(result) && result == 1){
          jQuery('#cmtLoveNum-'+cid).text(count);          
          jQuery('#cmtLoveNum-'+cid).parent().removeClass('no_love');
          jQuery('#cmtLoveNum-'+cid).parent().addClass('love');          
          cookie_add('cmt_ding', cid);
        }else{
          alert('顶操作失败');
        }
      })
    }   
  }else{
    showlogin();
  }
}

//踩功能
function do_nolove(uid, tid){  
  if(uid != '' && uid != 0){
    var href    = 'http://api.budejie.com/api/api_open.php?c=data&a=cai&dong=cai&id=' + tid;
    var haveDo  = check_do('cai', tid);
    if(!haveDo){
      haveDo = check_do('ding', tid);
    }
    
    if(!haveDo){
      jQuery.getJSON(href+'&callback=?',function(result){
        if(!isNaN(result) && result > 0){
          jQuery('#noloveNum-'+tid).text(result);
          jQuery('#noloveNum-'+tid).parent().removeClass('no_cai');
          jQuery('#noloveNum-'+tid).parent().addClass('cai');  
          cookie_add('cai', tid);
        }else{
          alert('踩操作失败');
        }
      })
    }   
  }else{
    showlogin();
  }
}

//检查是否操作过
function check_do(name, tid){
  var handle  = getcookie(name);
  var haveDo  = false;
  
  if(typeof(handle) != 'undefined'){      
    var arr = handle.split(",");
    for(var i=0; i<arr.length; i++){
      if(arr[i] == tid)
        haveDo = true;
    }      
  }else{
    document.cookie= name +"="+ ";domain=.budejie.com;path=/";
  }
  
  return haveDo;
}
    
//删除用户cookie
function cookie_delete(name, tid){
  var cookie  = getcookie(name); 
  
  if(typeof(cookie) != 'undefined'){          
    cookie  = cookie.replace(tid, '');    
    document.cookie= name +"="+ cookie +";domain=.budejie.com;path=/";
  }else{
    document.cookie= name +"=;domain=.budejie.com;path=/";
  }    
}

//添加tid到cookie
function cookie_add(name, tid){
  var handle  = getcookie(name);
  handle += tid + ',';
    
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + 3);  
  document.cookie = name +'='+ handle +";expires="+ exdate.toUTCString() +";domain=.budejie.com;path=/";
}

//获取指定名称的cookie的值
function getcookie(objname){
  var arrstr = document.cookie.split("; ");
  for(var i = 0;i < arrstr.length;i ++){
    var temp = arrstr[i].split("=");
    if(temp[0] == objname) 
      return unescape(temp[1]);
  }
  return '';
}

//分享功能
function share(_type, _tid){
    var _appkey = '';
    var _title  = jQuery('#title-'+_tid).text();       
    var _pic    = jQuery('#pic-'+_tid).attr('src');       
    
    if(_type == 'tqq'){
       _title  = _title + encodeURIComponent('……来自(@baisibudejie2011)');
    }else{
       _title  = _title + encodeURIComponent('……来自(@百思不得姐应用)');
    }    
    var _url   = "http://www.budejie.com/budejie/land.php?pid="+ _tid +"&f=web"
				_url 	 = encodeURIComponent(_url);      
        
    if(_type == 'weibo'){       
      _appkey  = '2566540592';
			var _url = 'http://v.t.sina.com.cn/share/share.php?appkey=' + _appkey + '&url=' + _url + '&title=' + _title + '&pic=' + _pic;		
    }else if(_type == 'tqq'){
      _appkey  = '801437726';
      var _url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' + _url + '&appkey=' + _appkey + '&pic=' + _pic + '&title=' + _title;
    }else if(_type == 'qzone') {
      _appkey  = '100336987';
      var _url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + _url + '&title=' + _title + '&pics=' + _pic;
    }else if(_type == 'renren') {     
		  var _url = 'http://widget.renren.com/dialog/share?resourceUrl=' + _url + '&srcUrl=' + _url + '&title=' + _title + '&pic=' + _pic;
    }else if(_type == 'kaixin') {
      var _url = 'http://www.kaixin001.com/repaste/share.php?rtitle=' + _title + '&rurl=' + _url + '&rcontent=';
    }
    
    var href = "http://api.budejie.com/api/api_open.php?c=data&a=repost&id="+_tid;
    jQuery.getJSON(href+'&callback=?', function(result){                
      if(!isNaN(result) && result > 0){
        jQuery('#repost-'+_tid).text(result);
      }
    })
    
    window.open(_url);
}

//隐藏分享按钮
function hide_share(){
    jQuery('.budejie_share').hide();
}

//用户删帖
function delete_topic(uid, tid){
  if(confirm("您确定要删除此贴吗？")){
    if(uid != '' && uid != 0 && tid != '' && tid != 0){
      var href = 'http://api.budejie.com/api/api_open.php?c=topic&a=deltopic&uid='+ uid +"&tid=" + tid;

      jQuery.getJSON(href+'&callback=?',function(data){
          if(!isNaN(data.result) && data.result == 0){
            jQuery('#post-'+tid).remove();  
            var leng   = jQuery(".web_left").length;
            var page_l = jQuery(".budejie_ye label").length;
            var page_a = jQuery(".budejie_ye a").length;
            
            if(leng == 1 && page_l <= 1 && page_a == 0){
              jQuery("#pages").hide();
              jQuery(".web_left").show();
            }
          }else{
            alert('删帖失败');
          }
      })
    }
  }  
}

//穿越
function across(category, date){
  if(category == 10){
    location.href = "/history-p/" + date;
  }else if(category == 29){
    location.href = "/history-d/" + date;
  } else {
    location.href = "/history-s/" + date;
  }
}

//图片浏览
function previewImage(file, id, width, height)
{
  width = width || 0;
  height= height || 0;
  var MAXWIDTH  = width;
  var MAXHEIGHT = height;
  var div = document.getElementById(id);
  if (file.files && file.files[0])
  {
    div.innerHTML = '<img id=imghead_'+id+'>';
    var img = document.getElementById('imghead_'+id);
    img.onload = function(){
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      img.width = rect.width;
      img.height = rect.height;            
    }
    var reader = new FileReader();
    reader.onload = function(evt){img.src = evt.target.result;}
    reader.readAsDataURL(file.files[0]);
  }
  else
  {
    file.select();    
    file.blur();
    var src      = document.selection.createRange().text;
    var sFilter  = "width:"+ MAXWIDTH +"px;height:"+ MAXHEIGHT +"px;";
        sFilter += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ src +"',sizingMethod='scale');";

    div.innerHTML = "<div id='imghead_"+ id +"' style=\""+ sFilter +"\"></div>";         
  }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
  var param = {top:0, left:0, width:width, height:height};
  if( width>maxWidth || height>maxHeight )
  {
    rateWidth = width / maxWidth;
    rateHeight = height / maxHeight;
    
    if( rateWidth > rateHeight )
    {
      param.width =  maxWidth;
      param.height = Math.round(height / rateWidth);
    }else
    {
      param.width = Math.round(width / rateHeight);
      param.height = maxHeight;
    }
  }
  
  param.left = Math.round((maxWidth - param.width) / 2);
  param.top = Math.round((maxHeight - param.height) / 2);
  return param;
}

//检查用户名称
function check_username(){
  var name  = jQuery.trim(jQuery('#username').val());
  //原始用户名称
  var original_name = jQuery.trim(jQuery('#original_username').val());
  var href  = "http://api.budejie.com/api/api_open.php?c=user&a=check_username&name=" + encodeURIComponent(name);
  var arr   = new Array();
  arr[0] = '没有错误';
  arr[1] = '昵称不符合规范';
  arr[2] = '名称重复';        
  arr[3] = '名称为空';
  
  jQuery.getJSON(href + '&callback=?', function(data){        
    if(!isNaN(data.result) && data.result != 0 && name != original_name){
      var text = arr[data.result];
      jQuery('#show_tips').text(text);
      jQuery('#show_tips').show();         
    }else{
      jQuery('#show_tips').hide();         
    }
  })
}

function check_username_voice(){
  var name  = jQuery.trim(jQuery('#username').val());
  //原始用户名称
  var original_name = jQuery.trim(jQuery('#original_username').val());
  var href  = "http://api.budejie.com/api/api_open.php?c=user&a=check_username&name=" + encodeURIComponent(name);
  var arr   = new Array();
  arr[0] = '没有错误';
  arr[1] = '昵称不符合规范';
  arr[2] = '名称重复';        
  arr[3] = '名称为空';
  
  jQuery.getJSON(href + '&callback=?', function(data){        
    if(!isNaN(data.result) && data.result != 0 && name != original_name){
      var text = arr[data.result];      
      $('#wrong_username').show();
      $('#right_username').hide();
      alert(text);      
    }else{
      $('#right_username').show();
      $('#wrong_username').hide();        
    }  
  })
}

//右侧浮动广告
function right_ad_float(){
  (function($){     
     var $ad_top      = $('.float-wrapper').offset().top;
     var $bottom_top  = $('#bottom').offset().top-$('.float-wrapper').height();
     float_ad();
     $(window).scroll(float_ad);   
     function float_ad(){
       $bottom_top  = $('#bottom').offset().top-$('.float-wrapper').height();
       var $top     = $(window).scrollTop() + 100;
       if($top > $bottom_top){
         var bottom_left = "-" + ($top - $bottom_top)+"px";
         $('.float-wrapper').addClass('fixed-top');
         $('.float-wrapper').css({top:bottom_left});         
       }else if($top > $ad_top){
         $('.float-wrapper').css({top:'0px'});
         $('.float-wrapper').addClass('fixed-top');        
       }else{         
         $('.float-wrapper').removeClass('fixed-top');         
       }        
     }        
  })(jQuery)
}

//内容分享功能
function content_shareing(val){
  (function($){ 
     $('.share-content').mousemove(function(){
      var $position = $(this).position();
      var $top			= ($position.top-100)+'px';
      var $left 		= ($position.left-val)+'px';
      var $share 		= $(this).parents('.web_left').find('.budejie_share');
      $('.budejie_share').hide();
      $share.css({top:$top,left:$left});
      $share.show();
			$('#moveToDiv').val(0);
    })    
    
    $('.share-content').mouseleave(function(){      
      $('.budejie_share').mousemove(function(){
        $('#moveToDiv').val(1);
      })
        
      setTimeout(function(){  
        if($('#moveToDiv').val() == 0){
          $('.budejie_share').hide();
          $('#moveToDiv').val(0);
        }            
      }, 200);      
    })   
    
    $('.budejie_share').mouseleave(function(){
      $('.budejie_share').hide();
    })    
  })(jQuery)
}

// 为了jplay的时间显示
function is_ie()
{
    return navigator.userAgent.indexOf('MSIE') > -1;
}

function fmt_voice_time(sec)
{
    var fmt = '';
    var az = function(i) {
        return i < 10 ? '0' + i : i;
    }

    if (sec > 60) {  
        return az(Math.floor(sec / 60)) + ':' +  az((sec % 60))
    } else if (sec > 0) {
        return '00:' + sec;
    } else {
        return '00:00';
    }
} 
