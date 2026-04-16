'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(theme === 'dark' || (!theme && prefersDark));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="relative w-14 h-8 rounded-full transition-all duration-300"
        style={{ background: 'var(--muted)' }}
        aria-label="تبديل السمة"
      >
        <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 border-2 ${
        isDark 
          ? 'bg-indigo-900 border-indigo-700' 
          : 'bg-gray-200 border-gray-300'
      }`}
      aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
    >
      {/* Sun Icon */}
      <span 
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-300 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      >
        ☀️
      </span>
      
      {/* Moon Icon */}
      <span 
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        🌙
      </span>

      {/* Toggle Circle */}
      <div 
        className={`absolute top-1 w-6 h-6 rounded-full shadow-md transition-all duration-300 ${
          isDark 
            ? 'left-[calc(100%-1.75rem)] bg-indigo-400' 
            : 'left-1 bg-white'
        }`}
      />
    </button>
  );
}
