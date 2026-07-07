# User Manual

## Project Name

AI Fashion Sales Assistant

## Purpose

AI Fashion Sales Assistant is designed for clothing brands. It helps automate customer replies, product recommendations, customer data collection, order placement, and order management.

---

## 1. User Roles

The system has two main types of users:

1. Admin
2. Customer

---

# 2. Admin User Manual

## 2.1 Start the System

Before using the system, make sure both backend and frontend are running.

### Start Backend

```bash
cd backend
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend usually runs on:

```text
http://localhost:5173
```

---

## 2.2 Admin Login

Steps:

1. Open the frontend website.
2. Go to the login page.
3. Enter admin email and password.
4. Click the login button.
5. After successful login, admin can access the dashboard.

Expected result:

```text
Admin should be redirected to the dashboard.
```

---

## 2.3 Product Management

The admin can manage fashion products.

### Add Product

Steps:

1. Open Admin Dashboard.
2. Go to Product section.
3. Click Add Product.
4. Enter product details:
   - Product name
   - Category
   - Price
   - Description
   - Sizes
   - Colors
   - Stock
   - Images
   - Discount
   - Rating
5. Click Save/Add Product.

Expected result:

```text
Product should be saved successfully in the database.
```

Example product:

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

### View Products

Steps:

1. Open Admin Dashboard.
2. Go to Products section.
3. View all available products.

Expected result:

```text
All products should be displayed with name, category, price, size, color, and stock.
```

---

### Edit Product

Steps:

1. Open Products section.
2. Select a product.
3. Click Edit.
4. Update product details.
5. Save changes.

Expected result:

```text
Updated product information should be saved and displayed.
```

---

### Delete Product

Steps:

1. Open Products section.
2. Select product.
3. Click Delete.
4. Confirm delete action.

Expected result:

```text
Product should be removed from the database.
```

---

## 2.4 Customer Management

The admin can view and manage customer records.

### Add Customer

Steps:

1. Open Customers section.
2. Click Add Customer.
3. Enter customer details:
   - Name
   - Phone number
   - Instagram ID
   - Address
   - Preferences
4. Click Save.

Example customer:

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

Expected result:

```text
Customer should be added successfully.
```

---

### View Customers

Steps:

1. Open Customers section.
2. View customer list.

Expected result:

```text
Admin should see customer name, phone number, Instagram ID, address, and preferences.
```

---

## 2.5 Order Management

The admin can view and manage customer orders.

### Create Order

Steps:

1. Select customer.
2. Select product.
3. Enter quantity.
4. Select order status.
5. Select payment status.
6. Add tracking number if available.
7. Save order.

Example order:

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

Expected result:

```text
Order should be created successfully.
```

---

### View Orders

Steps:

1. Open Orders section.
2. View all customer orders.

Expected result:

```text
Admin should see customer details, ordered products, quantity, status, payment status, and tracking number.
```

---

### Update Order Status

Steps:

1. Open Orders section.
2. Select an order.
3. Change status.

Available statuses:

```text
Pending
Confirmed
Shipped
Delivered
Cancelled
```

4. Save changes.

Expected result:

```text
Order status should update successfully.
```

---

# 3. Customer User Manual

## 3.1 Start Chat

Customer can start conversation by sending simple messages.

Example messages:

```text
Hi
Hello
Price?
Delivery charges?
How can I place an order?
```

Expected result:

```text
AI assistant should reply automatically.
```

---

## 3.2 Ask Product Price

Customer message:

```text
Price?
```

Expected AI reply:

```text
Our products start from Rs 1500 and go up to Rs 5000.
```

---

## 3.3 Ask Delivery Information

Customer message:

```text
Delivery?
```

Expected AI reply:

```text
Delivery takes 3–5 working days.
```

---

## 3.4 Place Order

Customer can place an order by sending product and quantity.

Example customer message:

```text
I want to order Black Embroidered Maxi, quantity 1.
```

Expected AI reply:

```text
You can place an order by sending product name and quantity.
```

---

# 4. Chatbot Supported Queries

The current chatbot supports keyword-based replies for:

```text
hi
hello
price
delivery
order
```

Planned chatbot features include:

```text
Product search
Size queries
Color queries
Discount queries
Delivery queries
Exchange and return queries
Order tracking
Complaints
Sentiment-based replies
```

---

# 5. Common Problems and Solutions

## Problem: Backend is not running

Solution:

```bash
cd backend
npm start
```

---

## Problem: MongoDB connection error

Solution:

1. Check `.env` file.
2. Make sure `MONGO_URI` is correct.
3. Make sure MongoDB Atlas IP access is allowed.
4. Use Legacy URI String if SRV connection fails.

---

## Problem: Product is not adding

Solution:

1. Check required fields.
2. Product name, category, and price are required.
3. Check backend terminal for error message.

---

## Problem: API returns Route not found

Solution:

Check correct endpoint in `API_DOCUMENTATION.md`.

---

# 6. Current Limitations

- Chatbot is currently keyword-based.
- OpenAI API integration is planned but not fully connected yet.
- Instagram DM automation is planned but not fully implemented yet.
- WhatsApp automation is planned but not fully implemented yet.
- Product images are stored as string/image URL values.
- Admin dashboard features may need further frontend connection and testing.

---

# 7. Summary

This system helps clothing brands manage products, customers, orders, and customer replies. The goal is to reduce manual customer handling and support automated fashion sales communication.