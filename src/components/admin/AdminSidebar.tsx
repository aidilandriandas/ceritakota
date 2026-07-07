"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  MapPin, 
  FolderTree, 
  Settings, 
  Plus, 
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: MapPin, label: "Kelola Kota", href: "/admin/kelola-kota" },
  { icon: FolderTree, label: "Kategori", href: "/admin/kategori" },
  { icon: Settings, label: "Pengaturan", href: "/admin/pengaturan" },
];

export default function AdminSidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const handleClose = onClose ?? (() => undefined);

  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={`fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-300 lg:translate-x-0 lg:static ${
          darkMode 
            ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700" 
            : "bg-gradient-to-b from-[#2C1E16] via-[#3D2A22] to-[#2C1E16]"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C15B3D] to-[#A43820] flex items-center justify-center shadow-lg shadow-[#C15B3D]/30"
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Nusantara<span className="text-[#C15B3D]">Admin</span>
                </h1>
                <p className="text-xs text-white/60">Dashboard Management</p>
              </div>
            </Link>
            
            {/* Close button untuk mobile */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile Section */}
          <div className={`p-4 mx-4 mt-4 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-white/10"} backdrop-blur-sm`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C15B3D] to-[#A43820] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Admin User</p>
                <p className="text-xs text-white/60 truncate">admin@nusantara.id</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMenu"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(193, 91, 61, 0.3), rgba(164, 56, 32, 0.3))",
                          border: "1px solid rgba(193, 91, 61, 0.3)",
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon 
                      size={20} 
                      className={`relative z-10 transition-colors ${
                        isActive ? "text-[#C15B3D]" : "group-hover:text-[#C15B3D]"
                      }`}
                    />
                    <span className="relative z-10 font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 rounded-full bg-[#C15B3D]"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-white/10">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-300" />
              )}
              <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Logout Button */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
