import React, {useState} from 'react';
import {Link} from 'gatsby';
import SecondMain from './SecondMain';


const MainSearch = (props) => {
    const [wordSearch, setWordSearch]= useState('');
    const handleChangeWordSearch=(eTarValue)=>{
        
        setWordSearch(eTarValue);
    
    }
    
    return (
        <main>
            <div className="main_blog_container">
                <div className="main_blog_container_prime">
                    <div className="frame_post_blog frame_post_blog_with-bottom">
                        
                        <input onChange={(e)=>{handleChangeWordSearch(e.target.value)}} value={wordSearch} type="input" name="search_blog" className="search_input" placeholder="عما تبحث!؟"/>
                        
                        {/* This is a simple (and low - bad) search algorithm because it's only used for a small blog */}
                        {props.data.map(element => {
                            const data=element.node.frontmatter;
                            let lowerKeyword=data.keyword.toLowerCase();
                            let lowerTitle=data.title.toLowerCase();

                            let lowerWordSearch=wordSearch.toLowerCase();

                            
                            if(lowerWordSearch==='' || lowerKeyword.replace(lowerWordSearch, "$$$")!==lowerKeyword || lowerTitle.replace(lowerWordSearch, "$$$")!==lowerTitle){

                                let keyword=data.keyword.replace("، ", ", ");
                                keyword=keyword.split(', ');

                                return(
                                        <Link className="frame_post_blog_search frame_post_blog_search_link" key={data.id} to={data.slug}>
                                            <h2>{data.title}</h2>
                                            {keyword.map((printKeyword0, key) =>{
                                                return( <span key={key}>{printKeyword0}</span> );
                                            })}
                                        </Link>
                                );
                            }else{
                                return'';
                            }
                            
                        })}
                    </div>

                </div>
                <div className="main_blog_container_second">
                    <SecondMain />
                </div>
            </div>
	    </main>
    );

};


export default MainSearch;