const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const pricingRoute = require("./routes/pricingRoutes");
const checkSessionCookie = require("./middlewares/checkSessionCookie");

dotenv.config();

const app = express();
app.use(express.json());

app.disable("etag");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Protected Api routes
app.use(checkSessionCookie);
app.use("/api/v1/pricing", pricingRoute);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Product pricing service is running on port ${PORT}`);
});
