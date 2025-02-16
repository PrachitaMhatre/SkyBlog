import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BaseUrl, del, get } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';
import UpdatePost from './Updatepost.jsx';  // Import the update post modal

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadedata, setLoadedata] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await get("/blog/GetPosts");
        const data = response.data;
        setPosts(data.posts || []);
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
    <div className="container">
      <h1 className="text-center mb-4 text-black">All Posts</h1>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id || post.title}>
              <div className="card h-100">
                <img src={`${BaseUrl}/images/${post.image}`} className="card-img-top" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                  <button className="btn btn-warning" onClick={() => handleUpdate(post)}>
                    <FaEdit /> Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-black">No posts available😢</h3>
        )}
      </div>

      {selectedPost && <UpdatePost post={selectedPost} onClose={() => setSelectedPost(null)} reloadPosts={() => setLoadedata(!loadedata)} />}
    </div>
  );
}
