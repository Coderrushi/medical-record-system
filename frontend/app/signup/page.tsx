"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  
  if (!fullName || fullName.length < 2) {
    alert("Please enter a valid full name.");
    return;
  }

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Phone number must be 10 digits.");
    return;
  }

  if (!gender) {
    alert("Please select a gender.");
    return;
  }

  if (!password || password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  
  const body = {
    FullName: fullName,
    Email: email,
    Phone: phone,
    Gender: gender,
    Password: password,
  };

  const res = await fetch("http://localhost:5094/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    alert("Account created successfully!");
    window.location.href = "/login";
  } else {
    const err = await res.text();
    alert("Signup failed: " + err);
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
            Create Your Account
          </h2>

          
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

       
          <label className="text-sm text-gray-600">Phone</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Contact number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

       
          <label className="text-sm text-gray-600">Gender</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

       
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-6"
            placeholder="Choose a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         
          <button
            onClick={handleSignup}
            className="w-full bg-[#0A3D91] text-white py-2 rounded hover:bg-blue-900 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
