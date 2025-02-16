import React, { useState } from "react";
import { put } from "../../services/Endpoint.js";
import toast from "react-hot-toast";

export default function UpdatePost({ post, onClose, reloadPosts }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(null);

  // ✅ Define handleUpdate function
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description cannot be empty!");
      return;
    }
  
    try {
      console.log("📡 Sending PUT request to update post:", post._id);
      
      const response = await put(`/post/update/${post._id}`, { title, description });
  
      if (response.data.success) {
        toast.success("Post updated successfully!");
        reloadPosts();
        onClose();
      } else {
        toast.error(response.data.message || "Failed to update post.");
      }
    } catch (error) {
      console.error("❌ Error updating post:", error);
      toast.error("Error updating post.");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Post</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload New Image (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
