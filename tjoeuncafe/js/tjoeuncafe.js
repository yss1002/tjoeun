$(function(){
  var $devWidth;
  var $limitSize=767;

  $(window).resize(function(){
    $devWidth=$('body').width();
    $mapIcon=$('.store .wrap > .icon');
    if($devWidth<$limitSize){
      //멤버십 슬라이드(2)
      membershipSlide=new Swiper('.membership-slide',{
        navigation:{
          nextEl:'.membership-slide .swiper-button-next',
          prevEl:'.membership-slide .swiper-button-prev',
        },
        slidesPerView:2,
        loop:true,
      });
      //매장검색 아이콘, 글변경
      $('.store .wrap .left p[class=info]').text('* 매장을 선택하시면 아래쪽에 지도가 표시됩니다.');
      $mapIcon.attr('class',$mapIcon.attr('class').replace('right','down'));
    }else{
      //멤버십 슬라이드(3)
      membershipSlide=new Swiper('.membership-slide',{
        navigation:{
          nextEl:'.membership-slide .swiper-button-next',
          prevEl:'.membership-slide .swiper-button-prev',
        },
        slidesPerView:3,
        loop:true,
      });
      //매장검색 아이콘, 글변경
      $('.store .wrap .left p[class=info]').text('* 매장을 선택하시면 오른쪽에 지도가 표시됩니다.');
      $mapIcon.attr('class',$mapIcon.attr('class').replace('down','right'));
    }

    //이벤트 슬라이드
    eventSlide=new Swiper('.event-slide',{
      navigation:{
        nextEl:'.event-slide .swiper-button-next',
        prevEl:'.event-slide .swiper-button-prev',
      }
    });
    var eventSlideBG=['images/event1.png','images/event2.png','images/event1-m.png','images/event2-m.png'];
    $('.event-slide .swiper-slide').each(function(index){
      if($devWidth < $limitSize){//모바일
        $(this).css('backgroundImage','url('+eventSlideBG[index+2]+')');
      }else{//pc
        $(this).css('backgroundImage','url('+eventSlideBG[index]+')');
      }
    })
  }).resize();
  //윈도우 리사이즈 end

  //네비게이션
  $('.gnb-nav').on('mouseenter',function(){
    if($devWidth < $limitSize) return false;
    $('.gnb-nav li ul').stop().fadeIn(500);
    $('header').addClass('on');
  }).on('mouseleave',function(){
    if($devWidth < $limitSize) return false;
    $('.gnb-nav li ul').stop().fadeOut(200);
    $('header').removeClass('on');
  })

  //모바일 메뉴토글
  $('#btn-menu').on('click',function(){
    $('header').toggleClass('on');
    $(this).toggleClass('icon-menu icon-cancel');
  })

  //모바일의 2depth메뉴
  if($devWidth < $limitSize){
    //링크 비활성화(e.preventDefault()와 같은 역할)
    $('.gnb-nav > li > a').attr('href','javascript:void(0)');
    $('.gnb-nav > li').on('click',function(){
      //각 메뉴를 독립적으로 움직이고 싶을 때
      //모두다 펼치기 되면 네비게이션의 높이를 벗어나므로 네비게이션에 overflow-y:auto; =>높이 or 영역
      $(this).find('ul').slideToggle(500);

      //아코디언 방식(메뉴를 한세트로 묶어서 선택한 것만 활성화시키기)
      // $('.gnb-nav ul').slideUp(500);
      // $(this).find('ul').slideDown(500);
    })
  }

  //통합검색창
  var searchFlag=true;
  $('#btn-search-open').on('click',function(){
    if(searchFlag){
      $(this).find('span').text('통합검색창닫기');
      searchFlag=false;
    }else{
      $(this).find('span').text('통합검색창열기');
      $('.search-form input').val('');
      searchFlag=true;
    }
    $(this).toggleClass('icon-search icon-cancel');
    $('.search-form').toggle();
  })

  //공지사항 롤링
  //3초마다 위에있는 리스트를 숨기고 마지막 위치에 다시 붙이는 작업을 반복 수행
  notice=setInterval(noticeRolling,3000);
  function noticeRolling(){
    $('.notice li').first().slideUp(function(){
      $(this).appendTo($('.notice ul')).slideDown();
    })
  }

  //마우스를 공지사항 내용에 올렸을 때 롤링 멈추기
  $('.notice li').on('mouseenter',function(){
    //notice라는 이름을 호출해서 롤링작업을 멈추기
    clearInterval(notice);
  }).on('mouseleave',function(){
    //다시 수행하도록 호출
    notice=setInterval(noticeRolling,3000);
  })

  //매장검색==================================
  //배열[], 객체{}
  storeInfo=[{
    name:'신촌 1호점',
    addr:'서울 서대문구 신촌로1',
    open:'10:00~23:00 <p>주말 및 공휴일에는 변경될 수 있음.</p>',
    tel:'02-1234-1234',
    parking:'1시간 무료 주차',
    way:'지하철 2호선 3번출구에서 100m직진',
    service:'<li><i class="sprite s-wifi"></i><span class="skip">wifi</span></li>'
            +'<li><i class="sprite s-dt"></i><span class="skip">DT</span></li>'
            +'<li><i class="sprite s-food"></i><span class="skip">식사</span></li>',
    image:['images/store1.jpg', 'images/store2.jpg', 'images/store3.jpg'],
    lat:37.556133,
    lng:126.939037,
  },{
    name:'신촌 2호점',
    addr:'서울 서대문구 신촌로2',
    open:'24시간 운영',
    tel:'02-1234-5678',
    parking:'주차불가',
    way:'지하철 2호선 1번출구 바로앞',
    service:'<li><i class="sprite s-24"></i><span class="skip">24</span></li>'
            +'<li><i class="sprite s-terrace"></i><span class="skip">terrace</span></li>'
            +'<li><i class="sprite s-smoking"></i><span class="skip">흡연시설</span></li>'
            +'<li><i class="sprite s-outlet"></i><span class="skip">콘센트</span></li>',
    image:['images/store4.jpg', 'images/store5.jpg'],
    lat:37.555538,
    lng:126.936382,
  }];

  selectIndex=0;
  //매장리스트 선택시 활성화처리, 선택한 리스트의 순서를 구한다.
  $('.store-select li').on('click',function(){
    $('.store-select li').removeClass('active');
    $(this).addClass('active');
    selectIndex=$(this).index();
    //console.log('선택한리스트',selectIndex);
    initMap(storeInfo[selectIndex].lat, storeInfo[selectIndex].lng);
  })

  //팝업닫기
  $('.popup .icon-cancel').on('click',function(){
    //열려있는 팝업을 닫고 팝업백그라운드 제거
    $('.popup').slideUp(function(){$('.popup-bg').remove()});
  })

  //로그인 팝업
  $('#btn-login').on('click',function(){
    $('.popup-login').slideDown();
    //팝업 백그라운드를 깔아준다.
    $('body').append('<div class="popup-bg"></div>');
  })
  //로그인 input포커스
  $('#id, #password').on('focus',function(){
    $(this).prev('label').addClass('change');
  }).on('focusout',function(){
    $(this).prev('label').removeClass('change');
  })

  //매장상세팝업-서비스아이콘 항목 보기
  $('.service-open').on('click',function(){
    $(this).find('i').toggleClass('icon-down-open icon-up-open');
    $('.service-icon-total').slideToggle();
  })

  //footer 사이트 정보
  $('footer h1 a').on('click',function(e){
    e.preventDefault();
    $('.sub-nav').slideToggle();
    $(this).find('i').toggleClass('icon-down-open icon-up-open');
  })
})
//document.ready end


//매장상세팝업
function popupStore(){
  //정보를 초기화(비워준다.)
  $('.popup-store .swiper-wrapper, .store-info, .service-icon').empty();
  $('.popup-store h1').text(storeInfo[selectIndex].name);
  imageLength=storeInfo[selectIndex].image.length;
  slideContents='';
  //해당매장의 매장사진을 갯수만큼 돌려서 저장
  for(var i=0; i<imageLength; i++){
    slideContents+='<div class="swiper-slide">'
                +'<img src="'+storeInfo[selectIndex].image[i]+'" alt="매장사진">'
                +'</div>';
  }//for문 end
  //매장사진을 붙여준다.
  $('.popup-store .swiper-wrapper').append(slideContents);
  //매장정보를 붙여준다.
  $('.store-info').append(
    '<dl>'
    +'  <dt>매장주소</dt>'
    +'  <dd>'+storeInfo[selectIndex].addr+'</dd>'
    +'  <dt>영업시간</dt>'
    +'  <dd>'+storeInfo[selectIndex].open+'</dd>'
    +'  <dt>전화번호</dt>'
    +'  <dd>'+storeInfo[selectIndex].tel+'</dd>'
    +'  <dt>주차정보</dt>'
    +'  <dd>'+storeInfo[selectIndex].parking+'</dd>'
    +'</dl>'
    +'<dl>'
    +'  <dt>오시는길</dt>'
    +'  <dd>'+storeInfo[selectIndex].way+'</dd>'
    +'</dl>'
  );
  //매장의 서비스항목을 붙여준다.
  $('.service-icon').append(storeInfo[selectIndex].service);
  //매장상세팝업을 연다.
  $('.popup-store').slideDown(function(){
    //매장상세팝업 슬라이드설정
    storeSlide=new Swiper('.store-slide',{
      navigation:{
        nextEl:'.store-slide .swiper-button-next',
        prevEl:'.store-slide .swiper-button-prev',
      }
    });
  });
  //팝업 백그라운드를 깔아준다.
  $('body').append('<div class="popup-bg"></div>');
}//매장상세팝업 end

//구글 지도
function initMap(latVal, lngVal) {
  //console.log('구글지도위치값:',latVal, lngVal);
  //위도경도의 값이 정의되지 않았을 때 기본값을 저장하도록 설정
  if(latVal==undefined && lngVal==undefined){
    latVal=37.556133;
    lngVal=126.939037;
  }

  var uluru = {lat: latVal, lng: lngVal};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  //마커를 클릭했을 때
  marker.addListener('click', function() {
    popupStore();
    //console.log('마커를 클릭함');
  });
}
