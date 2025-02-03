const express = require("express");
const router = express.Router();
const uploadMiddelware = require("../../middelwars/uploadMiddelware");
const {
  uploadController,
  listImages,
} = require("../../controllers/uploadController");

router.post("/uploading", uploadMiddelware, uploadController);
router.post("/listimg", listImages);

module.exports = router;
