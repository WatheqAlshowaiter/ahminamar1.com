import React, {useState, useEffect} from 'react';
import {Link} from 'gatsby';

const SimilarPosts = ({sampleAllPost, sampleId, sampleKeyword}) => {

    
    const [similarPosts, setSimilarPosts]=useState([]);
    
    useEffect(()=>{
        
        
        
        let keyword=sampleKeyword.toLowerCase();
        let allPost=sampleAllPost;

        keyword=keyword.replace("، ", ", ");
        let keywords=keyword.split(', ');

        let matrix=[];

            allPost.forEach((data, key)=>{
                
                let post=data.node.frontmatter;
                let keyword=post.keyword.toLowerCase();
                
                keywords.forEach((originKeyword)=>{

                    let keywordRemplace=keyword.replace(originKeyword, "$$$");

                    if(keywordRemplace!==keyword){
                        if(post.id!==sampleId){
                            matrix[key]=(matrix[key])?matrix[key]:0;
                            matrix[key]=matrix[key]+1;
                        }

                    }
                });

            })


            let matrixExport=Array(5);
            let matrixIdExport=[];
            for(let i=0; i<5; i++){
                matrixExport[i]=0;
            }

            matrix.forEach((x, key)=>{
                let y=x;
                let id=key;
                let id2=key;

                for(let i=0; i<5; i++){
                    if(y>matrixExport[i]){
                        y=(matrixExport[i]>0)?matrixExport[i]:0;
                        matrixExport[i]=x;
                        x=y;

                        id2=matrixIdExport[i];
                        matrixIdExport[i]=id;
                        id=id2;



                        
                    }
                }
            })

            setSimilarPosts(matrixIdExport);


    }, [sampleAllPost, sampleId, sampleKeyword]);
    




    return (
        <div>
                        
            <div className="main_blog_container main_blog_container_for-show-post">

                <div className="main_blog_container_prime frame_post_blog comment-part similar_post">
                    <h3>مقالات ذات صلة</h3>
                        {(similarPosts.length>0)?similarPosts.map((id)=>{
                            let post=sampleAllPost[id];
                            post=post.node.frontmatter;
                            return(
                                <Link className="frame_post_blog_search frame_post_blog_search_link frame_post_blog_similar_post" key={post.id} to={post.slug}>
                                    <h4>{post.title}</h4>
                                </Link>
                            );
                        }):
                        <p>لايوجد مقال مشابه أو مكمل لهذا المقال حتى الآن</p>}
                        <br />
                </div>
            </div>


        </div>
    );  
};

export default SimilarPosts;