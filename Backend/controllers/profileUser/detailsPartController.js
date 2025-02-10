const userModle = require("../../models/userModle");

const detailsPartController = async (req, res) => {
  try {
    const { id, infos } = req.body;

    const data = await userModle.findByIdAndUpdate(
      { _id: id },
      { $set: { details: infos } },
      { new: true }
    );
    //console.log(data);
    res.json(data.details);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = detailsPartController;
