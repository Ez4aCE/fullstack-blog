const Post = require("../../models/post/post");
const User = require("../../models/user/user");
const appErr = require("../../utils/appErr");

//create post
const createPostController = async (req, res, next) => {
  const { title, description, category, user } = req.body;

  try {
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //create post
    const postCreated = await Post.create({
      title,
      description,
      category,
      image: req.file.path,
      user: userId,
    });

    //add post to user posts
    await userFound.posts.push(postCreated._id);
    await userFound.save();
    res.json({ status: "success", data: postCreated });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//get all posts
const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments");
    res.json({ status: "success", data: posts });
  } catch (error) {
    res.json(error);
  }
};

//get post by id
const getPostByIDController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    await post.populate("comments");
    res.json({ status: "success", data: post });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//delete post
const deletePostController = async (req, res, next) => {
  try {
    const userId = await req.session.userAuth;

    const postId = await req.params.id;
    const post = await Post.findById(postId);
    if (userId.toString() === post.user.toString()) {
      const deletedPost = await Post.findByIdAndDelete(postId);
      res.json({ status: "success", user: "deleted post succesfully " });
    } else {
      return next(appErr("you cannot deleted soomeElse's post"));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

//update post
const updatePostController = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    const userId = await req.session.userAuth;

    const postId = await req.params.id;
    const post = await Post.findById(postId);
    if (userId.toString() === post.user.toString()) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          category,
          image: req.file.path,
        },
        { new: true }
      );
      res.json({ status: "success", data: updatedPost });
    } else {
      return next(appErr("you cannot update soomeElse's post"));
    }
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIDController,
  deletePostController,
  updatePostController,
};
