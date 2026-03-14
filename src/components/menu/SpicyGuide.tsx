import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const spicyLevels = [
  { level: 1, name: '순한맛', desc: '매운 음식이 처음이라면', color: '#FCD34D' },
  { level: 2, name: '약간매운맛', desc: '살짝 얼얼한 정도', color: '#FB923C' },
  { level: 3, name: '보통맛', desc: '마라탕 입문자 추천', color: '#EF4444' },
  { level: 4, name: '매운맛', desc: '매운맛 좋아하는 분', color: '#DC2626' },
  { level: 5, name: '지옥맛', desc: '극한의 도전', color: '#7C3AED' },
];

export default function SpicyGuide() {
  return (
    <div className="mb-10">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:justify-center">
        {spicyLevels.map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="flex-shrink-0 flex items-center gap-2 bg-gray-800/60 rounded-full px-4 py-2"
          >
            <div className="flex">
              {Array.from({ length: item.level }).map((_, i) => (
                <Flame key={i} size={14} fill={item.color} color={item.color} />
              ))}
            </div>
            <span className="font-body text-white text-xs font-bold whitespace-nowrap">
              {item.name}
            </span>
            <span className="font-body text-gray-400 text-xs whitespace-nowrap hidden sm:inline">
              {item.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
