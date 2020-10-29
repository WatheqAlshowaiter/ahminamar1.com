import React from 'react';
import '../style/prism-vsc-dark-plus.css';
import CommentsComponent from '../components/CommentsComponent';
import SimilarPosts from '../components/SimilarPosts';

const MainShowPost = (props) => {


    return (
        <main>
            <div className="main_blog_container main_blog_container_for-show-post">
                <div className="main_blog_container_prime frame_post_blog">
                    <div className="blog-post-showing">
                        <div dangerouslySetInnerHTML={{ __html: props.post.html }} />
                    
                    </div>
                    
                    <div className="post_blog_infs">
                            <span className="flot-right"> حرره: {props.post.frontmatter.author}</span>
                            <span className="flot-left"> بتاريخ: {props.post.frontmatter.date}</span>
                    </div>
                          
                </div>
            </div>
            <SimilarPosts sampleAllPost={props.allPost} sampleId={props.post.frontmatter.id} sampleKeyword={props.post.frontmatter.keyword} />
            <CommentsComponent id_post={props.post.frontmatter.id} token_props={props.token} setToken_props={props.setToken}/>
	    </main>

    );




};



export default MainShowPost;