const userModle = require("../models/userModle");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModle.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect Your Credentials!",
      });
    }
    if (user.veryfied == false) {
      return res.status(404).json({
        message: "Plz verify Your account!",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(404).json({
        message: "Incorrect Your Credentials!",
      });
    }

    res.send({
      id: user._id,
      userName: user.userName,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      profilePicture: user.profilePicture,
      coverPhoto: user.coverPhoto,
      friends: user.friends,
      followers: user.followers,
      veryfied: user.veryfied,
      message: "Login Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Invalid Your ID!",
    });
  }
};
module.exports = loginController;
