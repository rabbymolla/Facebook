const express = require("express");
const router = express.Router();
const createPostCon = require("../../controllers/postControllers/createPostCon");
const getPostController = require("../../controllers/viewPostController/getPostController");

router.post("/creactpost", createPostCon);
router.get("/viewpost", getPostController);

module.exports = router;
