import React from 'react';
import './scss/section7.scss';
import Section7SlideComponent from './Section7SlideComponent';
import axios from 'axios';



export default function Section7Component ({setViewProduct}) {

        // 1. state 상태관리 변수 지정
        // 2. AXIOS 외부데이터 상품 가져오기 그리고 상태관리 배열 변수, 상품개수 n 에 데이터 저장하기
        // 3. React.useEffect() 상품개수 등록되면 즉시 슬라이드 전체너비 설정하기
        // 4. 상태변수 데이터를 자식컴포넌트에게 내려준다
        // 5. 자식컴포넌트는 비구조화로 받아서 탬플릿 요소에 반복처리 바인딩한다.

        // 1.
        const [state, setState] = React.useState({
            상품: [],
            n: 0
        });


        // 2. 
        React.useEffect(()=>{

            axios({
                url:'./data/intro_page/section7.json',
                method:'GET'
            })
            .then((res)=>{
                if(res.status===200){
                    setState({
                        ...state,
                        상품: res.data.상품,
                        n:    res.data.상품.length
                    });
                }
            })
            .catch((err)=>{
                console.log( `AXIOS 실패! ${err}` );
            });


        }, []);


    return (
        <section id="section7">

            <Section7SlideComponent 상품={state.상품} n={state.n} setViewProduct={setViewProduct} />

        </section>
    );
};