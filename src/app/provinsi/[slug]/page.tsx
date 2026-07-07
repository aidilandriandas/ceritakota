import { notFound } from "next/navigation";
import { getProvinceBySlug } from "@/data/provinces-meta";
import { getCitiesByProvinceSlug } from "@/data/cities";
import ProvinceMap from "@/components/map/ProvinceMap";
import Breadcrumb from "@/components/ui/Breadcrumb";
import BackButton from "@/components/ui/BackButton";
import NavBar from "@/components/ui/NavBar";
import Link from "next/link";
import { Building2, Map as MapIcon, Users } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProvincePage({ params }: PageProps) {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  const cities = getCitiesByProvinceSlug(slug);

  if (!province) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-[#2C1E16] bg-[#F4F1EA]">
      <NavBar />

      <div className="relative z-10 pt-24 px-4 lg:px-8 max-w-[1400px] mx-auto h-[calc(100vh)] flex flex-col pb-4">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <Breadcrumb items={[{ label: province.name }]} />
          <BackButton label="Kembali ke Peta Indonesia" />
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Kolom Kiri: Peta */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-[#2C1E16]/10 p-6 flex flex-col relative overflow-hidden">
            <h2 className="text-2xl font-bold text-[#C15B3D] mb-2">{province.name}</h2>
            <p className="text-[#2C1E16]/70 max-w-xl">{province.description}</p>
            <div className="flex-1 min-h-[400px] -mx-4 -mb-4">
              <ProvinceMap province={province} cities={cities} />
            </div>
          </div>

          {/* Kolom Kanan: Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
            {/* Info Provinsi Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#2C1E16]/10 p-6 shrink-0">
              <h2 className="text-3xl font-extrabold text-[#2C1E16] mb-6">{province.name}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C15B3D]/10 flex items-center justify-center text-[#C15B3D]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C1E16]/60 font-semibold uppercase tracking-wider">Ibu Kota</p>
                    <p className="font-bold text-[#2C1E16]">{province.capital}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C15B3D]/10 flex items-center justify-center text-[#C15B3D]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C1E16]/60 font-semibold uppercase tracking-wider">Populasi</p>
                    <p className="font-bold text-[#2C1E16]">{province.population}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C15B3D]/10 flex items-center justify-center text-[#C15B3D]">
                    <MapIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C1E16]/60 font-semibold uppercase tracking-wider">Luas Wilayah</p>
                    <p className="font-bold text-[#2C1E16]">{province.area}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daftar Kota Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#2C1E16]/10 p-6 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-lg font-bold text-[#2C1E16]">Daftar Kota & Kabupaten</h3>
                <span className="text-xs font-bold bg-[#F4F1EA] px-2 py-1 rounded-md text-[#C15B3D]">
                  {cities.length}
                </span>
              </div>
              
              <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
                {cities.map((city) => (
                  <Link href={`/provinsi/${province.slug}/${city.slug}`} key={city.slug}>
                    <div className="group p-3 rounded-2xl border border-transparent hover:border-[#C15B3D]/30 hover:bg-[#C15B3D]/5 transition-all cursor-pointer flex items-center gap-4">
                      {/* Image Thumbnail (Placeholder kalau ga ada) */}
                      <div className="w-16 h-16 rounded-xl bg-[#F4F1EA] overflow-hidden shrink-0 border border-[#2C1E16]/5">
                        {city.image ? (
                          <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#2C1E16]/20">
                            <Building2 className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2C1E16] group-hover:text-[#C15B3D] transition-colors truncate">
                          {city.name}
                        </h4>
                        {city.population ? (
                          <p className="text-xs text-[#2C1E16]/60 mt-1">{city.population} Jiwa</p>
                        ) : (
                          <p className="text-xs text-[#2C1E16]/60 mt-1 line-clamp-1">{city.tagline}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
