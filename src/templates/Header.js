import React from 'react';
import  {Link} from 'gatsby';
import SearchPostIcon from './SearchPostIcon'; 


const Header = (props) => {
    let arrowActive=props.arrowActive;
    arrowActive=+arrowActive;
    const styleArrowActive={
        display: 'block'
    }
    const styleArrow={
        display: 'none'
    }
    
    const styleActiveItem={
        backgroundColor: "#2C3E50",
        color: "#FFF"
    }

    const styleItem0={

    }


    return (
        <header>
            <SearchPostIcon />
            <div className="menu">
                <div className="menu_container_item">
                    <span className="menu_container_item_and_arrow">
                        <Link to="/" className="menu_item" style={(arrowActive===1)?styleActiveItem:styleItem0}>المدونة</Link>
                        <div className="arrow_down_for_items" style={(arrowActive===1)?styleArrowActive:styleArrow}></div>
                    </span>
                    <span className="menu_container_item_and_arrow">
                        <Link to="/portfolio" className="menu_item" style={(arrowActive===2)?styleActiveItem:styleItem0}>أعمالي</Link>			
                        <div className="arrow_down_for_items" style={(arrowActive===2)?styleArrowActive:styleArrow}></div>
                    </span>
                    <span className="menu_container_item_and_arrow">
                        <Link to="/aboutme" className="menu_item" style={(arrowActive===3)?styleActiveItem:styleItem0}>تعرف علي</Link>
                        <div className="arrow_down_for_items" style={(arrowActive===3)?styleArrowActive:styleArrow}></div>
                    </span>
                    <span className="menu_container_item_and_arrow">
                        <Link to="/contactme" className="menu_item" style={(arrowActive===4)?styleActiveItem:styleItem0}>تواصل معي</Link>				
                        <div className="arrow_down_for_items" style={(arrowActive===4)?styleArrowActive:styleArrow}></div>
                    </span>
                </div>
            </div>
            <div className="header" style={props.colorTitlesStyle}>
                <div className="header_text_title">
                    <h2>{props.title1}</h2>
                    <h3>{props.title2}</h3>		
                </div>

            </div>
	    </header>
    );
};

export default Header;