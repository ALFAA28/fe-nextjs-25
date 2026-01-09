"use client";

import TextField from "@mui/material/TextField";
import Layout from "@/components/ui/Layout";
import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import { service, serviceStore } from "@/services/services";
import { useRouter } from "next/navigation";

type CategoryOption = {
  id: number;
  nama: string;
  name?: string;
};

export default function ProductCreate() {
  const router = useRouter();
  const [form, setForm] = useState({
    product_category_id: "",
    nama: "",
    harga: "",
    deskripsi: "",
  });
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const response = await service("product-categories");
      if (!response.error && response.data) {
        const dataArray = Array.isArray(response.data) ? response.data : [];
        setCategories(dataArray);
      } else {
        console.error("Error loading categories:", response.message);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("product_category_id", form.product_category_id);
      data.append("nama", form.nama);
      data.append("harga", form.harga);
      data.append("deskripsi", form.deskripsi);

      const response = await serviceStore("products", data);
      setLoading(false);

      if (!response.error) {
        alert("Produk berhasil ditambahkan");
        router.push("/product");
      } else {
        alert(
          "Gagal menambahkan produk: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setLoading(false);
      alert("Terjadi kesalahan saat menambahkan produk");
    }
  };

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">
        Product Create
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField
            select
            required
            label="Kategori"
            value={form.product_category_id}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                product_category_id: e.target.value,
              }))
            }
            variant="standard"
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
          />
        </div>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Menyimpan..." : "Submit"}
        </Button>
      </form>
    </Layout>
  );
}
