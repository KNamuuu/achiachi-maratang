import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { menuItems } from '../../data/menuData';
import type { MenuItem } from '../../types';
import MenuDetailModal from '../menu/MenuDetailModal';

const popularItems = Object.values(menuItems)
  .flat()
  .filter((item) => item.isPopular)
  .slice(0, 6);

export default function MenuPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center bg-dark py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-white tracking-wider">
            POPULAR MENU
          </h2>
          <p className="font-body text-gray-400 text-base mt-2">
            가장 사랑받는 인기 메뉴를 만나보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-800 rounded-xl overflow-hidden hover:ring-1 hover:ring-accent/50 hover:shadow-lg hover:shadow-accent/10 transition cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[4/3] bg-gray-700 flex items-center justify-center overflow-hidden">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">🌶️</span>
              </div>
              <div className="p-3">
                <h3 className="font-body font-bold text-white text-sm">{item.name}</h3>
                <p className="font-body text-accent font-bold text-xs mt-1">
                  {item.type === 'priced'
                    ? item.price === 0
                      ? '기본 제공'
                      : `${item.price.toLocaleString()}원`
                    : `${item.pricePerUnit.toLocaleString()}원 / ${item.unit}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-primary text-white font-body font-bold px-8 py-3 rounded-full hover:bg-primary/80 transition"
          >
            전체 메뉴 보기
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <MenuDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
