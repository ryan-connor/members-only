import {React, useState, useEffect} from "react";
import BlogPost from "./BlogPost";

    //component to render all blogposts
const AllPosts = (props) => {

    const [blogPosts, setBlogPosts] = useState([]);

    //function to change blog posts state
    let changePosts = (newPosts) => {
        if (newPosts !== blogPosts) {
            setBlogPosts(newPosts);
        } 
    };

    //only fetch posts/re-render on component mount/unmount or when a post is added/changed/deleted
    useEffect( ()=> {
        //fetch in here to prevent infinite loop
        let getMessagesUrl = "http://localhost:8000/messages";

    //function to get all blog posts
    let getPosts = async () => {
        const response = await fetch(getMessagesUrl, {mode: 'cors'});
        const posts = await response.json();
        let mappedPosts= posts.messageList.map( (item,index) => {
            return <BlogPost post={item} key={item._id} signedInUser={props.signedInUser} rerenderPosts={props.rerenderPosts}/>
        });
        changePosts(mappedPosts);
    };

    getPosts();

    }, [props.renderPost, props.signedInUser]);
    

    return (
        <div className="blogPosts">
            {blogPosts}
        </div>
    )
};


export default AllPosts;