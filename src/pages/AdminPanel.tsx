import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminCategory from "./AdminCategory";
import AdminProducts from "./AdminProducts";
import AdminSettings from "./AdminSettings";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "category" | "products" | "settings"
  >("category");

  if (!isLoggedIn) {
    return <AdminLogin setIsLoggedIn={setIsLoggedIn} setToken={setToken} />;
  }

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          className={`px-4 py-2 ${
            activeTab === "category" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("category")}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "settings" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Admin Settings
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white ml-auto"
          onClick={() => {
            setIsLoggedIn(false);
            setToken(null);
          }}
        >
          Logout
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow p-5">
        {activeTab === "category" && token && <AdminCategory token={token} />}
        {activeTab === "products" && token && <AdminProducts token={token} />}
        {activeTab === "settings" && token && <AdminSettings token={token} />}
      </div>
    </div>
  );
};

export default AdminPanel;
