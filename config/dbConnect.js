const { Module } = require("module");
const mongoose = require("mongoose");

const dbConnect = async () => {
  url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
