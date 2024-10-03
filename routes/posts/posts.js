const express = require("express");
const {
  createPostController,
  getAllPostsController,
  getPostByIDController,
  deletePostController,
  updatePostController,
} = require("../../controllers/posts/posts");

const postsRoutes = express.Router();

//create post
postsRoutes.post("/", createPostController);

//get all posts
postsRoutes.get("/", getAllPostsController);

//get post by id
postsRoutes.get("/:id", getPostByIDController);

//delete post
postsRoutes.delete("/:id", deletePostController);

//update post
postsRoutes.put("/:id", updatePostController);

module.exports = postsRoutes;
