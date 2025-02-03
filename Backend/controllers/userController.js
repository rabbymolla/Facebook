const userModle = require("../models/userModle");
const validationEmail = require("../helpers/validationEmail");
const validationName = require("../helpers/validationName");
const validationUserName = require("../helpers/validationUserName");
const bcrypt = require("bcrypt");
//const jwToken = require("../helpers/token");
const otpGenerator = require("otp-generator");
const sendVerifideEmail = require("../helpers/mailer");

const userController = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      dateOfDay,
      dateOfMonth,
      dateOfYear,
      gender,
      veryfied,
    } = req.body;

    if (!validationEmail(email)) {
      return res.status(404).json({
        message: "Invalid Email Address!",
      });
    }
    if (!validationName(fname, 1, 15)) {
      return res.status(404).json({
        message: "FirstName should be minimum 1 and max 15 Charactera!",
      });
    }
    if (!validationName(lname, 3, 15)) {
      return res.status(404).json({
        message: "LastName should be minimum 3 and max 15 Charactera!",
      });
    }
    if (!validationName(password, 8, 40)) {
      return res.status(404).json({
        message: "Password should be minimum 8 Charactera!",
      });
    }

    const chickEmail = await userModle.find({ email: email });

    if (chickEmail.length > 0) {
      return res.status(404).json({
        message: `${email} in used`,
      });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const tempUserName = fname + lname;
    let finalUser = await validationUserName(tempUserName);

    const otp = otpGenerator.generate(
      6,
      {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      },
      "30m"
    );

    const user = await new userModle({
      fname,
      lname,
      userName: finalUser,
      email,
      otp: otp,
      password: hashPass,
      dateOfDay,
      dateOfMonth,
      dateOfYear,
      gender,
      veryfied,
    }).save();

    // const emailToken = jwToken({ id: user._id.toString() }, "30m");
    //const url = `${process.env.BASE_URL}/${otp}`;
    //const url = `${otp}`;
    sendVerifideEmail(user.email, user.fname, otp);

    const userOtp = otpGenerator.generate(
      6,
      {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      },
      "7d"
    );

    res.send({
      id: user._id,
      userName: user.userName,
      fname: user.fname,
      lname: user.lname,
      coverPhoto: user.coverPhoto,
      friends: user.friends,
      followers: user.followers,
      profilePicture: user.profilePicture,
      otp: userOtp,
      veryfied: user.veryfied,
      message: "Plz Active Your Email Verify",
    });
  } catch (error) {
    res.status(404).json({
      message: "Can not Create User!",
    });
  }
};

module.exports = userController;
//console.log((+new Date() * Math.random()).toString().substring(0, 1));
