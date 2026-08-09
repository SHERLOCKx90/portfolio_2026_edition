'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  value: string; // e.g. "84%", "12ms", "10x", "50k+"
  duration?: number;
}

export function CountUp({ value, duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric parts and suffix
    const match = value.match(/^([\D]*)([\d,.]+)([\D]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const numericTarget = parseFloat(match[2].replace(/,/g, ''));
    const suffix = match[3];

    let start = 0;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const current = Math.floor(numericTarget * (1 - Math.pow(2, -10 * progress)));

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
