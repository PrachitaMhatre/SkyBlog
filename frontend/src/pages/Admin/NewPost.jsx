import React, { useState } from "react";
import { post } from "../../services/Endpoint.js";
import toast from "react-hot-toast";

export default function NewPost({ reloadPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await post("/blog/create", formData);
      if (response.data.success) {
        toast.success("Post created successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        reloadPosts();
      } else {
        toast.error(response.data.message || "Failed to create post.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Create New Post</h2>
      <form onSubmit={handleSubmit} className="p-3 shadow-sm bg-white rounded">
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
