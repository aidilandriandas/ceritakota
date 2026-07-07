'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardContent from './DashboardContent';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [totalContent, setTotalContent] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [contentByCategory, setContentByCategory] = useState({});

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch cities data from API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`);
      if (response.ok) {
        const result = await response.json();
        const citiesData = result.data || [];
        setCities(citiesData);
        setTotalCities(citiesData.length);
        
        // Calculate total content and by category
        const total = citiesData.reduce((acc: number, city: any) => acc + (city.category_items?.length || 0), 0);
        setTotalContent(total);
        
        const byCategory = citiesData.reduce((acc: any, city: any) => {
          city.category_items?.forEach((item: any) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
          });
          return acc;
        }, {});
        setContentByCategory(byCategory);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use demo data if API fails
      setCities([]);
      setTotalCities(0);
      setTotalContent(0);
      setContentByCategory({});
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C15B3D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-auto">
          <DashboardContent
            cities={cities}
            totalContent={totalContent}
            totalCities={totalCities}
            contentByCategory={contentByCategory}
          />
        </main>
      </div>
    </div>
  );
}
