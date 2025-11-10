import React from 'react';
import './scss/section3.scss';
import Section3SlideComponent from './Section3SlideComponent';
import axios from 'axios';



export default function Section3Component ({setViewProduct}) {

        // 1.
        const [state, setState] = React.useState({
            상품: [],
            n: 0
        });


        // 2. 
        React.useEffect(()=>{

            axios({
                url:'./data/intro_page/section3.json',
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
        <section id="section3">

            <Section3SlideComponent 상품={state.상품} n={state.n}  setViewProduct={setViewProduct}/>

        </section>
    );
};