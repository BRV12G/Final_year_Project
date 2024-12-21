import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

// Mock database (You can replace this with actual database logic)
const users = [];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);

    // Respond with success message
    return res.status(201).json({ message: "User registered successfully" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};

export default handler;
