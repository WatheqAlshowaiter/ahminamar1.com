import React, {useEffect} from 'react';
import {dataBaseUrlAPI} from '../data/index'
import axios from 'axios';

const RepairTokenAndCrawl = ({setToken, post_id, page_name}) => {
    const baseUrlAPI=dataBaseUrlAPI();

    useEffect(()=>{
        let mounted=true;
        let token=localStorage.getItem('token_gats');

        const dataReq={
            token: token,
            post_id: post_id,
            page_name: page_name

        }
        //new craw and verify the token, and if it is not correct, change it.
        axios.post(`${baseUrlAPI}/newcrawl`, {dataReq})
        .then(res => {
            if(mounted){

                if(token!==res.data.token){
                    localStorage.setItem('token_gats', res.data.token);
                    if(setToken!==false){
                        setToken(res.data.token);
                    }
                
                }else{
                    if(setToken!==false){
                        setToken(token);
                    }
                    
                }
            }

        });
        return () => mounted = false;


    },[setToken, post_id, page_name, baseUrlAPI]); //Safer.. To avoid react-hooks/exhaustive-deps warn

    return (<div></div>);
};

export default RepairTokenAndCrawl;