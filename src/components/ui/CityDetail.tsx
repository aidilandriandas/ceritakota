"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Utensils, Theater, Map } from "lucide-react";
import InfoCard from "./InfoCard";
import Breadcrumb from "./Breadcrumb";
import BackButton from "./BackButton";
import { CityInfo } from "@/data/types";
import { ProvinceMeta } from "@/data/provinces-meta";
import { useState } from "react";

interface CityDetailProps {
  city: CityInfo;
  province: ProvinceMeta;
}

export default function CityDetail({ city, province }: CityDetailProps) {
  const [activeTab, setActiveTab] = useState<"sejarah" | "kuliner" | "budaya" | "wisata">("sejarah");

  const tabs = [
    { id: "sejarah", label: "Sejarah", icon: <History className="w-4 h-4" /> },
    { id: "kuliner", label: "Kuliner Khas", icon: <Utensils className="w-4 h-4" /> },
    { id: "budaya", label: "Seni & Budaya", icon: <Theater className="w-4 h-4" /> },
    { id: "wisata", label: "Destinasi Wisata", icon: <Map className="w-4 h-4" /> },
  ] as const;

  // Animasi untuk transisi tab
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto">
      {/* Background Accent */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #C15B3D 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <Breadcrumb
          items={[
            { label: province.name, href: `/provinsi/${province.slug}` },
            { label: city.name },
          ]}
        />

        <BackButton label={`Kembali ke Peta ${province.name}`} fallbackHref={`/provinsi/${province.slug}`} />

        {/* Header Kota */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-12 mb-16 text-center"
        >
          <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-[#2C1E16] drop-shadow-sm">
            {city.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-semibold tracking-wide text-[#A43820]"
          >
            "{city.tagline}"
          </motion.p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`relative px-5 py-3 rounded-full flex items-center gap-2 text-sm md:text-base font-bold transition-colors z-10 ${
                activeTab === tab.id ? "text-white" : "text-[#2C1E16]/70 hover:text-[#2C1E16]"
              }`}
            >
              <span className="relative z-20 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #C15B3D, #A43820)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "sejarah" && (
              <motion.div
                key="sejarah"
                variants={tabContentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <InfoCard icon={<History />} title="Sejarah">
                  <div className="prose prose-p:text-[#2C1E16]/80 max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                      {city.sejarah}
                    </p>
                  </div>
                </InfoCard>
              </motion.div>
            )}

            {activeTab === "kuliner" && (
              <motion.div
                key="kuliner"
                variants={tabContentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <InfoCard icon={<Utensils />} title="Kuliner Khas">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {city.kuliner.map((item, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white shadow-sm border border-[#2C1E16]/10">
                        <h3 className="text-xl font-bold text-[#C15B3D] mb-2">{item.name}</h3>
                        <p className="text-[#2C1E16]/70 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </motion.div>
            )}

            {activeTab === "budaya" && (
              <motion.div
                key="budaya"
                variants={tabContentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <InfoCard icon={<Theater />} title="Seni & Budaya">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {city.budaya.map((item, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white shadow-sm border border-[#2C1E16]/10">
                        <h3 className="text-xl font-bold text-[#A43820] mb-2">{item.name}</h3>
                        <p className="text-[#2C1E16]/70 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </motion.div>
            )}

            {activeTab === "wisata" && (
              <motion.div
                key="wisata"
                variants={tabContentVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <InfoCard icon={<Map />} title="Destinasi Wisata">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {city.wisata.map((item, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-white shadow-sm border border-[#2C1E16]/10 hover:scale-[1.02] transition-transform duration-300"
                      >
                        <h3 className="text-lg font-bold text-[#2C1E16] mb-2">{item.name}</h3>
                        <p className="text-sm text-[#2C1E16]/60 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
