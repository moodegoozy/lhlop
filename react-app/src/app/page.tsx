import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TeacherGrid } from '@/components/TeacherGrid';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <section className="py-12 lg:py-16">
          <div className="container-custom">
            <TeacherGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
