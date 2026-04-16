'use client';

import * as React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

// Data
const stages = [
  { id: 'elementary', name: 'ابتدائي', icon: '🎒', grades: [
    { id: 'g1', name: 'أول ابتدائي' },
    { id: 'g2', name: 'ثاني ابتدائي' },
    { id: 'g3', name: 'ثالث ابتدائي' },
    { id: 'g4', name: 'رابع ابتدائي' },
    { id: 'g5', name: 'خامس ابتدائي' },
    { id: 'g6', name: 'سادس ابتدائي' },
  ]},
  { id: 'middle', name: 'متوسط', icon: '📖', grades: [
    { id: 'g1', name: 'أول متوسط' },
    { id: 'g2', name: 'ثاني متوسط' },
    { id: 'g3', name: 'ثالث متوسط' },
  ]},
  { id: 'high', name: 'ثانوي', icon: '🎓', grades: [
    { id: 'g1', name: 'أول ثانوي' },
    { id: 'g2', name: 'ثاني ثانوي' },
    { id: 'g3', name: 'ثالث ثانوي' },
  ]},
  { id: 'university', name: 'جامعي', icon: '🏛️', grades: [
    { id: 'g1', name: 'السنة الأولى' },
    { id: 'g2', name: 'السنة الثانية' },
    { id: 'g3', name: 'السنة الثالثة' },
    { id: 'g4', name: 'السنة الرابعة' },
    { id: 'g5', name: 'السنة الخامسة' },
  ]},
];

const subjects: { [key: string]: { id: string; name: string; icon: string }[] } = {
  elementary: [
    { id: 'math', name: 'رياضيات', icon: '🔢' },
    { id: 'arabic', name: 'لغة عربية', icon: '📝' },
    { id: 'english', name: 'إنجليزي', icon: '🔤' },
    { id: 'science', name: 'علوم', icon: '🔬' },
    { id: 'islamic', name: 'تربية إسلامية', icon: '🕌' },
    { id: 'social', name: 'اجتماعيات', icon: '🌍' },
  ],
  middle: [
    { id: 'math', name: 'رياضيات', icon: '🔢' },
    { id: 'arabic', name: 'لغة عربية', icon: '📝' },
    { id: 'english', name: 'إنجليزي', icon: '🔤' },
    { id: 'science', name: 'علوم', icon: '🔬' },
    { id: 'computer', name: 'حاسب آلي', icon: '💻' },
    { id: 'social', name: 'اجتماعيات', icon: '🌍' },
  ],
  high: [
    { id: 'math', name: 'رياضيات', icon: '🔢' },
    { id: 'physics', name: 'فيزياء', icon: '⚛️' },
    { id: 'chemistry', name: 'كيمياء', icon: '🧪' },
    { id: 'biology', name: 'أحياء', icon: '🧬' },
    { id: 'english', name: 'إنجليزي', icon: '🔤' },
    { id: 'arabic', name: 'لغة عربية', icon: '📝' },
    { id: 'qudrat', name: 'قدرات', icon: '🎯' },
    { id: 'tahsili', name: 'تحصيلي', icon: '📊' },
  ],
  university: [
    { id: 'calculus', name: 'تفاضل وتكامل', icon: '📐' },
    { id: 'statistics', name: 'إحصاء', icon: '📊' },
    { id: 'programming', name: 'برمجة', icon: '💻' },
    { id: 'accounting', name: 'محاسبة', icon: '📒' },
    { id: 'engineering', name: 'هندسة', icon: '⚙️' },
    { id: 'medical', name: 'طب', icon: '🏥' },
    { id: 'law', name: 'قانون', icon: '⚖️' },
    { id: 'business', name: 'إدارة أعمال', icon: '💼' },
  ],
};

const lessonModes = [
  { id: 'both', name: 'الكل', icon: '🌐' },
  { id: 'remote', name: 'عن بعد', icon: '💻' },
  { id: 'in_person', name: 'حضوري', icon: '🏠' },
];

const mockTeachers = [
  { id: 'tp_1', name: 'أ. محمد العلي', subject: 'رياضيات', stage: 'ثانوي', rating: 4.9, reviews: 127, price: 150, mode: 'both', verified: true, avatar: 'م' },
  { id: 'tp_2', name: 'أ. فاطمة الأحمد', subject: 'إنجليزي', stage: 'متوسط', rating: 4.8, reviews: 89, price: 120, mode: 'remote', verified: true, avatar: 'ف' },
  { id: 'tp_3', name: 'أ. خالد السعود', subject: 'فيزياء', stage: 'ثانوي', rating: 4.9, reviews: 156, price: 180, mode: 'in_person', verified: true, avatar: 'خ' },
  { id: 'tp_4', name: 'أ. نورة الشمري', subject: 'كيمياء', stage: 'ثانوي', rating: 4.7, reviews: 64, price: 140, mode: 'both', verified: false, avatar: 'ن' },
  { id: 'tp_5', name: 'أ. سعد المالكي', subject: 'قدرات', stage: 'ثانوي', rating: 5.0, reviews: 203, price: 200, mode: 'remote', verified: true, avatar: 'س' },
  { id: 'tp_6', name: 'أ. هند العتيبي', subject: 'لغة عربية', stage: 'ابتدائي', rating: 4.8, reviews: 78, price: 100, mode: 'both', verified: true, avatar: 'ه' },
];

export function HomePage() {
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = React.useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<string>('both');
  const [showResults, setShowResults] = React.useState(false);

  const handleStageSelect = (stageId: string) => {
    if (selectedStage === stageId) {
      setSelectedStage(null);
      setSelectedGrade(null);
      setSelectedSubject(null);
      setShowResults(false);
    } else {
      setSelectedStage(stageId);
      setSelectedGrade(null);
      setSelectedSubject(null);
      setShowResults(false);
    }
  };

  const handleGradeSelect = (gradeId: string) => {
    if (selectedGrade === gradeId) {
      setSelectedGrade(null);
      setSelectedSubject(null);
      setShowResults(false);
    } else {
      setSelectedGrade(gradeId);
      setSelectedSubject(null);
      setShowResults(false);
    }
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setShowResults(true);
  };

  const currentStage = stages.find(s => s.id === selectedStage);
  const currentGrade = currentStage?.grades.find(g => g.id === selectedGrade);
  const currentSubject = selectedStage ? subjects[selectedStage]?.find(s => s.id === selectedSubject) : null;

  const filteredTeachers = mockTeachers.filter(t => {
    if (selectedMode !== 'both' && t.mode !== 'both' && t.mode !== selectedMode) return false;
    return true;
  });

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#fafbfc', fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              لهلوب
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ThemeToggle />
              <Link href={ROUTES.LOGIN}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}>
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Navigation */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Row 1: Stages */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            borderBottom: selectedStage ? '1px solid #e2e8f0' : 'none',
            overflow: 'auto'
          }}>
            {stages.map(stage => (
              <button
                key={stage.id}
                onClick={() => handleStageSelect(stage.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: selectedStage === stage.id ? '#f5f3ff' : 'transparent',
                  border: 'none',
                  borderBottom: selectedStage === stage.id ? '3px solid #8b5cf6' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  minWidth: '100px'
                }}
              >
                <span style={{ fontSize: '1.75rem' }}>{stage.icon}</span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: selectedStage === stage.id ? 800 : 600,
                  color: selectedStage === stage.id ? '#7c3aed' : '#374151',
                  whiteSpace: 'nowrap'
                }}>
                  {stage.name}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2: Grades (الصفوف) */}
          {selectedStage && currentStage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 0',
              overflow: 'auto',
              borderBottom: selectedGrade ? '1px solid #e2e8f0' : 'none'
            }}>
              <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>الصف:</span>
              {currentStage.grades.map(grade => (
                <button
                  key={grade.id}
                  onClick={() => handleGradeSelect(grade.id)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: selectedGrade === grade.id 
                      ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' 
                      : '#f1f5f9',
                    color: selectedGrade === grade.id ? 'white' : '#374151',
                    border: selectedGrade === grade.id ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    boxShadow: selectedGrade === grade.id ? '0 4px 15px rgba(139,92,246,0.3)' : 'none'
                  }}
                >
                  {grade.name}
                </button>
              ))}
            </div>
          )}

          {/* Row 3: Subjects (المواد) */}
          {selectedGrade && selectedStage && subjects[selectedStage] && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 0',
              overflow: 'auto',
              borderBottom: selectedSubject ? '1px solid #e2e8f0' : 'none'
            }}>
              <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>المادة:</span>
              {subjects[selectedStage].map(subject => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.25rem',
                    background: selectedSubject === subject.id 
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                      : '#f1f5f9',
                    color: selectedSubject === subject.id ? 'white' : '#374151',
                    border: selectedSubject === subject.id ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    boxShadow: selectedSubject === subject.id ? '0 4px 15px rgba(245,158,11,0.3)' : 'none'
                  }}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Row 4: Lesson Mode */}
          {selectedSubject && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 0'
            }}>
              <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.9rem' }}>نوع الدرس:</span>
              {lessonModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: selectedMode === mode.id ? '#ddd6fe' : 'transparent',
                    color: selectedMode === mode.id ? '#7c3aed' : '#64748b',
                    border: selectedMode === mode.id ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Hero - No Selection */}
        {!selectedStage && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'linear-gradient(135deg, #0f0a29 0%, #1a1048 25%, #2d1b69 50%, #4c1d95 75%, #6d28d9 100%)',
            borderRadius: '2rem',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '-100px',
              left: '-100px'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: 'white',
                marginBottom: '1rem'
              }}>
                ابحث عن معلمك المثالي 🌟
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                اختر المرحلة الدراسية من الأعلى للبدء
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>500+</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>معلم معتمد</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>50+</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>مادة دراسية</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>10K+</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>طالب</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage Selected - Show Grades */}
        {selectedStage && !selectedGrade && currentStage && (
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1a1a2e', textAlign: 'center' }}>
              اختر الصف الدراسي - {currentStage.name} {currentStage.icon}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {currentStage.grades.map((grade, i) => (
                <button
                  key={grade.id}
                  onClick={() => handleGradeSelect(grade.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '2rem 1.5rem',
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(139,92,246,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>📚</span>
                  <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>{grade.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grade Selected - Show Subjects */}
        {selectedGrade && !selectedSubject && selectedStage && (
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1a1a2e', textAlign: 'center' }}>
              اختر المادة - {currentGrade?.name} {currentStage?.icon}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {subjects[selectedStage]?.map((subject, i) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(245,158,11,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>{subject.icon}</span>
                  <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && selectedSubject && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1rem 1.5rem',
              background: '#f5f3ff',
              borderRadius: '1rem',
              border: '1px solid #ddd6fe'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.25rem' }}>
                  نتائج البحث
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {currentStage?.name} ← {currentGrade?.name} ← {currentSubject?.name} {currentSubject?.icon}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#8b5cf6', fontSize: '1.75rem' }}>{filteredTeachers.length}</span>
                <span style={{ color: '#64748b' }}>معلم متاح</span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredTeachers.map((teacher, i) => (
                <div
                  key={teacher.id}
                  style={{
                    background: 'white',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    animation: `fadeInUp 0.5s ease ${i * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(139,92,246,0.2)';
                    e.currentTarget.style.borderColor = '#c4b5fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      position: 'relative',
                      flexShrink: 0
                    }}>
                      {teacher.avatar}
                      {teacher.verified && (
                        <span style={{
                          position: 'absolute',
                          bottom: '-2px',
                          right: '-2px',
                          width: '24px',
                          height: '24px',
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          border: '2px solid white'
                        }}>✓</span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#1a1a2e' }}>
                        {teacher.name}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {teacher.subject} • {teacher.stage}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#fbbf24' }}>★</span>
                        <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{teacher.rating}</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({teacher.reviews} تقييم)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.4rem 0.8rem',
                    background: teacher.mode === 'remote' ? '#dbeafe' : teacher.mode === 'in_person' ? '#dcfce7' : '#fef3c7',
                    color: teacher.mode === 'remote' ? '#1d4ed8' : teacher.mode === 'in_person' ? '#15803d' : '#b45309',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}>
                    {teacher.mode === 'remote' ? '💻 عن بعد' : teacher.mode === 'in_person' ? '🏠 حضوري' : '🌐 حضوري وعن بعد'}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '2px dashed #e2e8f0'
                  }}>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#8b5cf6' }}>{teacher.price}</span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', marginRight: '0.25rem' }}>ر.س/ساعة</span>
                    </div>
                    <Link href={`${ROUTES.TEACHERS}/${teacher.id}`}>
                      <button style={{
                        padding: '0.6rem 1.25rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit',
                        boxShadow: '0 4px 15px rgba(139,92,246,0.3)'
                      }}>
                        احجز الآن
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1a1a2e',
        color: 'white',
        padding: '3rem 1.5rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 900,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            لهلوب
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
            منصة التعليم الأولى في المملكة العربية السعودية
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            © 2024 لهلوب. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
