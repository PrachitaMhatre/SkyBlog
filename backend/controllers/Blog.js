import PostModel from "../models/Blog.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const Create = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required!" });
    }

    const { title, desc } = req.body;
    const imagePath = req.file.filename;

    const createBlog = new PostModel({ title, desc, image: imagePath });
    await createBlog.save();

    res.status(200).json({
      success: true,
      message: "Blog Created Successfully!",
      post: createBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

const update = async (req, res) => {
  try {
    const { postId } = req.params;
    const updateData = req.body;

    // Validate post ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post ID" });
    }

    // Find and update the post
    const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.error("❌ Error updating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();

    if (!posts.length) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found :(" });
    }

    res.status(200).json({ success: true, posts }); // ✅ Fixed missing response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const FindPost = await PostModel.findById(postId);

    if (!FindPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found :(" });
    }

    if (FindPost.image) {
      const imagePath = path.join("public/images", FindPost.image);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath); // ✅ Fixed missing await
      }
    }

    await PostModel.findByIdAndDelete(postId);

    res
      .status(200)
      .json({ success: true, message: "Post deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

export { Create, update, getPosts, deletePost };
