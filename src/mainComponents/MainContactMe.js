import React, {useState, useEffect} from 'react';
import {dataBaseUrlAPI} from '../data/index'
import axios from 'axios';

const MainContactMe = (props) => {

    const baseUrlAPI=dataBaseUrlAPI();

    const [name, setName]=useState('');
    const [mail, setMail]=useState('');
    const [msg, setMsg]=useState('');
    const [status, setStatus]=useState(0);

    const [bgName, setBgName]=useState({
        "backgroundColor": '#f8f8f8'
    });
    const [bgMail, setBgMail]=useState({
        "backgroundColor": '#f8f8f8'
    });
    const [bgMsg, setBgMsg]=useState({
        "backgroundColor": '#f8f8f8'
    });


    const SendMsg=(e)=>{
        e.preventDefault();
        if(name!=='' && mail!=='' && msg!==""){
            const dataReq={
                token: props.token,
                name: name,
                mail: mail,
                message: msg
            };
            axios.post(`${baseUrlAPI}/newmessage`, {dataReq})
            .then(res => 
                {
                    if(res.data.msg_env && res.data.mail){
                        localStorage.setItem('name_gats', name);
                        localStorage.setItem('mail_gats', mail);
                        setMsg('');
                        setName('');
                        setMail('');

                        setBgName({"backgroundColor": "#f8f8f8"})
                        setBgMail({"backgroundColor": "#f8f8f8"})
                        setBgMsg({"backgroundColor": "#f8f8f8"})

                        setStatus(1);

                    }else{
                        if(res.data.msg_env){
                            setStatus(4);
                        }else{
                            setStatus(3);
                        }
                    }
                }
        
            );


        }else{
            setStatus(2);

            if(!name){
                setBgName({"backgroundColor": "#fff2f2"})
            }
            if(!mail){
                setBgMail({"backgroundColor": "#fff2f2"})
            }
            if(!msg){
                setBgMsg({"backgroundColor": "#fff2f2"})
            }

        }


    }

    useEffect(()=>{
        if(status!==0){
            
            setTimeout(()=>{
                setStatus(0);
            }, 3000)

        }
    }, [status])

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


    return (
        <main>
            <div className="main_global_container_grid main_global_container_grid_aboutme_and_contact">
                <div className="contact_container">
                    <div className="contact_container_para">
                        <p>مرحباً أيها الزائر الكريم، قم بمراسلتي على الإيميل الشخصي التالي: </p>
                        <p>AhminaMar1@gmail.com</p>
                    </div>
                    <div className="contact_container_para">
                        <p>أو عبر ملئ الخانات التالية: (جميع الخانات ضرورية)</p>
                    </div>
                    <div className="contact_container_forcenter">
                        <form>
                            <input type="input" name="name" className="input contact_input" style={bgName} onChange={(e)=>{setName(e.target.value); setBgName({"backgroundColor": "#f8f8f8"})}} value={(name)?name:''} placeholder="الإسم الكامل*"></input>
                            <input type="input" name="mail" className="input contact_input" style={bgMail} onChange={(e)=>{setMail(e.target.value); setBgMail({"backgroundColor": "#f8f8f8"})}} value={(mail)?mail:''}  placeholder="الإميل*"></input>
                            <textarea className="textarea contact_textarea" style={bgMsg}  onChange={(e)=>{setMsg(e.target.value); setBgMsg({"backgroundColor": "#f8f8f8"})}} value={(msg)?msg:''} placeholder="نص الرسالة"></textarea>
                            <button onClick={SendMsg} className="button contact_button">أرسل</button>
                        </form>
                    </div>
                </div>
            </div>
            {(status===1)?
            <p className="env env_success">لقد نجح إرسال الرسالة</p>
            :(status===2)?
            <p className="env env_fail">لقد فشل الإرسال <br/> إملئ جميع الخانات</p>
            :(status===3)?
            <p className="env env_fail">لقد فشل الإرسال <br/> أعد المحاولة لاحقا</p>
            :(status===4)?
            <p className="env env_fail">لقد فشل الإرسال <br /> الإيميل غير صحيح</p>
            :''}
            
            

	    </main>
    );  
};

export default MainContactMe;