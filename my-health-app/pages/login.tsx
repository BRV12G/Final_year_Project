import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        router.push("/report"); // Navigate to the report page on success
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <div
        style={{
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              margin: "0.5rem 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              margin: "0.5rem 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
