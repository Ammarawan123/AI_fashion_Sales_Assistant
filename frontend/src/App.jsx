import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import ChatSimulation from "./pages/ChatSimulation";
import AdminLogin from "./pages/AdminLogin";
import LoadingIntro from "./components/LoadingIntro";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="chat-sim" element={<ChatSimulation />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <LoadingIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}
