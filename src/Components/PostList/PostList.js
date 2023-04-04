import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAsync,
  fetchPosts,
  selectError,
  selectIsLoading,
  selectPosts,
  updatePostAsync,
} from "../../features/posts/postsSlice";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostList = () => {
  const updateNotify = () => toast("Post Updated Sucessfully!");
  const deleteNotify =() => toast("Post Deleted Sucessfully!")
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", body: "" });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({ title: post.title, body: post.body });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePostAsync({ ...formData, id: editingId }));
    updateNotify();
    setFormData({ title: "", body: "" });
    setEditingId(null);
  };
  const handleDelete =(post)=>{
    dispatch(deletePostAsync(post.id))
    deleteNotify()
  }

  const handleCancel = () => {
    setFormData({ title: "", body: "" });
    //for closing the form
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  return (
    <div>
      <h2>Total Posts: {posts.length}</h2>
      <ul>
        <div className="row">
          {posts.map((post) => (
            <li style={{ listStyleType: "none" }} key={post.id}>
              {editingId === post.id ? (
                <form onSubmit={handleUpdate}>
                  <div className="w-50 m-auto">
                    <label class="form-label" htmlFor="title">
                      Title:
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-50 m-auto">
                    <label htmlFor="body">Body:</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={(e) =>
                        setFormData({ ...formData, body: e.target.value })
                      }
                    />
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary" type="submit">
                      Save
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">body</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{post.id}</th>
                        <td>{post.title.slice(0, 15)}</td>
                        <td>{post.body.slice(0, 100)}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={() => handleEdit(post)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger mx-3"
                            type="button"
                            onClick={() => handleDelete(post)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </li>
          ))}
        </div>
      </ul>
      <ToastContainer/>
    </div>
  );
};

export default PostList;

//


