//create comment
const createCommentController = async (req, res) => {
  try {
    res.json({ status: "success", user: "comments created" });
  } catch (error) {
    res.json(error);
  }
};

//get comment by id
const getCommentByIdController = async (req, res) => {
  try {
    res.json({ status: "success", user: "comments details" });
  } catch (error) {
    res.json(error);
  }
};

//delete comment
const deleteCommentController = async (req, res) => {
  try {
    res.json({ status: "success", user: "deleted comments" });
  } catch (error) {
    res.json(error);
  }
};

//update comment
const updateCommentController = async (req, res) => {
  try {
    res.json({ status: "success", user: " comment updated " });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createCommentController,
  getCommentByIdController,
  deleteCommentController,
  updateCommentController,
};
