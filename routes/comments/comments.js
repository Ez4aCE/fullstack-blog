const express = require("express");
const {
  createCommentController,
  getCommentByIdController,
  deleteCommentController,
  updateCommentController,
} = require("../../controllers/commnets/comments");

const commenstRoutes = express.Router();

//create comment
commenstRoutes.post("/", createCommentController);

//get comment by id
commenstRoutes.get("/:id", getCommentByIdController);

//delete comments
commenstRoutes.delete("/:id", deleteCommentController);

//update comment
commenstRoutes.put("/:id", updateCommentController);

module.exports = commenstRoutes;
