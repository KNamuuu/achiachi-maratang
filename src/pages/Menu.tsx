import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories, menuItems } from '../data/menuData';
import type { MenuCategory, MenuItem } from '../types';
import SpicyGuide from '../components/menu/SpicyGuide';
import MenuDetailModal from '../components/menu/MenuDetailModal';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('토핑');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-dark pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-7xl text-white tracking-wider">
            MENU
          </h1>
          <p className="font-body text-gray-400 mt-3">
            신선한 재료로 만드는 아치아치의 다양한 메뉴
          </p>
        </div>

        {/* Spicy Guide */}
        <SpicyGuide />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-body px-5 py-2 rounded-full text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {menuItems[activeCategory].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="bg-gray-800 rounded-2xl overflow-hidden group hover:ring-1 hover:ring-accent/50 hover:shadow-lg hover:shadow-accent/10 transition cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-square bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl transition-transform duration-300 group-hover:scale-110">🍜</span>
                  {item.isPopular && (
                    <span className="absolute top-2 left-2 bg-primary text-white text-xs font-body font-bold px-2 py-1 rounded-full">
                      인기
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-body font-bold text-white text-sm">{item.name}</h3>
                  <p className="font-body text-gray-400 text-xs mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-body text-accent font-bold text-sm mt-2">
                    {item.type === 'priced'
                      ? item.price === 0
                        ? '기본 제공'
                        : `${item.price.toLocaleString()}원`
                      : `${item.pricePerUnit.toLocaleString()}원 / ${item.unit}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <MenuDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
