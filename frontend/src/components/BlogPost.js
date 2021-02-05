import React from "react";

const BlogPost = (props) => {

    //functions


    return (
        <div className="blogPost">
             <div className="blogItem">Message contents here</div>
            {/* TODO make this conditionally show for logged in users */}
            <div className="postInfoCont">
            <div className="postInfo">Posted By: username</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="postInfo">Date Posted</div>
            </div>
        </div>
    )
};


export default BlogPost;