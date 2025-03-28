import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BaseUrl, del, get } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';
import UpdatePost from './UpdatePost.jsx';

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadedata, setLoadedata] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await get("/blog/GetPosts");
        const data = response.data;

        // ✅ Sort posts by latest first
        const sortedPosts = (data.posts || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, [loadedata]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await del(`/blog/delete/${postId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata);
        } else {
          toast.error('Failed to delete the post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error(error.response?.data?.message || "An unexpected error occurred.");
      }
    }
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: "black" }}>All Posts</h2>
      
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id || post.title}>
              <div className="post-card shadow">
                <div className="post-image-container">
                  <img 
                    src={`${BaseUrl}/images/${post.image}`} 
                    className="post-image"
                    alt={post.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-danger btn-sm animated-btn" onClick={() => handleDelete(post._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                  <button className="btn btn-primary btn-sm animated-btn" onClick={() => handleUpdate(post)}>
                    <FaEdit /> Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center" style={{ color: "black" }}>No posts available</h3>
        )}
      </div>

      {selectedPost && (
        <UpdatePost post={selectedPost} onClose={() => setSelectedPost(null)} reloadPosts={() => setLoadedata(!loadedata)} />
      )}

      {/* Custom CSS for Better Design */}
      <style>
        {`
          /* Modern Card Design */
          .post-card {
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
          }

          .post-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          }

          /* Image Container */
          .post-image-container {
            width: 100%;
            height: 200px;
            overflow: hidden;
          }

          .post-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease-in-out;
          }

          .post-card:hover .post-image {
            transform: scale(1.05);
          }

          /* Card Body */
          .card-body {
            padding: 15px;
            text-align: center;
          }

          .card-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: black;
          }

          .card-text {
            font-size: 0.9rem;
            color: black;
          }

          /* Footer */
          .card-footer {
            padding: 10px 15px;
            background: #f8f9fa;
          }

          /* Buttons */
          .animated-btn {
            transition: all 0.3s ease-in-out;
          }

          .btn-danger:hover {
            background-color: #c82333;
            transform: scale(1.05);
          }

          .btn-primary:hover {
            background-color:rgb(11, 173, 243);
            transform: scale(1.05);
          }

          /* Responsive */
          @media (max-width: 768px) {
            .post-card {
              margin: 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
}
