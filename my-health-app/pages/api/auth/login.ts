import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Mock database (replace with actual database query)
const users = [
  { username: "testuser", email: "test@example.com", password: "$2a$10$9v4RxDHTDQ5OVMb7mI5KfK8Wqq.bfiI5vQxdX6kr9VvBs1Xh/xaii" } // password is "password123"
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email, username: user.username }, "secret_key", { expiresIn: "1h" });

    // Respond with the token
    return res.status(200).json({ message: "Login successful", token });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};

export default handler;
