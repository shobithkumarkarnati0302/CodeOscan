function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : undefined;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const jwt = require("jsonwebtoken");
    const secret = process.env.JWT_SECRET || "";
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { requireAuth };
