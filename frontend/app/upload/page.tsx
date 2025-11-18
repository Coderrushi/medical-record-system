"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    // Max file size limit (20 MB)
    if (file.size > 20 * 1024 * 1024) {
      setError("File too large! Max 20 MB allowed.");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5094/api/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Upload failed.");
        setUploading(false);
        return;
      }

      // Redirect after success
      router.push("/files");
    } catch (e) {
      setError("Something went wrong.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white w-full max-w-xl p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Medical File</h1>

        {/* File Input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border w-full p-2 rounded mb-4"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-4">
            <strong>Selected:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
