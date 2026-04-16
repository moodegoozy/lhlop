'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

const quickStats = [
  { icon: '👨‍👧‍👦', label: 'عدد الأبناء', value: '2', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { icon: '📚', label: 'دروس هذا الشهر', value: '18', bg: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' },
  { icon: '💰', label: 'المصروف هذا الشهر', value: '2,400', suffix: 'ر.س', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { icon: '📈', label: 'متوسط التقدم', value: '88%', bg: 'linear-gradient(135deg, #f59e0b, #f97316)' },
];

const children = [
  { id: '1', name: 'أحمد', grade: 'الصف الثالث ابتدائي', progress: 92, subjects: ['رياضيات', 'عربي', 'علوم'], avatar: '👦' },
  { id: '2', name: 'سارة', grade: 'الصف الأول متوسط', progress: 85, subjects: ['رياضيات', 'إنجليزي'], avatar: '👧' },
];

const upcomingLessons = [
  { id: '1', child: 'أحمد', teacher: 'أ. محمد', subject: 'الرياضيات', date: 'اليوم', time: '04:00 م' },
  { id: '2', child: 'سارة', teacher: 'أ. فاطمة', subject: 'الإنجليزية', date: 'غداً', time: '05:30 م' },
];

const sidebarItems = [
  { icon: '🏠', label: 'نظرة عامة', key: 'overview' },
  { icon: '👨‍👧‍👦', label: 'أبنائي', key: 'children' },
  { icon: '📅', label: 'جدول الدروس', key: 'schedule' },
  { icon: '💳', label: 'المدفوعات', key: 'payments' },
  { icon: '📊', label: 'التقارير', key: 'reports' },
  { icon: '⚙️', label: 'الإعدادات', key: 'settings' },
];

export function ParentDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push(ROUTES.HOME);
  };

  const cardStyle: React.CSSProperties = {
    background: 'white', borderRadius: '1.5rem', padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(34,197,94,0.1)'
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', fontFamily: "'Tajawal', sans-serif",
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
    }}>
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '280px', background: 'linear-gradient(180deg, #166534 0%, #22c55e 50%, #4ade80 100%)', padding: '1.5rem', color: 'white' }}>
            <SidebarContent activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }} onLogout={handleLogout} items={sidebarItems} />
          </aside>
        </div>
      )}

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ width: '280px', background: 'linear-gradient(180deg, #166534 0%, #22c55e 50%, #4ade80 100%)', padding: '1.5rem', color: 'white', position: 'sticky', top: 0, height: '100vh', display: 'none' }} className="lg:block">
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} items={sidebarItems} />
        </aside>

        <main style={{ flex: 1, padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setSidebarOpen(true)} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} className="lg:hidden-btn">☰</button>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1a1a2e' }}>مرحباً، ولي الأمر 👨‍👩‍👧</h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>لوحة تحكم ولي الأمر</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>و</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {quickStats.map((stat, i) => (
              <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{stat.icon}</div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1a2e' }}>{stat.value} <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{stat.suffix}</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* Children Cards */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>👨‍👧‍👦 متابعة أبنائي</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {children.map(child => (
              <div key={child.id} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{child.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>{child.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{child.grade}</p>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>نسبة التقدم</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#22c55e' }}>{child.progress}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${child.progress}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {child.subjects.map((sub, i) => (<span key={i} style={{ padding: '0.25rem 0.75rem', background: 'rgba(34,197,94,0.1)', color: '#16a34a', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>{sub}</span>))}
                </div>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e' }}>📅 الدروس القادمة</h2>
              <Link href={ROUTES.TEACHERS} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '0.75rem', textDecoration: 'none' }}>+ احجز درس</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {upcomingLessons.map(lesson => (
                <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{lesson.child} - {lesson.subject}</p>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>مع {lesson.teacher}</p>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{lesson.time}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{lesson.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) { .lg\\:block { display: block !important; } .lg\\:hidden-btn { display: none !important; } }
        @media (max-width: 1023px) { .lg\\:block { display: none !important; } .lg\\:hidden-btn { display: block !important; } }
      `}</style>
    </div>
  );
}

function SidebarContent({ activeTab, setActiveTab, onLogout, items }: { activeTab: string; setActiveTab: (t: string) => void; onLogout: () => void; items: typeof sidebarItems }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link href={ROUTES.HOME}><h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', cursor: 'pointer', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</h1></Link>
      <nav style={{ flex: 1 }}>
        {items.map(item => (
          <button key={item.key} onClick={() => setActiveTab(item.key)} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: 'none', background: activeTab === item.key ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'white', fontWeight: activeTab === item.key ? 700 : 500, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '0.5rem', fontSize: '1rem' }}>
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={onLogout} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(239,68,68,0.2)', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🚪</span>
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}
