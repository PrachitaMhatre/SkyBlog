const express = require("express");
const multer = require("multer");
const Post = require("../models/Post"); // Your Mongoose Post model
const router = express.Router();

// ✅ Setup Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Update Post API (Handles Text + Image)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params; // ✅ Fix incorrect parameter name
    const { title, description } = req.body;
    const postImage = req.file ? req.file.filename : null;

    // ✅ Check if Post Exists
    let post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // ✅ Update Post Fields
    post.title = title || post.title;
    post.description = description || post.description;
    if (postImage) post.image = postImage; // ✅ Update image only if provided

    // ✅ Save Updated Post
    await post.save();

    return res
      .status(200)
      .json({ success: true, message: "Post updated successfully :)", post });
  } catch (error) {
    console.error("❌ Error updating post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error :(" });
  }
});

module.exports = router;
