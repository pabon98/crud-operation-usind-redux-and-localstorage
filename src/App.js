import './App.css';
import Navbar from './Components/Navbar';
import PostForm from './Components/PostForm';
import PostList from './Components/PostList/PostList';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h4 className='mt-3'>CRUD APP USING REDUX AND LOCAL STORAGE</h4>
     <PostForm/>
     <PostList/>
    </div>
  );
}

export default App;
