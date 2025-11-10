import React from 'react';
import {useNavigate}  from 'react-router-dom';

export default function Sub1ComponentChild ({신상품, setViewProduct}) {

    const navigate = useNavigate();

    // 정가, 판매가 금액에 콤머 형식 정규표현식 구현하기
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


    ///////////////////////////////////////////////////////
    const [list] = React.useState(9);  // 한화면에 보여질 목록개수
    const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
    const [groupPage] = React.useState(3); // 페이지번호 그룹1(1(1~5) 그룹2(6!~10) 그룹3(11~15) 그룹4(16~20))
    const [cnt, setCnt] = React.useState(1); // 페이지번호 그룹 1

    const [startNum, setStartNum] = React.useState(); // 그룹 시작 번호
    const [endtNum, setEndtNum] = React.useState();  // 그룹 끝 번호

    //  페이지번호 클릭 이벤트
    const onClickPageNum=(e, num)=>{
        e.preventDefault();
        setPageNumber(num);
    }

    // 그룹페이지 클릭  다음카운트 이벤트
    const onClickNextGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    // 그룹페이지 클릭  이전카운트 이벤트
    const onClickPrevGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 그룹 시작번호 설정 => cnt 또는 groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(()=>{
        setStartNum( (cnt-1)*groupPage );
    },[cnt, groupPage]);

    // 그룹 끝번호 설정
    React.useEffect(()=>{
        setEndtNum( startNum + groupPage );
    },[startNum, groupPage]);
    
    // 그룹 시작페이지 설정 => 그룹페이지 이동시 그룹의 첫페이지 설정
    React.useEffect(()=>{
        setPageNumber(startNum+1);
    },[endtNum, startNum]);






    return (
        <>
            <ul>
                {
                    신상품.map((item, idx)=>{
                        if( Math.ceil((idx+1)/list) === pageNumber ){ // 클릭번튼 번호 전달 1(100~86) 2(85~70) 3 4 5 6 7
                            return(
                                <li key={idx} data-key={item.제품코드}>
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
                                                <li><span className='rate-price'>{item.할인율===0?``:`${Math.round(item.할인율*100)}%`}</span> {item.할인율 > 0 && (<span className='panme-price'>{commaPrice(Math.round(item.정가*(1-item.할인율)))}</span>) }</li>
                                                <li>{ item.할인율===0? <span className='panme-price'>{commaPrice(item.정가)}</span> : <s>{commaPrice(item.정가)}</s> }</li>
                                                <li>{item.판매처}</li>
                                            </ul>    
                                        </div>
                                    </a>
                                </li> 
                            )
                        }
                    })
                }
            </ul> 
            
            <div className="page-button-box">

                { cnt > 1 && <a  href="!#"  className="prev-btn" onClick={onClickPrevGroup}>&lt;</a> }
                {
                (()=>{
                        let arr = [];  // 페이지번호와 a 태그 모두 저장된 배열변수
                        for(let i=startNum; i<endtNum; i++){                                    
                            if(i<Math.ceil(신상품.length/list)){ // 100/6
                                arr = [...arr,  <a key={i} data-key={i+1} className={pageNumber===(i+1)?'on':null}  href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> ]
                                // arr.push( <a href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> );
                            }
                        }
                        return  arr                                                                      
                })() 
                }                         
                {cnt < Math.ceil(신상품.length/list/groupPage) && <a href="!#" className="next-btn"  onClick={onClickNextGroup}>&gt;</a>}

            </div>   
        </>
    );
};