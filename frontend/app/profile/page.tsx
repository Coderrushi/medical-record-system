"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  
  const getDefaultAvatar = (gender: string) => {
    if (!gender) return "/avatars/default-other.png";

    switch (gender.toLowerCase()) {
      case "male":
        return "/avatars/default-male.png";
      case "female":
        return "/avatars/default-female.png";
      default:
        return "/avatars/default-other.png";
    }
  };

  
  const reloadProfile = async () => {
    const res = await fetch("http://localhost:5094/api/Profile", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      setFullName(data.fullName || "");
      setPhone(data.phone || "");
      setGender(data.gender || "");
    }
  };

  
  useEffect(() => {
    reloadProfile().finally(() => setLoading(false));
  }, []);

 
  const handleUpdate = async () => {
    setSaving(true);

    const body = { fullName, phone, gender };

    const res = await fetch("http://localhost:5094/api/Profile/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    setSaving(false);

    if (res.ok) {
      alert("Profile updated successfully!");
      await reloadProfile(); 
    } else {
      const msg = await res.text();
      alert("Failed to update profile: " + msg);
    }
  };

 
  const handleAvatar = async () => {
    if (!newAvatar) {
      alert("Please select an avatar");
      return;
    }

    setAvatarSaving(true);

    const form = new FormData();
    form.append("file", newAvatar);

    const res = await fetch("http://localhost:5094/api/Profile/avatar", {
      method: "POST",
      body: form,
      credentials: "include",
    });

    setAvatarSaving(false);

    if (res.ok) {
      alert("Avatar updated!");

      await reloadProfile();

      
      setNewAvatar(null);
      setAvatarPreview(null);

      const input = document.getElementById("avatarUpload") as HTMLInputElement;
      if (input) input.value = "";
    } else {
      alert("Failed to update avatar");
    }
  };

  
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewAvatar(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F2F6FF] p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-[#0A3D91] mb-6">
          My Profile
        </h1>

        
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              avatarPreview ||
              profile?.avatarUrl ||
              getDefaultAvatar(profile?.gender)
            }
            className="h-32 w-32 rounded-full border shadow object-cover"
          />

          
          <input
            id="avatarUpload"
            type="file"
            className="mt-4"
            onChange={handleAvatarSelect}
          />

          <button
            onClick={handleAvatar}
            disabled={avatarSaving}
            className="mt-3 bg-[#0A3D91] text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            {avatarSaving ? "Saving..." : "Update Avatar"}
          </button>
        </div>

        
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            type="text"
            value={profile?.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

     
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

 
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

       
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

   
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full bg-[#0A3D91] text-white py-2 rounded hover:bg-blue-900"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
