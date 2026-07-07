'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Plus, X, Loader, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { provinces as staticProvinces } from '@/data/provinces-meta';

interface Province {
  id: number;
  name: string;
  slug: string;
  capital: string;
  description: string;
}

export default function KelolaProvinsiPage() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newProvinceName, setNewProvinceName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load provinces from localStorage on initial render
  useEffect(() => {
    try {
      const storedProvinces = localStorage.getItem('custom_provinces');
      const customProvinces = storedProvinces ? JSON.parse(storedProvinces) : [];
      // Combine static provinces with custom ones, avoiding duplicates
      const allProvinces: any[] = [...staticProvinces];
      customProvinces.forEach((custom: Province) => {
        if (!allProvinces.some(p => p.slug === custom.slug)) {
          allProvinces.push(custom);
        }
      });
      setProvinces(allProvinces);
    } catch (error) {
      console.error("Failed to load provinces from localStorage", error);
      setProvinces(staticProvinces); // Fallback to static
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveNewProvince = () => {
    if (!newProvinceName.trim()) {
      alert('Nama provinsi tidak boleh kosong.');
      return;
    }

    const slug = newProvinceName.toLowerCase().replace(/\s+/g, '-');
    if (provinces.some(p => p.slug === slug)) {
      alert('Provinsi dengan nama ini sudah ada.');
      return;
    }

    const newProvince: Province = {
      id: provinces.length + 1,
      name: newProvinceName.trim(),
      slug: slug,
      capital: newProvinceName.trim(),
      description: `Provinsi ${newProvinceName.trim()}`,
    };

    const updatedProvinces = [...provinces, newProvince];
    setProvinces(updatedProvinces);

    // Save only custom provinces to localStorage
    const customProvinces = updatedProvinces.filter(p => !staticProvinces.some(sp => sp.id === p.id));
    localStorage.setItem('custom_provinces', JSON.stringify(customProvinces));

    setNewProvinceName('');
    setIsAdding(false);
  };

  const filteredProvinces = useMemo(() =>
    provinces.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [provinces, searchTerm]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Kelola Provinsi</h1>
                <p className="text-gray-600 dark:text-gray-400">Tambah, lihat, atau kelola provinsi.</p>
              </div>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                  isAdding ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isAdding ? 'Batal' : 'Tambah Provinsi'}</span>
              </button>
            </motion.div>

            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Tambah Provinsi Baru</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newProvinceName}
                      onChange={(e) => setNewProvinceName(e.target.value)}
                      placeholder="Nama Provinsi"
                      className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={handleSaveNewProvince}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mb-6">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari provinsi..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredProvinces.map((province) => (
                  <motion.div key={province.id} variants={itemVariants}>
                    <Link href={`/admin/kelola-kota/${province.slug}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between h-full">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{province.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{province.description}</p>
                        </div>
                        <div className="flex items-center mt-4 text-sm text-blue-500 dark:text-blue-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{province.capital}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
