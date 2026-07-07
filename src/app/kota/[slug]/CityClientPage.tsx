"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin, Landmark, Utensils, Cpu, Camera, Music, ChevronRight } from "lucide-react";
import Link from "next/link";
import CityMiniMap from "@/components/map/CityMiniMap";

type Category = 'sejarah' | 'wisata' | 'budaya' | 'kuliner' | 'teknologi';

export default function CityClientPage({ city, province }: { city: any, province: any }) {
  const [activeCategory, setActiveCategory] = useState<Category>('sejarah');
  const [selectedItem, setSelectedItem] = useState<{name: string, description: string, image?: string} | null>(null);

  // Parallax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const categories = [
    { id: 'sejarah', label: 'Sejarah', icon: Landmark, count: 1 },
    { id: 'wisata', label: 'Wisata', icon: Camera, count: city.category_items?.filter((c:any)=>c.type==='WISATA').length || 0 },
    { id: 'budaya', label: 'Budaya', icon: Music, count: city.category_items?.filter((c:any)=>c.type==='BUDAYA').length || 0 },
    { id: 'kuliner', label: 'Kuliner', icon: Utensils, count: city.category_items?.filter((c:any)=>c.type==='KULINER').length || 0 },
    { id: 'teknologi', label: 'Teknologi', icon: Cpu, count: city.category_items?.filter((c:any)=>c.type==='TEKNOLOGI').length || 0 },
  ] as const;

  const renderContent = () => {
    if (selectedItem) {
      return (
        <motion.div
          key="detail-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5"
        >
          <button 
            onClick={() => setSelectedItem(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#C15B3D] transition-colors font-medium mb-10 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Kembali ke daftar {categories.find(c => c.id === activeCategory)?.label}
          </button>
          
          <div className="inline-block px-4 py-1.5 bg-[#C15B3D]/10 text-[#C15B3D] text-sm font-bold uppercase tracking-widest rounded-full mb-6">
            {categories.find(c => c.id === activeCategory)?.label}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2C1E16] mb-8 leading-tight">
            {selectedItem.name}
          </h2>
          
          <div className="prose prose-lg md:prose-xl prose-stone max-w-none text-gray-700 leading-relaxed">
            <p>{selectedItem.description}</p>
          </div>
        </motion.div>
      );
    }

    if (activeCategory === 'sejarah') {
      return (
        <motion.div 
          key="sejarah"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          <div className="md:col-span-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-extrabold text-[#2C1E16] mb-6">Profil Kota</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {city.description}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            {province && <CityMiniMap province={province} city={city} />}
          </div>
        </motion.div>
      );
    }

    const items = city.category_items?.filter((c:any) => c.type === activeCategory.toUpperCase()) || [];

    return (
      <motion.div 
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item: any, idx: number) => (
          <div 
            key={idx}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#C15B3D] mb-6 group-hover:scale-110 transition-transform">
              <ChevronRight size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#2C1E16] mb-4 group-hover:text-[#C15B3D] transition-colors">{item.name}</h3>
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400">
            <p>Belum ada data untuk kategori ini.</p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] selection:bg-[#C15B3D]/20 selection:text-[#C15B3D]">
      {/* Hero Header */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={city.image || "https://images.unsplash.com/photo-1549474136-22a84d4ab375?w=1600&q=80"}
            alt={city.name}
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#F4F1EA]" />
        </motion.div>

        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 z-50">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all cursor-pointer">
            <ArrowLeft size={20} />
            <span className="font-medium">Kembali</span>
          </div>
        </Link>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/30"
          >
            <MapPin size={18} className="text-[#F4F1EA]" />
            <span className="font-medium tracking-wider text-sm">{city.coordinates ? `${city.coordinates[1]}°, ${city.coordinates[0]}°` : 'Koordinat tidak tersedia'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-4 drop-shadow-2xl"
          >
            {city.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl font-medium tracking-wide drop-shadow-lg text-white/90"
          >
            {city.tagline}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-30 pb-32">
        <AnimatePresence mode="wait">
          {!selectedItem && (
            <motion.div 
              key="tabs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-xl border border-white/50 p-2 md:p-4 rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-wrap md:flex-nowrap justify-between items-center gap-2 mb-16"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 min-w-[120px] flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? 'bg-[#C15B3D] text-white shadow-lg shadow-[#C15B3D]/30 scale-105' 
                      : 'hover:bg-orange-50 text-gray-500 hover:text-[#C15B3D]'
                  }`}
                >
                  <cat.icon size={28} className={`mb-3 ${activeCategory === cat.id ? 'animate-bounce' : ''}`} />
                  <span className="font-bold tracking-wider text-sm uppercase">{cat.label}</span>
                  {cat.id !== 'sejarah' && (
                    <span className={`text-xs mt-1 ${activeCategory === cat.id ? 'text-white/80' : 'text-gray-400'}`}>
                      {cat.count} Item
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
}
