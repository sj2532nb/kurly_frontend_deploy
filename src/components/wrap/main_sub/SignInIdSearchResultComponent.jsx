import React from 'react';
import '../scss/signin_id_result.scss';
import {useSearchParams, useLocation} from 'react-router-dom';
import {GlobalContext} from '../../../context/GlobalContext';
export default function SignInIdSearchResultComponent () {


    // 상태관리, 로컬스토레이지 구현
    const {login, setLogin} = React.useContext(GlobalContext);

    // 로컬스토레이지 구현
    // React.useEffect(()=>{
    //     if(localStorage.getItem('searchId')!==null){
    //         console.log(  JSON.parse(localStorage.getItem('searchId')).아이디 )
    //         setLogin({
    //             ...login,
    //             아이디: JSON.parse(localStorage.getItem('searchId')).아이디,
    //             가입일: JSON.parse(localStorage.getItem('searchId')).가입일
    //         })
    //     }
    // },[])
    // 라우터 네비게이션() 파라미터 이용방법으로 구현
    const location = useLocation();  

    React.useEffect(()=>{
            console.log( location.state.아이디 );
            console.log( location.state.가입일 );
            setLogin({
                ...login,
                아이디: location.state.아이디,
                가입일: location.state.가입일
            })

            // setLogin({
            //     ...login,
            //     아이디: param.get('아이디'),
            //     가입일: param.get('가입일')
            // })
    },[]);

  
    const onClickPwSearch=(e)=>{
        e.preventDefault();
        window.location.pathname = '/pwSearch';
    }

    const onClickLogin=(e)=>{
        e.preventDefault();
        window.location.pathname = '/signin';
    }
   

    return (
        <main id='signInIdResult'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>고객님의 컬리 계정을 찾았습니다.</h2>
                        <p>아이디 확인 후 로그인 해주세요.</p>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li>
                                    <span><img src="./images/sigin_in/icon_id_search_result.svg" alt="" /></span>
                                    <span>
                                        <strong>{login.아이디}</strong>
                                        {/* <em>{login.가입일}</em> */}
                                    </span>
                                </li>
                                <li></li>
                                <li><button onClick={onClickPwSearch}>비밀번호찾기</button></li>
                                <li><button onClick={onClickLogin}>로그인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};