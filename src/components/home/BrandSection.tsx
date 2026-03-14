import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { end: 11, suffix: '개+', label: '전국 매장' },
  { end: 50, suffix: '종+', label: '다양한 토핑' },
  { end: 98, suffix: '%', label: '고객 만족도' },
  { end: 3, suffix: '년', label: '브랜드 역사' },
];

export default function BrandSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="h-screen flex items-center bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-dark tracking-wider">
            OUR BRAND
          </h2>
          <p className="font-body text-dark/70 text-lg mt-4 max-w-2xl mx-auto">
            아치아치 마라탕은 정통 사천식 마라 레시피를 기반으로
            한국인의 입맛에 맞게 재해석한 프리미엄 마라탕 브랜드입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              <p className="font-body text-dark/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            { title: '정통 레시피', desc: '본토 사천에서 직접 공수한 향신료로 깊은 풍미를 구현합니다.' },
            { title: '신선한 재료', desc: '매일 아침 입고되는 신선한 채소와 엄선된 고기를 사용합니다.' },
            { title: '맞춤형 매운맛', desc: '고객 취향에 맞춘 5단계 매운맛 조절이 가능합니다.' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/80 rounded-2xl p-6 text-center shadow-sm"
            >
              <h3 className="font-body font-bold text-lg text-dark mb-2">{item.title}</h3>
              <p className="font-body text-dark/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
