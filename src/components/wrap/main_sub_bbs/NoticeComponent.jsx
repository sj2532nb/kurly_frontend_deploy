import React from 'react';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import NoticeRightListComponent from './NoticeComponent/NoticeRightListComponent';
import './notice_scss/notice.scss';
import {GlobalContext} from '../../../context/GlobalContext';
import axios from 'axios';
import { ConfirmContext } from '../../../context/ConfirmContext';

export default function NoticeComponent() {
   
    // 관리자 로그인 하면 글쓰기 가능
    const {isAdmin} = React.useContext(GlobalContext);
    const {confirmModalOpen} = React.useContext(ConfirmContext);


    const onClickWrite=(e)=>{
        isAdmin?(window.location.pathname = '/notice_write'):(confirmModalOpen('관리자 로그인 해주세요'));
    }

    const [notice, setNotice] = React.useState([]);

    React.useEffect(()=>{

        axios({
            // url:'./data/notice_page/board.json',
            //http://localhost:8080/bbs/bbsNoticeJSON.jsp
            url:'/bbs/bbsNoticeJSON.jsp',
            method:'GET'
        })
        .then((res)=>{

            if(res.status===200){
                if(res.data!==''){
                    setNotice(res.data.공지사항);  
                }
            }
           
            
        })
        .catch((err)=>{
            console.log( err );
        });

    },[]);    

    return (
        <div id='notice'>
            <div id="container">
                <NoticeLeftNavComponent/>
                <NoticeRightListComponent notice={notice}/>
                


                    <div className="button-box">
                        <button onClick={onClickWrite}>글쓰기</button>
                    </div>

            </div>
        </div>
    );
};