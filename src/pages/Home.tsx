import { useCallback } from 'react';
import HeroSection from '../components/home/HeroSection';
import BrandSection from '../components/home/BrandSection';
import MenuPreviewSection from '../components/home/MenuPreviewSection';
import StoreSection from '../components/home/StoreSection';
import CTASection from '../components/home/CTASection';
import { useFullPage } from '../hooks/useFullPage';

const SECTIONS = 5;

export default function Home() {
  const { currentSection, scrollToSection, containerRef } = useFullPage(SECTIONS);

  const handleScrollDown = useCallback(() => {
    scrollToSection(1);
  }, [scrollToSection]);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative">
      <div
        className="transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        <HeroSection onScrollDown={handleScrollDown} />
        <BrandSection />
        <MenuPreviewSection />
        <StoreSection />
        <CTASection />
      </div>

      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 space-y-3">
        {Array.from({ length: SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`block w-3 h-3 rounded-full transition-all ${
              currentSection === i
                ? 'bg-primary scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
