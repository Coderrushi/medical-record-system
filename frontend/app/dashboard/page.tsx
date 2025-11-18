"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewBlobUrl, setViewBlobUrl] = useState<string | null>(null);
  const [viewMime, setViewMime] = useState<string>("");

  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [viewType, setViewType] = useState<string>("");

  // Default avatar
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

  
  useEffect(() => {
    loadProfile();
    loadFiles();
  }, []);

  const loadProfile = async () => {
    const res = await fetch("http://localhost:5094/api/Profile", { credentials: "include" });
    if (res.ok) setProfile(await res.json());
    setLoading(false);
  };

  const loadFiles = async () => {
    const res = await fetch("http://localhost:5094/api/files", { credentials: "include" });
    if (res.ok) setFiles(await res.json());
  };


  const handleFileSelect = (e: any) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };


  const handleUpload = async () => {
    if (!selectedFile || !fileType || !fileName) {
      alert("Please fill all fields.");
      return;
    }

    const form = new FormData();
    form.append("file", selectedFile);
    form.append("fileType", fileType);
    form.append("displayName", fileName);

    const res = await fetch("http://localhost:5094/api/files/upload", {
      method: "POST",
      credentials: "include",
      body: form,
    });

    if (res.ok) {
      alert("File uploaded!");

      
      setFileName("");
      setFileType("");
      setSelectedFile(null);
      setPreviewUrl(null);
      (document.getElementById("chooser") as HTMLInputElement).value = "";

      loadFiles();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`http://localhost:5094/api/files/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) loadFiles();
  };

  
  const handleView = async (fileId: number) => {
    
    if (viewBlobUrl) {
      URL.revokeObjectURL(viewBlobUrl);
      setViewBlobUrl(null);
      setViewMime("");
    }

    try {
      const res = await fetch(`http://localhost:5094/api/files/preview/${fileId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        alert("Failed to fetch preview");
        return;
      }

    
      const blob = await res.blob();

      let mime = blob.type || res.headers.get("content-type") || "application/octet-stream";
      setViewMime(mime);

      
      const url = URL.createObjectURL(blob);
      setViewBlobUrl(url);
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    }
  };


  const handleLogout = async () => {
    await fetch("http://localhost:5094/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-[#F2F6FF]">

      
      <div className="w-full bg-[#0A3D91] py-4 px-8 flex items-center justify-between">
        <img src="/logo.png" className="w-14" />

        <div className="flex items-center gap-5">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>

          <img
            src={profile?.avatarUrl || getDefaultAvatar(profile?.gender)}
            className="w-12 h-12 rounded-full border-2 border-yellow-500 cursor-pointer"
            onClick={() => (window.location.href = "/profile")}
          />
        </div>
      </div>

     
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="text-center mb-4">
            <img
              src={profile?.avatarUrl || getDefaultAvatar(profile?.gender)}
              className="w-28 h-28 rounded-full mx-auto shadow object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-center text-[#0A3D91]">
            {profile.fullName}
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
          </div>

          <button
            onClick={() => (window.location.href = "/profile")}
            className="mt-5 w-full bg-[#0A3D91] text-white py-2 rounded"
          >
            Update Profile
          </button>
        </div>

        
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#0A3D91] mb-4">Add Your Medical Records</h2>

          <label className="text-sm font-semibold">File Type</label>
          <select className="w-full p-2 border rounded mb-4" value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <option value="">Choose</option>
            <option value="Report">Lab Report</option>
            <option value="Prescription">Prescription</option>
            <option value="Scan">Scan</option>
            <option value="Other">Other</option>
          </select>

          <label className="text-sm font-semibold">File Name</label>
          <input
            className="w-full p-2 border rounded mb-4"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g., Blood Test Report"
          />

          <input
            id="chooser"
            type="file"
            className="w-full p-2 border rounded mb-4"
            onChange={handleFileSelect}
          />

       
          {previewUrl && (
            <div className="mb-3 p-3 border rounded bg-gray-50">
              <p className="font-semibold mb-2">Preview:</p>

              {selectedFile?.type.startsWith("image/") ? (
                <img src={previewUrl} className="h-40 object-contain rounded" />
              ) : selectedFile?.type === "application/pdf" ? (
                <embed src={previewUrl} className="h-40 w-full" />
              ) : (
                <p>No preview available</p>
              )}
            </div>
          )}

          <button className="w-full bg-[#0A3D91] text-white py-2 rounded" onClick={handleUpload}>
            Submit
          </button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="text-lg font-bold text-[#0A3D91] mb-4">Your Uploaded Files</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div key={file.id} className="bg-white p-4 shadow rounded-lg text-center">

              <div className="h-40 bg-gray-100 flex items-center justify-center rounded">
                <p className="text-gray-700">{file.displayName}</p>
              </div>

              <div className="mt-4 flex justify-between">
                
               
                <button
                  onClick={() => handleView(file.id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  View
                </button>

                
                <a
                  href={`http://localhost:5094/api/files/download/${file.id}`}
                  download
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Download
                </a>

             
                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      
      {viewBlobUrl && (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => {
                
                if (viewBlobUrl) URL.revokeObjectURL(viewBlobUrl);
                setViewBlobUrl(null);
                setViewMime("");
              }}
            >
              Close
            </button>
          </div>

          
          {viewMime.includes("pdf") ? (
            <iframe src={viewBlobUrl} className="w-full h-[80vh] border" />
          ) : viewMime.startsWith("image/") ? (
            <img src={viewBlobUrl} className="max-h-[80vh] mx-auto rounded" />
          ) : (
            <div>
              <p className="mb-3">Preview not available for this file type.</p>
              <a href={viewBlobUrl} download className="bg-yellow-500 text-white px-4 py-2 rounded">
                Download file
              </a>
            </div>
          )}
        </div>
      </div>
    )}

    </div>
  );
}
