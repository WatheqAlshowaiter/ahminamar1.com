import React from 'react';
import {Link} from 'gatsby';

const Main404 = () => {

    return (
        <main>
            <div className="main_blog_container main_blog_container_for-show-post">
                <div className="main_blog_container_prime frame_post_blog">
                <div className="not-found">
                    <div className="not-found-link">
                        <Link to="/" className="no-decoration">
                        <span className="not-found-link-span"><i className="fas fa-home"></i></span>
                        <span className="not-found-link-span">عد إلى الصفحة الرئيسية</span>
                        </Link>
                    </div>
                    <i className="fas fa-exclamation-circle"/>
                    <h1>هذه الصفحة غير موجودة</h1>

                    <br />
                    <br />
                </div>
                </div>
            </div>
            
	    </main>

    );

};



export default Main404;