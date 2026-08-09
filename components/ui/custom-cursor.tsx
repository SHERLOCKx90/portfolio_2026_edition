'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorVariant('pointer');
      } else if (target.closest('[data-cursor="hover"]')) {
        setCursorVariant('expand');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    pointer: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1.5,
      backgroundColor: 'rgba(66, 133, 244, 1)',
    },
    expand: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0.5,
      backgroundColor: 'rgba(139, 92, 246, 1)',
    },
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    pointer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.4,
      borderColor: 'rgba(66, 133, 244, 0.7)',
      backgroundColor: 'rgba(66, 133, 244, 0.08)',
    },
    expand: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2.2,
      borderColor: 'rgba(139, 92, 246, 0.7)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/20 pointer-events-none will-change-transform"
        variants={ringVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none will-change-transform"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
    </div>
  );
}
