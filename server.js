const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const userRoutes = require("./routes/user/users");
const postsRoutes = require("./routes/posts/posts");
const commentsRoutes = require("./routes/comments/comments");
const { globalErrorHandler } = require("./middlewares/globalHandler");
const MongoStore = require("connect-mongo");
const app = express();

require("./config/dbConnect");

//middlewares
//routes
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60 * 60,
    }),
  })
);

//user Routes
app.use("/api/users", userRoutes);

//posts routes
app.use("/api/posts", postsRoutes);

//comments routes
app.use("/api/comments", commentsRoutes);

//Error handler middleWares
app.use(globalErrorHandler);
//listen server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is UP on PORT :${PORT}`));
