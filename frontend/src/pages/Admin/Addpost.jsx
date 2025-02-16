import React, { useState } from 'react';
import { post } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';

export default function Addpost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  console.log('image', image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description); // ✅ Changed from `desc` to `description`
    formData.append("postimage", image); // ✅ Ensured correct field name for backend

    try {
      const response = await post("/blog/create", formData, true);
      console.log(response.data);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating post!");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Add New Blog</h2>
            </div>
            <div className="card-body p-4">
              <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="postImage" className="form-label">Upload Image</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="postImage" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label">Title</label>
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
                <div className="mb-4">
                  <label htmlFor="postDescription" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="postDescription" 
                    rows="6" 
                    placeholder="Write your post description here" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
              </form> {/* ✅ Changed div to form for proper form submission */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
