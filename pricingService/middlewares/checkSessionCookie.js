const checkSessionCookie = (req, res, next) => {
  //logggedInUser for authorization purpose
  const loggedInUser = req.headers["x-pp-user"];
  // console.log(JSON.parse(loggedInUser));

  const token = req.headers["x-pp-token"];
  const tokenExpiry = req.headers["x-pp-token-expiry"];

  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    res.cookie("x-pp-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(tokenExpiry),
    });
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = checkSessionCookie;
