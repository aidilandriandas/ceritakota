"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, MapPin, FolderOpen, TrendingUp, Users } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";

interface City {
  id: string;
  slug: string;
  name: string;
  province: string;
  tagline: string;
  category_items?: Array<{
    type: string;
  }>;
}

interface DashboardContentProps {
  cities: City[];
  totalContent: number;
  totalCities: number;
  contentByCategory: Record<string, number>;
}

export default function DashboardContent({
  cities,
  totalContent,
  totalCities,
  contentByCategory,
}: DashboardContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title="Dashboard" />
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Kota"
              value={totalCities}
              icon={MapPin}
              color="from-blue-500 to-blue-600"
              trend="+2 bulan ini"
            />
            <StatCard
              title="Total Konten"
              value={totalContent}
              icon={FolderOpen}
              color="from-[#C15B3D] to-[#A43820]"
              trend="+15 minggu ini"
            />
            <StatCard
              title="Kategori Aktif"
              value={Object.keys(contentByCategory).length}
              icon={TrendingUp}
              color="from-green-500 to-green-600"
              trend="5 kategori"
            />
            <StatCard
              title="Pengunjung"
              value="12.5K"
              icon={Users}
              color="from-purple-500 to-purple-600"
              trend="+23% bulan ini"
            />
          </div>

          {/* Content Categories Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Distribusi Konten per Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['SEJARAH', 'WISATA', 'BUDAYA', 'KULINER', 'TEKNOLOGI'].map((category) => (
                <div
                  key={category}
                  className="p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 text-center hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">{category}</p>
                  <p className="text-2xl font-bold text-[#C15B3D]">
                    {contentByCategory[category] || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cities Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">Daftar Kota</h2>
                <p className="text-sm text-zinc-500 mt-1">Kelola konten kota-kota di Indonesia</p>
              </div>
              <Link
                href="/admin/kota/baru"
                className="bg-[#C15B3D] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#a64e34] transition font-medium shadow-lg shadow-[#C15B3D]/30"
              >
                <Plus size={18} />
                Tambah Kota
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 text-sm">
                    <th className="p-4 font-semibold">Nama Kota</th>
                    <th className="p-4 font-semibold">Provinsi</th>
                    <th className="p-4 font-semibold">Tagline</th>
                    <th className="p-4 font-semibold text-center">Total Konten</th>
                    <th className="p-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cities.map((city, index) => (
                    <motion.tr
                      key={city.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-zinc-100 hover:bg-zinc-50/80 transition cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C15B3D]/20 to-[#A43820]/20 flex items-center justify-center">
                            <MapPin size={18} className="text-[#C15B3D]" />
                          </div>
                          <span className="font-semibold text-zinc-900">{city.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-600">{city.province}</td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-500 italic">{city.tagline}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                          (city.category_items?.length || 0) > 10
                            ? "bg-green-100 text-green-700"
                            : (city.category_items?.length || 0) > 5
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}>
                          {city.category_items?.length || 0} item
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/admin/kota/${city.slug}`}
                          className="inline-flex items-center gap-2 text-[#C15B3D] hover:text-[#A43820] font-medium text-sm bg-[#C15B3D]/10 px-4 py-2 rounded-xl hover:bg-[#C15B3D]/20 transition"
                        >
                          <Edit size={16} />
                          Kelola
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                  {cities.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
                            <MapPin size={32} className="text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-zinc-900 font-semibold">Belum ada data kota</p>
                            <p className="text-zinc-500 text-sm mt-1">Mulai dengan menambahkan kota pertama Anda</p>
                          </div>
                          <Link
                            href="/admin/kota/baru"
                            className="mt-2 bg-[#C15B3D] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#a64e34] transition font-medium"
                          >
                            <Plus size={18} />
                            Tambah Kota
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  trend: string;
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 overflow-hidden relative"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`} />
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-zinc-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-zinc-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <p className="text-xs text-green-600 font-medium flex items-center gap-1">
        <TrendingUp size={12} />
        {trend}
      </p>
    </motion.div>
  );
}
