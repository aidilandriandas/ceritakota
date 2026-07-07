'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft, Edit2, Save, X, Trash2, Loader } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface City {
  id: number;
  slug: string;
  name: string;
  province: string;
  tagline: string;
  description?: string;
  image?: string;
  coordinates?: string;
  scale?: number;
}

export default function KelolaKotaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const provinceSlug = params.slug as string;
  const citySlug = params.citySlug as string;

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<City>>({});

  useEffect(() => {
    const loadCity = () => {
      setLoading(true);
      console.log('Debug - Province slug:', provinceSlug);
      console.log('Debug - City slug:', citySlug);
      
      const cityDataString = searchParams.get('city');
      console.log('Debug - Query param city:', cityDataString);
      
      if (cityDataString) {
        try {
          const cityData = JSON.parse(decodeURIComponent(cityDataString));
          console.log('Debug - Parsed city data:', cityData);
          setCity(cityData);
          setEditData(cityData);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse city data from query", e);
        }
      }

      // Fallback: Load from localStorage if not in query params
      try {
        const storedCities = localStorage.getItem(`custom_cities_${provinceSlug}`);
        console.log('Debug - Stored cities from localStorage:', storedCities);
        if (storedCities) {
          const cities: City[] = JSON.parse(storedCities);
          const foundCity = cities.find(c => c.slug === citySlug);
          console.log('Debug - Found city in localStorage:', foundCity);
          if (foundCity) {
            setCity(foundCity);
            setEditData(foundCity);
          }
        }
      } catch (e) {
        console.error("Failed to load city from localStorage", e);
      }
      setLoading(false);
    };

    loadCity();
  }, [searchParams, provinceSlug, citySlug]);

  const handleSave = () => {
    if (!provinceSlug) return;
    
    const updatedCity = { ...city, ...editData } as City;
    setCity(updatedCity);

    // Update localStorage
    try {
      const storedCities = localStorage.getItem(`custom_cities_${provinceSlug}`);
      let cities: City[] = storedCities ? JSON.parse(storedCities) : [];
      const cityIndex = cities.findIndex(c => c.slug === citySlug);

      if (cityIndex > -1) {
        cities[cityIndex] = updatedCity;
      } else {
        cities.push(updatedCity);
      }
      localStorage.setItem(`custom_cities_${provinceSlug}`, JSON.stringify(cities));
    } catch (e) {
      console.error("Failed to save city to localStorage", e);
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!provinceSlug || !confirm(`Apakah Anda yakin ingin menghapus kota "${city?.name}"?`)) {
      return;
    }

    try {
      const storedCities = localStorage.getItem(`custom_cities_${provinceSlug}`);
      let cities: City[] = storedCities ? JSON.parse(storedCities) : [];
      const updatedCities = cities.filter(c => c.slug !== citySlug);
      localStorage.setItem(`custom_cities_${provinceSlug}`, JSON.stringify(updatedCities));
      router.back();
    } catch (e) {
      console.error("Failed to delete city from localStorage", e);
      alert("Gagal menghapus kota.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" /></div>; 
  }

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Data kota tidak ditemukan.</p>
        <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Kembali
        </button>
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
                Kembali ke Daftar Kota
              </button>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{city.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{city.tagline}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className={`p-2 rounded-full transition-colors ${isEditing ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                    </button>
                    <button onClick={handleDelete} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div> 
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Kota</label>
                        <input
                          type="text"
                          value={editData.name || ''}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tagline</label>
                        <input
                          type="text"
                          value={editData.tagline || ''}
                          onChange={(e) => setEditData({...editData, tagline: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                        <textarea
                          value={editData.description || ''}
                          onChange={(e) => setEditData({...editData, description: e.target.value})}
                          rows={4}
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                        <Save size={18} /> Simpan Perubahan
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Provinsi</h4>
                        <p className="mt-1 text-lg text-gray-900 dark:text-white">{city.province}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Deskripsi</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{city.description || 'Tidak ada deskripsi.'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
