import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [
  { username: "user1", password: bcrypt.hashSync("password1", 10) },
  { username: "user2", password: bcrypt.hashSync("password2", 10) },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
