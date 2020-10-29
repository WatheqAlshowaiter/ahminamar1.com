import React, {useState, useEffect} from 'react';
import {dataBaseUrlAPI} from '../data/index'
import {timeCalculator} from './functionsOfComments';
import axios from 'axios';


const HistoryModal = ({generalIdComment, handleCloseModal}) => {
	document.body.style.overflow = "hidden";
	
	const baseUrlAPI=dataBaseUrlAPI();
	const [historyComments, setHistoryComments]=useState([]);
	const [lastComment, setLastComment]=useState([]);
	const [msg, setMsg]=useState('');

	useEffect(()=>{
		const keyboradEventListener = (e) =>{
			if(e.key==='Escape'){
				handleCloseModal();	
			}
		}

		window.addEventListener('keydown', keyboradEventListener);

		return () => {
			window.removeEventListener('keydown', keyboradEventListener);
		};

	},[handleCloseModal]);

	useEffect(()=>{
        let mounted=true;
		
		axios.get(`${baseUrlAPI}/historycomments/${generalIdComment}`)
		.then(res =>{
			if(mounted){
				if(res.data.status){

					if(res.data.delete===true){
						setMsg('هذا التعليق محذوف كلياً');
					}else{
						setHistoryComments(res.data.list_history_comments);
						setLastComment(res.data.last_comment);
					}
				
				}else{
						setMsg('لا يوجد هذا الطلب');
				}
			}
		});



        return () => mounted = false;

	}, [baseUrlAPI, generalIdComment]);

	return (
		<div className="zoom_modal" id="zoom_modal">
			
			<button className="close_zoom_modal" id="close_zoom_modal" onClick={handleCloseModal}>×</button>
			
			<div className="history_modal_content">
				{(historyComments.length>0)?
				<div className="history_modal_content_comments">
					<ul>
						<h2>التعليقات المؤرشفة</h2>

						<li className="border-bottom"></li>
						{historyComments.map((element, key)=>{
							return <li className="history_modal_content_comments_item" key={key}>
									<p>
										<span className="history_modal_name">{lastComment.name}</span>
										<span className="history_modal_date">
											منذ: {timeCalculator('', element.updated_at)}
											<span>{element.updated_at}</span>	
										</span>									</p>
									<p className="history_modal_text">{element.old_comment}</p>
								</li>
						
						})}
								<li className="history_modal_content_comments_item" key="last">
									<p>
										<span className="history_modal_name">{lastComment.name}</span>
										<span className="history_modal_date">
											منذ: {timeCalculator('', lastComment.date)}
											<span>{lastComment.date}</span>	
										</span>
										
									</p>
									<p className="history_modal_text">{lastComment.comment}</p>
								</li>
					</ul>
				</div>
				:(msg)?<h2>{msg}</h2>:<div className="history_modal_loading"><i className="fas fa-spinner"/></div>}
			</div>
		
		</div>
	);
};

export default HistoryModal;