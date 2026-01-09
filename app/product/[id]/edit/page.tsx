"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceShow, serviceUpdate } from "@/services/services";
import { Button, MenuItem, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type CategoryOption = { id: number; nama: string; name?: string };

export default function ProductEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const [form, setForm] = useState({
    product_category_id: "",
    nama: "",
    harga: "",
    deskripsi: "",
  });
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadData = async () => {
    if (!productId) return;

    try {
      const [detailRes, categoryRes] = await Promise.all([
        serviceShow("products", String(productId)),
        service("product-categories"),
      ]);

      if (!detailRes.error && detailRes.data) {
        setForm({
          product_category_id: String(detailRes.data.product_category_id || ""),
          nama: detailRes.data.nama || detailRes.data.name || "",
          harga: String(detailRes.data.harga || ""),
          deskripsi:
            detailRes.data.deskripsi || detailRes.data.deskripsi || "",
        });
      } else {
        console.error("Error loading product:", detailRes.message);
        alert("Gagal memuat data produk");
      }

      if (!categoryRes.error && categoryRes.data) {
        const dataArray = Array.isArray(categoryRes.data)
          ? categoryRes.data
          : [];
        setCategories(dataArray);
      } else {
        console.error("Error loading categories:", categoryRes.message);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    setLoading(true);

    try {
      // PERBAIKAN: Gunakan objek JSON (payload) alih-alih FormData
      // Tambahkan 'as any' jika variabel payload berwarna merah
      const payload = {
        product_category_id: form.product_category_id,
        nama: form.nama,
        harga: form.harga,
        deskripsi: form.deskripsi,
      };

      // Kirim payload sebagai objek, bukan FormData
      const response = await serviceUpdate("products", payload as any, productId);
      
      setLoading(false);

      if (!response.error) {
        alert("Produk berhasil diupdate");
        router.push("/product");
      } else {
        alert(
          "Gagal mengupdate produk: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
      alert("Terjadi kesalahan saat mengupdate produk");
    }
  };

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">Product Edit</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField
            select
            required
            label="Kategori"
            variant="standard"
            value={form.product_category_id}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                product_category_id: e.target.value,
              }))
            }
            disabled={fetching}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.nama || category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Nama Produk"
            variant="standard"
            value={form.nama}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nama: e.target.value }))
            }
            disabled={fetching}
          />
          <TextField
            required
            type="number"
            label="Harga"
            variant="standard"
            value={form.harga}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, harga: e.target.value }))
            }
            disabled={fetching}
          />
          <TextField
            label="Deskripsi"
            variant="standard"
            multiline
            minRows={2}
            value={form.deskripsi}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, deskripsi: e.target.value }))
            }
            disabled={fetching}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading || fetching}
        >
          {loading ? "Menyimpan..." : "Update"}
        </Button>
      </form>
    </Layout>
  );
}
