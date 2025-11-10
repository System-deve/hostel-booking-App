import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/payments", (req, res) => {
  const { method, phone, amount } = req.body;
  console.log(`Processing ${method} payment for ${phone} - UGX ${amount}`);
  res.json({ message: `Payment of UGX ${amount} via ${method} successful!` });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
