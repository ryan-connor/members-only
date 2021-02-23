import {React, useState, useEffect} from "react";

const BlogPost = (props) => {

    //receive object with message, name, and date as props
    let post = props.post;

    const [editable, setEditable] = useState(false);
    const [postState, setPostState]= useState(post.content);
    const [active, setActive] = useState(true);


    let formattedDate = post.datePosted.slice(0,10) +' '+ post.datePosted.slice(11,16); 

    //set edit post flag
    let editPost = () => {
        console.log("edit:", post);
        setPostState(post.content);
        (editable)?setEditable(false):setEditable(true);
    };

    //track edited post through state
    let handleChange = (e) => {
        setPostState(e.target.value);
    };

    //save edited post to db
    let savePost = () => {
        console.log("save post");

    let saveMessagesUrl = `http://localhost:8000/message/${post._id}`; 

    let currentUser = (props.signedInUser)?(props.signedInUser.userid):("6034000c6d16d9402cab3b50"); //set it with a guest id as default

    //function to PUT message data to backend, note need to have user set from current user and have a default user in db
    let sendPost = async () => {
        // e.preventDefault(); 

        let token= localStorage.getItem('token');

        let body = {
            content: postState,
            datePosted: new Date(),
            user: currentUser, //make dynamically change who is posting
        };

        //send request to backend
        let response = await fetch(saveMessagesUrl, {method: 'PUT', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body:JSON.stringify(body)});
        // let responseJson = await response.json();
        console.log(response);

        //callback to trigger post fetch/rerender
        props.rerenderPosts();
    };

        sendPost();
        setEditable(false); //consider adding something here to set the value to the updated state instead of re-rendering
    };

    //display posts as editable or div depending on state
    let displayPost = () => {
        if (editable) {
            console.log("text area");
            return <textarea className="blogItem" id="newPostArea" defaultValue={post.content} onChange={handleChange}></textarea>;
        } else {
            console.log("div");
            return <div className="blogItem">{post.content}</div>;
        };
    };
    
    //display or hide edit button depending on signed in user
    let displayEditButton= () => {

        if (props.signedInUser.username===post.user.username) {
            console.log("display edit button");
            return <button className="editButton" onClick={editPost}>Edit</button>
        };
    };

    //display or hide save button depending on state
    let displaySaveButton = () => {
        if (editable) {
            return <button className="editButton" onClick={savePost}>Save</button>
        };

    };

    let displayDeleteButton = () => {
        if (props.signedInUser.privilege === "admin") {
            console.log("admin here");
            return <button className="editButton" onClick={deletePost}>Delete</button>

        };

    };

    let deletePost = () => {
        console.log("deleted post");

    let deleteMessagesUrl = `http://localhost:8000/message/${post._id}`; 

    //function to PUT message data to backend, note need to have user set from current user and have a default user in db
    let deletePost = async () => {
        // e.preventDefault(); 

        let token= localStorage.getItem('token');

        //send request to backend
        let response = await fetch(deleteMessagesUrl, {method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
        // let responseJson = await response.json();
        console.log(response);

        //callback to trigger post fetch/rerender
        //props.rerenderPosts();

        //hide blog post in frontend so doesn't need to re-render anything, on next re-render the post will be deleted from db anyways
        setActive(false);
    };

        deletePost();

    };


    let hideOrShow = () => {
        if (!active) {
            return "hidden"
        };
    };

    //return blog post component to be rendered
    return (
        <div className={"blogPost "+ hideOrShow()}>
             {/* <div className="blogItem">{post.content} </div> */}
             {displayPost()}             
            {/* TODO make this conditionally show for logged in users */}
            <div className="postInfoCont">
            <div className="postInfo">Posted By: {post.user.username}</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="postInfo">{displayDeleteButton()}{displaySaveButton()}{displayEditButton()}{formattedDate}</div>
            </div>
            
        </div>
    )
};


export default BlogPost;