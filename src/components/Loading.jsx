import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(Math.min(current, 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060913] text-white"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <div className="relative w-16 h-16 rounded-full border-2 border-[#00f2fe] flex items-center justify-center"
              style={{ boxShadow: '0 0 20px rgba(0, 242, 254, 0.25)' }}>
              <span className="font-bold text-xl" style={{ color: '#00f2fe', fontFamily: 'Outfit, sans-serif' }}>KM</span>
              <div className="absolute inset-0 rounded-full border border-[#7f00ff] animate-ping opacity-75"></div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold tracking-wider mb-2"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(to right, #00f2fe, #7f00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            INITIALIZING WORKSPACE
          </h2>

          <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            Loading 3D Scene Components...
          </p>

          {/* Loading bar container */}
          <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #00f2fe, #7f00ff)' }}
            />
          </div>

          {/* Progress number */}
          <span className="mt-3 font-medium" style={{ color: '#00f2fe', fontFamily: 'Outfit, sans-serif' }}>
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
