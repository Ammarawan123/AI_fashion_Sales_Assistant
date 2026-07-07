# Test Report

## Project Name

AI Fashion Sales Assistant

## Prepared By

Documentation & Quality Assurance Team

## Purpose

The purpose of this test report is to verify that the main modules of the AI Fashion Sales Assistant are working correctly. The testing focuses on backend APIs, MongoDB connection, product management, customer management, order management, chatbot responses, and basic system behavior.

---

## 1. Testing Environment

| Item | Details |
|---|---|
| Operating System | Windows |
| Code Editor | Visual Studio Code |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB Atlas |
| API Testing Tool | PowerShell / Invoke-RestMethod |
| Backend Port | 5000 |
| Base URL | http://localhost:5000 |

---

## 2. Modules Tested

The following modules were tested:

- Backend server
- MongoDB database connection
- Product APIs
- Customer APIs
- Order APIs
- Chatbot API
- Basic route handling
- Frontend dashboard

---

## 3. Backend Server Testing

| Test Case ID | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| BE-01 | Start backend using `npm start` | Server should run on port 5000 | Server started successfully | Pass |
| BE-02 | Connect MongoDB Atlas | Database should connect successfully | MongoDB connected successfully | Pass |
| BE-03 | Open root route `/` | Should show backend running message | Backend is running | Pass |

---

## 4. Product API Testing

| Test Case ID | API | Method | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| PROD-01 | `/api/products/add` | POST | Product should be added | Product added successfully | Pass |
| PROD-02 | `/api/products/all` | GET | Product list should be displayed | Product list displayed | Pass |
| PROD-03 | `/api/products/:id` | GET | Single product should be displayed | Not fully tested | Pending |
| PROD-04 | `/api/products/:id` | PUT | Product should update | Not fully tested | Pending |
| PROD-05 | `/api/products/:id` | DELETE | Product should delete | Not fully tested | Pending |

### Sample Product Used

```json
{
  "productName": "Black Embroidered Maxi",
  "category": "Women",
  "price": 4999,
  "description": "Elegant black embroidered maxi for formal and Eid wear",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black"],
  "stock": 20,
  "images": ["black-maxi.jpg"],
  "discount": 10,
  "rating": 4.5
}
```

---

## 5. Customer API Testing

| Test Case ID | API | Method | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| CUST-01 | `/api/customers/add` | POST | Customer should be added | Customer added successfully | Pass |
| CUST-02 | `/api/customers/all` | GET | Customer list should be displayed | Customer list displayed | Pass |
| CUST-03 | `/api/customers/:id` | GET | Single customer should be displayed | Not fully tested | Pending |
| CUST-04 | `/api/customers/:id` | PUT | Customer should update | Not fully tested | Pending |
| CUST-05 | `/api/customers/:id` | DELETE | Customer should delete | Not fully tested | Pending |

### Sample Customer Used

```json
{
  "name": "Ali Khan",
  "phoneNumber": "03001234567",
  "instagramId": "@ali_khan",
  "address": "Islamabad, Pakistan",
  "preferences": {
    "favoriteColor": "Black",
    "favoriteCategory": "Formal Wear",
    "budgetRange": "3000-5000"
  }
}
```

---

## 6. Order API Testing

| Test Case ID | API | Method | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| ORD-01 | `/api/orders/add` | POST | Order should be created | Order placed successfully | Pass |
| ORD-02 | `/api/orders/all` | GET | Orders should be displayed | Orders displayed with customer data | Pass |
| ORD-03 | `/api/orders/:id` | GET | Single order should be displayed | Not fully tested | Pending |
| ORD-04 | `/api/orders/:id` | PUT | Order should update | Not fully tested | Pending |
| ORD-05 | `/api/orders/:id` | DELETE | Order should delete | Not fully tested | Pending |

### Sample Order Used

```json
{
  "customerId": "customer_id_here",
  "products": [
    {
      "productId": "product_id_here",
      "quantity": 1
    }
  ],
  "status": "Pending",
  "paymentStatus": "Unpaid",
  "trackingNumber": "TRK123456"
}
```

---

## 7. Chatbot API Testing

| Test Case ID | Query | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| CHAT-01 | hi | Greeting response | Greeting response received | Pass |
| CHAT-02 | price | Price response | Not fully tested | Pending |
| CHAT-03 | delivery | Delivery response | Not fully tested | Pending |
| CHAT-04 | order | Order instruction response | Not fully tested | Pending |
| CHAT-05 | random message | Sorry response | Not fully tested | Pending |

---

---

## 8. Frontend Testing

| Test Case ID | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| FE-01 | Install frontend dependencies using `npm install` | Dependencies should install successfully | Dependencies installed successfully | Pass |
| FE-02 | Run frontend using `npm run dev` | Frontend should start on Vite server | Frontend started successfully | Pass |
| FE-03 | Open `http://localhost:5173/` | Dashboard should load | FashionHub AI dashboard loaded successfully | Pass |
| FE-04 | Check sidebar menu | Dashboard, Products, Orders, and AI Chat Sim should be visible | Sidebar menu displayed correctly | Pass |
| FE-05 | Check dashboard cards | Dashboard cards should be visible | Total Products, AI Conversations, Active Customers, and Sales Conversion cards displayed | Pass |
| FE-06 | Check frontend dependency errors | No missing dependency error should appear | Missing axios error was found and fixed | Pass |

### Frontend Result

The frontend dashboard opened successfully at:

```text
http://localhost:5173/
```

The dashboard displayed:

```text
FashionHub AI
Dashboard
Products
Orders
AI Chat Sim
Dashboard Overview
Recent Activity
Logout Button
```

A missing `axios` dependency issue was found during frontend testing and fixed by installing axios.

```bash
cd frontend
npm install axios
```

## 9. Issues Found During Testing

| Issue ID | Issue | Severity | Status |
|---|---|---|---|
| BUG-01 | Product model had missing `category` field name and incomplete schema closing | High | Fixed |
| BUG-02 | Single order GET route was incomplete in `orderRoutes.js` | High | Fixed |
| BUG-03 | MongoDB connection failed because `.env` file was missing | Medium | Fixed |
| BUG-04 | MongoDB SRV connection caused `querySrv ECONNREFUSED` error | Medium | Fixed using Legacy URI |
| BUG-05 | Chatbot is keyword-based and not connected with OpenAI API | Medium | Open |
| BUG-06 | Frontend had missing `axios` dependency | Medium | Fixed |

---

## 10. Test Summary

| Category | Total Tests | Passed | Pending | Failed |
|---|---|---|---|---|
| Backend Server | 3 | 3 | 0 | 0 |
| Product APIs | 5 | 2 | 3 | 0 |
| Customer APIs | 5 | 2 | 3 | 0 |
| Order APIs | 5 | 2 | 3 | 0 |
| Chatbot API | 5 | 1 | 4 | 0 |
| Frontend | 6 | 6 | 0 | 0 |

---

## 11. Overall Result

The backend server, MongoDB connection, product creation, customer creation, order creation, and basic chatbot response were tested successfully.

Some APIs are still marked as pending because complete update, delete, invalid ID, and frontend testing were not fully completed during this testing phase.

---

## 12. Conclusion

The core backend functionality is working after fixing model and route issues. The system can connect to MongoDB Atlas and perform basic product, customer, and order operations. The chatbot currently gives simple keyword-based responses, but advanced AI features such as OpenAI integration, Instagram DM automation, and WhatsApp automation still need further implementation and testing.