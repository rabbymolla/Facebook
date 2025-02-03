const Post = require("../../models/postModle");

const getPostController = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("user", "profilePicture coverPhoto fname lname userName gender")
      .sort({ createdAt: -1 });
    res.json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = getPostController;
