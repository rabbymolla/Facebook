const userModle = require("../../models/userModle");
const Post = require("../../models/postModle");

const getUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const getProfile = await userModle
      .findOne({ userName })
      .select("-password");

    if (!getProfile) {
      return res.json({
        ok: false,
      });
    }

    const posts = await Post.find({ user: getProfile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ ...getProfile.toObject(), posts });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = getUser;
