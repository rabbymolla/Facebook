const User = require("../models/userModle");

const emailVerifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const findUser = await User.findOne({ email: email });
    if (!findUser.veryfied && findUser.otp == otp) {
      await User.findOneAndUpdate(
        { email: email },
        { otp: null, veryfied: true }
      );
      res.status(200).json({
        message: "Account acctivated SuccesFull",
      });
    } else {
      res.status(404).json({
        message: "OTP is Not Maching",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Verify Date Expiard!",
    });
  }
};

module.exports = emailVerifyController;
