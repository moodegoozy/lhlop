'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

const quickStats = [
  { icon: '💰', label: 'الأرباح هذا الشهر', value: '3,450', suffix: 'ر.س', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { icon: '📚', label: 'دروس مكتملة', value: '28', bg: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' },
  { icon: '👨‍🎓', label: 'طلاب نشطين', value: '15', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { icon: '⭐', label: 'تقييمي', value: '4.9', bg: 'linear-gradient(135deg, #f59e0b, #f97316)' },
];

const upcomingLessons = [
  { id: '1', student: 'أحمد محمد', subject: 'الرياضيات', date: 'اليوم', time: '04:00 م', mode: 'online' },
  { id: '2', student: 'سارة علي', subject: 'الرياضيات', date: 'غداً', time: '05:30 م', mode: 'حضوري' },
  { id: '3', student: 'خالد العمري', subject: 'الجبر', date: '15 فبراير', time: '03:00 م', mode: 'online' },
];

const recentReviews = [
  { id: '1', student: 'أحمد', rating: 5, comment: 'معلم ممتاز وصبور جداً', date: '10 فبراير' },
  { id: '2', student: 'نورة', rating: 5, comment: 'أسلوب تعليمي رائع', date: '8 فبراير' },
  { id: '3', student: 'محمد', rating: 4, comment: 'درس مفيد جداً', date: '5 فبراير' },
];

const sidebarItems = [
  { icon: '🏠', label: 'نظرة عامة', key: 'overview' },
  { icon: '📅', label: 'جدولي', key: 'schedule' },
  { icon: '👨‍🎓', label: 'طلابي', key: 'students' },
  { icon: '💰', label: 'الأرباح', key: 'earnings' },
  { icon: '⭐', label: 'التقييمات', key: 'reviews' },
  { icon: '⚙️', label: 'الإعدادات', key: 'settings' },
];

export function TeacherDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    router.push(ROUTES.HOME);
  };

  const cardStyle: React.CSSProperties = {
    background: 'white', borderRadius: '1.5rem', padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(139,92,246,0.1)'
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', fontFamily: "'Tajawal', sans-serif",
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)'
    }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '280px', background: 'linear-gradient(180deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)', padding: '1.5rem', color: 'white' }}>
            <SidebarContent activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setSidebarOpen(false); }} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Desktop Sidebar */}
        <aside style={{ width: '280px', background: 'linear-gradient(180deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)', padding: '1.5rem', color: 'white', position: 'sticky', top: 0, height: '100vh', display: 'none' }} className="lg:block">
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setSidebarOpen(true)} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'none' }} className="lg:hidden-btn">☰</button>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1a1a2e' }}>مرحباً، أ. محمد 👋</h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>لوحة تحكم المعلم</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThemeToggle />
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>م</div>
            </div>
          </div>

          {/* Stats Grid */}
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

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="lg:grid-cols-2">
            {/* Upcoming Lessons */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📅 الدروس القادمة</h2>
                <button style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>عرض الكل</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {upcomingLessons.map(lesson => (
                  <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{lesson.student[0]}</div>
                      <div>
                        <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{lesson.student}</p>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{lesson.subject}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{lesson.time}</p>
                      <p style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', background: lesson.mode === 'online' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)', color: lesson.mode === 'online' ? '#16a34a' : '#3b82f6', fontWeight: 600 }}>{lesson.mode === 'online' ? 'أونلاين' : 'حضوري'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⭐ آخر التقييمات</h2>
                <button style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>عرض الكل</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {recentReviews.map(review => (
                  <div key={review.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <p style={{ fontWeight: 700, color: '#1a1a2e' }}>{review.student}</p>
                      <div style={{ display: 'flex', gap: '0.125rem' }}>
                        {Array.from({ length: review.rating }).map((_, i) => (<span key={i} style={{ color: '#f59e0b' }}>⭐</span>))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{review.comment}</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ ...cardStyle, marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1.25rem' }}>⚡ إجراءات سريعة</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '➕', label: 'إضافة درس', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
                { icon: '📊', label: 'تقرير الأداء', bg: 'linear-gradient(135deg, #3b82f6, #0ea5e9)' },
                { icon: '💬', label: 'الرسائل', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
                { icon: '📝', label: 'تعديل الملف', bg: 'linear-gradient(135deg, #f59e0b, #f97316)' },
              ].map((action, i) => (
                <button key={i} style={{ padding: '1rem', borderRadius: '1rem', background: action.bg, border: 'none', cursor: 'pointer', color: 'white', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', fontFamily: 'inherit' }}>
                  <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .lg\\:block { display: block !important; }
          .lg\\:hidden-btn { display: none !important; }
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 1023px) {
          .lg\\:block { display: none !important; }
          .lg\\:hidden-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function SidebarContent({ activeTab, setActiveTab, onLogout }: { activeTab: string; setActiveTab: (t: string) => void; onLogout: () => void }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link href={ROUTES.HOME}><h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', cursor: 'pointer', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</h1></Link>
      <nav style={{ flex: 1 }}>
        {sidebarItems.map(item => (
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
