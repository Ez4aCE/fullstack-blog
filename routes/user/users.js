const express = require("express");
const multer = require("multer");

const {
  registerController,
  loginController,
  getUserByIdController,
  userProfileController,
  profilePhotoUploadController,
  coverPhotoUploadController,
  updatePasswordController,
  logoutController,
  updateUserDetailsController,
} = require("../../controllers/user/users");

const userRoutes = express.Router();

const protected = require("../../middlewares/protected");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = require("../../config/cloudinary");

const upload = multer({ storage });

//register
userRoutes.post("/register", registerController);

//login
userRoutes.post("/login", loginController);

//get profile
userRoutes.get("/profile", protected, userProfileController);

//user update details
userRoutes.post("/update", protected, updateUserDetailsController);

//profile photo upload
userRoutes.put(
  "/profile-photo-upload",
  protected,
  upload.single("profile"),
  profilePhotoUploadController
);

//cover photo upload
userRoutes.put(
  "/cover-photo-upload",
  upload.single("cover"),
  protected,
  coverPhotoUploadController
);

//update password
userRoutes.put("/update-password", protected, updatePasswordController);

//user logout
userRoutes.post("/logout", protected, logoutController);
//get user by id
userRoutes.get("/:id", getUserByIdController);

module.exports = userRoutes;
