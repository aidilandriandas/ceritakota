"use client";

import { useState, useEffect } from "react";
import { Plus, X, Check, Trash2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface City {
  id: string;
  slug: string;
  name: string;
  province: string;
  tagline: string;
  _count?: {
    categories?: number;
  };
}

interface NewCityData {
  slug: string;
  name: string;
  province: string;
  geo_name: string;
  tagline: string;
  description: string;
  image?: string;
  coordinates: string;
  scale: number;
}

export default function KotaContent() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<NewCityData | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCityData, setNewCityData] = useState<NewCityData>({
    slug: "",
    name: "",
    province: "",
    geo_name: "",
    tagline: "",
    description: "",
    image: "",
    coordinates: "",
    scale: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/cities`
      );
      if (response.ok) {
        const data = await response.json();
        setCities(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewCityData({
      slug: "",
      name: "",
      province: "",
      geo_name: "",
      tagline: "",
      description: "",
      image: "",
      coordinates: "",
      scale: 1,
    });
  };

  const handleSaveNew = async () => {
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!newCityData.name || !newCityData.province || !newCityData.tagline) {
        throw new Error("Nama Kota, Provinsi, dan Tagline harus diisi");
      }

      // Prepare data with defaults for missing fields
      const cityPayload = {
        slug: newCityData.slug || newCityData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        name: newCityData.name,
        province: newCityData.province,
        geo_name: newCityData.geo_name || newCityData.name,
        tagline: newCityData.tagline,
        description: newCityData.description || `Kota ${newCityData.name} adalah salah satu kota penting di Indonesia yang terletak di provinsi ${newCityData.province}.`,
        image: newCityData.image || "",
        coordinates: newCityData.coordinates || "0,0",
        scale: newCityData.scale || 1,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/cities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cityPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : errorData.message || "Gagal menambah kota");
      }

      await fetchCities();
      setIsAddingNew(false);
      setNewCityData({
        slug: "",
        name: "",
        province: "",
        geo_name: "",
        tagline: "",
        description: "",
        image: "",
        coordinates: "",
        scale: 1,
      });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingRowId(null);
    setEditingData(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Kelola Kota</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage cities and their content</p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isAddingNew}
          className="bg-[#C15B3D] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#a64e34] transition font-medium shadow-lg shadow-[#C15B3D]/30 disabled:opacity-50"
        >
          <Plus size={20} />
          Tambah Kota
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari kota atau provinsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#C15B3D] focus:ring-2 focus:ring-[#C15B3D]/20"
            />
          </div>
          <button className="px-6 py-2 border border-zinc-200 rounded-xl text-zinc-700 hover:bg-zinc-50 transition flex items-center gap-2">
            <Filter size={20} />
            Filter
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Cities Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-[#C15B3D] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-zinc-600 mt-4">Loading cities...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 text-sm">
                  <th className="p-4 font-semibold">Nama Kota</th>
                  <th className="p-4 font-semibold">Provinsi</th>
                  <th className="p-4 font-semibold">Tagline</th>
                  <th className="p-4 font-semibold text-center">Total Artikel</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Add New City Row */}
                {isAddingNew && (
                  <tr className="bg-blue-50 border-b border-zinc-200">
                    <td className="p-4">
                      <input
                        type="text"
                        value={newCityData.name}
                        onChange={(e) =>
                          setNewCityData({
                            ...newCityData,
                            name: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                          })
                        }
                        placeholder="Nama kota..."
                        className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={newCityData.province}
                        onChange={(e) =>
                          setNewCityData({ ...newCityData, province: e.target.value })
                        }
                        placeholder="Provinsi..."
                        className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        value={newCityData.tagline}
                        onChange={(e) =>
                          setNewCityData({ ...newCityData, tagline: e.target.value })
                        }
                        placeholder="Tagline..."
                        className="w-full px-2 py-1 border border-zinc-300 rounded text-sm"
                      />
                    </td>
                    <td className="p-4 text-center text-zinc-500 text-sm">-</td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleSaveNew}
                          disabled={submitting}
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm bg-green-100 px-3 py-1.5 rounded hover:bg-green-200 transition disabled:opacity-50"
                        >
                          <Check size={16} />
                          {submitting ? "Simpan..." : "Simpan"}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={submitting}
                          className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-700 font-medium text-sm bg-zinc-100 px-3 py-1.5 rounded hover:bg-zinc-200 transition disabled:opacity-50"
                        >
                          <X size={16} />
                          Batal
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Existing Cities */}
                {filteredCities.length === 0 && !isAddingNew ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-600">
                      No cities found
                    </td>
                  </tr>
                ) : (
                  filteredCities.map((city, index) => (
                    <motion.tr
                      key={city.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-zinc-100 hover:bg-zinc-50/80 transition"
                    >
                      <td className="p-4">
                        <span className="font-semibold text-zinc-900">{city.name}</span>
                      </td>
                      <td className="p-4 text-zinc-600">{city.province}</td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-500 italic">{city.tagline}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          0 item
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/admin/kota/${city.slug}`}
                            className="inline-flex items-center gap-2 text-[#C15B3D] hover:text-[#A43820] font-medium text-sm bg-[#C15B3D]/10 px-4 py-2 rounded-xl hover:bg-[#C15B3D]/20 transition"
                            title="Manage articles"
                          >
                            Kelola
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
