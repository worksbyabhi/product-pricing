const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const sessionRoute = require("./routes/auth/session");
const pricingRoute = require("./routes/pricingRoutes");
const checkSessionCookie = require("./middlewares/checkSessionCookie");

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

app.disable("etag");

// set up cors
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["Pagination-Pages", "Pagination-Total"],
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(" not allowed by CORS"));
      }
    },
  })
);

// Connect to MongoDB
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

// Protected Api routes
app.use(checkSessionCookie);
app.use("/logout", logoutRoute);
app.use("/session", sessionRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pricing", pricingRoute);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
