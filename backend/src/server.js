const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

// Debug env loading
console.log('Environment check:', {
  hasGoogleKey: !!process.env.GOOGLE_AI_API_KEY,
  keyLength: process.env.GOOGLE_AI_API_KEY?.length || 0
});

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Root message for quick confirmation in the browser
app.get("/", (_req, res) => {
  res.send(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CodeOscan API</title>
      <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 40px; background: #f6f7f9; color: #111827; }
        .card { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        h1 { margin: 0 0 8px; font-size: 24px; }
        p { margin: 0 0 12px; color: #4b5563; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
        .muted { color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✅ CodeOscan Backend is Running</h1>
        <p>Your API server is up. Try the health endpoint at <code>/api/health</code>.</p>
        <p class="muted">Base URL: <code>http://localhost:${process.env.PORT || 3001}</code></p>
      </div>
    </body>
  </html>`);
});

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const MONGODB_URI = process.env.MONGODB_URI || "";

(async () => {
  try {
    if (!MONGODB_URI) {
      console.warn("MONGODB_URI is not set. The server will start, but DB operations will fail.");
    } else {
      await connectDB(MONGODB_URI);
    }
  } catch (err) {
    console.error("DB init failed", err);
  }

  app.listen(PORT, () => {
    console.log(`Backend server running  port http://localhost:${PORT}`);
  });
})();
