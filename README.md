# 👗 AI Fashion Sales Assistant

An AI-powered Fashion Sales Assistant that helps customers discover products, receive personalized recommendations, track orders, and interact with an intelligent chatbot. The project combines **React**, **Node.js**, **Express**, **MongoDB**, **OpenAI/Groq API**, and **LangChain** to provide a smart shopping experience.

---

## 📌 Features

### Customer Features
- 🤖 AI-powered chatbot
- 👗 Browse fashion products
- 🔍 Search products by name, category, color, or price
- 💡 Personalized product recommendations
- ❤️ Friendly conversational shopping experience
- 📦 Order tracking
- 🚚 Delivery information
- 📋 FAQs support

### Admin Features
- Product management
- Customer management
- Order management
- MongoDB database integration

### AI Features
- Intent Detection
- Sentiment Analysis
- Context-aware conversations
- Product recommendation engine
- LangChain integration
- LLM-powered response generation

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- dotenv

## AI

- LangChain
- OpenAI API (or Groq API)
- Intent Detection
- Sentiment Analysis

---

# 📂 Project Structure

```
AI_fashion_Sales_Assistant/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── docs/
├── presentation/
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/AI_fashion_Sales_Assistant.git
```

```bash
cd AI_fashion_Sales_Assistant
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

# 🗄 Database Setup

Install:

- MongoDB Community Server
- MongoDB Compass (Optional)

Start MongoDB service.

Create `.env` inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/ai_fashion

OPENAI_API_KEY=your_api_key
```

---

# 🌱 Seed Database

```bash
cd backend

node seed.js
```

This will create:

- Products
- Customers
- Orders

---

# ▶️ Run Backend

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm run dev
```

Application:

```
http://localhost:5173
```

---

# 🤖 AI Configuration

The chatbot supports:

- OpenAI API

or

- Groq API

To use Groq:

```javascript
configuration: {
    baseURL: "https://api.groq.com/openai/v1",
}
```

Replace the API key inside `.env`.

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/login
POST /api/auth/register
```

## Products

```
GET /api/products
GET /api/products/:id
```

## Customers

```
GET /api/customers
POST /api/customers
```

## Orders

```
GET /api/orders
POST /api/orders
```

## AI Chat

```
POST /api/chat
```

---

# 💬 Example Chat

Customer:

```
Show me black dresses under Rs 5000
```

Assistant:

```
Here are some black dresses available under Rs 5000...
```

---

# 📦 Sample Data

The seeded database contains:

- 27 Fashion Products
- 6 Customers
- 4 Orders

including edge cases such as:

- Out-of-stock products
- Clearance items
- New arrivals
- Premium collections

---

# 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/

Home.png

Chatbot.png

Products.png

Orders.png
```

---

# 🚀 Future Improvements

- Voice Assistant
- Image-based Product Search
- Wishlist
- Payment Gateway
- Admin Dashboard
- Recommendation System using Embeddings
- RAG Integration
- Multi-language Support

---

# 📄 License

This project is created for educational and portfolio purposes.

MIT License.
