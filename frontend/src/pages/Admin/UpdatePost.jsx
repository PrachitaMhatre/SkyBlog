import React, { useState } from 'react';
import { post } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';

export default function Addpost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("postimage", image);

    try {
      await post("/blog/create", formData, true);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating post!");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f8f9fa", padding: "20px" }} // ✅ Light grey background
    >
      <div 
        className="card shadow-sm p-4"
        style={{
          background: "#ffffff",
          border: "1px solid #ced4da", // ✅ Grey border
          borderRadius: "8px",
          width: "400px"
        }}
      >
        <h3 className="text-center text-primary mb-4">Add New Blog</h3>
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          
          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="postImage" className="form-label text-dark fw-semibold">Upload Image</label>
            <input 
              type="file" 
              className="form-control" 
              id="postImage" 
              onChange={(e) => setImage(e.target.files[0])} 
              required
            />
          </div>
          
          {/* Title Input */}
          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label text-dark fw-semibold">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="postTitle" 
              placeholder="Enter post title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="postDescription" className="form-label text-dark fw-semibold">Description</label>
            <textarea 
              className="form-control" 
              id="postDescription" 
              rows="4" 
              placeholder="Write your post description here" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg custom-btn"
            >
              Submit
            </button>
          </div>

        </form>
      </div>

      {/* Button Hover Animation */}
      <style>
        {`
          .custom-btn {
            transition: all 0.4s ease-in-out;
          }

          .custom-btn:hover {
            background-color: #004085 !important; /* Darker Blue */
            color: white !important;
            transform: scale(1.05); /* Slightly enlarges */
          }
        `}
      </style>
    </div>
  );
}
