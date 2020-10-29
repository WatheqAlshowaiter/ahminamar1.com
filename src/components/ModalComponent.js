import React, {useState, useEffect, useRef, useCallback } from 'react';
import RepairTokenAndCrawl from '../mainComponents/RepairTokenAndCrawl';

const ModalComponent = ({data, handleCloseModal}) => {
	document.body.style.overflow = "hidden"

	const scrollRef=useRef();
	const [iPic, setIPic]= useState(0);
	const [scrollValue, setScrollValue]= useState(0);
	const [maxScroll, setMaxScroll]=useState(0);

	const pics=data[2];
	const lengthPics=pics.length;
	
	const constValueScroll=50;

	const changeScroll= useCallback((scrollValue, constValueScroll)=>{
		let newScrollValue=scrollValue+constValueScroll;
		newScrollValue=(newScrollValue<=0)?0:newScrollValue;
		newScrollValue=(newScrollValue>=maxScroll)?maxScroll:newScrollValue;
		setScrollValue(newScrollValue);
		scrollRef.current.scrollTo(0, newScrollValue);

	}, [maxScroll]);

	const closeZoomModal = useCallback(()=>{
		
		handleCloseModal();
		
	}, [handleCloseModal]);

	const handleNextImg=(iPic, lengthPics)=>{
		setIPic(((iPic+1)%lengthPics));
	}

	const handlePrevImg=(iPic, lengthPics)=>{
		(iPic===0)?setIPic(lengthPics-1):setIPic((((iPic-1)%lengthPics)));
	}

	const resizeListener=()=>{


		let H= scrollRef.current.clientHeight;
		let maxH= scrollRef.current.scrollHeight;

		let maxScroll=maxH-H;
		setMaxScroll(maxScroll);
		setScrollValue(0);
		scrollRef.current.scrollTo(0, 0);


	}

	useEffect(()=>{

		window.addEventListener("resize", resizeListener);
		
		return () => {
			window.removeEventListener('resize', resizeListener);
		};		
	});


	useEffect(()=>{

		resizeListener();
		
	},[iPic]);

	useEffect(()=>{
		const keyboradEventListener = (e) =>{
			if(e.key==='ArrowRight'){
				handleNextImg(iPic, lengthPics);
				scrollRef.current.scrollTo(0, 0);
				setScrollValue(0);
			}else if(e.key==='ArrowLeft'){
				handlePrevImg(iPic, lengthPics);
				scrollRef.current.scrollTo(0, 0);
				setScrollValue(0);
			}else if(e.key==='ArrowUp'){
	
				changeScroll(scrollValue, -constValueScroll);
				
			}else if(e.key==='ArrowDown'){
	
				changeScroll(scrollValue, constValueScroll);
				
			}else if(e.key==='Escape'){

				closeZoomModal();
				
			}
		}

		window.addEventListener('keydown', keyboradEventListener);

		return () => {
			window.removeEventListener('keydown', keyboradEventListener);
		};

	},[iPic, scrollValue, lengthPics, changeScroll, closeZoomModal]);
	return (
		<div className="zoom_modal" id="zoom_modal" ref={scrollRef}>
      		<RepairTokenAndCrawl setToken={false} post_id="0" page_name={'show-portfolio_'+data[0]}/>
			
			<button className="close_zoom_modal" id="close_zoom_modal" onClick={handleCloseModal}>×</button>
			<div className="image_zooming" id="for_src_img"></div>
			<div className="arrow_container">
				<button className="arrow_img prev_img" aria-label="previous photo" onClick={()=>{handlePrevImg(iPic, lengthPics)}}><i id='arrow_prev' className="fas fa-chevron-circle-left"/></button>
				<button className="arrow_img next_img" aria-label="next photo" onClick={()=>{handleNextImg(iPic, lengthPics)}}><i id='arrow_next' className="fas fa-chevron-circle-right"/></button>
			</div>
			<span className="count_num_image" id="count_images">{iPic+1}/{lengthPics}</span>
			{pics.map((pic, key)=>{
				return ((iPic===key)?<img src={pic.publicURL} alt={' صور لموقع '+data[1]+' رقم '+key} key={key} className="image_zooming_img"/>:'');
				
			})}
		
		</div>
	);
};

export default ModalComponent;