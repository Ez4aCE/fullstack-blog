const Comment = require("../../models/comment/comment");
const Post = require("../../models/post/post");
const User = require("../../models/user/user");
const appErr = require("../../utils/appErr");

//create comment
const createCommentController = async (req, res, next) => {
  const { message } = req.body;
  try {
    if (!message || message.trim() === "") {
      return next(appErr("Empty comment not allowed", 400));
    }

    // Find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(appErr("Post not found", 404));
    }
    //user id
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);

    //create comment
    const commentCreated = await Comment.create({ user: userId, message });

    await userFound.comments.push(commentCreated._id);
    await userFound.save({ validateBeforeSave: false });
    await post.comments.push(commentCreated._id);
    await post.save({ validateBeforeSave: false });
    res.json({ status: "success", data: commentCreated });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//get comment by id
const getCommentByIdController = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json({ status: "success", data: comment });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//delete comment
const deleteCommentController = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.session.userAuth;
  try {
    if (!commentId) {
      return next(appErr("empty id"));
    }
    const comment = await Comment.findById(commentId);
    if (userId.toString() === comment.user.toString()) {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      res.json({ status: "success", data: "deleted comment succesfully " });
    } else {
      return next(appErr("you cannot deleted soomeElse's post"));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

//update comment
const updateCommentController = async (req, res, next) => {
  const { message } = req.body;
  try {
    const userId = await req.session.userAuth;

    const commentId = await req.params.id;
    const comment = await Comment.findById(commentId);
    if (userId.toString() === comment.user.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(
        comment,
        {
          message,
        },
        { new: true }
      );
      res.json({ status: "success", data: updatedComment });
    } else {
      return next(appErr("you cannot update soomeElse's post"));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  createCommentController,
  getCommentByIdController,
  deleteCommentController,
  updateCommentController,
};
