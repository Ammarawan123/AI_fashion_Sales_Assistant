# Deployment Guide

## Project Name

AI Fashion Sales Assistant

## Description

This guide explains how to set up and run the AI Fashion Sales Assistant project locally. The project uses React.js for frontend, Node.js and Express.js for backend, and MongoDB for database.

---

## 1. Requirements

Install the following tools before running the project:

- Node.js
- npm
- Git
- VS Code
- MongoDB Atlas account
- Web browser

---

## 2. Clone Repository

```bash
git clone https://github.com/Ammarawan123/AI_fashion_Sales_Assistant.git
```

Go to project folder:

```bash
cd AI_fashion_Sales_Assistant
```

---

## 3. Backend Setup

Go to backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Important:

- Do not upload `.env` file to GitHub.
- Do not share real database username or password.
- MongoDB URI must start with `mongodb://` or `mongodb+srv://`.

Run backend:

```bash
npm start
```

Expected output:

```text
Server running on port 5000
MongoDB Connected: your_cluster_url
```

Backend will run on:

```text
http://localhost:5000
```

---

## 4. Frontend Setup

Open another terminal.

Go to frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend usually runs on:

```text
http://localhost:5173
```

---

## 5. MongoDB Atlas Setup

If team MongoDB URI is not available, create a temporary MongoDB Atlas database.

Steps:

1. Create MongoDB Atlas account.
2. Create a free cluster.
3. Create database user.
4. Add IP address in Network Access.
5. Copy connection string.
6. Paste connection string in backend `.env` file.

Example `.env` format:

```env
PORT=5000
MONGO_URI=mongodb://username:password@cluster-url/ai_fashion_sales_assistant
```

Do not use real credentials in documentation.

---

## 6. API Testing

After backend starts, test root API:

```bash
http://localhost:5000/
```

Expected output:

```text
Backend is running
```

Main API modules:

```text
/api/auth
/api/products
/api/customers
/api/orders
/api/chat
```

---

## 7. Common Backend Commands

Install packages:

```bash
npm install
```

Start backend:

```bash
npm start
```

Start backend in development mode:

```bash
npm run dev
```

---

## 8. Common Frontend Commands

Install packages:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

---

## 9. Troubleshooting

### Error: MONGO_URI is not defined

Reason:

`.env` file is missing or MONGO_URI is empty.

Fix:

Create `.env` file inside backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### Error: Invalid scheme

Reason:

MongoDB URI does not start with `mongodb://` or `mongodb+srv://`.

Fix:

Use correct MongoDB connection string.

---

### Error: querySrv ECONNREFUSED

Reason:

Network or DNS is blocking MongoDB SRV lookup.

Fix:

- Add IP address in MongoDB Atlas Network Access.
- Try mobile hotspot.
- Use Legacy URI String from MongoDB Atlas.
- Use connection string that starts with `mongodb://`.

---

### Error: Route not found

Reason:

Wrong API endpoint is used.

Fix:

Check `API_DOCUMENTATION.md` for correct endpoint.

---

## 10. Production Deployment Suggestion

Frontend can be deployed on:

- Vercel
- Netlify

Backend can be deployed on:

- Render
- Railway

Database can be deployed on:

- MongoDB Atlas

Before production deployment:

- Use secure environment variables.
- Do not expose API keys.
- Enable proper authentication.
- Use production MongoDB database.
- Test all API endpoints.

---

## 11. Current Deployment Status

The current project can run locally with:

- Backend on port 5000
- Frontend using Vite development server
- MongoDB Atlas as cloud database

Instagram DM API, WhatsApp Business API, and OpenAI API integrations are planned project features and may require additional API keys and configuration.