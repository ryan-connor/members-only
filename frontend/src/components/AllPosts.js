import {React, useState, useEffect} from "react";
import BlogPost from "./BlogPost";

const AllPosts = (props) => {
    //component to render all blogposts
    const [blogPosts, setBlogPosts] = useState([]);


    //function to change blog posts state
    let changePosts = (newPosts) => {
        if (newPosts !== blogPosts) {
            setBlogPosts(newPosts);
        } 
    };

    //only fetch posts/render on component mount/unmount or when a post is added/changed/deleted- add a flag via callback from other components
    useEffect( ()=> {
        //fetch in here to prevent infinite loop
        let getMessagesUrl = "http://localhost:8000/messages";

    //function to get all blog posts
    let getPosts = async () => {
        const response = await fetch(getMessagesUrl, {mode: 'cors'});
        // console.log(response);
        const posts = await response.json();
        // console.log("post response:", posts);
        let mappedPosts= posts.messageList.map( (item,index) => {
            // console.log(item);
            return <BlogPost post={item} key={'post'+index} signedInUser={props.signedInUser} renderPost={props.renderPost}/>
        });
        changePosts(mappedPosts);
        // console.log("state:", blogPosts);
    };

    getPosts();

    }, [props.renderPost, props.signedInUser]);

    //render all posts using individual blog post component, pass each post object data as props
      

    return (
        <div className="blogPosts">
            {blogPosts}
        </div>
    )
};


export default AllPosts;