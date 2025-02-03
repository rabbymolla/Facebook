const userModle = require("../models/userModle");
const otpGenerator = require("otp-generator");
const sendVerifideEmail = require("../helpers/mailer");

const resendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModle.findOne({ email: email });

    const otp = otpGenerator.generate(
      6,
      {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      },
      "30m"
    );

    sendVerifideEmail(user.email, user.fname, otp);

    if (user) {
      await userModle.findOneAndUpdate(
        { email: email },
        { $set: { otp: otp, veryfied: false } },
        { new: true }
      );
      res.send({ message: "Plz check your email inbox" });
    } else {
      return res.status(404).json({
        message: "Incorrect Your Email!",
      });
    }
    // console.log(data);
  } catch (error) {
    res.status(404).json({
      message: "Invalid Your ID!",
    });
  }
};
module.exports = resendOTPController;
