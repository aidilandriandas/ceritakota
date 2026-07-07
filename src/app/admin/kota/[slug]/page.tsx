"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, Trash2, Edit2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ArticleItem {
  id?: string;
  type: "SEJARAH" | "WISATA" | "BUDAYA" | "KULINER" | "TEKNOLOGI";
  name: string;
  description: string;
  image?: string;
}

interface City {
  id: string;
  slug: string;
  name: string;
  province: string;
  tagline: string;
}

const CATEGORY_TYPES = [
  { id: "SEJARAH", label: "Sejarah", color: "from-blue-500 to-blue-600" },
  { id: "WISATA", label: "Wisata", color: "from-green-500 to-green-600" },
  { id: "BUDAYA", label: "Budaya", color: "from-purple-500 to-purple-600" },
  { id: "KULINER", label: "Kuliner", color: "from-orange-500 to-orange-600" },
  { id: "TEKNOLOGI", label: "Teknologi", color: "from-pink-500 to-pink-600" },
];

export default function CityArticlesPage() {
  const params = useParams();
  const citySlug = params.slug as string;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [city, setCity] = useState<City | null>(null);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "SEJARAH" | "WISATA" | "BUDAYA" | "KULINER" | "TEKNOLOGI"
  >("SEJARAH");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ArticleItem>({
    type: "SEJARAH",
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchCityData();
  }, [citySlug]);

  const fetchCityData = async () => {
    try {
      const citiesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/cities`
      );
      if (citiesResponse.ok) {
        const data = await citiesResponse.json();
        const foundCity = data.data?.find(
          (c: any) => c.slug === citySlug
        ) as City;
        if (foundCity) {
          setCity(foundCity);
          fetchArticles(foundCity.id);
        }
      }
    } catch (error) {
      console.error("Error fetching city:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async (cityId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/category-items?city_id=${cityId}`
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    try {
      const url =
        editingId && formData.id
          ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/category-items/${formData.id}`
          : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/category-items`;

      const method = editingId && formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          city_id: city.id,
        }),
      });

      if (response.ok) {
        await fetchArticles(city.id);
        setFormData({
          type: "SEJARAH",
          name: "",
          description: "",
          image: "",
        });
        setShowForm(false);
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleEditArticle = (article: ArticleItem) => {
    setFormData(article);
    setEditingId(article.id || null);
    setShowForm(true);
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/category-items/${id}`,
        { method: "DELETE" }
      );

      if (response.ok && city) {
        await fetchArticles(city.id);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const filteredArticles = articles.filter((a) => a.type === activeTab);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="w-16 h-16 border-4 border-[#C15B3D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <p className="text-zinc-600 text-lg">City not found</p>
          <Link href="/admin/kota" className="text-[#C15B3D] mt-4 inline-block">
            Back to cities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={`${city.name} - Artikel`}
        />
        <main className="flex-1 p-8 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/kota"
                className="p-2 hover:bg-zinc-200 rounded-lg transition"
              >
                <ArrowLeft size={24} className="text-zinc-600" />
              </Link>
              <div>
                <h2 className="text-3xl font-bold text-zinc-900">{city.name}</h2>
                <p className="text-zinc-500 mt-1">{city.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setFormData({
                    type: "SEJARAH",
                    name: "",
                    description: "",
                    image: "",
                  });
                }
              }}
              className="bg-[#C15B3D] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#a64e34] transition font-medium shadow-lg shadow-[#C15B3D]/30"
            >
              <Plus size={20} />
              Tambah Artikel
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-zinc-900 mb-4">
                {editingId ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h3>
              <form onSubmit={handleAddArticle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as ArticleItem["type"],
                        })
                      }
                      className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-[#C15B3D] focus:ring-2 focus:ring-[#C15B3D]/20"
                    >
                      {CATEGORY_TYPES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">
                      Nama Artikel
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Sejarah Kota..."
                      className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-[#C15B3D] focus:ring-2 focus:ring-[#C15B3D]/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Masukkan deskripsi artikel..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-[#C15B3D] focus:ring-2 focus:ring-[#C15B3D]/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    URL Gambar (opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:border-[#C15B3D] focus:ring-2 focus:ring-[#C15B3D]/20"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-[#C15B3D] text-white px-6 py-2.5 rounded-lg hover:bg-[#a64e34] transition font-medium"
                  >
                    {editingId ? "Update" : "Simpan"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({
                        type: "SEJARAH",
                        name: "",
                        description: "",
                        image: "",
                      });
                    }}
                    className="border border-zinc-300 text-zinc-700 px-6 py-2.5 rounded-lg hover:bg-zinc-50 transition font-medium"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {CATEGORY_TYPES.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setActiveTab(
                    category.id as
                      | "SEJARAH"
                      | "WISATA"
                      | "BUDAYA"
                      | "KULINER"
                      | "TEKNOLOGI"
                  )
                }
                className={`px-6 py-2.5 rounded-xl font-medium whitespace-nowrap transition ${
                  activeTab === category.id
                    ? `bg-gradient-to-br ${category.color} text-white`
                    : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
                <p className="text-zinc-600">
                  Belum ada artikel kategori {activeTab}
                </p>
              </div>
            ) : (
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-900">
                        {article.name}
                      </h3>
                      <p className="text-zinc-600 mt-2 line-clamp-2">
                        {article.description}
                      </p>
                      {article.image && (
                        <p className="text-xs text-zinc-400 mt-2">
                          Image: {article.image}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => article.id && handleDeleteArticle(article.id)}
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

