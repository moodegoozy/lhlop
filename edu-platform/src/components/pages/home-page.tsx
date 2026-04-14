'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  AppShell,
  PageHeader,
  PageContainer,
  Section,
  HorizontalScroll,
  CardGrid,
} from '@/components/layout';
import { Button, Badge, Card, RatingBadge } from '@/components/ui';
import { TeacherCard } from '@/components/cards';
import { TeacherFilterChips } from '@/components/filters';
import { ROUTES } from '@/lib/constants';
import { t } from '@/lib/translations';
import { mockTeacherProfiles, mockSubjects, mockServices } from '@/data/mock';
import { useAuthStore } from '@/store';

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="bg-white/20 text-white border-0 mb-4">
            🎓 {t('home.badge')}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            {t('home.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={ROUTES.TEACHERS}>
              <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 w-full sm:w-auto">
                {t('home.findTeacher')}
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER_TEACHER}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                {t('home.becomeTeacher')}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-white/80">{t('home.stats.teachers')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-sm text-white/80">{t('home.stats.students')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">50,000+</p>
              <p className="text-sm text-white/80">{t('home.stats.lessons')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            className="fill-gray-50 dark:fill-gray-950"
          />
        </svg>
      </div>
    </section>
  );
}

// Quick Search Section
function QuickSearchSection() {
  return (
    <Section className="-mt-8 relative z-10">
      <PageContainer>
        <Card className="p-4 sm:p-6 shadow-xl" variant="elevated">
          <h2 className="text-lg font-bold mb-4 text-center">
            {t('home.quickSearch')}
          </h2>
          <TeacherFilterChips />
          <div className="mt-4 text-center">
            <Link href={ROUTES.TEACHERS}>
              <Button variant="link" rightIcon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }>
                {t('home.viewAllTeachers')}
              </Button>
            </Link>
          </div>
        </Card>
      </PageContainer>
    </Section>
  );
}

// Subjects Section
function SubjectsSection() {
  const popularSubjects = mockSubjects.slice(0, 8);

  return (
    <Section title={t('home.popularSubjects')}>
      <HorizontalScroll>
        {popularSubjects.map((subject) => (
          <Link
            key={subject.id}
            href={`${ROUTES.TEACHERS}?subject=${subject.id}`}
            className="block"
          >
            <Card
              className="w-28 h-28 flex flex-col items-center justify-center gap-2 text-center hover:border-primary-500"
              interactive
              padding="sm"
            >
              <span className="text-3xl">{subject.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {subject.name_ar}
              </span>
            </Card>
          </Link>
        ))}
      </HorizontalScroll>
    </Section>
  );
}

// Featured Teachers Section
function FeaturedTeachersSection() {
  const featuredTeachers = mockTeacherProfiles.slice(0, 4);

  return (
    <Section
      title={t('home.featuredTeachers')}
      action={
        <Link href={ROUTES.TEACHERS}>
          <Button variant="ghost" size="sm">
            {t('common.viewAll')}
          </Button>
        </Link>
      }
    >
      <PageContainer>
        <CardGrid columns={2}>
          {featuredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              variant="default"
            />
          ))}
        </CardGrid>
      </PageContainer>
    </Section>
  );
}

// Services Section
function ServicesSection() {
  return (
    <Section title={t('home.ourServices')} className="bg-white dark:bg-gray-900 py-8">
      <PageContainer>
        <CardGrid columns={2} gap="sm">
          {mockServices.map((service) => (
            <Link
              key={service.id}
              href={`${ROUTES.TEACHERS}?service=${service.id}`}
            >
              <Card interactive className="h-full">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {service.name_ar}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {service.description_ar}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </CardGrid>
      </PageContainer>
    </Section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      icon: '🔍',
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
    },
    {
      icon: '📅',
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
    },
    {
      icon: '💳',
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
    },
    {
      icon: '📚',
      title: t('home.howItWorks.step4.title'),
      description: t('home.howItWorks.step4.description'),
    },
  ];

  return (
    <Section title={t('home.howItWorks.title')} className="py-8">
      <PageContainer>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'سارة أحمد',
      role: 'ولي أمر',
      content: 'المنصة ساعدتني في إيجاد معلم ممتاز لابني. الحجز سهل والمعلمون محترفون.',
      rating: 5,
    },
    {
      name: 'محمد العلي',
      role: 'طالب جامعي',
      content: 'دروس الرياضيات أونلاين كانت مفيدة جداً. أنصح بها لكل طالب.',
      rating: 5,
    },
    {
      name: 'نورة السعيد',
      role: 'معلمة',
      content: 'المنصة سهلت علي الوصول لطلاب جدد وإدارة حجوزاتي بكفاءة.',
      rating: 5,
    },
  ];

  return (
    <Section title={t('home.testimonials')} className="bg-white dark:bg-gray-900 py-8">
      <HorizontalScroll>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="w-72" padding="default">
            <RatingBadge value={testimonial.rating} className="mb-3" />
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </HorizontalScroll>
    </Section>
  );
}

// CTA Section
function CTASection() {
  const { user } = useAuthStore();

  return (
    <Section className="py-8">
      <PageContainer>
        <Card
          className="bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center"
          padding="lg"
        >
          <h2 className="text-2xl font-bold mb-2">
            {user ? t('home.cta.loggedIn') : t('home.cta.title')}
          </h2>
          <p className="text-white/90 mb-6">
            {user ? t('home.cta.loggedInSubtitle') : t('home.cta.subtitle')}
          </p>
          {user ? (
            <Link href={ROUTES.TEACHERS}>
              <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90">
                {t('home.findTeacher')}
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 w-full">
                  {t('auth.register')}
                </Button>
              </Link>
              <Link href={ROUTES.LOGIN}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 w-full"
                >
                  {t('auth.login')}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </PageContainer>
    </Section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <PageContainer>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Logo & About */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">م</span>
              </div>
              <span className="font-bold">{t('footer.brand')}</span>
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href={ROUTES.TEACHERS} className="hover:text-white">{t('nav.teachers')}</Link></li>
              <li><Link href={ROUTES.ABOUT} className="hover:text-white">{t('nav.about')}</Link></li>
              <li><Link href={ROUTES.CONTACT} className="hover:text-white">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href={ROUTES.FAQ} className="hover:text-white">{t('footer.faq')}</Link></li>
              <li><Link href={ROUTES.TERMS} className="hover:text-white">{t('footer.terms')}</Link></li>
              <li><Link href={ROUTES.PRIVACY} className="hover:text-white">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </PageContainer>
    </footer>
  );
}

// Main HomePage Component
export function HomePage() {
  return (
    <AppShell
      header={
        <PageHeader
          showLogo
          showSearch
          showNotifications
          showProfile
        />
      }
      footer={<Footer />}
    >
      <HeroSection />
      <QuickSearchSection />
      <SubjectsSection />
      <FeaturedTeachersSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </AppShell>
  );
}