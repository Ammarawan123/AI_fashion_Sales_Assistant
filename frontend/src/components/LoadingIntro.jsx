import { motion, AnimatePresence } from 'framer-motion';
import { Shirt } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   Grid Lines  – pure CSS/framer‑motion particles
   ───────────────────────────────────────────── */
const GridLines = () => {
  const verticals = Array.from({ length: 12 });
  const horizontals = Array.from({ length: 8 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* vertical lines */}
      {verticals.map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
          style={{ left: `${(i + 1) * (100 / (verticals.length + 1))}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.2, delay: i * 0.06, ease: 'easeOut' }}
        />
      ))}
      {/* horizontal lines */}
      {horizontals.map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-teal-500/10 to-transparent"
          style={{ top: `${(i + 1) * (100 / (horizontals.length + 1))}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Floating Particles
   ───────────────────────────────────────────── */
const Particles = () => {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-emerald-400/30"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Scanning Line
   ───────────────────────────────────────────── */
const ScanLine = () => (
  <motion.div
    className="pointer-events-none absolute left-0 h-px w-full"
    style={{
      background:
        'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.5) 30%, rgba(20,184,166,0.8) 50%, rgba(52,211,153,0.5) 70%, transparent 100%)',
      boxShadow: '0 0 20px 4px rgba(52,211,153,0.3)',
    }}
    initial={{ top: '-2%' }}
    animate={{ top: '102%' }}
    transition={{
      duration: 2.4,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

/* ─────────────────────────────────────────────
   Glowing Ring
   ───────────────────────────────────────────── */
const GlowingRing = () => (
  <>
    {/* Outer pulsing ring */}
    <motion.div
      className="absolute rounded-full border border-emerald-400/30"
      style={{ width: 180, height: 180 }}
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.4, 0, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    {/* Inner steady ring */}
    <motion.div
      className="absolute rounded-full border-2 border-emerald-400/50"
      style={{
        width: 150,
        height: 150,
        boxShadow:
          '0 0 30px 6px rgba(52,211,153,0.15), inset 0 0 30px 6px rgba(52,211,153,0.05)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
    {/* Orbiting dot */}
    <motion.div
      className="absolute"
      style={{ width: 150, height: 150 }}
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400"
        style={{ boxShadow: '0 0 10px 3px rgba(52,211,153,0.6)' }}
      />
    </motion.div>
  </>
);

/* ─────────────────────────────────────────────
   Staggered Title
   ───────────────────────────────────────────── */
const titleLetters = 'FashionHub AI'.split('');

const StaggeredTitle = () => (
  <div className="mt-8 flex items-center justify-center space-x-[2px]">
    {titleLetters.map((char, i) => (
      <motion.span
        key={i}
        className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 select-none"
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.4,
          delay: 0.8 + i * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Progress Bar
   ───────────────────────────────────────────── */
const ProgressBar = () => (
  <div className="mt-10 w-64">
    {/* Track */}
    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-slate-800">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #34d399, #14b8a6, #2dd4bf, #34d399)',
          backgroundSize: '200% 100%',
        }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* shimmer */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          backgroundSize: '40% 100%',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{ backgroundPosition: ['-40% 0', '140% 0'] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
    {/* Status text */}
    <motion.p
      className="mt-3 text-center text-xs font-medium tracking-[0.25em] uppercase text-emerald-400/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      Initializing System
    </motion.p>
  </div>
);

/* ─────────────────────────────────────────────
   Corner Brackets (cyberpunk HUD touches)
   ───────────────────────────────────────────── */
const CornerBrackets = () => {
  const size = 40;
  const border = 'border-emerald-500/20';
  const corners = [
    { pos: 'top-6 left-6', classes: `border-t-2 border-l-2 ${border}` },
    { pos: 'top-6 right-6', classes: `border-t-2 border-r-2 ${border}` },
    { pos: 'bottom-6 left-6', classes: `border-b-2 border-l-2 ${border}` },
    { pos: 'bottom-6 right-6', classes: `border-b-2 border-r-2 ${border}` },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${c.pos} ${c.classes}`}
          style={{ width: size, height: size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
        />
      ))}
    </>
  );
};

/* ═════════════════════════════════════════════
   LoadingIntro – main export
   ═════════════════════════════════════════════ */
export default function LoadingIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {visible && (
        <motion.div
          key="loading-intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Ambient radial glow ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 60%)',
            }}
          />

          {/* ── Background layers ── */}
          <GridLines />
          <Particles />
          <ScanLine />
          <CornerBrackets />

          {/* ── Center content ── */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Logo + Glowing ring */}
            <div className="relative flex items-center justify-center">
              <GlowingRing />

              {/* Icon */}
              <motion.div
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
                style={{
                  boxShadow: '0 0 40px 8px rgba(16,185,129,0.1)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 12,
                    delay: 0.4,
                  }}
                >
                  <Shirt
                    className="text-emerald-400"
                    size={36}
                    strokeWidth={1.5}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Staggered title */}
            <StaggeredTitle />

            {/* Tagline */}
            <motion.p
              className="mt-2 text-sm font-light tracking-widest text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Intelligent Fashion Analytics
            </motion.p>

            {/* Progress bar */}
            <ProgressBar />
          </div>

          {/* ── Bottom data stream decoration ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-600">
              sys.online
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
