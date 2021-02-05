import './App.css';
import Header from './components/Header';
import BlogPost from './components/BlogPost';
import NewPost from './components/NewPost';

function App() {
  return (
    <div className="App">

      <Header />
      <h1>Members Only Message Board</h1>
      <NewPost />
      <BlogPost />
 

    </div>
  );
}

export default App;
