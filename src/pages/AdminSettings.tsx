import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  token: string;
}

const AdminSettings: React.FC<Props> = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:3000/admin-auth/update",
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Admin credentials updated. Please login again.");

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch {
      toast.error("Failed to update admin info");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-3 max-w-md">
      <h2 className="text-xl font-bold mb-3">Update Admin Credentials</h2>
      <input
        type="text"
        placeholder="New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white py-2"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default AdminSettings;
