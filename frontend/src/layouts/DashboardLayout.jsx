import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  MessageSquare,
  Shirt,
  Zap,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Products", path: "/products", icon: ShoppingBag },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "AI Chat Sim", path: "/chat-sim", icon: MessageSquare },
];

const sidebarVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const menuItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden ambient-bg">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <motion.aside
        className="relative z-10 w-64 border-r border-slate-800/60 flex flex-col glass-panel"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div
          className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60"
          variants={menuItemVariants}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Shirt className="h-7 w-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <div className="absolute inset-0 h-7 w-7 bg-emerald-400/20 rounded-full blur-md" />
          </motion.div>

          <span className="font-bold text-lg gradient-text">
            FashionHub AI
          </span>

          <Zap className="h-3 w-3 text-emerald-400 ml-auto animate-pulse" />
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div key={item.path} variants={menuItemVariants}>
                <Link
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/20 neon-border"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      className="absolute right-3 h-1.5 w-1.5 rounded-full bg-emerald-400"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <motion.div
          className="p-4 border-t border-slate-800/60"
          variants={menuItemVariants}
        >
          <div className="glass-panel rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-medium">
                System Online
              </span>
            </div>

            <div className="text-[10px] text-slate-500">
              AI Engine v2.4 • All services operational
            </div>
          </div>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <motion.header
          className="h-16 border-b border-slate-800/40 glass-panel backdrop-blur-xl flex items-center px-8 justify-between sticky top-0 z-20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.3,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-slate-950">
              A
            </div>

            <div>
              <div className="text-sm font-medium text-white">
                Welcome back, Admin
              </div>

              <div className="text-[10px] text-slate-500">
                FashionHub Control Center
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
              Live Mode
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
            >
              Logout
            </button>
          </div>
        </motion.header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
