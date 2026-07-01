import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Zap,
} from "lucide-react";
import AnimatedPage, { staggerItem } from "../components/AnimatedPage";

function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[85%]">
      <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-slate-800/80 text-emerald-400 border border-slate-700/50">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/30">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const messageVariants = {
  hidden: (sender) => ({
    opacity: 0,
    x: sender === "user" ? 30 : -30,
    y: 10,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function ChatSimulation() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Welcome to FashionHub! Thank you for contacting us. How may I help you today?\n1. New Arrivals\n2. Women's Collection\n3. Men's Collection\n4. Order Tracking\n5. Delivery Information",
      type: "text",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [activeIntent, setActiveIntent] = useState("Greeting");
  const [activeSentiment, setActiveSentiment] = useState("Interested Buyer");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulationScenarios = [
    {
      query: "I need a black dress for Eid",
      intent: "Product Search",
      sentiment: "Interested Buyer",
      response:
        "I found these options for you:\n\n🛍️ *Black Embroidered Maxi*\nPrice: Rs 4,999\n\n🛍️ *Black Chiffon Dress*\nPrice: Rs 5,499\n\nWould you like to see pictures?",
      isRecommendation: true,
      products: [
        {
          name: "Black Embroidered Maxi",
          price: "Rs 4,999",
          img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150",
        },
        {
          name: "Black Chiffon Dress",
          price: "Rs 5,499",
          img: "https://images.unsplash.com/photo-1539008835657-9e8e81839211?w=150",
        },
      ],
    },
    {
      query: "Price?",
      intent: "Price Inquiry",
      sentiment: "Interested Buyer",
      response:
        "Our summer collection starts from Rs. 2,499 only! We currently have a flat 10% off sale on selected items. Let me know which product you like!",
      isRecommendation: false,
    },
    {
      query: "Track my order",
      intent: "Order Tracking",
      sentiment: "Neutral",
      response:
        "Sure, please provide your 6-digit Order ID or Tracking Number so I can check the status from our system.",
      isRecommendation: false,
    },
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text, type: "text" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    const matchedScenario = simulationScenarios.find(
      (s) => s.query.toLowerCase() === text.toLowerCase()
    );

    setTimeout(() => {
      setIsTyping(false);
      if (matchedScenario) {
        setActiveIntent(matchedScenario.intent);
        setActiveSentiment(matchedScenario.sentiment);
        const aiMsg = {
          id: Date.now() + 1,
          sender: "ai",
          text: matchedScenario.response,
          type: matchedScenario.isRecommendation ? "recommendation" : "text",
          products: matchedScenario.products,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setActiveIntent("General Query");
        setActiveSentiment("Neutral");
        const aiMsg = {
          id: Date.now() + 1,
          sender: "ai",
          text: `Thank you for your message! "${text}". Our team or AI will respond to you shortly according to the brand catalog.`,
          type: "text",
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    }, 1200);
  };

  return (
    <AnimatedPage>
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold text-white mb-2">
          AI Chat Automation Simulation
        </h1>
        <p className="text-slate-400 text-sm">
          Simulate live customer queries and track real-time AI Intent Detection
          & Product Recommendations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Side: Simulation Dashboard */}
        <motion.div className="space-y-6 lg:col-span-1" variants={staggerItem}>
          {/* Scenario Buttons */}
          <div className="glass-panel rounded-2xl p-5 space-y-4 neon-border">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-emerald-400" />
              Click to Simulate Customer Queries
            </h2>
            <div className="flex flex-col gap-2.5">
              {simulationScenarios.map((scen, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSend(scen.query)}
                  className="text-left text-xs bg-slate-800/40 backdrop-blur-sm hover:bg-slate-700/50 text-slate-200 p-3.5 rounded-xl border border-slate-700/30 transition-all cursor-pointer"
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-emerald-400 font-semibold block mb-1">
                    Scenario {idx + 1}:
                  </span>
                  <span className="text-slate-400">"{scen.query}"</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* AI Metadata Trackers */}
          <div className="glass-panel rounded-2xl p-5 space-y-4 neon-border">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-400" />
              Real-time AI Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 font-mono">
                  Detected Intent
                </div>
                <motion.span
                  key={activeIntent}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 py-1.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium"
                >
                  <Zap className="inline h-3 w-3 mr-1" />
                  {activeIntent}
                </motion.span>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 font-mono">
                  Customer Sentiment
                </div>
                <motion.span
                  key={activeSentiment}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-3 py-1.5 text-xs rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium"
                >
                  {activeSentiment}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Chat Window */}
        <motion.div
          className="lg:col-span-2 glass-panel rounded-2xl h-[580px] flex flex-col overflow-hidden neon-border-strong"
          variants={staggerItem}
        >
          {/* Chat Header */}
          <div className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/40 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow-lg shadow-emerald-500/20">
                  IG
                </div>
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Customer Simulation Session
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI Bot Active
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">
                Session #{Math.floor(Math.random() * 9000) + 1000}
              </span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-slate-950/40">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  custom={msg.sender}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.sender === "user"
                        ? "bg-indigo-600/80 text-white border-indigo-500/30"
                        : "bg-slate-800/80 text-emerald-400 border-slate-700/50"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <div
                      className={`p-4 rounded-2xl text-sm whitespace-pre-line leading-relaxed backdrop-blur-sm ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white rounded-tr-none shadow-lg shadow-emerald-500/10 border border-emerald-500/20"
                          : "bg-slate-800/60 text-slate-200 rounded-tl-none border border-slate-700/30"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Recommendation Card UI */}
                    {msg.type === "recommendation" && msg.products && (
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {msg.products.map((prod, pIdx) => (
                          <motion.div
                            key={pIdx}
                            className="glass-panel rounded-xl overflow-hidden shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + pIdx * 0.15 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                          >
                            <div
                              className="h-24 bg-slate-700 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${prod.img})`,
                              }}
                            />
                            <div className="p-3 space-y-1.5">
                              <div className="text-xs font-bold text-white truncate">
                                {prod.name}
                              </div>
                              <div className="text-[11px] text-emerald-400 font-semibold font-mono">
                                {prod.price}
                              </div>
                              <motion.button
                                className="w-full text-[10px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold py-1.5 rounded-lg transition-colors mt-1 cursor-pointer"
                                whileTap={{ scale: 0.95 }}
                              >
                                Select Item
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Footer */}
          <div className="p-4 border-t border-slate-800/40 bg-slate-900/60 backdrop-blur-xl flex gap-2.5">
            <input
              type="text"
              id="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type message as customer..."
              className="flex-1 bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 transition-all duration-300 backdrop-blur-sm"
            />
            <motion.button
              id="send-button"
              onClick={() => handleSend()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-emerald-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}