import React, {useState, useEffect} from 'react';
import {dataBaseUrlAPI} from '../data/index';
import {funUpdateStateComments} from './functionsOfComments';
import axios from 'axios';



const EditCommentForm = (props) => {

    const baseUrlAPI=dataBaseUrlAPI();
    const MAXLENHGTHCOMMENT=500;

    //For the comment-input
    const [comment, setComment]=useState('');

    const [bgcomment, setBgComment]=useState({
        "backgroundColor": '#f8f8f8'
    });

    //To check only one comment-request  
    const [wait, setWait]=useState(false);


    const editComment=(e)=>{
        e.preventDefault();

        //To check only one comment-request
        if(wait!==true){
            setWait(true);
            if(comment!==""){
                const dataReq={
                    token: props.token,
                    general_id_of_comment: props.comment_id,
                    comment: comment
                };
                axios.post(`${baseUrlAPI}/editcomment`, {dataReq})
                .then(res =>
                    {
                        if(res.data.comment_edit){

                            setComment('');

                            setBgComment({"backgroundColor": "#f8f8f8"})

                            //Modify status to numbre 1 (success case)
                            props.setStatus(6);
                            setWait(false);

                            props.setComments((funUpdateStateComments(props.comments, res.data.data, [])));
                            props.showEditFormComment(0, props.styleFormCommentEntry, props.styleFormCommentExit);

                        }else{
                            if(res.data.comment_edit){
                                props.setStatus(4);
                            }else{
                                props.setStatus(3);
                                if(res.data.token_error){
                                    props.setTokenError(true);
                                }
                                
                            }
                            setWait(false);

                        }
                    }
            
                );


            }else{
                props.setStatus(2);
                setWait(false);

                
                //modify the background of comment input to (warning) color if are empty
                if(!comment){
                    setBgComment({"backgroundColor": "#fff2f2"})
                }

            }
        }

    }

    useEffect(()=>{
        setComment(props.originalComment);
    }, [props.originalComment]);

    return (
            <div style={props.styleEntryOrExit}>
                <form>
                    <textarea className="textarea comment_textarea"  style={bgcomment}  onChange={(e)=>{if(e.target.value.length<=MAXLENHGTHCOMMENT){setComment(e.target.value)}; setBgComment({"backgroundColor": "#f8f8f8"})}} value={(comment)?comment:''} placeholder={props.placeholderComment}></textarea>
                    <br />
                    <p className="comment_max_length">({comment.length+'/'+MAXLENHGTHCOMMENT})</p>
                    <button className="button comment_button" onClick={editComment}>تعديل</button>
                </form>
            </div>
                
        );
};

export default EditCommentForm;