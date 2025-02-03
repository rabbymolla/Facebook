const userModle = require("../models/userModle");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const sendVerifideEmail = require("../helpers/mailer");

const forgetController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModle.findOne({ email: email });
    const hashPass = await bcrypt.hash(password, 10);

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
        { $set: { password: hashPass, otp: otp, veryfied: false } },
        { new: true }
      );
      res.send({ message: "SuccessFully Update" });
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
module.exports = forgetController;
