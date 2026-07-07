# Bug Report

## Project Name

AI Fashion Sales Assistant

## Prepared By

Documentation & Quality Assurance Team

## Purpose

This document lists the bugs, issues, limitations, and fixes identified during testing of the AI Fashion Sales Assistant project.

---

# 1. Bug Summary

| Bug ID | Bug Title | Module | Severity | Status |
|---|---|---|---|---|
| BUG-01 | Product schema syntax issue | Product Model | High | Fixed |
| BUG-02 | Missing category field in Product model | Product Model | High | Fixed |
| BUG-03 | Incomplete single order GET route | Order Routes | High | Fixed |
| BUG-04 | Missing `.env` file | Backend Configuration | Medium | Fixed |
| BUG-05 | MongoDB SRV connection issue | Database Connection | Medium | Fixed |
| BUG-06 | Chatbot not connected with OpenAI API | Chatbot | Medium | Open |
| BUG-07 | Instagram DM integration not implemented | Integration | High | Open |
| BUG-08 | WhatsApp Business API integration not implemented | Integration | High | Open |
| BUG-09 | Product image upload system not implemented | Product Management | Medium | Open |
| BUG-10 | Authentication is basic | Authentication | Medium | Open |
| BUG-11 | Missing axios dependency | Frontend | Medium | Fixed |

---

# 2. Detailed Bug Reports

## BUG-01: Product Schema Syntax Issue

### Module

Product Model

### Severity

High

### Status

Fixed

### Description

The `Product.js` model had a schema syntax issue. The schema was not properly closed, which could break backend execution or product-related API operations.

### Expected Result

Product schema should be valid and backend should run without schema errors.

### Actual Result

Product model structure was incomplete.

### Fix Applied

The Product schema was rewritten correctly with proper schema closing and export statement.

---

## BUG-02: Missing Category Field in Product Model

### Module

Product Model

### Severity

High

### Status

Fixed

### Description

The Product model had validation for category, but the field name `category` was missing. This caused product creation to fail or behave incorrectly.

### Expected Result

Product model should contain a proper `category` field.

### Actual Result

The category field structure existed, but the field name was missing.

### Fix Applied

Added the correct `category` field in `Product.js`.

```js
category: {
  type: String,
  required: [true, "Category is required"],
  trim: true,
}
```

---

## BUG-03: Incomplete Single Order GET Route

### Module

Order Routes

### Severity

High

### Status

Fixed

### Description

The single order route in `orderRoutes.js` was incomplete. The route handler code was present, but the actual route declaration was missing.

### Expected Result

The API should allow fetching one order by ID using:

```text
GET /api/orders/:id
```

### Actual Result

The route section was incomplete and could cause backend errors.

### Fix Applied

Added the missing route declaration:

```js
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customerId")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
});
```

---

## BUG-04: Missing `.env` File

### Module

Backend Configuration

### Severity

Medium

### Status

Fixed

### Description

After cloning the repository, the backend failed because the `.env` file was missing.

### Error Message

```text
Failed to connect to MongoDB: MONGO_URI is not defined in .env file
```

### Expected Result

Backend should read MongoDB connection string from `.env`.

### Actual Result

Backend could not connect to MongoDB because `MONGO_URI` was missing.

### Fix Applied

Created a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## BUG-05: MongoDB SRV Connection Issue

### Module

Database Connection

### Severity

Medium

### Status

Fixed

### Description

MongoDB connection failed due to DNS/SRV lookup issue when using `mongodb+srv://` connection string.

### Error Message

```text
querySrv ECONNREFUSED _mongodb._tcp.cluster0.rn53noq.mongodb.net
```

### Expected Result

Backend should connect successfully to MongoDB Atlas.

### Actual Result

Backend server started, but MongoDB connection failed.

### Fix Applied

Used MongoDB Atlas Legacy URI String starting with:

```text
mongodb://
```

After using the Legacy URI, MongoDB connected successfully.

---

## BUG-06: Chatbot Not Connected with OpenAI API

### Module

Chatbot

### Severity

Medium

### Status

Open

### Description

The current chatbot uses simple keyword-based logic instead of OpenAI API or LangChain.

### Expected Result

Chatbot should understand user intent and generate intelligent fashion sales replies.

### Actual Result

Chatbot only replies to limited keywords:

```text
hi
hello
price
delivery
order
```

### Suggested Fix

Connect chatbot route with OpenAI API and improve intent detection for product search, size queries, color queries, delivery questions, return requests, and order tracking.

---

## BUG-07: Instagram DM Integration Not Implemented

### Module

Instagram Integration

### Severity

High

### Status

Open

### Description

The project objective includes Instagram DM automation, but current backend does not include Instagram Graph API integration.

### Expected Result

System should receive and reply to Instagram DMs automatically.

### Actual Result

No Instagram webhook or Graph API route is implemented.

### Suggested Fix

Add Instagram Graph API webhook routes and connect them with chatbot response logic.

---

## BUG-08: WhatsApp Business API Integration Not Implemented

### Module

WhatsApp Integration

### Severity

High

### Status

Open

### Description

The project objective includes WhatsApp automation, but current backend does not include WhatsApp Business API integration.

### Expected Result

System should reply to WhatsApp customer messages, share catalog, collect order details, and confirm orders.

### Actual Result

No WhatsApp Business API route is implemented.

### Suggested Fix

Add WhatsApp Business API webhook and message sending logic.

---

## BUG-09: Product Image Upload System Not Implemented

### Module

Product Management

### Severity

Medium

### Status

Open

### Description

The product model stores images as string values, but there is no complete image upload system.

### Expected Result

Admin should upload product images through dashboard.

### Actual Result

Images are stored only as text/string paths.

### Suggested Fix

Add image upload using Multer, Cloudinary, or another image storage service.

---

## BUG-10: Authentication Is Basic

### Module

Authentication

### Severity

Medium

### Status

Open

### Description

Authentication currently uses simple user checking and does not fully use secure database-based authentication.

### Expected Result

Authentication should use hashed passwords, JWT tokens, and secure user storage.

### Actual Result

Authentication is basic and needs improvement.

### Suggested Fix

Use MongoDB user model, bcrypt password hashing, JWT token generation, and protected admin routes.

---
## BUG-11: Missing Axios Dependency

### Module

Frontend

### Severity

Medium

### Status

Fixed

### Description

The frontend was importing `axios` in `OrderManagement.jsx`, but the package was not installed in the frontend dependencies.

### Error Message

```text
The following dependencies are imported but could not be resolved:

axios imported by frontend/src/pages/OrderManagement.jsx
```

### Expected Result

Frontend should start without dependency errors.

### Actual Result

Vite started, but dependency scan failed because `axios` was missing.

### Fix Applied

Installed axios inside the frontend folder.

```bash
cd frontend
npm install axios
```

After installing axios, the frontend dashboard opened successfully at:

```text
http://localhost:5173/
```

# 3. Fixed Bugs

| Bug ID | Fix Summary |
|---|---|
| BUG-01 | Rewrote Product schema correctly |
| BUG-02 | Added missing category field |
| BUG-03 | Added missing single order GET route |
| BUG-04 | Created `.env` file |
| BUG-05 | Used Legacy MongoDB URI |
| BUG-11 | Installed missing axios frontend dependency |

---

# 4. Open Bugs / Pending Improvements

| Bug ID | Pending Work |
|---|---|
| BUG-06 | Connect chatbot with OpenAI API |
| BUG-07 | Implement Instagram Graph API integration |
| BUG-08 | Implement WhatsApp Business API integration |
| BUG-09 | Add product image upload |
| BUG-10 | Improve authentication security |

---

# 5. Overall QA Notes

- Backend is now running successfully.
- MongoDB Atlas connection is working.
- Product, customer, and order creation APIs were tested successfully.
- Basic chatbot API was tested successfully.
- Some advanced features are still pending and should be completed before final production deployment.

---

# 6. Conclusion

The main backend errors found during testing were fixed. The project is now stable enough for basic backend testing and documentation. However, advanced AI chatbot, Instagram DM automation, WhatsApp automation, image upload, and secure authentication still require further development.