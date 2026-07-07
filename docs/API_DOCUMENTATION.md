# API Documentation

## Project Name

AI Fashion Sales Assistant

## Description

This document explains the backend APIs used in the AI Fashion Sales Assistant project. The backend is built using Node.js, Express.js, and MongoDB.

The API supports authentication, product management, customer management, order management, and chatbot replies.

---

## Base URL

```text
http://localhost:5000
```

---

# 1. Root API

## Check Backend Status

### Method

```text
GET
```

### Endpoint

```text
/
```

### Description

Checks whether the backend server is running.

### Example Response

```text
Backend is running
```

---

# 2. Authentication APIs

## Register User

### Method

```text
POST
```

### Endpoint

```text
/api/auth/register
```

### Description

Registers a new user in the system.

### Request Body

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 123456789,
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "123456"
  }
}
```

### Error Response

```json
{
  "message": "User already exists"
}
```

---

## Login User

### Method

```text
POST
```

### Endpoint

```text
/api/auth/login
```

### Description

Logs in an existing user by checking email and password.

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "user": {
    "id": 123456789,
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "123456"
  }
}
```

### Error Response

```json
{
  "message": "Invalid credentials"
}
```

---

# 3. Product APIs

## Add Product

### Method

```text
POST
```

### Endpoint

```text
/api/products/add
```

### Description

Adds a new fashion product to the database.

### Request Body

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

### Success Response

```json
{
  "message": "Product added successfully",
  "product": {
    "_id": "product_id_here",
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
}
```

---

## Get All Products

### Method

```text
GET
```

### Endpoint

```text
/api/products/all
```

### Description

Fetches all products stored in the database.

### Success Response

```json
[
  {
    "_id": "product_id_here",
    "productName": "Black Embroidered Maxi",
    "category": "Women",
    "price": 4999,
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Black"],
    "stock": 20
  }
]
```

---

## Get Single Product

### Method

```text
GET
```

### Endpoint

```text
/api/products/:id
```

### Description

Fetches one product by its MongoDB ID.

### Example Endpoint

```text
/api/products/PRODUCT_ID_HERE
```

### Error Response

```json
{
  "message": "Product not found"
}
```

---

## Update Product

### Method

```text
PUT
```

### Endpoint

```text
/api/products/:id
```

### Description

Updates an existing product by ID.

### Request Body

```json
{
  "price": 5499,
  "stock": 15
}
```

### Success Response

```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "product_id_here",
    "price": 5499,
    "stock": 15
  }
}
```

---

## Delete Product

### Method

```text
DELETE
```

### Endpoint

```text
/api/products/:id
```

### Description

Deletes a product from the database using product ID.

### Success Response

```json
{
  "message": "Product deleted successfully"
}
```

---

# 4. Customer APIs

## Add Customer

### Method

```text
POST
```

### Endpoint

```text
/api/customers/add
```

### Description

Adds a new customer to the database.

### Request Body

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

### Success Response

```json
{
  "message": "Customer added successfully",
  "customer": {
    "_id": "customer_id_here",
    "name": "Ali Khan",
    "phoneNumber": "03001234567",
    "instagramId": "@ali_khan",
    "address": "Islamabad, Pakistan"
  }
}
```

---

## Get All Customers

### Method

```text
GET
```

### Endpoint

```text
/api/customers/all
```

### Description

Fetches all customers from the database.

### Success Response

```json
[
  {
    "_id": "customer_id_here",
    "name": "Ali Khan",
    "phoneNumber": "03001234567",
    "instagramId": "@ali_khan",
    "address": "Islamabad, Pakistan"
  }
]
```

---

## Get Single Customer

### Method

```text
GET
```

### Endpoint

```text
/api/customers/:id
```

### Description

Fetches one customer by MongoDB ID.

### Error Response

```json
{
  "message": "Customer not found"
}
```

---

## Update Customer

### Method

```text
PUT
```

### Endpoint

```text
/api/customers/:id
```

### Description

Updates customer information by ID.

### Request Body

```json
{
  "address": "Lahore, Pakistan"
}
```

### Success Response

```json
{
  "message": "Customer updated successfully",
  "customer": {
    "_id": "customer_id_here",
    "address": "Lahore, Pakistan"
  }
}
```

---

## Delete Customer

### Method

```text
DELETE
```

### Endpoint

```text
/api/customers/:id
```

### Description

Deletes a customer from the database.

### Success Response

```json
{
  "message": "Customer deleted successfully"
}
```

---

# 5. Order APIs

## Add Order

### Method

```text
POST
```

### Endpoint

```text
/api/orders/add
```

### Description

Creates a new order for a customer.

### Request Body

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

### Success Response

```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "order_id_here",
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
}
```

---

## Get All Orders

### Method

```text
GET
```

### Endpoint

```text
/api/orders/all
```

### Description

Fetches all orders from the database. It also populates customer and product information.

### Success Response

```json
[
  {
    "_id": "order_id_here",
    "customerId": {
      "_id": "customer_id_here",
      "name": "Ali Khan",
      "phoneNumber": "03001234567"
    },
    "products": [
      {
        "productId": {
          "_id": "product_id_here",
          "productName": "Black Embroidered Maxi",
          "price": 4999
        },
        "quantity": 1
      }
    ],
    "status": "Pending",
    "paymentStatus": "Unpaid",
    "trackingNumber": "TRK123456"
  }
]
```

---

## Get Single Order

### Method

```text
GET
```

### Endpoint

```text
/api/orders/:id
```

### Description

Fetches one order by MongoDB ID.

### Error Response

```json
{
  "message": "Order not found"
}
```

---

## Update Order

### Method

```text
PUT
```

### Endpoint

```text
/api/orders/:id
```

### Description

Updates order status, payment status, or tracking number.

### Request Body

```json
{
  "status": "Shipped",
  "paymentStatus": "Paid",
  "trackingNumber": "TRK987654"
}
```

### Success Response

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "order_id_here",
    "status": "Shipped",
    "paymentStatus": "Paid",
    "trackingNumber": "TRK987654"
  }
}
```

---

## Delete Order

### Method

```text
DELETE
```

### Endpoint

```text
/api/orders/:id
```

### Description

Deletes an order from the database.

### Success Response

```json
{
  "message": "Order deleted successfully"
}
```

---

# 6. Chat API

## Send Chat Message

### Method

```text
POST
```

### Endpoint

```text
/api/chat
```

### Description

Sends a customer message to the chatbot and receives an automatic reply.

### Request Body

```json
{
  "message": "hi"
}
```

### Success Response

```json
{
  "reply": "Hello! 👋 How can I help you with our products?"
}
```

---

## Supported Chat Queries

The current chatbot supports simple keyword-based replies for:

```text
hi
hello
price
delivery
order
```

### Example Chat Requests

```json
{
  "message": "price"
}
```

### Example Response

```json
{
  "reply": "Our products start from Rs 1500 and go up to Rs 5000."
}
```

```json
{
  "message": "delivery"
}
```

### Example Response

```json
{
  "reply": "Delivery takes 3–5 working days."
}
```

```json
{
  "message": "order"
}
```

### Example Response

```json
{
  "reply": "You can place an order by sending product name and quantity."
}
```

---

# 7. Common Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Data created successfully |
| 400 | Invalid request or validation error |
| 404 | Data or route not found |
| 500 | Server error |

---

# 8. Notes for Testing

## Required Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Run Backend

```bash
cd backend
npm start
```

## Test Backend

```bash
http://localhost:5000/
```

Expected output:

```text
Backend is running
```

---

# 9. Current Limitations

- Authentication is basic and currently stores users in a local file/model instead of a complete secure database-based authentication system.
- Chatbot replies are currently keyword-based and not fully connected with OpenAI API.
- Instagram DM and WhatsApp Business API integrations are planned project features, but they are not fully implemented in the current backend.
- Product image handling currently uses image URL/string values instead of a complete file upload system.