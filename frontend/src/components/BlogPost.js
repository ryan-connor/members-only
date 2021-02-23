import {React, useState, useEffect} from "react";

const BlogPost = (props) => {

    //receive object with message, name, and date as props
    let post = props.post;

    const [editable, setEditable] = useState(false);
    const [postState, setPostState]= useState(post.content);


    let formattedDate = post.datePosted.slice(0,10) +' '+ post.datePosted.slice(11,16); 


    let editPost = () => {
        console.log("edit:", post);
        (editable)?setEditable(false):setEditable(true);
    };




    let handleChange = (e) => {
        setPostState(e.target.value);
    };

    let savePost = () => {
        console.log("save post");

        //send the post to the db to save it with necessary credentials, trigger re render of posts?, 
        //or set post to new values here and send to db but don't trigger re pull of db if not needed


    let saveMessagesUrl = `http://localhost:8000/message/${post._id}`; 

    let currentUser = (props.signedInUser)?(props.signedInUser.userid):("6034000c6d16d9402cab3b50"); //set it with a guest id

    //function to PUT message data to backend, note need to have user set from current user and have a default user in db
    let sendPost = async () => {
        // e.preventDefault(); 

        let body = {
            content: postState,
            datePosted: new Date(),
            user: currentUser, //make dynamically change who is posting
            token: localStorage.getItem('token'), //put token in auth header as bearer token
        };

        //send request to backend
        let response = await fetch(saveMessagesUrl, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(body)});
        // let responseJson = await response.json();
        console.log(response);

        //callback to trigger post fetch/rerender
        props.renderPost();
    }

        sendPost();
        setEditable(false); //consider adding something here to set the value to the updated state instead of re-rendering
    };










    let displayPost = () => {
        if (editable) {
            console.log("text area");
            return <textarea className="blogItem" id="newPostArea" defaultValue={post.content} onChange={handleChange}></textarea>;
        } else {
            console.log("div");
            return <div className="blogItem">{post.content}</div>;
        };
    };
    
    let displayEditButton= () => {

        if (props.signedInUser.username===post.user.username) {
            console.log("display edit button");
            return <button className="editButton" onClick={editPost}>Edit</button>
        };
    };

    let displaySaveButton = () => {
        if (editable) {
            return <button className="editButton" onClick={savePost}>Save</button>
        };

    };



    return (
        <div className="blogPost">
             {/* <div className="blogItem">{post.content} </div> */}
             {displayPost()}             
            {/* TODO make this conditionally show for logged in users */}
            <div className="postInfoCont">
            <div className="postInfo">Posted By: {post.user.username}</div> 
            {/* TODO make this conditionally show log out instead for logged in users */}
            <div className="postInfo">{displaySaveButton()}{displayEditButton()}{formattedDate}</div>
            </div>
            
        </div>
    )
};


export default BlogPost;