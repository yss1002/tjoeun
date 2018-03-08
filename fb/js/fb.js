
//로그인 팝업
  $('.join').on('click',function(){
    $('.popup-login').slideDown()
});
//팝업닫기
  $('.popup-login .icon-cancel').on('click',function(){
    $('.popup-login').slideUp()
  });
