import NavBar from "@/components/ui/NavBar";
import IndonesiaMap from "@/components/map/IndonesiaMap";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Latar Belakang Dark dengan Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black pointer-events-none -z-10" />
      
      {/* Efek cahaya background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navbar mengambang */}
      <NavBar />

      {/* Peta Interaktif Indonesia sebagai Menu Utama */}
      <IndonesiaMap />

      {/* Footer sederhana */}
      <footer className="absolute bottom-4 left-0 w-full z-10 text-center pointer-events-none">
        <p className="text-sm font-medium text-slate-400">
          © 2026 Digital Indonesia. Dibuat dengan ❤️ untuk CeritaKota.
        </p>
      </footer>
    </main>
  );
}
