"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authLogout } from "@/services/services";

// Import MUI untuk bagian Profil saja
import { Box, IconButton, Typography, Menu, MenuItem, Avatar, Tooltip, Button as MuiButton } from '@mui/material';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State untuk dropdown MUI
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
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
    <nav className="rounded-md shadow-lg w-full relative bg-gray-800">
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
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
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

          {/* BAGIAN YANG DIPERBAIKI: LOGIN / REGISTER / PROFILE DROPDOWN */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt="User Profile" 
                      src="/static/images/avatar/2.jpg" 
                      sx={{ width: 35, height: 35, border: '2px solid #4f46e5' }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => { handleCloseUserMenu(); router.push('/profile'); }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseUserMenu(); router.push('/'); }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Dashboard</Typography>
                  </MenuItem>
                  <hr className="my-1 border-gray-100" />
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px', color: '#ef4444' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
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
                  className="rounded-md px-3 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
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