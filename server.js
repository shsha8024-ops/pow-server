import express from "express";
import crypto from "crypto";

const app = express();
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

app.listen(3000, () => {
  console.log("Server running");
});
