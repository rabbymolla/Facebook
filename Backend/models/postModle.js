const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const postModle = new Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "coverPhoto", null],
      default: null,
    },
    images: {
      type: Array,
    },
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "users",
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentedById: {
          type: ObjectId,
          ref: "users",
        },
        commentedAt: {
          type: Date,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("posts", postModle);
