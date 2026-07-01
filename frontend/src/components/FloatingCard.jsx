import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const springConfig = { stiffness: 300, damping: 30 };

export default function FloatingCard({ children, className = '', delay = 0 }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw motion values for mouse position (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed values for silky transitions & spring-physics return
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D transforms derived from spring values
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);   // ±8 degrees
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);   // ±8 degrees
  const translateZ = useTransform(
    [springX, springY],
    ([x, y]) => {
      const dist = Math.sqrt(x * x + y * y);
      return `${dist * 30}px`; // subtle depth push towards center of tilt
    }
  );

  // Spotlight gradient position (0-100%)
  const spotlightX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const backgroundImage = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      isHovered
        ? `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`
        : `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
  );

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;    // -0.5 … 0.5

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    // Spring-physics return to rest – just reset the raw values;
    // the springs handle the smooth animation automatically.
    mouseX.set(0);
    mouseY.set(0);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  // Entrance animation variants
  const entranceVariants = {
    hidden: {
      opacity: 0,
      y: 32,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay,
      },
    },
  };

  // Constant subtle float (gentle up/down oscillation)
  const floatTransition = {
    y: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  };

  return (
    <motion.div
      className="inline-block"
      style={{ perspective: '1000px' }}
      variants={entranceVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Outer float wrapper – perpetual gentle oscillation */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={floatTransition}
      >
        {/* Inner 3D tilt card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden rounded-2xl ${className}`}
          style={{
            rotateX,
            rotateY,
            translateZ,
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? '0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 0 40px -8px rgba(139, 92, 246, 0.25)'
              : '0 15px 40px -12px rgba(0, 0, 0, 0.35), 0 0 20px -8px rgba(139, 92, 246, 0.1)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* Cursor-following spotlight overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{ backgroundImage }}
          />

          {/* Subtle static edge glow */}
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
            style={{
              boxShadow: isHovered
                ? 'inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 0 rgba(255,255,255,0.12)'
                : 'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.06)',
              transition: 'box-shadow 0.4s ease',
            }}
          />

          {/* Card content */}
          <div className="relative z-0" style={{ transformStyle: 'preserve-3d' }}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
