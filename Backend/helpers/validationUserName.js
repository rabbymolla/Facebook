const userModle = require("../models/userModle");

const validationUserName = async (userName) => {
  let isTrue = false;
  do {
    let Userdata = await userModle.findOne({ userName: userName });
    if (Userdata) {
      userName += (+new Date() * Math.random()).toString().substring(0, 1);

      isTrue = true;
    } else {
      isTrue = false;
    }
  } while (isTrue);
  return userName;
};

module.exports = validationUserName;
