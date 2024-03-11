const express = require("express");
const { createPost } = require("../controllers/post.controllers");

const router = express.Router();

router.route("/create-post").post(createPost);

module.exports = router;
