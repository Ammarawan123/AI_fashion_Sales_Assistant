import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ShoppingCart,
  DollarSign,
  Truck,
  Package,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    status: "Pending",
    paymentStatus: "Unpaid",
    trackingNumber: "",
  });

  // ==========================
  // Fetch Orders
  // ==========================

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/all`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Fetch Customers
  // ==========================

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers/all`);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Fetch Products
  // ==========================

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchOrders(),
        fetchCustomers(),
        fetchProducts(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // ==========================
  // Search Orders
  // ==========================

  const filteredOrders = orders.filter((order) => {
    const customer = order.customerId?.name || "";

    return (
      customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentStatus
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.trackingNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
    // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {
    setFormData({
      customerId: "",
      productId: "",
      quantity: 1,
      status: "Pending",
      paymentStatus: "Unpaid",
      trackingNumber: "",
    });

    setEditingOrder(null);
  };

  // ==========================
  // Open Add Modal
  // ==========================

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // ==========================
  // Open Edit Modal
  // ==========================

  const openEditModal = (order) => {
    setEditingOrder(order);

    setFormData({
      customerId: order.customerId?._id || "",
      productId: order.products?.[0]?.productId?._id || "",
      quantity: order.products?.[0]?.quantity || 1,
      status: order.status,
      paymentStatus: order.paymentStatus,
      trackingNumber: order.trackingNumber || "",
    });

    setShowModal(true);
  };

  // ==========================
  // Save Order
  // ==========================

  const saveOrder = async () => {
    try {
      const payload = {
        customerId: formData.customerId,
        products: [
          {
            productId: formData.productId,
            quantity: Number(formData.quantity),
          },
        ],
        status: formData.status,
        paymentStatus: formData.paymentStatus,
        trackingNumber: formData.trackingNumber,
      };

      if (editingOrder) {
        await axios.put(
          `${API}/orders/${editingOrder._id}`,
          payload
        );
      } else {
        await axios.post(
          `${API}/orders/add`,
          payload
        );
      }

      setShowModal(false);

      resetForm();

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Unable to save order.");
    }
  };

  // ==========================
  // Delete Order
  // ==========================

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/orders/${id}`);

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Unable to delete order.");
    }
  };
    // ==========================
  // Dashboard Statistics
  // ==========================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const paidOrders = orders.filter(
    (o) => o.paymentStatus === "Paid"
  ).length;

  // ==========================
  // Loading Screen
  // ==========================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-emerald-400 text-xl font-semibold">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Order Management
          </h1>

          <p className="text-slate-400 mt-1">
            Manage customer orders efficiently
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl font-semibold text-slate-900 transition"
        >
          <Plus size={18} />
          Add Order
        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <ShoppingCart
            className="text-emerald-400 mb-3"
            size={32}
          />

          <p className="text-slate-400 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalOrders}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <Package
            className="text-yellow-400 mb-3"
            size={32}
          />

          <p className="text-slate-400 text-sm">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {pendingOrders}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <Truck
            className="text-cyan-400 mb-3"
            size={32}
          />

          <p className="text-slate-400 text-sm">
            Delivered
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {deliveredOrders}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <DollarSign
            className="text-green-400 mb-3"
            size={32}
          />

          <p className="text-slate-400 text-sm">
            Paid Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {paidOrders}
          </h2>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-4 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search by customer, status or tracking..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-500 text-white"
        />

      </div>
            {/* ================= ADD / EDIT ORDER MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <motion.div
            initial={{ scale: .8, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            exit={{ scale:.8, opacity:0 }}
            className="bg-slate-900 rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto border border-slate-700 p-8"
          >

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-2xl font-bold text-white">

                {editingOrder ? "Edit Order" : "Create New Order"}

              </h2>

              <button
                onClick={()=>{
                  setShowModal(false);
                  resetForm();
                }}
              >
                <X className="text-red-400 hover:rotate-90 transition duration-300"/>
              </button>

            </div>


            <div className="grid grid-cols-2 gap-5">

              {/* Customer */}

              <div>

                <label className="text-slate-400 text-sm">
                  Customer
                </label>

                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                >

                  <option value="">Select Customer</option>

                  {customers.map(customer=>(
                    <option
                      key={customer._id}
                      value={customer._id}
                    >
                      {customer.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* Product */}

              <div>

                <label className="text-slate-400 text-sm">
                  Product
                </label>

                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                >

                  <option value="">Select Product</option>

                  {products.map(product=>(

                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.productName}
                    </option>

                  ))}

                </select>

              </div>


              {/* Quantity */}

              <div>

                <label className="text-slate-400 text-sm">

                  Quantity

                </label>

                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                />

              </div>


              {/* Status */}

              <div>

                <label className="text-slate-400 text-sm">

                  Order Status

                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                >

                  <option>Pending</option>

                  <option>Confirmed</option>

                  <option>Shipped</option>

                  <option>Delivered</option>

                  <option>Cancelled</option>

                </select>

              </div>


              {/* Payment */}

              <div>

                <label className="text-slate-400 text-sm">

                  Payment Status

                </label>

                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                >

                  <option>Unpaid</option>

                  <option>Paid</option>

                  <option>Refunded</option>

                </select>

              </div>


              {/* Tracking */}

              <div>

                <label className="text-slate-400 text-sm">

                  Tracking Number

                </label>

                <input
                  type="text"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleChange}
                  placeholder="TRK-123456"
                  className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
                />

              </div>

            </div>


            {/* Footer */}

            <div className="flex justify-end gap-4 mt-8">

              <button

                onClick={()=>{
                  setShowModal(false);
                  resetForm();
                }}

                className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"

              >

                Cancel

              </button>

              <button

                onClick={saveOrder}

                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold"

              >

                {editingOrder ? "Update Order" : "Create Order"}

              </button>

            </div>

          </motion.div>

        </div>

      )}
            {/* ================= Orders Table ================= */}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr className="text-left">

                <th className="p-4">Customer</th>

                <th className="p-4">Products</th>

                <th className="p-4">Quantity</th>

                <th className="p-4">Status</th>

                <th className="p-4">Payment</th>

                <th className="p-4">Tracking</th>

                <th className="p-4">Created</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-10 text-slate-400"
                  >
                    No Orders Found
                  </td>

                </tr>

              ) : (

                filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >

                    {/* Customer */}

                    <td className="p-4 font-medium">

                      {order.customerId?.name || "-"}

                    </td>

                    {/* Products */}

                    <td className="p-4">

                      {order.products?.length || 0}

                    </td>

                    {/* Quantity */}

                    <td className="p-4">

                      {order.products?.reduce(
                        (sum, p) => sum + p.quantity,
                        0
                      )}

                    </td>

                    {/* Order Status */}

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold

                        ${
                          order.status === "Delivered"
                            ? "bg-green-500/20 text-green-400"

                            : order.status === "Pending"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : order.status === "Cancelled"

                            ? "bg-red-500/20 text-red-400"

                            : "bg-cyan-500/20 text-cyan-400"
                        }

                        `}
                      >

                        {order.status}

                      </span>

                    </td>

                    {/* Payment */}

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold

                        ${
                          order.paymentStatus === "Paid"

                            ? "bg-green-500/20 text-green-400"

                            : order.paymentStatus === "Refunded"

                            ? "bg-blue-500/20 text-blue-400"

                            : "bg-red-500/20 text-red-400"
                        }

                        `}
                      >

                        {order.paymentStatus}

                      </span>

                    </td>

                    {/* Tracking */}

                    <td className="p-4">

                      {order.trackingNumber || "--"}

                    </td>

                    {/* Date */}

                    <td className="p-4">

                      {new Date(order.createdAt).toLocaleDateString()}

                    </td>

                    {/* Actions */}

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => openEditModal(order)}
                          className="text-cyan-400 hover:text-cyan-300"
                        >

                          <Edit size={18} />

                        </button>

                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-400 hover:text-red-300"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </motion.div>
  );
}
