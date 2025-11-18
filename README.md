Medical Record System – A Full Stack Project

A complete medical record management system built using:

🟦 ASP.NET Core Web API
🟨 Next.js 14 (App Router)
📦 SQL Server
🔐 Cookie-based Authentication
📄 File Upload, Preview (PDF/Image), Download
👤 Profile + Avatar Management

🚀 Features
🔹 Authentication
Register / Login / Logout
HttpOnly Cookie Authentication
Password hashing using Identity
🔹 User Profile
Update Full Name, Phone, Gender
Upload Avatar (JPG/PNG)
Default avatar based on gender
🔹 File Management
Upload medical documents (PDF, Images)
File Type + Display Name stored in DB
File preview inside modal (PDF/image)
Download + Delete files
Secure access (only owner can view)
🔹 Modern Dashboard
Responsive UI (Tailwind CSS)
Medical file grid view
User profile summary card

Backend Setup (ASP.NET Core)
📌 1. Open backend folder
cd backend/medical-record-system-backend
📌 2. Update SQL Server connection in appsettings.json
"DefaultConnection": "Server=YOUR_SERVER;Database=MedicalDb;Trusted_Connection=True;TrustServerCertificate=True"
📌 3. Run migrations
Add-Migration InitialCreate
Update-Database
📌 4. Run backend
dotnet run
Backend runs at:
👉 http://localhost:5094
Swagger:
👉 http://localhost:5094/swagger

⚙️ Frontend Setup (Next.js 14)
📌 1. Open frontend folder
cd frontend/medical-dashboard
📌 2. Install dependencies
npm install
Ensure Node v20+ is installed.
📌 3. Start dev server
npm run dev
Frontend opens at:
👉 http://localhost:3000

🔐 User Flows
Signup → Login → Dashboard → Upload Files → Preview → Download → Delete
Everything is protected using cookie authentication.
