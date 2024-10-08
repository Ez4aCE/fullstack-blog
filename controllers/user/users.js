const User = require("../../models/user/user");

const bcryptjs = require("bcryptjs");
const appErr = require("../../utils/appErr");
const session = require("express-session");

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
    req.session.userAuth = userFound._id;
    console.log(req.session);

    res.json({ status: "success", user: "User logged in" });
  } catch (error) {
    res.json(error);
  }
};

//get user by id
const getUserByIdController = async (req, res, next) => {
  try {
    //user id
    const userId = req.params.id;
    //get user
    const user = await User.findById(userId);
    if (!user) {
      return next(appErr("user not found", 404));
    }

    res.json({ status: "success", data: user });
  } catch (error) {
    res.json(error);
  }
};

//user profile
const userProfileController = async (req, res) => {
  try {
    //get the logged in user
    const userId = req.session.userAuth;
    //find user
    const user = await User.findById(userId)
      .populate("posts")
      .populate("comments");

    res.json({ status: "success", data: user });
  } catch (error) {
    res.json(error);
  }
};

//update user details
const updateUserDetailsController = async (req, res, next) => {
  const { fullname, email } = req.body;
  try {
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("email already taken", 400));
      }
    }
    const user = await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        fullname,
        email,
      },
      { new: true }
    );
    res.json({ status: "success", data: user });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//profile photo upload
const profilePhotoUploadController = async (req, res) => {
  const file = req.file.path;
  console.log(file);

  try {
    //user id
    const userId = await req.session.userAuth;
    //user profile photo upload
    await User.findByIdAndUpdate(userId, { profileImage: file }, { new: true });
    res.json({ status: "success", user: "User profile photo uploaded" });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//cover photo upload
const coverPhotoUploadController = async (req, res, next) => {
  const file = req.file.path;
  try {
    //user id
    const userId = await req.session.userAuth;
    await User.findByIdAndUpdate(userId, { coverImage: file }, { new: true });

    res.json({ status: "success", user: "User cover photo upload" });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//update password
const updatePasswordController = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (!password) {
      return next(appErr("dont enter empyty password"));
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await User.findByIdAndUpdate(
      req.session.userAuth,
      { password: hashedPassword },
      { new: true }
    );

    res.json({ status: "success", message: "password updated" });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//logout
const logoutController = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Logout failed");
      }

      res.clearCookie("connect.sid");
    });
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
  updateUserDetailsController,
};
