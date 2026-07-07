import NavBar from "@/components/ui/NavBar";
import IndonesiaMap from "@/components/map/IndonesiaMap";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Latar Belakang Earthy */}
      <div className="absolute inset-0 bg-[#F4F1EA] pointer-events-none -z-10" />


      {/* Navbar mengambang */}
      <NavBar />

      {/* Peta Interaktif Indonesia sebagai Menu Utama */}
      <IndonesiaMap />

      {/* Footer sederhana */}
      <footer className="absolute bottom-4 left-0 w-full z-10 text-center pointer-events-none">
        <p
          className="text-sm font-medium"
          style={{ color: "rgba(44, 30, 22, 0.5)" }}
        >
          © 2026 Digital Indonesia. Dibuat dengan ❤️ untuk Nusantara.
        </p>
      </footer>
    </main>
  );
}
