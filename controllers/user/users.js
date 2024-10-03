const User = require("../../models/user/user");

const bcryptjs = require("bcryptjs");
const appErr = require("../../utils/appErr");

//register
const registerController = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return next(appErr("all fields are required"));
  }

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("user already Exists"));
    }
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(password, salt);
    const user = await User.create({
      fullname,
      email,
      password: passwordHashed,
    });

    res.json({ status: "success", data: user });
  } catch (error) {
    res.json(error);
  }
};

//login
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appErr("email and password field required"));
  }
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("invalid login credentials"));
    }
    const isPasswordValid = await bcryptjs.compare(
      password,
      userFound.password
    );
    if (!isPasswordValid) {
      return next(appErr("invalid login credentials"));
    }
    res.json({ status: "success", user: "User logged in" });
  } catch (error) {
    res.json(error);
  }
};

//get user by id
const getUserByIdController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User details" });
  } catch (error) {
    res.json(error);
  }
};

//user profile
const userProfileController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User profile" });
  } catch (error) {
    res.json(error);
  }
};

//profile photo upload
const profilePhotoUploadController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User profile photo upload" });
  } catch (error) {
    res.json(error);
  }
};

//cover photo upload
const coverPhotoUploadController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User cover photo upload" });
  } catch (error) {
    res.json(error);
  }
};

//update password
const updatePasswordController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User password updated" });
  } catch (error) {
    res.json(error);
  }
};

//logout
const logoutController = async (req, res) => {
  try {
    res.json({ status: "success", user: "User logout" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  registerController,
  loginController,
  getUserByIdController,
  userProfileController,
  profilePhotoUploadController,
  coverPhotoUploadController,
  updatePasswordController,
  logoutController,
};
