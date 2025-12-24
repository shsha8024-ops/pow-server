# PoW Server (SHA-256)

Simple Proof-of-Work (PoW) server using Node.js and Express.

This project demonstrates how a backend can:
- Generate a PoW challenge
- Require the client to solve it
- Verify the solution before allowing access

---

## How it works

1. Server generates a random `salt`
2. A hidden `nonce` is chosen internally
3. The challenge is:

SHA256(salt + nonce)

4. Client must find the correct `nonce`
5. Server verifies the result

---

## API Endpoints

### GET /challenge
Returns a PoW challenge.

Response example:
```json
{
  "algorithm": "SHA-256",
  "challenge": "...",
  "salt": "...",
  "max_number": 50000
}
