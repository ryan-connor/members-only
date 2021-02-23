import './App.css';
import Header from './components/Header';
import BlogPost from './components/BlogPost';
import NewPost from './components/NewPost';
import AllPosts from './components/AllPosts';
import {React, useState} from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {



  //callback flag to rerender posts because of change
const [posts, setPost] = useState(false);
const [signedInUser, setSignedInUser] = useState('');

let renderPost = () => {
  setPost(posts?false:true);
};

let signInUser = (user) => {
  setSignedInUser(user);
  console.log("user set in state:", user);
};

let signOutUser = () => {
  setSignedInUser('');
};


  return (
    <div className="App">

      <Header signInUser={signInUser} currentUser={signedInUser}/>
      <h1>Members Message Board</h1>
      <h2>Speak your thoughts directly to the Internet!</h2>
      <NewPost callback={renderPost} signedInUser={signedInUser}/>
      <AllPosts renderPost={posts} signedInUser={signedInUser}/>
      
 

    </div>
  );
}

export default App;
