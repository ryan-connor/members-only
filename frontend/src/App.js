import './App.css';
import Header from './components/Header';
import NewPost from './components/NewPost';
import AllPosts from './components/AllPosts';
import {React, useState} from 'react';

function App() {

//states for post and signedin user
const [posts, setPost] = useState(false);
const [signedInUser, setSignedInUser] = useState('');

//callback function to trigger post rerender
let renderPost = () => {
  setPost(posts?false:true);
};

//callback function to set signed in user
let signInUser = (user) => {
  setSignedInUser(user);
};

//callback function to sign out user
let signOutUser = () => {
  setSignedInUser('');
  localStorage.removeItem("token");
};

  return (
    <div className="App">
      <Header signInUser={signInUser} signOutUser={signOutUser} currentUser={signedInUser}/>
      <h1>Members Message Board</h1>
      <h2>Speak your thoughts directly to the Internet!</h2>
      <NewPost callback={renderPost} signedInUser={signedInUser}/>
      <AllPosts renderPost={posts} rerenderPosts={renderPost} signedInUser={signedInUser}/>
    </div>
  );
};

export default App;
