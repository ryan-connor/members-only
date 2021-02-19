import React from "react";

const BlogPost = (props) => {

    //receive object with message, name, and date as props
    let post = props.post;

    let formattedDate = post.datePosted.slice(0,10) +' '+ post.datePosted.slice(11,16); 



    return (
        <div className="blogPost">
             <div className="blogItem">{post.content}</div>
            {/* TODO make this conditionally show for logged in users */}
            <div className="postInfoCont">
            <div className="postInfo">Posted By: {post.user.username}</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="postInfo">{formattedDate}</div>
            </div>
        </div>
    )
};


export default BlogPost;