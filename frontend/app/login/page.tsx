"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5094/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen">

      
      <div className="w-full bg-[#0A3D91] py-4 flex justify-center shadow-md">
        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
      </div>

      
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-xl rounded-xl p-8 w-[420px]">

          <h2 className="text-center text-2xl font-bold text-[#0A3D91] mb-6">
            Login to Your Account
          </h2>

          
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-6"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          
          <button
            onClick={handleLogin}
            className="w-full bg-[#0A3D91] text-white py-2 rounded hover:bg-blue-900 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
