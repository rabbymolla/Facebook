const userModle = require("../../models/userModle");

const coverPhotoController = async (req, res) => {
  try {
    const { id, url } = req.body;

    const data = await userModle.findByIdAndUpdate(
      { _id: id },
      { $set: { coverPhoto: url } }
    );
    //console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = coverPhotoController;
