const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connect = require("./utils/connect");
const users = require("./routes/user.route");
const posts = require("./routes/post.route");
const community = require("./routes/communtiy.route");
const comment = require("./routes/comment.route");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const passport = require("passport");
const passportStrategy = require("./passport");

dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", users);
app.use("/api/posts", posts);
app.use("/api/communities", community);
app.use("/api/comment", comment);

const port = process.env.PORT || 4000;

// Socket.IO setup
let io;
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
    connect();
  });
  
  io = socketIo(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("upvotePost", (postId) => {
      io.emit("postUpdated", postId);
    });

    socket.on("downvotePost", (postId) => {
      io.emit("postUpdated", postId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
} else {
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
    connect();
  });
}

// For Vercel, export the Express app
module.exports = app;