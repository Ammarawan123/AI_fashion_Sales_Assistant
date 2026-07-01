import React, { useState } from 'react';
import { Plus, Trash2, Edit, Filter, Search } from 'lucide-react';

export default function ProductManagement() {
  const [products] = useState([
    { id: "P001", name: "Black Embroidered Maxi", category: "Women's Collection", price: "Rs 4,999", stock: 24, size: "S, M, L", color: "Black" },
    { id: "P002", name: "Black Chiffon Dress", category: "Women's Collection", price: "Rs 5,499", stock: 15, size: "M, XL", color: "Black" },
    { id: "P003", name: "Summer Linen Shirt", category: "Men's Shirts", price: "Rs 2,999", stock: 45, size: "M, L, XL", color: "Beige" },
    { id: "P004", name: "Casual Denim Jeans", category: "Trending Outfits", price: "Rs 3,499", stock: 12, size: "30, 32, 34", color: "Blue" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-slate-400 text-xs">Add, edit, or track inventory for automated AI suggestions.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95">
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

      {/* Table Section */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
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
                <tr key={prod.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-mono text-slate-500">{prod.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{prod.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Colors: {prod.color} | Sizes: {prod.size}</div>
                  </td>
                  <td className="p-4 text-slate-400">{prod.category}</td>
                  <td className="p-4 font-medium text-emerald-400">{prod.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${prod.stock < 15 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {prod.stock} Available
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><Edit className="h-3.5 w-3.5" /></button>
                    <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}