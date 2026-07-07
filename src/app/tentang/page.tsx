"use client";

import { motion } from "framer-motion";
import { Info, Map, Star, BookOpen } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import InfoCard from "@/components/ui/InfoCard";

export default function TentangPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="relative min-h-screen text-[#2C1E16]">
      <NavBar />

      {/* Earthy Background Accent */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #C15B3D 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-[#2C1E16]">
            Nusantara Digital City
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed text-[#2C1E16]/80">
            <p>
              Hadir untuk mengajak generasi muda berperan aktif mendigitalisasi kota dan daerahnya melalui website yang informatif, kreatif, dan mudah diakses.
            </p>
            <p>
              Melalui kompetisi ini, peserta ditantang menampilkan wajah sebuah kota di Indonesia secara utuh — mulai dari sejarah, budaya, kuliner, hingga perkembangan teknologinya.
            </p>
            <p>
              Website yang dikembangkan diharapkan menjadi jembatan informasi bagi turis mancanegara, turis lokal, serta generasi mendatang untuk mengenal potensi daerah secara lebih dekat.
            </p>
            <p className="font-bold text-[#A43820] text-2xl pt-4 italic">
              "Karena setiap kota punya cerita, dan sudah saatnya cerita itu hadir di ranah digital."
            </p>
          </div>
        </motion.div>

        {/* Peran Website Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2C1E16]">
            Peran Website dalam Nusantara Digital City
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <InfoCard icon={<Info />} title="Portal Informasi Kota" delay={0.1}>
                Menyajikan informasi lengkap dan terstruktur mengenai profil serta potensi daerah.
              </InfoCard>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <InfoCard icon={<Map />} title="Panduan Wisata Digital" delay={0.2}>
                Membantu wisatawan mengeksplorasi destinasi, budaya, dan kuliner lokal.
              </InfoCard>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <InfoCard icon={<Star />} title="Media Branding Kota" delay={0.3}>
                Membangun identitas digital kota yang profesional dan berdaya saing.
              </InfoCard>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <InfoCard icon={<BookOpen />} title="Sarana Edukasi dan Promosi" delay={0.4}>
                Mengedukasi sekaligus mempromosikan kekayaan lokal ke audiens yang lebih luas.
              </InfoCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 text-center pb-12"
        >
          <p className="text-xl md:text-2xl font-semibold text-[#2C1E16]/70 italic">
            "Website bukan sekadar platform digital, tetapi representasi masa depan sebuah kota di era transformasi teknologi."
          </p>
        </motion.div>
      </div>
    </main>
  );
}
