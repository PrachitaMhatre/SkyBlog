import React, { useState } from "react";

export default function UpdatePost({ post, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(null);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow-lg">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Update Post</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form encType="multipart/form-data">
              {/* Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Upload Image */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Upload New Image (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
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