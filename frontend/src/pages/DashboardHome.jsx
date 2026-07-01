import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageSquare, Users, TrendingUp } from "lucide-react";
import AnimatedPage, { staggerItem } from "../components/AnimatedPage";
import FloatingCard from "../components/FloatingCard";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return;

    let start = 0;
    const duration = 1500;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        start = num;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  const formatted = count.toLocaleString();
  return (
    <span ref={ref}>
      {formatted}
      {suffix && ` ${suffix}`}
    </span>
  );
}

export default function DashboardHome() {
  const stats = [
    {
      title: "Total Products",
      value: "142",
      suffix: "Items",
      change: "+12 this week",
      icon: ShoppingBag,
      color: "from-emerald-500 to-teal-500",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    {
      title: "AI Conversations",
      value: "1840",
      suffix: "Replay",
      change: "98.4% automated",
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-500",
      glow: "rgba(59, 130, 246, 0.15)",
    },
    {
      title: "Active Customers",
      value: "320",
      suffix: "Users",
      change: "From IG & WhatsApp",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.15)",
    },
    {
      title: "Sales Conversion",
      value: "450000",
      suffix: "",
      change: "+18% growth rate",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245, 158, 11, 0.15)",
    },
  ];

  const displayValue = (stat) => {
    if (stat.title === "Sales Conversion") {
      return (
        <span>
          Rs <AnimatedCounter target={stat.value} />
        </span>
      );
    }
    return <AnimatedCounter target={stat.value} suffix={stat.suffix} />;
  };

  return (
    <AnimatedPage>
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-white mb-1">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 text-xs">
          Real-time performance metrics for FashionHub AI Sales Representative.
        </p>
      </motion.div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <FloatingCard key={idx} delay={idx * 0.1}>
              <div className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden h-full">
                {/* Background glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${stat.glow}, transparent)` }}
                />

                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-2">
                    <span className="text-slate-400 text-xs font-medium block tracking-wide uppercase">
                      {stat.title}
                    </span>
                    <span className="text-2xl font-bold text-white block tracking-tight">
                      {displayValue(stat)}
                    </span>
                  </div>
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/40 flex items-center text-[11px] text-slate-500 relative z-10">
                  <span className="text-emerald-400 font-semibold mr-1.5">
                    {stat.change.split(" ")[0]}
                  </span>
                  {stat.change.split(" ").slice(1).join(" ")}
                </div>
              </div>
            </FloatingCard>
          );
        })}
      </div>

      {/* Quick Insights Row */}
      <motion.div
        className="mt-8 glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 neon-border"
        variants={staggerItem}
      >
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            System Integration Status
          </h3>
          <p className="text-xs text-slate-400">
            Instagram Graph API and WhatsApp Business Automation instances are
            fully synced.
          </p>
        </div>
        <motion.span
          className="px-4 py-2 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg neon-border"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          Webhooks Operational
        </motion.span>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        className="mt-8 glass-panel rounded-2xl p-6"
        variants={staggerItem}
      >
        <h3 className="text-sm font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { time: "2 min ago", event: "New order ORD-9841 received via Instagram DM", color: "bg-emerald-400" },
            { time: "15 min ago", event: "AI resolved 3 customer queries automatically", color: "bg-blue-400" },
            { time: "1 hr ago", event: "Product catalog synced — 12 new items added", color: "bg-purple-400" },
            { time: "3 hrs ago", event: "WhatsApp webhook reconnected successfully", color: "bg-amber-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 text-xs"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className={`h-2 w-2 rounded-full ${item.color} shrink-0`} />
              <span className="text-slate-500 font-mono w-20 shrink-0">
                {item.time}
              </span>
              <span className="text-slate-300">{item.event}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedPage>
  );
}