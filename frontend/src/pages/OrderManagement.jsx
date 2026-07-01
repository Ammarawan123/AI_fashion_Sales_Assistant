import React from 'react';
import { Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function OrderManagement() {
  const orders = [
    { id: "ORD-9841", customer: "Waleed Ahmed", platform: "Instagram DM", amount: "Rs 4,999", status: "Pending Verification", items: "1x Black Embroidered Maxi", date: "Today, 02:14 PM" },
    { id: "ORD-9839", customer: "Amna Khan", platform: "WhatsApp Business", amount: "Rs 8,498", status: "Processing", items: "1x Black Chiffon Dress, 1x Summer Shirt", date: "Yesterday" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Order Tracking Queue</h1>
        <p className="text-slate-400 text-xs">Review or update logistics details collected directly via AI chatbot triggers.</p>
      </div>

      {/* Grid Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Clock className="h-5 w-5" /></div>
          <div><div className="text-xs text-slate-500">Awaiting Approval</div><div className="text-xl font-bold text-white">12 Orders</div></div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Package className="h-5 w-5" /></div>
          <div><div className="text-xs text-slate-500">In Transit (Courier)</div><div className="text-xl font-bold text-white">48 Orders</div></div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><CheckCircle className="h-5 w-5" /></div>
          <div><div className="text-xs text-slate-500">Completed Today</div><div className="text-xl font-bold text-white">29 Orders</div></div>
        </div>
      </div>

      {/* Orders List Workspace */}
      <div className="space-y-3">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-slate-400">{ord.id}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50">{ord.platform}</span>
                <span className="text-xs text-slate-500">{ord.date}</span>
              </div>
              <div className="text-sm font-semibold text-white">{ord.customer}</div>
              <div className="text-xs text-slate-400">{ord.items}</div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800/60">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Total Amount</div>
                <div className="text-sm font-bold text-emerald-400">{ord.amount}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full ${ord.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                  {ord.status}
                </span>
                <button className="text-[10px] text-slate-400 hover:text-white underline font-medium">View Shipping Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
