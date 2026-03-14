import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Search } from 'lucide-react';
import { stores } from '../data/storeData';
import { useKakaoMap } from '../hooks/useKakaoMap';
import type { Store, StoreRegion } from '../types';

const allRegions: Array<'전체' | StoreRegion> = ['전체', '서울', '경기', '인천', '부산', '대구', '대전', '광주'];

export default function Stores() {
  const [selectedRegion, setSelectedRegion] = useState<'전체' | StoreRegion>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchRegion = selectedRegion === '전체' || store.region === selectedRegion;
      const matchSearch =
        !searchQuery ||
        store.name.includes(searchQuery) ||
        store.address.includes(searchQuery);
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  const mapRef = useKakaoMap(filteredStores, selectedStore);

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-5xl md:text-7xl text-dark tracking-wider">
            STORES
          </h1>
          <p className="font-body text-dark/60 mt-3">
            가까운 아치아치 매장을 찾아보세요
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="매장명 또는 주소로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allRegions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`font-body px-4 py-2 rounded-full text-sm transition-all ${
                selectedRegion === region
                  ? 'bg-primary text-white font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Map */}
          <div
            ref={mapRef}
            className="h-80 md:h-[500px] rounded-2xl bg-gray-100 flex items-center justify-center"
          >
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto mb-2" />
              <p className="font-body text-sm">카카오맵 API 키를 설정하면 지도가 표시됩니다</p>
            </div>
          </div>

          {/* Store list */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredStores.map((store) => (
              <motion.div
                key={store.id}
                layout
                onClick={() => setSelectedStore(store)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedStore?.id === store.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className="font-body font-bold text-dark">{store.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="font-body text-sm text-dark/60 flex items-center gap-2">
                    <MapPin size={14} className="text-primary flex-shrink-0" />
                    {store.address}
                  </p>
                  <p className="font-body text-sm text-dark/60 flex items-center gap-2">
                    <Phone size={14} className="text-primary flex-shrink-0" />
                    {store.phone}
                  </p>
                  <p className="font-body text-sm text-dark/60 flex items-center gap-2">
                    <Clock size={14} className="text-primary flex-shrink-0" />
                    {store.hours}
                  </p>
                </div>
              </motion.div>
            ))}
            {filteredStores.length === 0 && (
              <div className="text-center py-10 text-gray-400 font-body">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
