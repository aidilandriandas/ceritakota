"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState } from "react";
import KotaContent from "./KotaContent";

export default function KotaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          title="Kelola Kota"
        />
        <main className="flex-1 p-8 overflow-auto">
          <KotaContent />
        </main>
      </div>
    </div>
  );
}
