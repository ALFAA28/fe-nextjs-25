"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authLogout } from "@/services/services";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const realToken = atob(token);
        await authLogout(realToken);
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      Cookies.remove("token");
      setIsLoggedIn(false);
      router.push("/auth/login");
    }
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/product-category", label: "Product Category" },
    { href: "/product", label: "Product" },
    { href: "/product-variant", label: "Product Variant" },
  ];

  return (
    <nav className="rounded-md shadow-lg/30 w-full relative bg-gray-800">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <div className="flex gap-4 items-center">
                <span className="text-gray-300 text-sm">Welcome</span>
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
