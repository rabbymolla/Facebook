const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const userModle = new Schema(
  {
    fname: {
      type: String,
      require: true,
      trim: true,
      text: true,
    },
    lname: {
      type: String,
      require: true,
      trim: true,
      text: true,
    },
    userName: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      text: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    otp: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      trim: true,
    },
    dateOfDay: {
      type: Number,
      trim: true,
      require: true,
    },
    dateOfMonth: {
      type: Number,
      trim: true,
      require: true,
    },
    dateOfYear: {
      type: Number,
      trim: true,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    veryfied: {
      type: Boolean,
      default: false,
    },
    friends: [{ type: ObjectId, ref: "usermodle" }],
    followers: [{ type: ObjectId, ref: "usermodle" }],
    following: [{ type: ObjectId, ref: "usermodle" }],
    request: [{ type: ObjectId, ref: "usermodle" }],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "usermodle",
          require: true,
          text: true,
        },
        createdAt: {
          type: Date,
          require: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      aotherName: {
        type: String,
      },
      job: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      school: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationShip: {
        type: String,
        enum: [
          "Single",
          "In a Relationship",
          "Married",
          "Devorced",
          "Its Complicated",
        ],
      },
      instagram: {
        type: String,
      },
    },
    savePost: [
      {
        post: {
          type: ObjectId,
          ref: "post",
        },
        saveAt: {
          type: Date,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userModle);
