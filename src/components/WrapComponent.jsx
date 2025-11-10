import React from 'react';
import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import cryptoJs from 'crypto-js';
//고정페이지
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent   from './wrap/HeaderComponent';
import MainIntroComponent from './wrap/MainIntroComponent';
//서브페이지
import Sub1Component from './wrap/main_sub/Sub1Component';
import Sub2Component from './wrap/main_sub/Sub2Component';
import Sub3Component from './wrap/main_sub/Sub3Component';
import Sub4Component from './wrap/main_sub/Sub4Component';
// 서브페이지 : 회원가입
import SignUpComponent from './wrap/main_sub/SignUpComponent';
// 서브페이지 : 로그인
import SignInComponent from './wrap/main_sub/SignInComponent';
import SignInIdSearchComponent from './wrap/main_sub/SignInIdSearchComponent';
import SignInPwSearchComponent from './wrap/main_sub/SignInPwSearchComponent';
import SignInPwResetComponent from './wrap/main_sub/SignInPwResetComponent';
import SignInIdSearchResultComponent from './wrap/main_sub/SignInIdSearchResultComponent';
// => 최근본상품 상세페이지
import ProductComponent from './wrap/ProductComponent';
// => 장바구니(Cart)
import CartComponent from './wrap/CartComponent';
// 게시판 BBS
import NoticeComponent from './wrap/main_sub_bbs/NoticeComponent';
import NoticeWriteFormPageComponent from './wrap/main_sub_bbs/NoticeWriteFormPageComponent';
import NoticeViewPageComponent from './wrap/main_sub_bbs/NoticeViewPageComponent';
import NoticeUpdateFormPageComponent from './wrap/main_sub_bbs/NoticeUpdateFormPageComponent';
//고정페이지
import ConfirmModal from './wrap/ConfirmModal';
import GoTopComponent from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import FooterComponent from './wrap/FooterComponent';
//페이지404 
import NotView404PageComponent from './wrap/NotView404PageComponent';
// 컨텍스트 사용
import { AddressApiContext } from '../context/AddressApiContext';
import { ConfirmContext } from '../context/ConfirmContext';
import { CartContext } from '../context/CartContext';
import { GlobalContext } from '../context/GlobalContext';
import ConfirmOkCancle from './wrap/ConfirmOkCancel';
// 메인모달 => 로컬스토레이지 dataTime사용
import MainModalComponent from './wrap/MainModalComponent';
// 모달(주소검색) 카카오 주소검색 API 컴폰넌트(모달창)
import PostCodeComponent from './wrap/PostCodeComponent';




export default function WrapComponent() {
   
    // 로그인 유지하기 상태변수
    const [signin, setSigin] = React.useState({
        signinKey: 'KURLYUSERLOGIN',
        user_id:'',
        expires:''
    });
    const {signinKey, user_id, expires} = signin;


    // 로그인 유지하기
    React.useEffect(()=>{
        // 로컬스토레이지 로그인 정보 가져오기
        let encryption='';
        let result='';

        if( localStorage.getItem(signin.signinKey)!==null ){

            // // 복호화 Decryption
            // const decryption = cryptoJs.AES.decrypt(encryption, signin.signinKey);
            // console.log(decryption);

            // // 복호화된 정보를 완전한 데이터(정보)로 변환시킨다.
            // const decryptionData = JSON.parse(decryption.toString(cryptoJs.enc.Utf8));
            // console.log(decryptionData);

            // 암호화된 정보를 스토레이지 저장소에서 가져온다.{키:값}
            encryption = JSON.parse(localStorage.getItem(signin.signinKey));
            // console.log(encryption);
            // console.log(encryption.value);
            // result = JSON.parse(localStorage.getItem(signin.signinKey));

            // 암호를 해독한다.(복호화)
            // 복호화 Decryption
            const decryption = cryptoJs.AES.decrypt(encryption.value, signin.signinKey);
            // 복호화된 정보를 완전한 데이터(정보)로 변환시킨다.
            const decryptionData = JSON.parse(decryption.toString(cryptoJs.enc.Utf8));
            // console.log(decryptionData);

            result = decryptionData;
            if( new Date() > result.expires){
                alert('만료일이 지났습니다. 로그아웃되었습니다.');
                setSigin({
                    ...signin,
                    user_id: '',
                    expires: ''
                })
                localStorage.removeItem(signin.signinKey); // 로그인 정보 모두 삭제
            } 
            else{
                setSigin({
                    ...signin,
                    user_id: result.user_id,
                    expires: result.expires
                })
            }
        }

    },[signin.signinKey]);


    // 로그인 페이지 
    // 아이디찾기 상태관리    
    // 비밀번호찾기 상태관리
    // 로그인 상태관리
    const [login, setLogin] = React.useState({
        아이디: '',
        비밀번호: '',
        가입일: '',
        이름: ''
    });



    // 카카오 주소검색 API 모달창
    const [postModal, setPostModal] = React.useState(false);


    // 카카오 주소검색 API 모달창 열기 메서드
    const openPopupDaumPostApi = () => {
        setPostModal(true);
    }

    // 카카오 주소검색 API 모달창 닫기 메서드
    const postCodeClose=()=>{
        setPostModal(false);
    }





    // 메인모달 showIn  / showOut
    const [mainModal, setMainModal] = React.useState(true);

    // 메인모달 showIn  / showOut 메서드
    const mainModalShowIn=()=>{
        setMainModal(true);
    }

    // 자식컴폰넌트에서 클릭 닫는다.
    const mainModalShowOut=()=>{
        setMainModal(false);
    }

    // 자식컴폰넌트에서 클릭 닫는다. => 1년동안 설정 다시 안보기
    const mainModalOneYearShowOut=()=>{
        let toDay =  new Date();
        toDay.setFullYear(toDay.getFullYear()+1);
        const obj = {
            id: 202306301151, // 년월일시분
            expires: toDay.getTime()  // 1/1000초단위
        }
        localStorage.setItem('MAINMODALONEYEARCLOSE', JSON.stringify(obj));
        setMainModal(false);
    }

    // 로딩시 로컬스토레이지 데이터 중 MAINMODALONEYEARCLOSE 키를 이용 키값을 가져온다
    // 키값이 만료기한으로 남아있다면 모달창을 열지 않고 
    // 만료기한이 지났다면 모달창을 열어준다.
    React.useEffect(()=>{       
        if(localStorage.getItem('MAINMODALONEYEARCLOSE')!==null){
            let result = JSON.parse(localStorage.getItem('MAINMODALONEYEARCLOSE'));
            let toDay = new Date();
            // toDay.setFullYear(toDay.getFullYear()+1); // 2024년
            if( toDay >= result.expires ){ // 만료일 지나면 모달 열기(보이기)
                setMainModal(true);
                localStorage.removeItem('MAINMODALONEYEARCLOSE');
            }
            else{ // 만료일 이전이면 모달 닫기(숨기기)
                setMainModal(false);
            }
        }
    },[]);



    // 관리자(ADMIN) 인증 
    const [isAdmin, setAdmin] = React.useState(false);


    // 전역 키관리 상태 변수
    const [ADDMINKEY] = React.useState({       
        CARTPRODUCTKEY: 'MJ_KURLY_CART_PRODUCT',
        VIEWPRODUCTKEY: 'MJ_KURLY_VIEW_PRODUCT',
        TOPMODALKEY: 'MJ_KURLY_TOPMODAL',
        ADDRESSKEY: 'MJADDRESS',
    });
    const {CARTPRODUCTKEY,VIEWPRODUCTKEY,TOPMODALKEY,ADDRESSKEY} = ADDMINKEY;


    // 마켓컬리 주소 통합 상태관리
    // 헤더영역 배송지 등록, 장바구니 배송지 등록, 회원가입폼 주소등록
    const [addr, setAddr] = React.useState({
        주소1:'',
        주소2:'',
        isAddr: false
    });

    // 새로고침시 자동 실행 : 주소 유지실행
    const addressAuto = () => {
        if(sessionStorage.getItem(ADDRESSKEY)!==null){
            const 주소1 = JSON.parse(sessionStorage.getItem(ADDRESSKEY)).주소1;
            const 주소2 = JSON.parse(sessionStorage.getItem(ADDRESSKEY)).주소2;
            setAddr({
                ...addr,
                주소1: 주소1,
                주소2: 주소2,
                isAddr: true
            })
        }
    }

    // 로딩시 새로고침시 실행
    React.useEffect(()=>{
       addressAuto();
    },[]);
    
    // 장바구니 수량 카운트 상태변수
    const [cartCount, setCartCount] = React.useState(0);


    // 장바구니 수량 카운트 상태 변수를 전달하는 함수
    const cartCountNumber=(num)=>{
        setCartCount(num);
    }



    // 네비게이션
    const [isIntro, setIsIntro] = React.useState(true);

    // 헤더영역에서 라우터 링크이용 값을 변경한다.
    const setIsIntroFn=(z)=>{
        setIsIntro(z);
    }
    
    const [product, setPoduct] = React.useState({
        sign: false,
        getViewProduct : []
    });

    // 비구조화 === 구조분할할당
    const {getViewProduct, sign} = product;


    // 상품 클릭 이벤트 매개변수 들어옴
    const setViewProduct=(value)=>{
        let arr = [];

        if(localStorage.getItem(VIEWPRODUCTKEY)!==null){
            arr = JSON.parse(localStorage.getItem(VIEWPRODUCTKEY));
            arr = [value, ...arr]
            localStorage.setItem(VIEWPRODUCTKEY, JSON.stringify(arr) );  
            setPoduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });  
        }
        else {
            arr = [value]
            localStorage.setItem(VIEWPRODUCTKEY, JSON.stringify(arr) );
            setPoduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });
        }        
    }
   

    const [state, setState] = React.useState({
        minutes: 2,
        seconds: 59,
        setId: 0,
        msg:'',
        isEnd: false,
        // 헤더 프롭스로 전달하기
        mapText: '',
        isMap: true
    });

    const timerCounterfn=()=>{       

        let setId = 0;
        let minutes = 2;
        let seconds = 59;
        let msg = '';
        let isEnd = false;

        setId = setInterval(function(){

            seconds--;
            if(seconds<0){
                seconds=59;
                minutes--;
                if(minutes<0){
                    clearInterval(setId);
                    seconds=0;
                    minutes=0;
                    msg = '유효시간이 경과 되었습니다.'; // 모달창 메시지
                    isEnd=true;  //모달창 true
                }
            }

            setState({
               ...state,
               seconds: seconds,
               minutes: minutes,
               msg: msg,
               setId: setId,   // 환경변수 메모리의 실행중인 타이머의 할당 메모리 사용번호 인덱스를 clearInterval(2)
               isEnd: isEnd
            })

        }, 1000);
    }


    //////////////////////////////////////////////////
    // 모달 상태관리
    //////////////////////////////////////////////////
    const [modal, setModal]  =  React.useState({
        confirmMsg: '모달창에 자식창에서 보내온 타이틀 메시지내용입니다.',
        isConfirmModal: false,

        confirmMsgOkCancel: '확인 취소 컨펌모달창입니다.',
        isConfirmModalOkCancel: false,
        isConfirmModalOkCancelResult: '' 
    });
    const {confirmMsg, isConfirmModal, confirmMsgOkCancel, isConfirmModalOkCancelResult } = modal;

    // 삭제 확인, 취소 컨펌 모달창 열기 메서드
    const ConfirmModalOkCancelOpen=(msg)=>{
        setModal({
            ...modal,
            confirmMsgOkCancel: msg,
            isConfirmModalOkCancel: true
        })
    }

    // 삭제 확인, 취소 컨펌 모달창 닫기 메서드
    const ConfirmModalOkCancelClose=(value)=>{
        setModal({
            ...modal,
            isConfirmModalOkCancel: false,
            isConfirmModalOkCancelResult: value
        })
    }




    //1. 모달창 닫기 이벤트 => 모달창에 있는 버튼 클릭 이벤트 메서드(함수) 만들기
    const confirmModalClose=()=>{
        setModal({
            ...modal,
            isConfirmModal: false
        });
    }

    //2. 모달창 열기 이벤트 => 모든 자식컴폰넌트에서 모달 열기와 메시지 전달하기 메서드 만들기
    const confirmModalOpen=(msg)=>{
        setModal({
            ...modal,
            confirmMsg: msg,
            isConfirmModal: true
        });
    }


    //////////////////////////////////////////////////
    //1. 탑 모달 상태관리
    //////////////////////////////////////////////////
    const [topModal, setTopModal] = React.useState({
        key: TOPMODALKEY,
        isTopModal: true
    })

    //2. 탑 모달 닫기 함수 => 쿠키설정
    const topModalClose=(value, expires)=>{
        setTopModal({
            ...topModal,
            isTopModal: false  //모달 닫기
        });
        setCookieMethod(value, expires);
    }


    //3. 쿠키 설정(저장)하기 : 탑모달을 닫기 클릭하면  쿠키 설정 저장
    const setCookieMethod=(value, expires)=>{
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + expires ); // 3일간 열리지 않음
        document.cookie = `${topModal.key}=${value}; path=/; expires=${toDay.toUTCString()};`;       
    }

    //4. (언제)쿠키 가져오기 : 설정된 쿠키가 없으면 탑모달은 열린다. 있다면(찾았다면 Found) 닫는다.
    const getCookieMethod=()=>{
        if(document.cookie==='') return;  // 예외처리 

        try{
            const result = document.cookie.split(';');  //  ['SAD=FASD', ' SADFASD=FAS', ' SDFASDFASD=3', ' SDFAS=3']

            let cookie = [];
            result.map((item,idx)=>{
                cookie[idx] = {
                    key: item.split('=')[0].trim(),  // MJ_KURLY_TOPMODAL
                    value: item.split('=')[1].trim() // yes
                }
            });
    
            // 찾기(Found)  key: 'MJ_KURLY_TOPMODAL'
            // 모달닫기 했던 쿠키가 존재하면 
            // 모달닫기를 수행 : 새로고침 하면 또 설정 .... 설정
            cookie.map((item)=>{  
                // if(item.key===topModal.key && item.value==='yes' ){
                if(item.key.includes(topModal.key)===true && item.value.includes('yes')===true ){
                    setTopModal({
                        ...topModal,
                        isTopModal: false
                    }) 
                    // eslint-disable-next-line array-callback-return
                    return;               
                }
            })
        }
        catch(e) {
            console.log('쿠키없어요! ', e);
        }
        

    }

    // 5 
    React.useEffect(()=>{
        getCookieMethod();
    },[topModal.isTopModal]);



    return (
        <div id='wrap'>
            <GlobalContext.Provider value={{ CARTPRODUCTKEY, VIEWPRODUCTKEY, TOPMODALKEY, ADDRESSKEY, isAdmin, mainModalShowOut, mainModalOneYearShowOut, addressAuto, postCodeClose, openPopupDaumPostApi,addr, setAddr, login, setLogin, signin, setSigin }}>
                <ConfirmContext.Provider value={{ confirmMsg, confirmModalOpen, confirmModalClose, isConfirmModal, ConfirmModalOkCancelOpen, ConfirmModalOkCancelClose, confirmMsgOkCancel, isConfirmModalOkCancelResult }}>
                    <CartContext.Provider value={{ cartCountNumber, cartCount }}>
                            {
                                topModal.isTopModal && <TopModalComponent topModalClose={topModalClose}/>
                            }  
                                <BrowserRouter basename={process.env.PUBLIC_URL}>
                                    <Routes>
                                        <Route path='/' element={<HeaderComponent setIsIntroFn={setIsIntroFn} />}>
                                            <Route index element={<MainIntroComponent setViewProduct={setViewProduct} />} />
                                            <Route path='/main'    element={<MainIntroComponent setViewProduct={setViewProduct} />} />
                                            <Route path='/sub1'    element={<Sub1Component setViewProduct={setViewProduct} />} />
                                            <Route path='/sub2'    element={<Sub2Component setViewProduct={setViewProduct} />} />
                                            <Route path='/sub3'    element={<Sub3Component setViewProduct={setViewProduct} />} />
                                            <Route path='/sub4'    element={<Sub4Component setViewProduct={setViewProduct} />} />
                                            <Route path='/signup'  element={<SignUpComponent timer={state} timerCounterfn={timerCounterfn} />} />
                                            <Route path='/signin'  element={<SignInComponent />} />
                                            <Route path='/idSearch'  element={<SignInIdSearchComponent />} />
                                            <Route path='/idSearchResult'  element={<SignInIdSearchResultComponent />} />
                                            <Route path='/pwSearch'  element={<SignInPwSearchComponent />} />
                                            <Route path='/pwReset'  element={<SignInPwResetComponent />} />
                                            <Route path='/product' element={<ProductComponent />} />
                                            <Route path='/cart'    element={<CartComponent />} />
                                            <Route path='/notice'    element={<NoticeComponent />} />
                                            <Route path='/notice_write' element={<NoticeWriteFormPageComponent />} />
                                            <Route path='/notice_view'  element={<NoticeViewPageComponent />} />
                                            <Route path='/notice_update'  element={<NoticeUpdateFormPageComponent />} />                                           
                                            <Route path='/*'    element={<NotView404PageComponent />} />
                                        </Route>
                                    </Routes>
                                </BrowserRouter>
                                <FooterComponent/> 

                            {
                                modal.isConfirmModal && <ConfirmModal />
                            }
                            {
                                modal.isConfirmModalOkCancel && <ConfirmOkCancle />
                            }

                            {
                                mainModal && <MainModalComponent />
                            }

                            {
                                postModal && <PostCodeComponent />
                            }


                            <GoTopComponent />
                            <QuickMenuComponent  product={product} isIntro={isIntro} />
                            


                    </CartContext.Provider>  
                </ConfirmContext.Provider>
            </GlobalContext.Provider>

        </div>
    );
};