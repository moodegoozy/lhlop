'use client';

import * as React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

// Using consistent IDs that match the mock data (tp_1, tp_2, etc.)
const teachers = [
  { id: 'tp_1', name: 'أ. محمد أحمد', subject: 'الرياضيات', rating: 4.9, reviews: 128, price: 120, avatar: 'م', experience: '8 سنوات', location: 'الرياض', available: true },
  { id: 'tp_2', name: 'أ. فاطمة علي', subject: 'اللغة العربية', rating: 4.8, reviews: 95, price: 100, avatar: 'ف', experience: '6 سنوات', location: 'جدة', available: true },
  { id: 'tp_3', name: 'أ. خالد سعود', subject: 'الفيزياء', rating: 4.7, reviews: 72, price: 150, avatar: 'خ', experience: '10 سنوات', location: 'الدمام', available: false },
  { id: 'tp_4', name: 'أ. نورة الحربي', subject: 'الإنجليزية', rating: 4.9, reviews: 156, price: 110, avatar: 'ن', experience: '5 سنوات', location: 'الرياض', available: true },
  { id: 'tp_5', name: 'أ. عبدالله العتيبي', subject: 'الكيمياء', rating: 4.6, reviews: 64, price: 130, avatar: 'ع', experience: '7 سنوات', location: 'مكة', available: true },
  { id: 'tp_6', name: 'أ. سارة القحطاني', subject: 'الأحياء', rating: 4.8, reviews: 89, price: 115, avatar: 'س', experience: '4 سنوات', location: 'الرياض', available: true },
];

const subjects = ['الكل', 'الرياضيات', 'اللغة العربية', 'الإنجليزية', 'الفيزياء', 'الكيمياء', 'الأحياء'];

export function TeachersPage() {
  const [selectedSubject, setSelectedSubject] = React.useState('الكل');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTeachers = teachers.filter(t => {
    const matchesSubject = selectedSubject === 'الكل' || t.subject === selectedSubject;
    const matchesSearch = t.name.includes(searchQuery) || t.subject.includes(searchQuery);
    return matchesSubject && matchesSearch;
  });

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', fontFamily: "'Tajawal', sans-serif",
      background: 'linear-gradient(135deg, #0f0a29 0%, #1a1048 25%, #2d1b69 50%, #4c1d95 75%, #6d28d9 100%)'
    }}>
      {/* Header */}
      <header style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={ROUTES.HOME}><h1 style={{ fontSize: '1.75rem', fontWeight: 900, cursor: 'pointer', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</h1></Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle />
            <Link href={ROUTES.LOGIN} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(139,92,246,0.4)' }}>تسجيل الدخول</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>ابحث عن معلمك 🔍</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>اختر من بين أفضل المعلمين المعتمدين</p>
        </div>

        {/* Search & Filter */}
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="md:flex-row">
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="ابحث باسم المعلم أو المادة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1.25rem', fontSize: '1rem', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {subjects.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  style={{
                    padding: '0.75rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: 'none', transition: 'all 0.2s',
                    background: selectedSubject === sub ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.1)',
                    color: 'white', boxShadow: selectedSubject === sub ? '0 4px 15px rgba(139,92,246,0.4)' : 'none'
                  }}
                >{sub}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Teachers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              {/* Card Header */}
              <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span style={{ padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, background: teacher.available ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)', color: 'white' }}>
                    {teacher.available ? 'متاح' : 'مشغول'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 900, color: '#8b5cf6', border: '3px solid rgba(255,255,255,0.3)' }}>{teacher.avatar}</div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>{teacher.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{teacher.subject}</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>📍 {teacher.location} • 💼 {teacher.experience}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>⭐</span>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>{teacher.rating}</span>
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>({teacher.reviews} تقييم)</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#8b5cf6' }}>{teacher.price}</span>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}> ر.س/ساعة</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link href={`${ROUTES.TEACHERS}/${teacher.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                    <button style={{ width: '100%', padding: '0.875rem', fontSize: '0.9rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '2px solid rgba(139,92,246,0.3)', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                      عرض الملف
                    </button>
                  </Link>
                  <Link href={ROUTES.BOOK_TEACHER(teacher.id)} style={{ flex: 1, textDecoration: 'none' }}>
                    <button style={{ width: '100%', padding: '0.875rem', fontSize: '0.9rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 15px rgba(139,92,246,0.4)' }}>
                      احجز الآن
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', marginTop: '2rem' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>لم يتم العثور على معلمين</p>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>جرب البحث بكلمات مختلفة</p>
          </div>
        )}
      </main>

      <style jsx global>{`
        @media (min-width: 768px) { .md\\:flex-row { flex-direction: row !important; } }
        ::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>
    </div>
  );
}
