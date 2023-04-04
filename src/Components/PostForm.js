import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAsync } from "../features/posts/postsSlice";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const PostForm = () => {
  const notify = () => toast("Post added Sucessfully!");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", body: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e=>{
    e.preventDefault()
    dispatch(addPostAsync(formData))
    notify()
    setFormData({title: '', body: ''})
  }
//   console.log(formData);
  return (
    <div className="my-3">
      <form onSubmit={handleSubmit}>
        <div className="w-50 m-auto">
          <label class="form-label" htmlFor="title">Title:</label>
          <input
            class="form-control"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="w-50 m-auto">
            <label htmlFor="body">Body:</label>
            <textarea className="form-control" rows={3} name="body" id="body" value={formData.body} onChange={handleChange}></textarea>
        </div>
        <div className="my-3">
            <button type="submit" className="btn btn-primary">ADD POST</button>
        </div>
      </form>
      <ToastContainer />
    </div>

  );
};

export default PostForm;
