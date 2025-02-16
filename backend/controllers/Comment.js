import PostModel from "../models/Blog.js";
import CommentModel from "../models/comments.js";

const AddComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    // ✅ Validate request data
    if (!postId || !userId || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and comment cannot be empty.",
      });
    }

    // ✅ Check if the post exists before creating a comment
    const existPost = await PostModel.findById(postId);
    if (!existPost) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found!",
      });
    }

    // ✅ Create and save the new comment
    const newComment = new CommentModel({ postId, userId, comment });
    await newComment.save();

    // ✅ Add comment to the post
    existPost.comments.push(newComment._id);
    await existPost.save(); // Save updated post

    // ✅ Fetch updated comments list and sort by `createdAt`
    const updatedPost = await PostModel.findById(postId).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } }, // ✅ Newest comments first
      populate: { path: "userId", select: "username email" }, // Include user details
    });

    return res.status(200).json({
      success: true,
      message: "Comment added successfully!",
      comments: updatedPost.comments,
    });
  } catch (error) {
    console.error("❌ Error adding comment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { AddComment };
