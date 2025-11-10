import React from 'react';
import './scss/section1_slide.scss';


export default function Section1SlideComponent({슬라이드, n}) {
    
    const slideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(0);
    const [isArrow, setIsArrow] = React.useState(false);

    React.useEffect(()=>{  
        slideWrap.current.style.width = `${100*(n+2)}%`;  // 100*20 = 2,000%
    },[슬라이드, n]);

    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.left = `${-(100*cnt)}%`;  
        returnSlide();
    }

    const returnSlide=()=>{        
        if(cnt>n){  // 처음슬라이드로 리턴
            setToggle(1);
            setCnt(1);
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.left = `0%`;
        }
        if(cnt<0){ // 마지막 슬라이드로 리턴
            setToggle(1);
            setCnt(n-1);
            slideWrap.current.style.transition = `none`;
            slideWrap.current.style.left = `${-100*n}%`;
        }  
    }


    React.useEffect(()=>{
        if(toggle===0){           
            mainSlide();
        }
        else{
            setToggle(0); // 리턴 초기화
            setTimeout(()=>{ // 타이머 동작시 비동기식 처리 시간차이를 주어 디버깅
                mainSlide(); 
            },100);
        }
    },[cnt]);


    // 자동 타이머
    React.useEffect(()=>{
        if(isArrow===false){
            let id=0;
            id = setInterval(()=>{
                setCnt(cnt=>cnt+1);
            },4000);
            return () => clearInterval(id);    
        }
    },[isArrow]);  

    // 다음슬라이드 클릭이벤트
    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    // 이전슬라이드 클릭이벤트
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 슬라이드 클릭시 새로고침 발생 방지
    const onClickSlideEvent=(e, idx, src)=>{
        e.preventDefault();    
    }

    // 슬라이드 오버시 타이머 중지 하기 위해 true
    const onMouseEnterContainer=(e)=>{
        e.preventDefault();
        setIsArrow(true);
    }

    // 슬라이드 오버시 타이머 중지 하기 위해 false
    const onMouseLeaveContainer=(e)=>{
        e.preventDefault();
        setIsArrow(false);
    }

    return (
        <div className="slide-container" onMouseEnter={onMouseEnterContainer} onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">
                <ul ref={slideWrap}  className="slide-wrap">


                {
                    슬라이드.map((item,idx)=>{
                        return(
                            <li className="slide" key={idx}><a href="!#" onClick={(e)=>onClickSlideEvent(e, idx, item.src )}><img src={item.src} alt="" /></a></li>
                        )
                    })

                }
                    

                </ul>
            </div>
            {
                isArrow && (
                    // && isArrow가 true면 밑에를 실행하라
                <>
                    <a href="!#" onClick={onClickPrev} className='left-arrorw-btn'><img src="./images/intro/icon_right_arrow_gray.svg" alt="" /></a>
                    <a href="!#" onClick={onClickNext} className='right-arrorw-btn'><img src="./images/intro/icon_right_arrow_gray.svg" alt="" /></a>
                </>)
            }

            
            <span className='page-count-box'>
            <em className='current-number'>{cnt+1>n?1:cnt+1}</em>
            <i>/</i>     
            <em className='total-number'>{n}</em>
            </span>

        </div>
    );
};

