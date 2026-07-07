'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, MapPin, Plus, Loader, Search, X } from 'lucide-react';
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

interface City {
  id: number;
  slug: string;
  name: string;
  province: string;
  tagline: string;
}

export default function KelolaKotaByProvinsi() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [province, setProvince] = useState<Province | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCityTagline, setNewCityTagline] = useState('');

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    // Find province from static data or localStorage
    const allProvinces: any[] = [...staticProvinces];
    try {
      const storedCustom = localStorage.getItem('custom_provinces');
      if (storedCustom) {
        const customProvinces: Province[] = JSON.parse(storedCustom);
        customProvinces.forEach(custom => {
          if (!allProvinces.some(p => p.slug === custom.slug)) {
            allProvinces.push(custom);
          }
        });
      }
    } catch (e) {
      console.error("Failed to load custom provinces", e);
    }
    const foundProvince = allProvinces.find(p => p.slug === slug) as Province | undefined;
    setProvince(foundProvince || null);

    // Load cities from localStorage
    try {
      const storedCities = localStorage.getItem(`custom_cities_${slug}`);
      const customCities = storedCities ? JSON.parse(storedCities) : [];
      setCities(customCities);
    } catch (error) {
      console.error(`Failed to load cities for ${slug}`, error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const handleSaveNewCity = () => {
    if (!newCityName.trim() || !province) {
      alert('Nama kota tidak boleh kosong.');
      return;
    }

    const citySlug = newCityName.toLowerCase().replace(/\s+/g, '-');
    if (cities.some(c => c.slug === citySlug)) {
      alert('Kota dengan nama ini sudah ada di provinsi ini.');
      return;
    }

    const newCity: City = {
      id: cities.length + 1,
      name: newCityName.trim(),
      slug: citySlug,
      province: province.name,
      tagline: newCityTagline.trim() || `Kota ${newCityName.trim()}`,
    };

    const updatedCities = [...cities, newCity];
    setCities(updatedCities);
    localStorage.setItem(`custom_cities_${slug}`, JSON.stringify(updatedCities));

    // Debug: Check if data was saved
    const checkStorage = localStorage.getItem(`custom_cities_${slug}`);
    console.log('Debug - Saved cities:', checkStorage);

    setNewCityName('');
    setNewCityTagline('');
    setIsAdding(false);
  };

  const filteredCities = useMemo(() =>
    cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [cities, searchTerm]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" /></div>;
  }

  if (!province) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Provinsi tidak ditemukan.</p>
        <Link href="/admin/kelola-kota">
          <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Kembali ke Daftar Provinsi</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
                <ChevronLeft className="w-5 h-5" />
                Kembali ke Provinsi
              </button>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Kelola Kota di {province.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">Tambah atau kelola kota.</p>
                </div>
                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                    isAdding ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAdding ? 'Batal' : 'Tambah Kota'}</span>
                </button>
              </div>
            </motion.div>

            {isAdding && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Tambah Kota Baru</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="Nama Kota"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newCityTagline}
                    onChange={(e) => setNewCityTagline(e.target.value)}
                    placeholder="Tagline (opsional)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button onClick={handleSaveNewCity} className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Simpan Kota
                  </button>
                </div>
              </motion.div>
            )}

            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Search className="w-5 h-5 text-gray-400" /></span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari kota..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.length > 0 ? filteredCities.map(city => (
                <motion.div key={city.id} variants={itemVariants}>
                  <Link href={`/admin/kelola-kota/${slug}/${city.slug}?city=${encodeURIComponent(JSON.stringify(city))}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl p-4 h-full">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{city.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{city.tagline}</p>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">Belum ada kota di provinsi ini.</p>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
