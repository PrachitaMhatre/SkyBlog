import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint.js";

export default function RecentPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await get("/blog/getposts");
        if (response.data.success) {
          // ✅ Ensure all posts have a `description` field
          const sortedPosts = response.data.posts
            .map(post => ({
              ...post,
              description: post.description || "No description available.", // ✅ Fallback value
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
        } else {
          console.error("No posts found!");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPost();
  }, []);

  return (
    <div className="container">
      <div className="mb-5 text-center">
        <h2 className="fw-bold fs-1 text-black">Recent Posts</h2>
      </div>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card border-success" style={{ borderWidth: "2px", backgroundColor: "#2b2b2b", borderRadius: "10px", overflow: "hidden" }}>
                <img 
                  src={`${BaseUrl}/images/${post.image}`} 
                  className="card-img-top img-fluid" 
                  alt={post.title} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <div className="card-body bg-dark text-white">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description?.slice(0, 100) || "No description available."}...</p> 
                  <button className="btn btn-primary w-100 mt-3" onClick={() => navigate(`/post/${post._id}`)}>Read Article</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-black">No recent posts available.</p>
        )}
      </div>
    </div>
  );
}
