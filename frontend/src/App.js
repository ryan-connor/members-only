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

let renderPost = () => {
  setPost(posts?false:true);
};

  return (
    <div className="App">

      <Header />
      <Login />
      {/* <SignUp/> */}
      <h1>Members Only Message Board</h1>
      <h2>Speak your thoughts directly to the Internet!</h2>
      <NewPost callback={renderPost}/>
      <AllPosts renderPost={posts}/>
      
 

    </div>
  );
}

export default App;
