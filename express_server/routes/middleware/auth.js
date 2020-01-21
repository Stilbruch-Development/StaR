const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Kein JWT! Keine Autorisierung!" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "JWT ist nicht autorisiert!" });
  }
};
