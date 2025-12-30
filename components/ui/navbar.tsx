"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Ref untuk mendeteksi klik di luar dropdown
  const profileRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown profil saat klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* SISI KIRI: Logo & Menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <img 
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
                  alt="Logo" 
                  className="h-8 w-auto cursor-pointer" 
                />
              </Link>
            </div>
            
            <div className="hidden md:ml-8 md:block">
              <div className="flex space-x-4">
                <Link href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</Link>
                <Link href="/product_category" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition">Product Category</Link>
                <Link href="/projects" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition">Product</Link>
                <Link href="/calendar" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition">Product Variant</Link>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Notifikasi & Profil */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition p-1">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition"
              >
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <hr className="my-1 border-gray-200" />
                  <Link href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium">Sign out</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 pb-3 pt-2 px-4 space-y-1">
          <Link href="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</Link>
          <Link href="/team" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Product Category</Link>
          <Link href="/projects" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Product</Link>
          <Link href="/calendar" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Product Variant</Link>
        </div>
      )}
    </nav>
  );
}