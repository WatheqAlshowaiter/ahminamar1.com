import React, {useState} from 'react';
import {dataBaseUrlAPI} from '../data/index';
import {funUpdateStateComments} from './functionsOfComments';
import axios from 'axios';



const CommentForm = (props) => {
    
    const baseUrlAPI=dataBaseUrlAPI();
    const MAXLENHGTHCOMMENT=500;

    //For the comment-input
    const [comment, setComment]=useState('');

    const [bgcomment, setBgComment]=useState({
        "backgroundColor": '#f8f8f8'
    });

    //To check only one comment-request  
    const [wait, setWait]=useState(false);


    const SendComment=(e)=>{
        e.preventDefault();

        //To check only one comment-request
        if(wait!==true){
            setWait(true);
            if(props.name!=='' && props.mail!=='' && comment!==""){
                const dataReq={
                    token: props.token,
                    post_id: props.id,
                    comment_on_id: props.comment_on_id,
                    name: props.name,
                    mail: props.mail,
                    comment: comment,
                    read: false,
                    countComments: props.countComments,
                    last_updated: props.lastTimeUpdated
                };
                axios.post(`${baseUrlAPI}/newcomment`, {dataReq})
                .then(res =>
                    {
                        if(res.data.comment_env && res.data.mail){

                            //Update the srore with new data
                            localStorage.setItem('name_gats', props.name);
                            localStorage.setItem('mail_gats', props.mail);
                            setComment('');

                            //Modify background color of inputs to "simple" color of inputs.
                            props.setBgName({"backgroundColor": "#f8f8f8"})
                            props.setBgMail({"backgroundColor": "#f8f8f8"})
                            setBgComment({"backgroundColor": "#f8f8f8"})

                            //Modify status to numbre 1 (success case)
                            props.setStatus(1);
                            setWait(false);

                            //To "planting" new comments are in place                            
                            props.setComments(funUpdateStateComments(props.comments, res.data.data, []));
                            
                        }else{
                            if(res.data.comment_env){
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

                
                //modify the background of inputs (name, mail, comment) to (warning) color if are empty
                if(!props.name){
                    props.setBgName({"backgroundColor": "#fff2f2"})
                }
                if(!props.mail){
                    props.setBgMail({"backgroundColor": "#fff2f2"})
                }
                if(!comment){
                    setBgComment({"backgroundColor": "#fff2f2"})
                }

            }
        }

    }

    return (
            <div style={props.styleEntryOrExit}>
                <form>
                    <input type="hidden"/>
                    <div className="comment_input-frame">
                        <input type="input" name="name" className="input comment_input" style={props.bgName} onChange={(e)=>{props.setName(e.target.value); props.setBgName({"backgroundColor": "#f8f8f8"})}} value={(props.name)?props.name:''} placeholder="الإسم"/>
                        <input type="input" name="mail" className="input comment_input" style={props.bgMail} onChange={(e)=>{props.setMail(e.target.value); props.setBgMail({"backgroundColor": "#f8f8f8"})}} value={(props.mail)?props.mail:''} placeholder="الإيميل"/>
                    </div>
                    <textarea className="textarea comment_textarea"  style={bgcomment}  onChange={(e)=>{if(e.target.value.length<=MAXLENHGTHCOMMENT){setComment(e.target.value)}; setBgComment({"backgroundColor": "#f8f8f8"})}} value={(comment)?comment:''} placeholder={props.placeholderComment}></textarea>
                    <br />
                    <p className="comment_max_length">({comment.length+'/'+MAXLENHGTHCOMMENT})</p>
                    <button className="button comment_button" onClick={SendComment}>أرسل</button>
                </form>
            </div>
                
        );
};

export default CommentForm;