const express = require("express");
const router = express.Router();
const reg = require("./auth");
const post = require("./post");
const file = require("./uploads");

router.use("/auth", reg);
router.use("/post", post);
router.use("/upload", file);

module.exports = router;
