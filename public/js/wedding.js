// $(function(){  // 제이쿼리 선언문 => $ 사인이 제이쿼리 라이브러리와 충돌성 있다.
//     console.log( $ );
// });

(function($, window, document){ // 내부변수


    // 객체 생성 : 변수의 중복을 피한다.
    const wedding = {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
        },
        header(){

            // 패럴럭스 구현
            // 스크롤 탑값이 아래로 내려가면 헤더에 on 클래스를 추가한다.
            // 스크롤 탑값이 위로 올라가면 헤더에 on 클래스를 삭제한다.            
            // console.log( `윈도우 스크롤 이벤트 $(window).scrollTop()  ${$(window).scrollTop()}` ); /* 스크롤 탑값 */
            // $(window).scrollTop() 값은 스크롤 이벤트가 발생 되어야만 동작한다.
            // $(window).resize(); // 창크기 높이 너비가 변하면 동작

            let newScroll = $(window).scrollTop();  // 새로운 스크롤값
            let oldScroll = newScroll;              // 이전 스크롤값   

            $(window).scroll(function(e){
                
                newScroll = $(window).scrollTop();
                // console.log( newScroll );

                //    console.log( `newScroll-oldScroll   ${newScroll-oldScroll}`  );
                   if(newScroll-oldScroll > 0 ){
                        // console.log( '아래로' );
                        $('#header').addClass('on');
                        $('#header').removeClass('off');
                   }
                   if(newScroll-oldScroll < 0){
                        // console.log( '위로' );
                        $('#header').addClass('off');
                        $('#header').removeClass('on');
                   }
                    

                oldScroll = newScroll;
                // console.log( oldScroll );

            }); // 스크롤값이 변경되면 동작
            

            // $(window).scroll(function(){
            //     newScroll = $(window).scrollTop();

            //         if( newScroll-oldScroll > 0 ){
            //             $('#header').addClass('on');
            //             $('#header').removeClass('off');
            //         }

            //         if( newScroll-oldScroll < 0 ){
            //             $('#header').addClass('off');
            //             $('#header').removeClass('on');
            //         }

            //     oldScroll = newScroll; 
            // });









            // 로딩시 바로가기 메뉴의 포지션 탑값을 가져오기
            // console.log( $('#section6').offset().top );   // top
            // console.log( $('#section6').offset().left );  // left 값

            // 메인버튼 클릭 이벤트 : 스무스 스크롤링 이벤트
            $('.main-btn').on({
                click(){
                    // attribute 어트리뷰트  속성 포로퍼티
                    // console.log( $(this).attr('href') )
                    let pos = $(this).attr('href');
                    
                    $('html,body').animate({ scrollTop: $( pos ).offset().top }, 500);
                }
            });






            // 모바일 버튼 이벤트
            // 선택자 : 모바일 메뉴 햄버거메뉴 클릭 이벤트
            // 클릭하면
            // 이 버튼 안에 자식요소에서 line 클래스를 찾아서  find('.line')
            // on 클래스 추가(addClass('on')) 
            $('.mobile-btn').on({
                click(){
                    $(this).find('.line').toggleClass('on');
                }
            }); 
            // '7' == 7   true   등호2개는 같다고 출력
            // '7' === 7  false   등호2개는 다르다고 출력


            // let t = false;  // 토글 구현 : 스위칭 교환
            // $('.mobile-btn').on({
            //     click(){
            //         if(t===false){ // t가 false 이면 true 로 변환
            //             t=true;
            //             $(this).find('.line').addClass('on');
            //         }
            //         else{   // t가 true 이면 false 로 변환
            //             t=false;
            //             $(this).find('.line').removeClass('on');
            //         }
            //     }
            // });    
            



            // let t = 0;  // 토글 구현 : 스위칭 교환
            // $('.mobile-btn').on({
            //     click(){
            //         if(t===0){ // t가 0 이면 1 로 변환                       
            //             $(this).find('.line').addClass('on');
            //             t=1;
            //         }
            //         else{   // t가 1 이면 0 로 변환                        
            //             $(this).find('.line').removeClass('on');
            //             t=0;
            //         }
            //     }
            // });    


        },
        section1(){
            const $slide = $('#section1 .slide');            
            const $arrowNextBtn = $('#section1 .arrow-next-btn');            
            const $arrowPrevBtn = $('#section1 .arrow-prev-btn');            
            const $pageBtn      = $('#section1 .page-btn');            
            let   setId = 0;
            let cnt = 0;
            let imsi = null;
            

           // 1-1. 메인 다음슬라이드함수 : 페이드인 => 현재슬라이드를 덮고 부드럽게 보이는 다음슬라이드
           function mainNextSlide(){
                $slide                    .css({zIndex: 1, opacity:1});
                $slide.eq(imsi!==null?imsi:(cnt===0?2:cnt-1)).css({zIndex: 2}); // 현재슬라이드
                $slide.eq(cnt)            .css({zIndex: 3}).stop().animate({opacity:0}, 0).animate({opacity:1}, 1000); // 다음슬라이드
                pageBtn();
           }

           // 1-2. 메인 이전슬라이드함수 : 페이드아웃 => 현재슬라이드를 부드럽게 사라지게하여 바로아래 부드럽게 보이는 이전슬라이드
           function mainPrevSlide(){
                $slide                    .css({zIndex: 1, opacity:1});
                $slide.eq(cnt)            .css({zIndex: 2}); // 이전슬라이드
                $slide.eq(imsi!==null?imsi:(cnt===2?0:cnt+1)).css({zIndex: 3}).stop().animate({opacity:1}, 0).animate({opacity:0}, 1000); // 현재슬라이드
                pageBtn()
           }

           // 2-1. 다음(next)카운트함수
           function nextCount(){
                cnt++;
                if(cnt>2){  // 마지막 슬라이드 이면 처음으로 리턴 초기화 0으로
                    cnt=0;  // 1 2 0 1 2 0 1 2 ...
                }
                mainNextSlide();
           }

           // 2-2. 이전(prev)카운트함수
           function prevCount(){
                cnt--;
                if(cnt<0){  // 0 미만이면 마직막으로 리턴 초기화 2으로
                    cnt=2;  
                }
                mainPrevSlide();
           }

           // 3. 자동타이머함수
           function autoTimer(){
                setId = setInterval(nextCount, 3000);  // 4초 후 다음카운트함수 호출
                // setId = setInterval(prevCount, 3000);  // 4초 후 이전카운트함수 호출
           }
           autoTimer();


           // 4-1. 다음화살버튼클릭 이벤트
           $arrowNextBtn.on({
                click(e){
                    e.preventDefault();
                    if( !$slide.is(':animated') ){
                        nextCount();
                        clearInterval(setId);
                    }
                }
           })

           // 4-2. 이전화살버튼클릭 이벤트
           $arrowPrevBtn.on({
                click(e){
                    e.preventDefault();
                    if( !$slide.is(':animated') ){
                        prevCount();
                        clearInterval(setId);
                    }
                }
           })

           // 5. 페이지버튼 이벤트 함수
           function pageBtn(){
                $pageBtn.removeClass('on');
                $pageBtn.eq(cnt > 2 ? 0 : cnt).addClass('on');
           }

           // 6. 페이지버튼 클릭이벤트
           $pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        clearInterval(setId);                    
                        if( cnt < idx ){ // 현재 슬라이드번호 cnt 0 보다 클릭한 버튼 1 인덱스번호가크면
                            if( Math.abs(idx-cnt)>=2 ){ // 2칸이상 간격이 있다면 
                                imsi=cnt;                              
                            }
                            else{
                                imsi=null;  
                            }
                            cnt=idx;
                            mainNextSlide();
                            
                        }
                        
                        if( cnt > idx ){  // 현재 슬라이드번호 cnt 0 보다 클릭한 버튼 1 인덱스번호가작으면                           
                            if( Math.abs(idx-cnt)>=2 ){ // 2칸이상 간격이 있다면 
                                imsi=cnt;                               
                            }
                            else{
                                imsi=null;                                
                            }
                            cnt=idx;
                            mainNextSlide();
                        }

                        console.log( imsi );
                    }
                });
           });

        },
        section2(){
            // 패럴럭스 구현
            // 섹션1의 탑값이 300픽셀 아래로 이동시  애니메이션 동작
            const sec1Top = $('#section1').offset().top + 300;

            // 스크롤이벤트
            $(window).scroll(function(){
                
                // 초기화
                if( $(window).scrollTop() === 0 ){
                    $('#section2 .left-image,#section2 .left-text,#section2 .icon-box').removeClass('on');
                }

                if( $(window).scrollTop() >= sec1Top ){
                    $('#section2 .left-image,#section2 .left-text,#section2 .icon-box').addClass('on');
                }                

            });

        },
        section3(){

        }
    }

    wedding.init(); 

})(jQuery, window, document);  // 즉시실행함수 IIFE 


// (function(){
//     alert('즉시실행함수');
// })();

