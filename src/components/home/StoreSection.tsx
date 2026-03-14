import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { stores } from '../../data/storeData';

export default function StoreSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const regions = [...new Set(stores.map((s) => s.region))];

  return (
    <section ref={ref} className="h-screen flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-dark tracking-wider">
            OUR STORES
          </h2>
          <p className="font-body text-dark/60 text-lg mt-4">
            전국 어디서나 아치아치 마라탕을 만나보세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Region list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {regions.map((region) => (
              <div key={region} className="mb-6">
                <h3 className="font-body font-bold text-lg text-dark mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  {region}
                </h3>
                <ul className="space-y-1 ml-6">
                  {stores
                    .filter((s) => s.region === region)
                    .map((store) => (
                      <li key={store.id} className="font-body text-sm text-dark/60">
                        {store.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-100 rounded-2xl h-80 md:h-full min-h-[300px] flex items-center justify-center"
          >
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto mb-2" />
              <p className="font-body text-sm">매장 찾기에서 지도를 확인하세요</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link
            to="/stores"
            className="inline-flex items-center gap-2 bg-dark text-white font-body font-bold px-8 py-3 rounded-full hover:bg-dark/80 transition"
          >
            매장 찾기
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
