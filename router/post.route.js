const express = require("express");
const { createPost, getPosts } = require("../controllers/post.controllers");

const router = express.Router();

router.route("/create-post").post(createPost);
router.route("/all-posts").get(getPosts);

module.exports = router;
