import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="h-screen flex items-center justify-center bg-primary relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Handshake size={64} className="mx-auto text-white/80 mb-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-white tracking-wider"
        >
          PARTNERSHIP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-white/80 text-lg md:text-xl mt-6 leading-relaxed"
        >
          아치아치 마라탕과 함께 성공적인 외식 사업을 시작하세요.
          <br />
          체계적인 본사 지원과 검증된 브랜드 파워가 함께합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/partnership"
            className="inline-flex items-center gap-2 bg-white text-primary font-body font-bold px-10 py-4 rounded-full text-lg hover:bg-secondary transition"
          >
            가맹 문의하기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
