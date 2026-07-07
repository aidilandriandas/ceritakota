"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-sm mb-6"
    >
      <Link
        href="/"
        className="text-[#2C1E16]/50 hover:text-[#2C1E16] transition-colors font-medium"
      >
        Indonesia
      </Link>
      
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-[#2C1E16]/30" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-[#2C1E16]/50 hover:text-[#2C1E16] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#C15B3D] font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
