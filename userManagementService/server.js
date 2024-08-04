const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const sessionRoute = require("./routes/auth/session");
const checkSessionCookie = require("./middlewares/checkSessionCookie");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.disable("etag");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = await User.findOne({ username: "admin" });
    if (!admin) {
      const newAdmin = new User({
        username: "admin",
        password: "admin",
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin user created");
    } else {
      console.log("super user exists!");
    }
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Api routes
app.use("/login", loginRoute);
app.use("/session", sessionRoute);

// Protected Api routes
app.use(checkSessionCookie);
app.use("/logout", logoutRoute);
app.use("/api/v1/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`User management service is running on port ${PORT}`);
});
