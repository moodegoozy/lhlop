'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

const quickStats = [
  { icon: '👨‍🏫', label: 'المعلمين', value: '156', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { icon: '👨‍🎓', label: 'الطلاب', value: '2,340', bg: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' },
  { icon: '📚', label: 'الدروس النشطة', value: '89', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { icon: '💰', label: 'الإيرادات (الشهر)', value: '45,200', suffix: 'ر.س', bg: 'linear-gradient(135deg, #f59e0b, #f97316)' },
];

const recentTeachers = [
  { id: '1', name: 'أ. محمد أحمد', subject: 'الرياضيات', status: 'معتمد', rating: 4.9 },
  { id: '2', name: 'أ. فاطمة علي', subject: 'اللغة العربية', status: 'قيد المراجعة', rating: 0 },
  { id: '3', name: 'أ. خالد سعود', subject: 'الفيزياء', status: 'معتمد', rating: 4.7 },
];

const sidebarItems = [
  { icon: '📊', label: 'لوحة التحكم', key: 'dashboard' },
  { icon: '👨‍🏫', label: 'المعلمين', key: 'teachers' },
  { icon: '👨‍🎓', label: 'الطلاب', key: 'students' },
  { icon: '📚', label: 'الدروس', key: 'lessons' },
  { icon: '💳', label: 'المدفوعات', key: 'payments' },
  { icon: '📈', label: 'التقارير', key: 'reports' },
  { icon: '⚙️', label: 'الإعدادات', key: 'settings' },
];

export function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push(ROUTES.HOME);
  };

  const cardStyle: React.CSSProperties = {
    background: 'white', borderRadius: '1.5rem', padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(245,158,11,0.1)'
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', fontFamily: "'Tajawal', sans-serif",
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16163a 50%, #0f0f23 100%)'
    }}>
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '280px', background: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d4a 100%)', padding: '1.5rem', color: 'white', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <SidebarContent activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }} onLogout={handleLogout} items={sidebarItems} />
          </aside>
        </div>
      )}

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ width: '280px', background: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d4a 100%)', padding: '1.5rem', color: 'white', position: 'sticky', top: 0, height: '100vh', display: 'none', borderLeft: '1px solid rgba(255,255,255,0.1)' }} className="lg:block">
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} items={sidebarItems} />
        </aside>

        <main style={{ flex: 1, padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setSidebarOpen(true)} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: 'white' }} className="lg:hidden-btn">☰</button>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white' }}>لوحة تحكم الإدارة 🔒</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>إدارة منصة لهلوب</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>م</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {quickStats.map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{stat.icon}</div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>{stat.value} <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{stat.suffix}</span></p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="lg:grid-cols-2">
            {/* Recent Teachers */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>👨‍🏫 آخر المعلمين</h2>
                <button style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>عرض الكل</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {recentTeachers.map(teacher => (
                  <div key={teacher.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{teacher.name[3]}</div>
                      <div>
                        <p style={{ fontWeight: 700, color: 'white' }}>{teacher.name}</p>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>{teacher.subject}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', background: teacher.status === 'معتمد' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: teacher.status === 'معتمد' ? '#22c55e' : '#f59e0b', fontWeight: 600, marginBottom: '0.25rem' }}>{teacher.status}</p>
                      {teacher.rating > 0 && <p style={{ fontSize: '0.8rem', color: '#f59e0b' }}>⭐ {teacher.rating}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '1.25rem' }}>⚡ إجراءات سريعة</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { icon: '➕', label: 'إضافة معلم', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
                  { icon: '📊', label: 'تقارير', bg: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' },
                  { icon: '⚙️', label: 'الإعدادات', bg: 'linear-gradient(135deg, #64748b, #475569)' },
                  { icon: '📨', label: 'الإشعارات', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
                ].map((action, i) => (
                  <button key={i} style={{ padding: '1.25rem', borderRadius: '1rem', background: action.bg, border: 'none', cursor: 'pointer', color: 'white', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', fontFamily: 'inherit' }}>
                    <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) { .lg\\:block { display: block !important; } .lg\\:hidden-btn { display: none !important; } .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 1023px) { .lg\\:block { display: none !important; } .lg\\:hidden-btn { display: block !important; } }
      `}</style>
    </div>
  );
}

function SidebarContent({ activeTab, setActiveTab, onLogout, items }: { activeTab: string; setActiveTab: (t: string) => void; onLogout: () => void; items: typeof sidebarItems }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', background: 'linear-gradient(135deg, #f59e0b, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</h1>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', padding: '0.5rem 0.75rem', background: 'rgba(245,158,11,0.1)', borderRadius: '0.5rem', display: 'inline-block' }}>🔒 وضع الإدارة</p>
      <nav style={{ flex: 1 }}>
        {items.map(item => (
          <button key={item.key} onClick={() => setActiveTab(item.key)} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: 'none', background: activeTab === item.key ? 'rgba(245,158,11,0.2)' : 'transparent', color: activeTab === item.key ? '#f59e0b' : 'rgba(255,255,255,0.7)', fontWeight: activeTab === item.key ? 700 : 500, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '0.5rem', fontSize: '1rem' }}>
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={onLogout} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(239,68,68,0.2)', color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🚪</span>
        <span>تسجيل الخروج</span>
      </button>
    </div>
  );
}
