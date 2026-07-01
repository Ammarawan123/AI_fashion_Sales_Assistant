const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

app.use("/api/customers", require("./routes/customerRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/chat", require("./routes/chatRoutes"));