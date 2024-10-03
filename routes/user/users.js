const express = require("express");
const {
  registerController,
  loginController,
  getUserByIdController,
  userProfileController,
  profilePhotoUploadController,
  coverPhotoUploadController,
  updatePasswordController,
  logoutController,
} = require("../../controllers/user/users");

const userRoutes = express.Router();

//register
userRoutes.post("/register", registerController);

//login
userRoutes.post("/login", loginController);

//get user by id
userRoutes.get("/:id", getUserByIdController);

//get profile
userRoutes.get("/profile/:id", userProfileController);

//profile photo upload
userRoutes.put("/profile-photo-upload/:id", profilePhotoUploadController);

//cover photo upload
userRoutes.put("/cover-photo-upload/:id", coverPhotoUploadController);

//update password
userRoutes.put("/update-password/:id", updatePasswordController);

//user logout

userRoutes.get("/logout", logoutController);

module.exports = userRoutes;
