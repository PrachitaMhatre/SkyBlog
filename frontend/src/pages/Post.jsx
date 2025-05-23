import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get, post } from '../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function Post() {
  const { id } = useParams();
  console.log("Post ID from URL:", id);  // ✅ Debugging

  const user = useSelector((state) => state.auth.user);

  const [singlepost, setSinglePost] = useState(null);
  const [comment, setComment] = useState('');
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Post ID is undefined. Skipping API call.");
      return;
    }
  
    const SinglePost = async () => {
      try {
        console.log(`Fetching post with ID: ${id}`);
        const response = await get(`/public/singlepost/${id}`);
        setSinglePost(response.data.Post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
  
    SinglePost();
  }, [id, loaddata]);

  const onSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    try {
      const request = await post("/comment/addcomment", {
        comment,
        postId: id,
        userId: user._id,
      });

      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setComment('');
        setLoaddata((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="container text-black mt-5 mb-5" style={{ paddingTop: "70px" }}>
      <div className="row">
        <div className="col-md-12">
          <h2 className="fw-bold text-black mb-4 display-10">{singlepost?.title}</h2>

          {singlepost?.image && (
            <img 
              src={`${BaseUrl}/images/${singlepost.image}`} 
              alt="Post Thumbnail" 
              className="img-fluid mb-4" 
              style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
            />
          )}

          
          <div className="mb-5 text-black" style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
            {singlepost?.desc?.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3">{paragraph}</p>
            ))}
          </div>

          <hr />

          <h3 className="mt-5 mb-4 text-black">Leave a Comment</h3>
          <form onSubmit={onSubmitComment}>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label text-black">Comment</label>
              <textarea 
                className="form-control" 
                id="comment" 
                rows="4" 
                placeholder="Write your comment here" 
                required
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Comment</button>
          </form>

          <hr />

          <h3 className="mt-5 mb-4 text-black">Comments</h3>
          {singlepost?.comments?.length > 0 ? (
            singlepost.comments.map((comment) => (
              <div className="bg-light p-3 rounded mb-3 d-flex" key={comment._id}>
                <img 
                  src={`${BaseUrl}/images/${comment.userId?.profile}`} 
                  alt="User Profile" 
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-1 text-black">{comment.userId?.FullName || "Anonymous"}</h5>
                  <p className="mb-0 text-black">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No comments yet! Be the first to share what you think!😎</p>
          )}
        </div>
      </div>
    </div>
  );
}
