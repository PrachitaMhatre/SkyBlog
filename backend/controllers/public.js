import PostModel from "../models/Blog.js";

const GetSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received Post ID:", id); //

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required" });
    }

    const post = await PostModel.findById(id).populate({
      path: "comments",
      populate: { path: "userId", select: "FullName profile email" },
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, Post: post });
  } catch (error) {
    console.error("Backend Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};
export { GetSinglePost };
