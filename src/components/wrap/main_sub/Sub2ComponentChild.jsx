import React from 'react';
import {useNavigate}  from 'react-router-dom';

export default function Sub2ComponentChild ({베스트, setViewProduct}) {

    const navigate = useNavigate();

    // 정가, 판매가 금액에 콤머 형식 정규표현식 구현하기
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;  // (그룹1)(그룹2)
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        }
        
    }

    const onClickProductList=(e, item)=>{
        e.preventDefault();
        let obj = {            
            제품코드: item.제품코드,
            보관방법: item.보관방법,
            이미지: `${process.env.PUBLIC_URL}/images/sub1/${item.이미지}`,
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



    return(
        <ul>
           {
                베스트.map((item, idx)=>{
                    return(
                        <li key={idx}>
                            <a href="!#"  onClick={(e)=>onClickProductList(e, item)}>
                                <div className="img-box">
                                    <img src={`./images/sub1/${item.이미지}`} alt="" />
                                    <span>
                                        <img src="./images/sub1/icon_cart.svg" alt="" />
                                    </span>
                                </div>
                                <div className="tit-box">
                                    <ul>
                                        <li>{item.배송구분}</li>
                                        <li><strong>{item.제조사===""?``:`[${item.제조사}]`}</strong> <em>{item.제품명}</em></li>
                                        <li>{item.제품특성}</li>
                                        <li><span className='rate-price'>{item.할인율===0?``:`${Math.round(item.할인율*100)}%`}</span>{item.할인율 > 0 && (<span className='panme-price'>{commaPrice(item.정가*(1-item.할인율))}</span>) }</li>
                                        <li>{ item.할인율===0? <span className='panme-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                        <li>{item.판매처}</li>
                                    </ul>    
                                </div>
                            </a>
                        </li> 
                    )
                })
           }
        </ul>
    )


};
