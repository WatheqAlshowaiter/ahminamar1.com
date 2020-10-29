import React from 'react';
import {Link} from 'gatsby';
import SecondMain from './SecondMain';


const Main = (props) => {

    return (
        <main>
            <div className="main_blog_container">
                <div className="main_blog_container_prime">

                    {props.data.map((element, key) => {
                        const data=element.node.frontmatter;
                        return(
                            <Link to={data.slug} key={key} className="frame_post_blog frame_post_blog_link">
                                <h2>{data.title}</h2>
                                <p>{data.description}</p>
                                <div className="frame_post_blog_more">
                                    <span className="more_at_date">بتاريخ: {data.date}</span>
                                    <span className="more_at_date more_author">حرره: {data.author}</span>
                                </div>
                            </Link>

                        );
                        
                    })}

                </div>
                <div className="main_blog_container_second">
                    <SecondMain />
                </div>
            </div>
	    </main>
    );
};


export default Main;