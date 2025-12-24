// Proof of Work (SHA-256) demo server
// Educational project – not production security

import express from "express";
import crypto from "crypto";

const app = express();

// CORS (ضروري للمتصفح)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

const MAX = 50000;

function sha256(x) {
  return crypto.createHash("sha256").update(x).digest("hex");
}

app.get("/challenge", (req, res) => {
  const salt = crypto.randomBytes(8).toString("hex");
  const nonce = Math.floor(Math.random() * MAX);
  const challenge = sha256(salt + nonce);

  res.json({
    algorithm: "SHA-256",
    challenge,
    salt,
    max_number: MAX
  });
});

app.post("/verify", (req, res) => {
  const { salt, challenge, nonce } = req.body;
  const computed = sha256(salt + String(nonce));

  if (computed === challenge) {
    res.json({ ok: true });
  } else {
    res.status(400).json({ ok: false });
  }
});

app.listen(3000, () => {
  console.log("PoW server running");
});