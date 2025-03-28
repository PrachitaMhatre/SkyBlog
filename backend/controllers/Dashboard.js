import PostModel from "../models/Blog.js";
import CommentModel from "../models/comments.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

// ✅ Get all data: Users, Posts, Comments
const Getalldata = async (req, res) => {
  try {
    const [totalUsers, totalPosts, totalComments] = await Promise.all([
      UserModel.countDocuments(),
      PostModel.countDocuments(),
      CommentModel.countDocuments(),
    ]);

    if (totalUsers === 0 && totalPosts === 0 && totalComments === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Data Found :(" });
    }

    res.status(200).json({
      success: true,
      totalUsers,
      totalPosts,
      totalComments,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

// ✅ Get all users
const GetUser = async (req, res) => {
  try {
    const users = await UserModel.find({}, "FullName email profile createdAt");

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Users Found :(" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

// ✅ Delete a user
const Userdelete = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log("🆔 User ID received:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format!" });
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      userId,
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

export { Getalldata, GetUser, Userdelete };
