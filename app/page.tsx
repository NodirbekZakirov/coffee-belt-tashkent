import { PromoBanner } from '@/components/PromoBanner';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { CoffeeTerroirWidget } from '@/components/CoffeeTerroirWidget';
import { MenuPreview } from '@/components/MenuPreview';
import { Gallery } from '@/components/Gallery';
import { ReservationSection } from '@/components/ReservationSection';
import { LocationSection } from '@/components/LocationSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-cream-50 overflow-x-hidden">
      <PromoBanner />
      <Header />
      <Hero />
      <About />
      <CoffeeTerroirWidget />
      <MenuPreview />
      <Gallery />
      <ReservationSection />
      <LocationSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
