import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Filter, Search } from 'lucide-react';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    colors: "",
    sizes: "",
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/products/all")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((prod) => prod._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({ productName: "", category: "", price: "", stock: "", colors: "", sizes: "" });
    setShowForm(true);
  };

  const openEditForm = (prod) => {
    setEditingProduct(prod);
    setFormData({
      productName: prod.productName || "",
      category: prod.category || "",
      price: prod.price || "",
      stock: prod.stock || "",
      colors: (prod.colors || []).join(", "),
      sizes: (prod.sizes || []).join(", "),
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      productName: formData.productName,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingProduct) {
        res = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:5000/api/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setShowForm(false);
        fetchProducts();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || data.message || "Failed to save product");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-slate-400 text-xs">Add, edit, or track inventory for automated AI suggestions.</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
        >
          <Plus className="h-4 w-4" /> Add New Item
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex-1 relative flex items-center">
          <Search className="h-4 w-4 text-slate-500 absolute left-3" />
          <input type="text" placeholder="Search catalog query..." className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50" />
        </div>
        <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700/50">
          <Filter className="h-3.5 w-3.5" /> Filter
        </button>
      </div>

      {/* Add/Edit Form (shows only when needed) */}
      {showForm && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <h2 className="text-white font-semibold text-sm">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="productName" value={formData.productName} onChange={handleFormChange}
              placeholder="Product Name" required
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <input
              name="category" value={formData.category} onChange={handleFormChange}
              placeholder="Category" required
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <input
              name="price" value={formData.price} onChange={handleFormChange}
              placeholder="Price" type="number" required
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <input
              name="stock" value={formData.stock} onChange={handleFormChange}
              placeholder="Stock" type="number" required
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <input
              name="colors" value={formData.colors} onChange={handleFormChange}
              placeholder="Colors (comma separated, e.g. Black, Blue)"
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <input
              name="sizes" value={formData.sizes} onChange={handleFormChange}
              placeholder="Sizes (comma separated, e.g. S, M, L)"
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
            />
            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          {loading && <p className="p-4 text-slate-400 text-xs">Loading products...</p>}
          {error && <p className="p-4 text-rose-400 text-xs">Error: {error}</p>}
          {!loading && !error && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                {products.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{prod._id.slice(-6)}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{prod.productName}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Colors: {prod.colors?.join(", ")} | Sizes: {prod.sizes?.join(", ")}
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{prod.category}</td>
                    <td className="p-4 font-medium text-emerald-400">Rs {prod.price}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${prod.stock < 15 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {prod.stock} Available
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditForm(prod)}
                        className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
