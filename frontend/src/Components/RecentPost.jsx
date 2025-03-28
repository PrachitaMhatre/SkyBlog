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
          const sortedPosts = response.data.posts
            .map(post => ({
              ...post,
              title: post.title || "Untitled Post",
              description: post.description || "",
              image: post.image || "default.jpg",
              createdAt: post.createdAt ? new Date(post.createdAt) : new Date(0)
            }))
            .sort((a, b) => b.createdAt - a.createdAt);

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
        <h3 className="fw-bold fs-1 text-black">Latest Stories</h3>
        <p className="text-muted fs-5">Stay updated with the newest blogs and articles.</p>
      </div>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-lg-4 col-md-6 mb-4" key={post._id}>
              <div 
                className="card border-0 shadow-lg overflow-hidden position-relative hover-effect"
                style={{ 
                  borderRadius: "15px", 
                  background: "rgba(0, 0, 0, 0.9)", 
                  backdropFilter: "blur(10px)", 
                  transition: "transform 0.3s ease-in-out" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
              >
                {/* ✅ Image with gradient overlay */}
                <div className="position-relative">
                  <img 
                    src={`${BaseUrl}/images/${post.image}`} 
                    className="card-img-top img-fluid"
                    alt={post.title} 
                    style={{ height: "230px", objectFit: "cover", borderRadius: "15px 15px 0 0" }}
                    onError={(e) => { e.target.src = `${BaseUrl}/images/default.jpg`; }}
                  />
                  <div className="overlay position-absolute w-100 h-100" style={{
                    top: 0, left: 0, background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)"
                  }}></div>
                </div>

                {/* ✅ Card Content */}
                <div className="card-body text-white text-center p-4">
                  <h5 className="card-title fw-bold text-white">{post.title}</h5>
                  <p className="card-text text-white">{post.description.slice(0, 100)}...</p> 
                  <button 
                    className="btn btn-outline-light w-100 mt-3 fw-bold shadow-sm"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted fs-4">😢 No recent posts available.</p>
        )}
      </div>
    </div>
  );
}
