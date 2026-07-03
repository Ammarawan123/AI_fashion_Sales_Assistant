
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function CustomerManagement() {
  const emptyForm = {
    name: "",
    phoneNumber: "",
    instagramId: "",
    address: "",
    favoriteColor: "",
    favoriteCategory: "",
    budgetRange: "",
  };

  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:5000/api/customers/all");
    const data = await res.json();
    setCustomers(data);
    setFiltered(data);
  };

  useEffect(() => { fetchCustomers(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(customers.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.phoneNumber?.includes(q) ||
      c.instagramId?.toLowerCase().includes(q)
    ));
  }, [search, customers]);

  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});

  const saveCustomer = async (e)=>{
    e.preventDefault();
    const payload={
      name:form.name,
      phoneNumber:form.phoneNumber,
      instagramId:form.instagramId,
      address:form.address,
      preferences:{
        favoriteColor:form.favoriteColor,
        favoriteCategory:form.favoriteCategory,
        budgetRange:form.budgetRange
      }
    };
    const url = editing
      ? `http://localhost:5000/api/customers/${editing._id}`
      : "http://localhost:5000/api/customers/add";
    const method = editing ? "PUT":"POST";
    await fetch(url,{
      method,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchCustomers();
  };

  const editCustomer=(c)=>{
    setEditing(c);
    setForm({
      name:c.name||"",
      phoneNumber:c.phoneNumber||"",
      instagramId:c.instagramId||"",
      address:c.address||"",
      favoriteColor:c.preferences?.favoriteColor||"",
      favoriteCategory:c.preferences?.favoriteCategory||"",
      budgetRange:c.preferences?.budgetRange||"",
    });
    setShowForm(true);
  };

  const deleteCustomer=async(id)=>{
    if(!window.confirm("Delete customer?")) return;
    await fetch(`http://localhost:5000/api/customers/${id}`,{method:"DELETE"});
    fetchCustomers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Customer Management</h1>
        <button onClick={()=>{setEditing(null);setForm(emptyForm);setShowForm(true);}}
          className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg font-semibold">
          <Plus size={16}/> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl"><p>Total Customers</p><h2 className="text-2xl">{customers.length}</h2></div>
        <div className="bg-slate-900 p-4 rounded-xl"><p>Total Orders</p><h2 className="text-2xl">{customers.reduce((a,c)=>a+(c.orderHistory?.length||0),0)}</h2></div>
        <div className="bg-slate-900 p-4 rounded-xl"><p>Categories</p><h2 className="text-2xl">{new Set(customers.map(c=>c.preferences?.favoriteCategory).filter(Boolean)).size}</h2></div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full pl-10 p-3 rounded bg-slate-900 text-white"/>
      </div>

      {showForm && (
      <form onSubmit={saveCustomer} className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-xl">
        {Object.keys(form).map(k=>(
          <input key={k} name={k} value={form[k]} onChange={handleChange}
          placeholder={k} className="p-2 rounded bg-slate-950 text-white"/>
        ))}
        <button className="bg-emerald-500 rounded p-2 text-slate-950 font-bold">
          {editing?"Update":"Add"} Customer
        </button>
      </form>
      )}

      <table className="w-full text-white">
        <thead><tr>
          <th>Name</th><th>Phone</th><th>Instagram</th><th>Address</th><th>Orders</th><th>Category</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {filtered.map(c=>(
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.phoneNumber}</td>
              <td>{c.instagramId}</td>
              <td>{c.address}</td>
              <td>{c.orderHistory?.length||0}</td>
              <td>{c.preferences?.favoriteCategory||"-"}</td>
              <td>
                <button onClick={()=>editCustomer(c)}><Edit size={16}/></button>
                <button onClick={()=>deleteCustomer(c._id)}><Trash2 size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
