const express = require("express");
const multer = require("multer");
const protected = require("../../middlewares/protected");
const {
  createPostController,
  getAllPostsController,
  getPostByIDController,
  deletePostController,
  updatePostController,
} = require("../../controllers/posts/posts");

const postsRoutes = express.Router();

const storage = require("../../config/cloudinary");

//instance of multer
const upload = multer({ storage });

//create post
postsRoutes.post("/", protected, upload.single("image"), createPostController);

//get all posts
postsRoutes.get("/", getAllPostsController);

//get post by id
postsRoutes.get("/:id", getPostByIDController);

//delete post
postsRoutes.delete("/:id", protected, deletePostController);

//update post
postsRoutes.put(
  "/:id",
  protected,
  upload.single("image"),
  updatePostController
);

module.exports = postsRoutes;
