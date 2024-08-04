const jwt = require("jsonwebtoken");

const checkSessionCookie = (req, res, next) => {
  const token = req.cookies["x-pp-token"];

  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.loggedInUser = decoded;
    res.cookie("x-pp-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
    });
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = checkSessionCookie;
