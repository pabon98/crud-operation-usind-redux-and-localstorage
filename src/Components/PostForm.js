import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPostAsync } from "../features/posts/postsSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", body: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e=>{
    e.preventDefault()
    dispatch(addPostAsync(formData))
    setFormData({title: '', body: ''})
  }
//   console.log(formData);
const savedPosts = localStorage.getItem("posts")
// console.log(savedPosts);
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
    </div>
  );
};

export default PostForm;
