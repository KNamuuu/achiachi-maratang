import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import type { MenuItem, MenuCategory } from '../../types';
import { menuItems } from '../../data/menuData';

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const categoryEmoji: Record<string, string> = {
  '토핑': '🥩',
  '면/당면': '🍜',
  '소스': '🌶️',
  '사이드': '🥟',
  '음료': '🍺',
};

const categoryGradient: Record<string, string> = {
  '토핑': 'from-red-900/80 to-orange-900/60',
  '면/당면': 'from-amber-900/80 to-yellow-900/60',
  '소스': 'from-red-950/80 to-rose-900/60',
  '사이드': 'from-emerald-900/80 to-teal-900/60',
  '음료': 'from-blue-900/80 to-indigo-900/60',
};

const spicyColors: Record<number, string> = {
  3: '#EF4444',
  4: '#DC2626',
  5: '#7C3AED',
};

const spicyLabels: Record<number, string> = {
  3: '보통맛',
  4: '매운맛',
  5: '지옥맛',
};

function getSpicyLevel(name: string): number | null {
  if (name.includes('지옥맛')) return 5;
  if (name.includes('매운맛')) return 4;
  if (name.includes('보통')) return 3;
  return null;
}

function getCategoryForItem(item: MenuItem): MenuCategory | null {
  for (const [category, items] of Object.entries(menuItems)) {
    if (items.some((i) => i.id === item.id)) {
      return category as MenuCategory;
    }
  }
  return null;
}

export default function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const category = item ? getCategoryForItem(item) : null;
  const emoji = category ? categoryEmoji[category] : '🍜';
  const gradient = category ? categoryGradient[category] : 'from-gray-800 to-gray-700';
  const isSauce = category === '소스';
  const spicyLevel = item && isSauce ? getSpicyLevel(item.name) : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className={`relative z-10 bg-gray-900 w-full overflow-hidden ${
              isMobile
                ? 'rounded-t-3xl max-h-[85vh]'
                : 'rounded-2xl max-w-sm mx-4'
            }`}
            initial={isMobile ? { y: '100%' } : { scale: 0.95, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button (top-right) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition"
            >
              <X size={18} />
            </button>

            {/* Emoji/image area */}
            <div
              className={`h-[180px] bg-gradient-to-br ${gradient} flex items-center justify-center`}
            >
              <span className="text-7xl">{emoji}</span>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {item.isPopular && (
                  <span className="bg-primary text-white text-xs font-body font-bold px-3 py-1 rounded-full">
                    인기
                  </span>
                )}
                {spicyLevel && (
                  <span
                    className="flex items-center gap-1 text-xs font-body font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${spicyColors[spicyLevel]}20`,
                      color: spicyColors[spicyLevel],
                    }}
                  >
                    {Array.from({ length: spicyLevel }).map((_, i) => (
                      <Flame
                        key={i}
                        size={12}
                        fill={spicyColors[spicyLevel]}
                        color={spicyColors[spicyLevel]}
                      />
                    ))}
                    {spicyLabels[spicyLevel]}
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="font-heading text-2xl text-white">{item.name}</h2>

              {/* Description */}
              <p className="font-body text-gray-400 mt-2">{item.description}</p>

              {/* Price */}
              <p className="font-body text-accent font-bold text-lg mt-3">
                {item.type === 'priced'
                  ? item.price === 0
                    ? '기본 제공'
                    : `${item.price.toLocaleString()}원`
                  : `${item.pricePerUnit.toLocaleString()}원 / ${item.unit}`}
              </p>

              {/* Close button (bottom) */}
              <button
                onClick={onClose}
                className="w-full mt-6 py-3 bg-gray-800 text-white font-body font-bold rounded-xl hover:bg-gray-700 transition"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
