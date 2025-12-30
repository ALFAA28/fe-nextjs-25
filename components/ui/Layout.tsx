import React from 'react';
import Navbar from './navbar'; // Tambahkan baris ini!

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      {/* Sekarang Navbar sudah didefinisikan dan bisa dipanggil */}
      <Navbar /> 

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 min-h-[70vh]">
          {children}
        </div>
      </main>
    </div>
  );
}