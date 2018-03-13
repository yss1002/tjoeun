
//로그인 팝업
$('.join').on('click',function(){
  $('.popup-login').slideDown()
});
//로그인 팝업닫기
$('.popup-login .icon-cancel').on('click',function(){
  $('.popup-login').slideUp()
});

//쇼핑백 팝업
$('.icon-shop').on('click',function(){
  $('.popup-shop').slideDown()
});
//쇼핑백 팝업닫기
$('.popup-shop .icon-cancel').on('click',function(){
  $('.popup-shop').slideUp()
});
