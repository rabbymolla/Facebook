const express = require("express");
const router = express.Router();
const api = require("./api/index");

const apiUrl = process.env.BASW_API_URL;

router.use(apiUrl, api);

module.exports = router;
