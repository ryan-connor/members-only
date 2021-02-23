import {React, useState} from "react";

const NewPost = (props) => {

    //state for new post
    const [postState, setPostState]= useState();


    let createMessagesUrl = "http://localhost:8000/message";

    let currentUser = (props.signedInUser)?(props.signedInUser.userid):("6034000c6d16d9402cab3b50"); //set it with a guest id

    //if user logged in then set current user to that value, otherwise leave as guest

    //function to POST message data to backend, note need to have user set from current user and have a default user in db
    let sendPost = async (e) => {
        e.preventDefault(); 
        let body = {
            content: postState,
            datePosted: new Date(),
            user: currentUser, //make dynamically change who is posting
        };

        console.log("content from text area:", body.content);
        console.log("body:", body);

        //reset post/state back to blank
        setPostState('');

        //send request to backend

        let response = await fetch(createMessagesUrl, {method: 'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(body)});
        // let responseJson = await response.json();
        console.log(response);

        //callback to trigger post fetch/rerender
        props.callback();

    }


    let handleChange = (e) => {
        setPostState(e.target.value);
    }


    return (
        <form onSubmit={sendPost} className="blogPost" id="newPost">
             <textarea className="blogItem" id="newPostArea" placeholder="Type your Post Here" value={postState} onChange={handleChange}></textarea>
             <button type="submit" className="postButton">Post</button>

        </form>
    )
};


export default NewPost;