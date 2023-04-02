import { createSlice } from "@reduxjs/toolkit";


export const postsSlice = createSlice({
  name: "posts",
  initialState:{
    posts:  [],
    isLoading: false,
    error: null,
  },
  reducers:{
    setPosts: (state, action)=>{
      state.posts = action.payload
    },
    addPost: (state,action)=>{
      state.posts.push(action.payload)
    },
    updatePost: (state,action)=>{
      const index = state.posts.findIndex(post=> post.id === action.payload.id)
      state.posts[index] = action.payload
    },
    deletePost: (state,action)=>{
      state.posts = state.posts.filter(post=> post.id !== action.payload)
    },
    setLoading: (state, action)=>{
      state.isLoading = action.payload
    },
    setError: (state, action)=>{
      state.error = action.payload
    }
  }
  
})

export const {setPosts, addPost, updatePost, deletePost, setLoading, setError} = postsSlice.actions

export const selectPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;
export const selectError = state => state.posts.error;

export const fetchPosts = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
    
    if(localStorage.getItem('posts')){
      const temp = JSON.parse(localStorage.getItem('posts'))
      dispatch(setPosts(temp))
      dispatch(setLoading(false));
      
    }
    else{
      dispatch(setPosts(data));
    localStorage.setItem('posts', JSON.stringify(data));
    }
    
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};



// export const addPostAsync = post => async dispatch => {
//   try {
//     const timestamp = Date.now()
//     // add the id to the post object
//     const postWithId = { ...post, id: timestamp }; 
//     console.log('Generated id:', timestamp);
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json'},
//       body: JSON.stringify(postWithId),
//     });
//     const data = await response.json();
//     dispatch(addPost(data));
//     // Save to local storage
//     const existingData = JSON.parse(localStorage.getItem('posts')) || [];
//     const updatedData = [...existingData, data];
//     localStorage.setItem('posts', JSON.stringify(updatedData));
//     console.log(data);
//     // localStorage.setItem('posts', JSON.stringify(data));
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };


// export const updatePostAsync = post => async dispatch => {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(post),
//     });
//     const data = await response.json();
//     dispatch(updatePost(data));
//     // Save to local storage
//     const existingData = JSON.parse(localStorage.getItem('posts')) || [];
//     const index = existingData.findIndex(item => item.id === data.id);
//     const updatedData = [...existingData.slice(0, index), data, ...existingData.slice(index + 1)];
//     localStorage.setItem('posts', JSON.stringify(updatedData));

//     // localStorage.setItem('posts', JSON.stringify(data)); 
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };


export const addPostAsync = post => async dispatch => {
  try {
    // get current timestamp
    const timestamp = Date.now(); 
    // add timestamp as the id
    const postWithId = { ...post, id: timestamp }; 
    // console.log('Generated id:', timestamp); 
    dispatch(addPost(postWithId));
    // Save to local storage
    const existingData = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedData = [...existingData, postWithId];
    localStorage.setItem('posts', JSON.stringify(updatedData));
    console.log(updatedData);
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const updatePostAsync = post => async dispatch => {
  try {
    const isJsonPlaceholderData = post.hasOwnProperty('id') && post.hasOwnProperty('userId') && post.hasOwnProperty('title') && post.hasOwnProperty('body');
    let response, data, parsedData;

    if (isJsonPlaceholderData) {
      response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      data = await response.text();
      parsedData = JSON.parse(data);
    } else {
      parsedData = post;
    }

    dispatch(updatePost(parsedData));

    if (isJsonPlaceholderData) {
      // Save to jsonplaceholder API
      const isValidJSON = /^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
      if (isValidJSON) {
        const existingData = JSON.parse(localStorage.getItem('posts')) || [];
        const index = existingData.findIndex(item => item.id === parsedData.id);
        const updatedData = [...existingData.slice(0, index), parsedData, ...existingData.slice(index + 1)];
        localStorage.setItem('posts', JSON.stringify(updatedData));
      } else {
        throw new Error('Response is not valid JSON');
      }
    } else {
      // Save to local storage
      const existingData = JSON.parse(localStorage.getItem('localPosts')) || [];
      const index = existingData.findIndex(item => item.id === parsedData.id);
      const updatedData = [...existingData.slice(0, index), parsedData, ...existingData.slice(index + 1)];
      localStorage.setItem('localPosts', JSON.stringify(updatedData));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};





export const deletePostAsync = postId => async dispatch => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    });
    dispatch(deletePost(postId));
    // Remove from local storage
    const existingData = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedData = existingData.filter(item => item.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedData));

    // localStorage.removeItem('posts', postId); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};