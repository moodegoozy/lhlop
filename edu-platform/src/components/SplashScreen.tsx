'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
      }}
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Logo */}
      <div 
        className="relative z-10 text-5xl md:text-7xl font-extrabold animate-scale-in"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f0ff 50%, #c7d2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 60px rgba(255, 255, 255, 0.3)',
        }}
      >
        لهلوب
      </div>

      {/* Tagline */}
      <p 
        className="relative z-10 mt-4 text-lg md:text-xl text-white/80 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        منصتك الأولى للتميز
      </p>

      {/* Loader */}
      <div 
        className="relative z-10 mt-8 w-16 h-1 bg-white/20 rounded-full overflow-hidden animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        <div 
          className="h-full rounded-full animate-shimmer"
          style={{
            width: '40%',
            background: 'linear-gradient(90deg, #facc15, #eab308)',
          }}
        />
      </div>

      {/* Premium Badge */}
      <div 
        className="absolute bottom-8 flex items-center gap-2 text-white/60 text-sm animate-fade-in-up"
        style={{ animationDelay: '0.7s' }}
      >
        <span className="text-lg">✨</span>
        <span>تجربة تعليمية فاخرة</span>
      </div>
    </div>
  );
}
