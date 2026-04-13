'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/lib/store';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
      aria-label={darkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </button>
  );
}
