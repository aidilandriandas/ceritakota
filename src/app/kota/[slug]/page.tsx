import { notFound } from "next/navigation";
import { getProvinceBySlug } from "@/data/provinces-meta";
import CityClientPage from "./CityClientPage";

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  try {
    // Fetch city from API
    const response = await fetch(`${apiUrl}/cities`, {
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    const result = await response.json();
    const cities = result.data || [];
    
    // Find city by slug
    const city = cities.find((c: any) => c.slug === resolvedParams.slug);

    if (!city) {
      notFound();
    }

    const province = getProvinceBySlug("sumatera-barat");

    return <CityClientPage city={city} province={province || null} />;
  } catch (error) {
    console.error("Error fetching city:", error);
    notFound();
  }
}
