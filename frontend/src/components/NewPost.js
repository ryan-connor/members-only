import {React, useState} from "react";

const NewPost = (props) => {

    //state for new post
    const [postState, setPostState]= useState();
    const [errors, setErrors] = useState();

    let createMessagesUrl = "http://localhost:8000/message";

    //if user logged in then set current user to that value, otherwise leave as guest
    let currentUser = (props.signedInUser)?(props.signedInUser.userid):("6034000c6d16d9402cab3b50"); //set it with a guest id

    //function to POST message data to backend
    let sendPost = async (e) => {
        
        e.preventDefault(); 
        let body = {
            content: postState,
            datePosted: new Date(),
            user: currentUser,
        };

        //send request to backend
        let response = await fetch(createMessagesUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(body)});

        if (response.status === 422) {
            //errors posting
            let responseJson = await response.json();
            setErrors(responseJson.errors.errors[0].msg);
        } else {
            setErrors();
            //callback to trigger post fetch/rerender
            props.callback();
        };
        //reset post/state back to blank
        setPostState('');
    };

    //function to track input
    let handleChange = (e) => {
        setPostState(e.target.value);
    };

    //new post with conditional error message
    return (
        <form onSubmit={sendPost} className="blogPost" id="newPost">
             <textarea className="blogItem" id="newPostArea" placeholder="Type your Post Here" value={postState} onChange={handleChange}></textarea>
             <button type="submit" className="postButton">Post</button>
            {errors && <div>Error: {errors}</div>} 

        </form>
    )
};

export default NewPost;