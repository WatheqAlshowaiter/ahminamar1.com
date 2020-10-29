import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import {funUpdateStateComments, timeCalculator, newCommentsCaseReverse} from './functionsOfComments';
import EditCommentForm from './EditCommentForm';
import HistoryModal from './HistoryModal'

const CommentsComponent = ({id_post, token_props, setToken_props}) => {


    const [id, setId]=useState(0);
    //Comments storage
    const [comments, setComments]=useState([]);
    const [printableComments, setPrintableComments]=useState([]); //To reverse
    //background style of inputs
    const [bgName, setBgName]=useState({
        "backgroundColor": '#f8f8f8'
    });
    const [bgMail, setBgMail]=useState({
        "backgroundColor": '#f8f8f8'
    });

    //For the inputs
    const [name, setName]=useState('');
    const [mail, setMail]=useState('');
    //Status of comment-request
    const [status, setStatus]=useState(0);
    //I changed the method, at first I was going to build something like a notification system... but now it's a very simple method
    const [dateNow, setDateNow]=useState(new Date());
    const PERIODTIME=3*360000; //3*One hour
    const [dateLastComment, setDateLastComment]=useState();

    //to do: "comment order" // rank: oldest/newest (not completed yet)
    const [reverse, setReverse]=useState(false);

    const [commentOn, setCommentOn]= useState(0);
    const [editCommentId, setEditCommentId]=useState(0);

    //To update the token if it is worng
    const [tokenError, setTokenError]=useState(false);

    const [wait, setWait]=useState(false);



    const [countComments, setCountComments]= useState(0);
    const [lastTimeUpdated, setLastTimeUpdated]= useState(new Date());    


    //To use in listener to determine if the user reading the post or not 
    const [visible, setVisible]=useState(true);

    //To fetch the modified comments log
    const [idCommentHistory, setIdCommentHistory]=useState(0);

    //style of the sub comments as "respond to a comment" 
    const styleCommentOn={
        width: '90%',
        marginRight: '5%'
    }
    //style of the mains comments
    const styleCommentOnNo={
        borderRight: "4px solid #aaa"
    }

    //Entry/show style of form comment.. moments showing 
    const styleFormCommentEntry={
        animation: "AnimateFormCommentEntry 700ms"
    }
    //Exit/hid style of form comment.. moments of hiding
    const styleFormCommentExit={
        animation: "AnimateFormCommentExit 700ms"
    }

    //To arrange comments
    const styleOrderActive={
        fontWeight: 600,
        color: "#d6d"
    }
    const styleOrderNoActive={
        fontWeight: 500,
        color: "#222",
        cursor: 'pointer'
    }

    const [styleFormCommentEntryOrExit, setStyleFormCommentEntryOrExit]=useState(styleFormCommentEntry);
    const [styleEditFormCommentEntryOrExit, setStyleEditFormCommentEntryOrExit]=useState(styleFormCommentEntry);
    

    const getAllComments= useCallback(()=>{
        axios.get(`http://localhost:8001/api/post/${id_post}`)
        .then(res => 
            {    
                setComments(res.data);
            }
        );
    }, [id_post]);

    useEffect(()=>{
        if(status!==0){
            
            setTimeout(()=>{
                setStatus(0);
            }, 3000)

        }
    }, [status]);

    useEffect(()=>{
        
        if(tokenError===true){
            console.log('Token false');
        }

    },[tokenError]);

    useEffect(()=>{
        let tokenId=token_props.split("_");
        let id=tokenId[0];
        setId(+id);
    },[token_props]);

    useEffect(()=>{

        let nameStorage= localStorage.getItem('name_gats');
        let mailStorage= localStorage.getItem('mail_gats');

        setName(nameStorage);
        setMail(mailStorage);

        if(nameStorage){
            setBgName({
                "backgroundColor": "#f2fff2"
            });
        }

        if(mailStorage){
            setBgMail({
                "backgroundColor": "#f2fff2"
            });
        }        

    }, []);



    //DidMount.. to get api of comments..
    //The state:Comments change by the setState:setComments.. to do "map" for her.

    useEffect(()=>{

        getAllComments();

    }, [getAllComments]);

    //This listener to determine if the user reading the post or not.
    useEffect(()=>{
        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState==="visible") {
                setVisible(true);
            }else {
                setVisible(false);
            }
          })
    }, []);

    //To add new comments/update every 30s

    useEffect(()=>{

        const getNewComments=
            setInterval(()=>{
                const dataReq={
                    token: token_props,
                    last_updated: lastTimeUpdated,
                    read: visible
    
                };

                axios.post(`http://localhost:8001/api/getnewcommentsbypostid/${id_post}`, {dataReq})
                .then(res => 
                    {

                        //In case the numbers are not equal.. this method is not quick to implement.. but it is short.. because deletion will be rare..
                        let countResComments=(res.data.updated_new_comments)?res.data.updated_new_comments.length:0;
                        if(countResComments!==0){
                            if(res.data.count_comments!==countResComments+comments.length){
                                getAllComments();
                                setStatus(9);
                            }else if(res.data.count_comments===comments.length+res.data.updated_new_comments.length && countResComments>0){
                                //To "planting" new comments are in place
                                setComments(funUpdateStateComments(comments, res.data.updated_new_comments, []));
                            }
                        }

                    }
                );
            }, 30000);
    
        return () => clearInterval(getNewComments);

    }, [comments, id_post, token_props]);

    //to update state:lasttimeUpdate (the comments) && 
    useEffect(()=>{
        
        const statusVar=status;
        const lastTimeUpdatedVar=lastTimeUpdated;

        let letCountComments=comments.length;
        setCountComments(letCountComments);

        let convertLastTime= new Date(lastTimeUpdatedVar);

        comments.forEach((comment)=>{
            
            let newDate=new Date(comment.updated_at);
            if(newDate>convertLastTime){
                setLastTimeUpdated(comment.updated_at);
                setDateLastComment(newDate);

                if(statusVar!==1 && statusVar!==6 && statusVar!==7){
                    setStatus(5);
                }
                
            }

        });



    }, [comments]);

    useEffect(()=>{
        if(reverse===true){
            
            setPrintableComments(newCommentsCaseReverse(comments));


        }else{
            setPrintableComments(comments);
        }
    }, [comments, reverse]);

    //To update DateNow every 5min
    useEffect(()=>{

        const newDateNow=()=>{
            setTimeout(()=>{
                setDateNow(new Date());
            }, 5*60*1000);
        }

        return ()=>{clearInterval(newDateNow)}

    }, []);

    /*
        *FUNCTION:showCommentForm -> For "animation" Hide/Show the commentForm..
        *The setStat:setStyleFormCommentEntryOrExit to change style (firstly to hide/exist (styleFormCommentExit)
            and then to Entry (styleFormCommentEntry))
        *setTimeout with 600ms because style of hidden need ~600 ms
        *The seStat:setCommentOn (effet to) -> The state:commentOn and exporting (as props) to COMPONENT:CommentForm..
    */
 
    const showCommentForm=(elCommentId, styleFormCommentEntry, styleFormCommentExit)=>{

        if(elCommentId!==0){
            showEditFormComment(0, styleFormCommentEntry, styleFormCommentExit);
        }
        
        if(commentOn!==0){
            setStyleFormCommentEntryOrExit(styleFormCommentExit);            
        
            setTimeout(()=>{
                setStyleFormCommentEntryOrExit(styleFormCommentEntry);
                setCommentOn(elCommentId);
            }, 600);
        }else{
            setStyleFormCommentEntryOrExit(styleFormCommentEntry);
            setCommentOn(elCommentId);
        }


    }

    //The same thing for the update-Comment-Form
    const showEditFormComment=(elCommentId, styleFormCommentEntry, styleFormCommentExit)=>{

        if(elCommentId!==0){
            showCommentForm(0, styleFormCommentEntry, styleFormCommentExit);
        }

        if(editCommentId!==0){
            setStyleEditFormCommentEntryOrExit(styleFormCommentExit);
        
            setTimeout(()=>{
                setStyleEditFormCommentEntryOrExit(styleFormCommentEntry);
                setEditCommentId(elCommentId);

            }, 600);
        }else{
            setStyleEditFormCommentEntryOrExit(styleFormCommentEntry);
            setEditCommentId(elCommentId);
        }
        


    }

    //Delet comment by id (general id of comment)
    const deletCommentFunction=(id)=>{

        if(wait!==true){
            setWait(true);
            const dataReq={
                token: token_props,
                general_id_of_comment: id // general id
            };
            axios.post(`http://localhost:8001/api/deletecomment`, {dataReq})
            .then(res =>
                {

                    if(res.data.status_delete){
                        setComments(funUpdateStateComments(comments, [], res.data.comments_delete));
                        setStatus(7);
                    }else{
                        setStatus(8);
                    }

                    setWait(false);
                }
            );
        }

    }

    //Regle the overflow.
	useEffect(()=>{
        if(idCommentHistory===0){
            document.body.style.overflow="";
        }

    }, [idCommentHistory]);

    //ِClose Modal comment history : HistoryModal
    const handleCloseModal=()=>{
        setIdCommentHistory(0);
    }

    return (
        <div>
                        
            <div className="main_blog_container main_blog_container_for-show-post">

                <div className="main_blog_container_prime frame_post_blog comment-part">
                    
                    <h3>{(comments.length>0)?'أضف تعليقك وأثري النقاش':'كن أول المعلقين! وأثري النقاش'}</h3>
                    
                    <CommentForm token={token_props} lastTimeUpdated={lastTimeUpdated} countComments={countComments} setTokenError={setTokenError} comments={comments} setComments={setComments} styleEntryOrExit={styleFormCommentEntry} id={id_post} comment_on_id='0' setName={setName} setMail={setMail} name={name} mail={mail} setStatus={setStatus} bgName={bgName} bgMail={bgMail} setBgName={setBgName} setBgMail={setBgMail} placeholderComment="شاركنا رأيك"/>
                

                    {/*---Display all comments of this post---*/}
                    <div className="comment_frame">
                        <div className="comment_frame_ul_b">
                        <div className="comment_numbres">
                            <span>التعليقات ({countComments})</span>
                            {((dateNow-dateLastComment)<PERIODTIME)?<span className="comment_frame_countNewComments">جديد</span>:''}
                        </div>
                        
                        <div className="comment_order">
                                <p>الترتيب :</p>
                                <button className="noButtonStyle" onClick={()=>{setReverse(true)}} style={(reverse===true)?styleOrderActive:styleOrderNoActive}>الأحدث</button>
                                <button className="noButtonStyle" onClick={()=>{setReverse(false)}} style={(reverse===false)?styleOrderActive:styleOrderNoActive}>الأقدم</button>
                            </div>                           
                        </div>
                        <ul className="comment_frame_ul">

                            {
                                printableComments.map(el=>{
                                    let date=new Date(el.updated_at);
                                    return(
                                        <li className="comment_element animateEntry" style={(el.comment_id!==el.comment_on)?styleCommentOn:styleCommentOnNo} key={el.comment_id}>
                                            {/* Get old comments / Comments before modification */} 
                                            {(el.modified!==0)?
                                            <button onClick={()=>{setIdCommentHistory(el.id)}} className="comment_element_i comment_element_history-comment noButtonStyle">
                                                <i className="fas fa-history"/>
                                            </button>
                                            :''}
                                            {/* Date publish/modify */}
                                            <span className="comment_element_i comment_element_date">
                                                <i className="fas fa-clock" />
                                                <span>
                                                    {(el.modified===0)?'أضيف منذ':'عُدِّلَ منذ:'} {timeCalculator(dateNow, el.updated_at)}
                                                </span>               
                                            </span>
                                            {/* if add or modify post ago before less than PERIODTIME*/}
                                            {(dateNow-date<PERIODTIME)?<span className="comment_element_new-comment">جديد</span>:''}
                                            
                                            <b>{el.name}</b>
                                            
                                            {(editCommentId===el.id)
                                            ?<EditCommentForm originalComment={el.comment} comment_id={el.id} token={token_props} setTokenError={setTokenError} comments={comments} setComments={setComments} showEditFormComment={showEditFormComment} setStatus={setStatus} styleEntryOrExit={styleEditFormCommentEntryOrExit} styleFormCommentEntry={styleFormCommentEntry} styleFormCommentExit={styleFormCommentExit} placeholderComment="أكتب التعديل المراد"/>
                                            :<p>{el.comment}</p>}
                                            

                                            <div className="comment_element_more">
                                                {(el.comment_id===el.comment_on)?<button onClick={()=>{showCommentForm(el.comment_id, styleFormCommentEntry, styleFormCommentExit)}} className="noButtonStyle comment_element_more_add-edit-delete">إضافة رد</button>:''}
                                                {(el.token_id===id)?<button className="noButtonStyle comment_element_more_add-edit-delete" onClick={()=>{showEditFormComment(el.id, styleFormCommentEntry, styleFormCommentExit)}}>تعديل</button>:''}
                                                {(el.token_id===id)?<button className="noButtonStyle comment_element_more_add-edit-delete" onClick={()=>{deletCommentFunction(el.id)}}>حذف</button>:''}
                                            </div>
                                            {(el.comment_id===commentOn)?
                                            <CommentForm token={token_props} lastTimeUpdated={lastTimeUpdated} countComments={countComments} setTokenError={setTokenError} comments={comments} setComments={setComments} styleEntryOrExit={styleFormCommentEntryOrExit} id={id_post} comment_on_id={el.comment_id} setName={setName} setMail={setMail} name={name} mail={mail} setStatus={setStatus} bgName={bgName} bgMail={bgMail} setBgName={setBgName} setBgMail={setBgMail} placeholderComment="أضف رداً"/> 
                                            :''}
                                        </li>
                                    );       
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>

            {(idCommentHistory>0)?<HistoryModal generalIdComment={idCommentHistory} handleCloseModal={handleCloseModal}/>:''}

            {/* View message by status */}
            {(status===1)?
            <p className="env env_success">لقد تمت إضافة تعليقك</p>
            :(status===2)?
            <p className="env env_fail">لقد فشل الإرسال <br/> إملئ جميع الخانات</p>
            :(status===3)?
            <p className="env env_fail">لقد فشل الإرسال <br/> أعد المحاولة لاحقا</p>
            :(status===4)?
            <p className="env env_yellow">لقد نجح الإرسال، لكن <br /> الإيميل غير صحيح</p>
            :(status===5)?
            <p className="env env_blue">هناك تعليقات جديدة</p>
            :(status===6)?
            <p className="env env_success">نجح تعديل التعليق</p>
            :(status===7)?
            <p className="env env_success">لقد نجح حذف التعليق</p>
            :(status===8)?
            <p className="env env_fail">لقد فشلت عملية الحذف</p>
            :(status===9)?
            <p className="env env_blue">لقد تمت عملية تحديث التعليقات <br/> بسبب حذف بعضها</p>
            :''}



        </div>
    );  
};

export default CommentsComponent;