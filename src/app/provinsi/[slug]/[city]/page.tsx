import { notFound } from "next/navigation";
import { getProvinceBySlug } from "@/data/provinces-meta";
import { getCityBySlug } from "@/data/cities";
import CityDetail from "@/components/ui/CityDetail";
import NavBar from "@/components/ui/NavBar";

interface PageProps {
  params: Promise<{ slug: string; city: string }>;
}

export default async function CityPage({ params }: PageProps) {
  const { slug, city: citySlug } = await params;
  
  const province = getProvinceBySlug(slug);
  if (!province) notFound();

  const city = getCityBySlug(slug, citySlug);
  if (!city) notFound();

  return (
    <main className="relative min-h-screen text-[#2C1E16]">
      <NavBar />
      <CityDetail city={city} province={province} />
    </main>
  );
}
