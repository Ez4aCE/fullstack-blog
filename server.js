const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoutes = require("./routes/user/users");
const postsRoutes = require("./routes/posts/posts");
const commenstRoutes = require("./routes/comments/comments");
const { globalErrorHandler } = require("./middlewares/globalHandler");
const app = express();

require("./config/dbConnect");

//middlewares
//routes
app.use(express.json());
//user Routes
app.use("/api/users", userRoutes);

//posts routes
app.use("/api/posts", postsRoutes);

//comments routes
app.use("/api/comments", commenstRoutes);

//Error handler middleWares
app.use(globalErrorHandler);
//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is UP on PORT :${PORT}`));
