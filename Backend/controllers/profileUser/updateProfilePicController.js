const userModle = require("../../models/userModle");
const updateProfilePicController = async (req, res) => {
  try {
    const { id, url } = req.body;

    const data = await userModle.findByIdAndUpdate(
      { _id: id },
      { $set: { profilePicture: url } }
    );
    //console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = updateProfilePicController;
