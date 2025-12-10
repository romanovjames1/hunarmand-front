import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  setIsLoggedIn: (val: boolean) => void;
  setToken: (token: string) => void;
}

const AdminLogin: React.FC<Props> = ({ setIsLoggedIn, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://hunarmand.qaxramonov.uz/admin-auth/login",
        {
          username,
          password,
        }
      );
      setToken(res.data.accessToken);
      setIsLoggedIn(true);
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-5 shadow flex flex-col gap-3 w-80"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
