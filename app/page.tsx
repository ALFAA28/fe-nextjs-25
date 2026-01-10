"use client";

import Layout from "@/components/ui/Layout";
import React from "react";
import { Box, Button, Card, CardActionArea, CardContent, Container, Grid, Typography, Paper } from "@mui/material";
import Link from "next/link";

const categories = [
  {
    id: "electronics",
    title: "Elektronik",
    description: "Gadget terbaru dan aksesoris",
    image: "/images/cat-electronics.png",
    href: "/product-category?category=electronics"
  },
  {
    id: "food-drink",
    title: "Makanan & Minuman",
    description: "Segar dan lezat setiap hari",
    image: "/images/cat-food.png",
    href: "/product-category?category=food-drink"
  },
  {
    id: "fashion",
    title: "Fashion",
    description: "Tampil gaya dengan koleksi terbaru",
    image: "/images/cat-fashion.png",
    href: "/product-category?category=fashion"
  },
  {
    id: "medicine",
    title: "Obat & Kesehatan",
    description: "Solusi kesehatan terpercaya",
    image: "/images/cat-medicine.png",
    href: "/product-category?category=medicine"
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <Box className="w-full mb-16 relative">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-shopping.png" alt="Hero background" className="w-full h-full object-cover rounded-2xl opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent rounded-2xl"></div>
        </div>
        <Paper
          elevation={0}
          className="rounded-2xl overflow-hidden relative bg-transparent"
          sx={{
            height: { xs: 400, md: 500 },
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Container maxWidth="lg" className="relative z-10">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }} className="text-gray-900 p-8">
                <Typography variant="h2" component="h1" className="font-extrabold mb-6 leading-tight">
                  Toko Serba Ada <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Untuk Kebutuhanmu</span>
                </Typography>
                <Typography variant="h6" className="text-gray-700 mb-8 font-light max-w-lg">
                  Temukan elektronik, makanan, fashion, hingga obat-obatan berkualitas dalam satu tempat yang nyaman.
                </Typography>
                <Link href="/product">
                  <Button variant="contained" size="large" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-indigo-500/20 transform transition hover:scale-105">
                    Belanja Sekarang
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" className="mb-20">
        <Typography variant="h4" component="h2" className="font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
          Kategori Pilihan
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
              <Link href={category.href} className="no-underline group">
                <Card
                  className="h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border-0"
                  elevation={3}
                >
                  <CardActionArea className="h-full flex flex-col justify-start">
                    <Box
                      sx={{
                        height: 200,
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Typography variant="h6" component="div" className="absolute bottom-4 left-4 font-bold text-white z-10">
                        {category.title}
                      </Typography>
                    </Box>
                    <CardContent className="flex-grow bg-white">
                      <Typography variant="body2" color="text.secondary" className="font-medium">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Promotion / Feature Section */}
      <Box className="w-full py-16 bg-gray-50 rounded-3xl mb-8">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" className="font-bold text-gray-800 mb-4">
                Diskon Spesial Hari Ini!
              </Typography>
              <Typography className="text-gray-600 mb-6 text-lg">
                Dapatkan penawaran terbaik untuk produk pilihan. Jangan lewatkan kesempatan ini.
              </Typography>
              <Button variant="outlined" color="primary" size="large">
                Lihat Promo
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box className="w-full h-64 bg-slate-200 rounded-xl flex items-center justify-center text-gray-400">
                <Typography>Promo Banner Placeholder</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Layout>
  );
}
