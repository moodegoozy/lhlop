'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, Users, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { t } from '@/lib/translations';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/teachers', label: t('teachers') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact_us') },
  ];

  return (
    <header className="header-gradient sticky top-0 z-40 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Left Side: Auth buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-medium">{t('login')}</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl"
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-sm font-medium">{t('register')}</span>
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side: Logo & Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{t('site_name')}</span>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{t('site_name')}</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/20 my-2" />
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {t('login')}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {t('register')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
