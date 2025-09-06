const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User } = require("../models/User");

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
});

async function register(req, res) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const { email, password, fullName } = parsed.data;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, passwordHash, fullName });

    return res.status(201).json({ id: user._id, email: user.email, fullName: user.fullName });
  } catch (err) {
    console.error("Register error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function login(req, res) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id: String(user._id) }, secret, { expiresIn: "7d" });

    return res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName } });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function me(req, res) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : undefined;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const secret = process.env.JWT_SECRET || "";
    const payload = jwt.verify(token, secret);

    const user = await User.findById(payload.id).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ id: user._id, email: user.email, fullName: user.fullName, avatarUrl: user.avatarUrl });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { register, login, me };
