import React from 'react';
import {useNavigate} from 'react-router-dom';


export default function Section7SlideComponent ({상품, n, setViewProduct}) {
    const navigate = useNavigate();
    const slideWrap     = React.useRef();
    const [cnt, setCnt] = React.useState(0);
  

    React.useEffect(()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.left = `${-100*cnt}%`;
        if(cnt>(n/4-2)){
            setCnt(n/4-2);
            slideWrap.current.style.left = `${-100*(n/4-2)}%`;
        }

        if(cnt<0){
            setCnt(0);
            slideWrap.current.style.left = `0%`;
        }
    },[cnt, n]);

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }   
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }





    // 판매가격, 정가 콤머형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        }        
    }


    const onClickProductList=(e, item)=>{
        e.preventDefault();
        let obj = {            
            제품코드: item.제품코드,
            보관방법: item.보관방법,
            이미지: `${process.env.PUBLIC_URL}/images/intro/${item.이미지}`,
            배송구분: item.배송구분,
            제조사: item.제조사,
            제품명: item.제품명,
            제품특성: item.제품특성,
            정가: item.정가,
            할인율: item.할인율,
            판매처: item.판매처,            
            저장일시: new Date().getTime()
        }
        setViewProduct(obj);  // 최상위 컴포넌트에게 전달
        // window.location.pathname = '/product';
        navigate('/product');
    }




    return (
        <>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>이 상품 어때요?</h2>
                    </div>
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul ref={slideWrap} className="slide-wrap">
                                    
                                    {                    
                                        상품.map((item, idx)=>{
                                            return(
                                                <li className="slide slide0" key={idx}>
                                                    <div className="col-gap">
                                                        <a href="!#" onClick={(e)=>onClickProductList(e,item)}>
                                                            <div className="img-box">
                                                                <img src={`./images/intro/${item.이미지}`} alt="" />
                                                                <span>
                                                                    <img src="./images/sub1/icon_cart.svg" alt="" />
                                                                </span>
                                                            </div>
                                                            <div className="tex-box">
                                                                <ul>                                                        
                                                                    <li>{item.배송구분}</li>
                                                                    <li><strong>{item.제조사===""?``:`[${item.제조사}]`}</strong> <em>{item.제품명}</em></li>
                                                                    <li>{}</li>
                                                                    <li><span className='rate-price'>{item.할인율===0?``:`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-item.할인율))}</span>) }</li>
                                                                    <li>{ item.할인율===0? <span className='panme-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                                                    <li>{ item.판매처 }</li>
                                                                </ul> 
                                                            </div>
                                                        </a>
                                                    </div>
                                                </li>
                                            )
                                        })

                                    }
                                    
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a onClick={onClickPrev} href="!#" className='left-arrorw-btn'><img src="./images/intro/icon_left_arrow_white.svg" alt="" /></a>
            <a onClick={onClickNext} href="!#" className='right-arrorw-btn'><img src="./images/intro/icon_left_arrow_white.svg" alt="" /></a>
        </>


    );
};

 