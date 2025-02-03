require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers");
const mongoConfi = require("./Config/mongoConfig");
const fileUpload = require("express-fileupload");
const app = express();

mongoConfi();
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Port Runing....");
});
