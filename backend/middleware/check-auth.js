const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
      console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decruptToken = jwt.verify(token, "secret_this_should_be_longer");
    console.log(decruptToken.userId)
    req.userData = { email: decruptToken.email, userId: decruptToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth Failed!",
    });
  }
};
