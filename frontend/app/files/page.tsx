"use client";

import { useEffect, useState } from "react";

interface MedicalFile {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedAt: string;
}

export default function FilesPage() {
  const [files, setFiles] = useState<MedicalFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const loadFiles = async () => {
    try {
      const res = await fetch("http://localhost:5094/api/files", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setError("Failed to load files.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setFiles(data);
      setLoading(false);
    } catch (e) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  
  const handleDownload = (id: number) => {
    window.location.href = `http://localhost:5094/api/files/download/${id}`;
  };

  
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`http://localhost:5094/api/files/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Failed to delete");
        return;
      }

      
      loadFiles();
    } catch (e) {
      alert("Error deleting file");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          My Medical Files
        </h1>

        
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        
        {!loading && files.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No files uploaded yet.</p>
            <a
              href="/upload"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload File
            </a>
          </div>
        )}

        
        {files.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">File Name</th>
                <th className="p-3">Size</th>
                <th className="p-3">Uploaded</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {files.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="p-3">{f.fileName}</td>
                  <td className="p-3">
                    {(f.fileSize / 1024 / 1024).toFixed(2)} MB
                  </td>
                  <td className="p-3">
                    {new Date(f.uploadedAt).toLocaleString()}
                  </td>

                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => handleDownload(f.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => handleDelete(f.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        
        <div className="text-center mt-6">
          <a
            href="/upload"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload New File
          </a>
        </div>
      </div>
    </div>
  );
}
