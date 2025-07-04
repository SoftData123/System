// middleware/auth.js

function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
