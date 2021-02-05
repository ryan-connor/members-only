import React from "react";

const NewPost = (props) => {

    //functions


    return (
        <div className="blogPost">
             <textarea className="blogItem" placeholder="New Post Here"></textarea>
             <button className="postButton">Post</button>

        </div>
    )
};


export default NewPost;