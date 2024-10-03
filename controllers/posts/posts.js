//create post
const createPostController = async (req, res) => {
  try {
    res.json({ status: "success", user: "post created" });
  } catch (error) {
    res.json(error);
  }
};

//get all posts
const getAllPostsController = async (req, res) => {
  try {
    res.json({ status: "success", user: "all post " });
  } catch (error) {
    res.json(error);
  }
};

//get post by id
const getPostByIDController = async (req, res) => {
  try {
    res.json({ status: "success", user: "post details" });
  } catch (error) {
    res.json(error);
  }
};

//delete post
const deletePostController = async (req, res) => {
  try {
    res.json({ status: "success", user: "deleted post " });
  } catch (error) {
    res.json(error);
  }
};

//update post
const updatePostController = async (req, res) => {
  try {
    res.json({ status: "success", user: " post updated " });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIDController,
  deletePostController,
  updatePostController,
};
