const express = require("express");
const router = express.Router();
const uploader = require("./multer");
const cloudinary = require("./cloudinary");
const InstaPost = require("./model");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/data", async (req, res) => {
  try {
    const getPost = await InstaPost.find().sort({ Date: -1 });
    res.json(getPost);
  } catch (e) {
    res.status(404).send("Sorry, cant find that");
  }
});
router.post("/form", uploader.single("file"), async (req, res) => {
  console.log(req.body, req.file);
  try {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    const data = await InstaPost.insertMany({
      file: upload.secure_url,
      Author: req.body.Author,
      Location: req.body.Location,
      Description: req.body.Description,
      Likes: Math.ceil(Math.random() * 1000),
      Date: Date.now(),
    });
    res.json({
      success: true,
      result: data,
    });
  } catch (e) {
    return res.json({
      err: e.message,
    });
  }
});
module.exports = router;
