import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroImg from '../../assets/hero.png';

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="마라탕"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-white tracking-wider"
        >
          ACHI ACHI
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary tracking-wider mt-2"
        >
          MARATANG
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-gray-300 text-lg md:text-xl mt-6 max-w-xl mx-auto"
        >
          정통 마라의 깊은 맛, 아치아치에서 경험하세요
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 1.5 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition"
      >
        <ChevronDown size={36} />
      </motion.button>
    </section>
  );
}
