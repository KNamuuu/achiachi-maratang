import { useState, useEffect, useCallback, useRef } from 'react';

export function useFullPage(totalSections: number) {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || isScrolling.current) return;
      isScrolling.current = true;
      setCurrentSection(index);
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    },
    [totalSections],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollToSection(currentSection + 1);
        } else {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentSection, scrollToSection]);

  return { currentSection, scrollToSection, containerRef };
}
