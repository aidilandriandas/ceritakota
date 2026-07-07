"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Menu, 
  Bell, 
  Search,
  Moon,
  Sun,
  Settings,
  User,
  LogOut
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuClick, title = "Dashboard" }: AdminHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const handleMenuClick = onMenuClick ?? (() => undefined);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-zinc-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-300 lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
            <p className="text-sm text-zinc-500 hidden sm:block">Kelola konten digital Indonesia</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 focus-within:border-[#C15B3D]/50 focus-within:ring-2 focus-within:ring-[#C15B3D]/20 transition-all duration-300">
            <Search size={18} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent outline-none text-sm text-zinc-700 placeholder-zinc-400 w-48"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-300"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-zinc-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all duration-300"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-zinc-100">
                  <h3 className="font-semibold text-zinc-900">Notifikasi</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-zinc-50 cursor-pointer border-b border-zinc-50">
                    <p className="text-sm text-zinc-900 font-medium">Kota baru ditambahkan</p>
                    <p className="text-xs text-zinc-500 mt-1">Bandung berhasil ditambahkan ke database</p>
                    <p className="text-xs text-zinc-400 mt-2">5 menit yang lalu</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-zinc-50 cursor-pointer border-b border-zinc-50">
                    <p className="text-sm text-zinc-900 font-medium">Konten diperbarui</p>
                    <p className="text-xs text-zinc-500 mt-1">3 artikel wisata di Payakumbuh</p>
                    <p className="text-xs text-zinc-400 mt-2">1 jam yang lalu</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-zinc-50 text-center">
                  <button className="text-sm text-[#C15B3D] font-medium hover:underline">
                    Lihat Semua
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-zinc-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-zinc-900">Admin User</p>
              <p className="text-xs text-zinc-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C15B3D] to-[#A43820] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
