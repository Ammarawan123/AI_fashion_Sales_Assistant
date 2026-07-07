# QA Checklist

## Project Name

AI Fashion Sales Assistant

## Purpose

This checklist is used to verify that the main modules of the AI Fashion Sales Assistant are working correctly before final submission.

---

# 1. Backend Server Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| BE-01 | Backend | Start backend using `npm start` | Server runs on port 5000 | Pass |
| BE-02 | Backend | Open `http://localhost:5000/` | Shows `Backend is running` | Pass |
| BE-03 | Backend | Unknown route test | Shows `Route not found` | Pending |
| BE-04 | Backend | MongoDB connection | MongoDB connects successfully | Pass |

---

# 2. Authentication API Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| AUTH-01 | Auth | Register new user | User registered successfully | Pending |
| AUTH-02 | Auth | Register duplicate user | Shows user already exists message | Pending |
| AUTH-03 | Auth | Login with correct email/password | Login successful | Pending |
| AUTH-04 | Auth | Login with wrong email/password | Shows invalid credentials message | Pending |

---

# 3. Product API Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| PROD-01 | Product | Add product | Product added successfully | Pass |
| PROD-02 | Product | Get all products | Product list displayed | Pass |
| PROD-03 | Product | Get product by valid ID | Single product displayed | Pending |
| PROD-04 | Product | Get product by invalid ID | Error message displayed | Pending |
| PROD-05 | Product | Update product | Product updated successfully | Pending |
| PROD-06 | Product | Delete product | Product deleted successfully | Pending |
| PROD-07 | Product | Add product without required fields | Validation error displayed | Pending |

---

# 4. Customer API Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| CUST-01 | Customer | Add customer | Customer added successfully | Pass |
| CUST-02 | Customer | Get all customers | Customer list displayed | Pass |
| CUST-03 | Customer | Get customer by valid ID | Single customer displayed | Pending |
| CUST-04 | Customer | Get customer by invalid ID | Error message displayed | Pending |
| CUST-05 | Customer | Update customer | Customer updated successfully | Pending |
| CUST-06 | Customer | Delete customer | Customer deleted successfully | Pending |
| CUST-07 | Customer | Add duplicate phone number | Duplicate/validation error displayed | Pending |

---

# 5. Order API Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| ORD-01 | Order | Create order | Order placed successfully | Pass |
| ORD-02 | Order | Get all orders | Orders list displayed | Pass |
| ORD-03 | Order | Get order by valid ID | Single order displayed | Pending |
| ORD-04 | Order | Get order by invalid ID | Error message displayed | Pending |
| ORD-05 | Order | Update order status | Order status updated successfully | Pending |
| ORD-06 | Order | Delete order | Order deleted successfully | Pending |
| ORD-07 | Order | Create order without customer ID | Validation error displayed | Pending |

---

# 6. Chatbot API Testing

| Test Case ID | Query | Expected Reply | Status |
|---|---|---|---|
| CHAT-01 | hi | Greeting reply should be shown | Pass |
| CHAT-02 | hello | Greeting reply should be shown | Pending |
| CHAT-03 | price | Price range reply should be shown | Pending |
| CHAT-04 | delivery | Delivery time reply should be shown | Pending |
| CHAT-05 | order | Order placement instruction should be shown | Pending |
| CHAT-06 | random message | Sorry message should be shown | Pending |

---

# 7. Frontend Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| FE-01 | Frontend | Run frontend using `npm run dev` | Frontend starts successfully | Pass |
| FE-02 | Dashboard | Open `http://localhost:5173/` | Dashboard loads correctly | Pass |
| FE-03 | Sidebar | Check sidebar menu | Dashboard, Products, Orders, and AI Chat Sim options are visible | Pass |
| FE-04 | Dashboard UI | Check dashboard cards | Product, conversation, customer, and sales cards are visible | Pass |
| FE-05 | Product UI | Open products page | Products page should open | Pending |
| FE-06 | Order UI | Open orders page | Orders page should open | Pending |
| FE-07 | Chat UI | Open AI Chat Sim page | Chat interface should open | Pending |
| FE-08 | Responsiveness | Open website on small screen | Layout remains usable | Pending |

---

# 8. Database Testing

| Test Case ID | Module | Test Case | Expected Result | Status |
|---|---|---|---|---|
| DB-01 | MongoDB | Connect backend to database | Connection successful | Pass |
| DB-02 | Products Collection | Product saved in database | Product record created | Pass |
| DB-03 | Customers Collection | Customer saved in database | Customer record created | Pass |
| DB-04 | Orders Collection | Order saved in database | Order record created | Pass |
| DB-05 | Data Relations | Order references customer and product | Related data displayed | Pass |

---

# 9. Documentation Checklist

| Document | Required | Status |
|---|---|---|
| API Documentation | Yes | Completed |
| Deployment Guide | Yes | Completed |
| User Manual | Yes | Completed |
| QA Checklist | Yes | Completed |
| Test Report | Yes | Pending |
| Bug Report | Yes | Pending |
| Presentation Slides | Yes | Pending |

---

# 10. Current QA Summary

| Category | Total Tests | Passed | Pending |
|---|---|---|---|
| Backend | 4 | 3 | 1 |
| Authentication | 4 | 0 | 4 |
| Product APIs | 7 | 2 | 5 |
| Customer APIs | 7 | 2 | 5 |
| Order APIs | 7 | 2 | 5 |
| Chatbot APIs | 6 | 1 | 5 |
| Frontend | 8 | 0 | 8 |
| Database | 5 | 5 | 0 |

---

# 11. Notes

- Product model issue was found and fixed.
- Single order route issue was found and fixed.
- MongoDB Atlas connection issue was solved using Legacy URI String.
- Chatbot is currently keyword-based.
- OpenAI, Instagram DM, and WhatsApp API integrations are not fully implemented yet.
- Frontend dashboard was tested successfully after installing missing `axios` dependency.