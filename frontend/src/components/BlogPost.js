import {React, useState} from "react";

const BlogPost = (props) => {

    //receive object with message, name, and date as props
    let post = props.post;

    const [editable, setEditable] = useState(false);
    const [postState, setPostState]= useState(post.content);
    const [active, setActive] = useState(true);
    const [errors, setErrors] = useState();

    let formattedDate = post.datePosted.slice(0,10) +' '+ post.datePosted.slice(11,16); 

    //set edit post flag
    let editPost = () => {
        setPostState(post.content);
        (editable)?setEditable(false):setEditable(true);
    };

    //track edited post through state
    let handleChange = (e) => {
        setPostState(e.target.value);
    };

    //save edited post to db
    let savePost = () => {

    let saveMessagesUrl = `http://localhost:8000/message/${post._id}`; 

    let currentUser = (props.signedInUser)?(props.signedInUser.userid):("6034000c6d16d9402cab3b50"); //set with a guest id as default

    //function to PUT message data to backend
    let sendPost = async () => {

        let token= localStorage.getItem('token');

        let body = {
            content: postState,
            datePosted: new Date(),
            user: currentUser, 
        };

        //send request to backend
        let response = await fetch(saveMessagesUrl, {method: 'PUT', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body:JSON.stringify(body)});

        if (response.status === 422) {

            let responseJson = await response.json();
        
            setErrors(responseJson.errors.errors[0].msg);
        } else {
            setErrors();
            setEditable(false);
            //callback to trigger post fetch/rerender
            props.rerenderPosts();
        };
    };

        sendPost();
        setEditable(false);
    };

    //display posts as editable or div depending on state
    let displayPost = () => {
        if (editable) {
            return <textarea className="blogItem" id="newPostArea" defaultValue={post.content} onChange={handleChange}></textarea>;
        } else {
            return <div className="blogItem">{post.content}</div>;
        };
    };
    
    //display or hide edit button depending on signed in user
    let displayEditButton= () => {
        if (props.signedInUser.username===post.user.username) {
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
            return <button className="editButton" onClick={deletePost}>Delete</button>
        };
    };

    let deletePost = () => {

    let deleteMessagesUrl = `http://localhost:8000/message/${post._id}`; 

    //function to PUT message data to backend
    let deletePost = async () => {

        let token= localStorage.getItem('token');

        //send request to backend
        let response = await fetch(deleteMessagesUrl, {method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});

        //hide blog post in frontend so doesn't need to re-render immediately
        setActive(false);
    };
        deletePost();
    };

    let hideOrShow = () => {
        if (!active) {
            return "hidden"
        };
    };

    //return blog post component to be rendered, conditionally show options for edit/save/delete buttons and errors
    return (
        <div className={"blogPost "+ hideOrShow()}>
             {displayPost()}             
            <div className="postInfoCont">
            <div className="postInfo">Posted By: {post.user.username}</div> 
            <div className="postInfo">{displayDeleteButton()}{displaySaveButton()}{displayEditButton()}{formattedDate}</div>
            </div>
            {errors && <div>Error: {errors}</div>}
        </div>
    )
};


export default BlogPost;