const express = require("express");
const {
  createCommentController,
  getCommentByIdController,
  deleteCommentController,
  updateCommentController,
} = require("../../controllers/comments/comments");

const commentRoutes = express.Router();

const protected = require("../../middlewares/protected");

//create comment
commentRoutes.post("/:id", protected, createCommentController);

//get comment by id
commentRoutes.get("/:id", getCommentByIdController);

//delete comments
commentRoutes.delete("/:id", protected, deleteCommentController);

//update comment
commentRoutes.put("/:id", protected, updateCommentController);

module.exports = commentRoutes;
