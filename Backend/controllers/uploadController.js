const cloudinary = require("cloudinary");
const fs = require("fs");
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_API_KEY,
  api_secret: process.env.CLOUDE_API_SECRET,
});

exports.uploadController = async (req, res) => {
  try {
    const { path } = req.body;
    const files = Object.values(req.files).flat();
    const images = [];
    for (const file of files) {
      const url = await uploadToClodinary(file, path);
      images.push(url);
      removeFile(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body;

  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("public_id", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const uploadToClodinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeFile(file.tempFilePath);
          res.status(404).json({
            message: "File upload field",
          });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
