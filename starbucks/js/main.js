
$(document).ready(function(){

	//Code to center the subscription pup-up box
	$box = $('#box');
	$box.css({
		'left' : '50%',
		'top' : '50%',
		'margin-left' : -$box.width()/2 + 'px',
		'margin-top' : -$box.height()/2 + 'px'
	});


	//Subscription pup-up
	$('.start_btn').click(function(){
		$('#lightbox').width($(window).width()).height($(window).height()).fadeIn(200);
		$('#box').fadeIn(200);

		return false;
	});

	$('#lightbox, .close').click(function(){
		$('#lightbox').width(0).height(0).fadeOut(200);
		$('#box').fadeOut(200);

		return false;
	});

	//동영상 제어
	$(function(){
	  var player=$('video')[0];

	  //재생
	  $('#btn-play-pause').on('click',function(){
	    if(player.paused){//일시정지상태
	      player.play(); //재생처리
	      $(this).find('i').text('pause');
	      $(this).attr('title','일시정지');

	    }else{//재생상태
	      player.pause(); //일시정지처리
	      $(this).find('i').text('play_arrow');
	      $(this).attr('title','재생');
	    }
	  })

	  //다시시작
	  $('#btn-replay').on('click',function(){
	    player.pause(); //멈추고
	    player.currentTime=0; //재생시간을 초기화 시키고
	    player.play(); //재생
	  })

	  //음소거
	  $('#btn-volume').on('click',function(){
	    if(player.muted){//음소거
	      $(this).find('i').text('volume_up');
	      $(this).attr('title','음소거해제');
	      player.muted=false;
	    }else{//음소거아님
	      $(this).find('i').text('volume_off');
	      $(this).attr('title','음소거');
	      player.muted=true;
	    }
	  })

	  //전체화면/기본화면
	  $('#btn-fullscreen').on('click',function(){
	    if($(this).find('i').text()=='fullscreen'){ //전체화면
	      $(this).find('i').text('fullscreen_exit');
	      $(this).attr('title','기본화면');
	      $('body').addClass('fullscreen');
	    }else{ //기본화면
	      $(this).find('i').text('fullscreen');
	      $(this).attr('title','전체화면');
	      $('body').removeClass('fullscreen');
	    }
	  })


	})


});
