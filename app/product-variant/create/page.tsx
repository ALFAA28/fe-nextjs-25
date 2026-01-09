"use client";

import TextField from "@mui/material/TextField";
import Layout from "@/components/ui/Layout";
import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@mui/material";
import { service, serviceStore } from "@/services/services";
import { useRouter } from "next/navigation";

type ProductOption = { id: number; nama: string; name?: string };

export default function ProductVariantCreate() {
  const router = useRouter();
  const [form, setForm] = useState({
    product_id: "",
    nama: "",
    stok: "",
    tambahan_harga: "",
  });
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await service("products");
      if (!response.error && response.data) {
        const dataArray = Array.isArray(response.data) ? response.data : [];
        setProducts(dataArray);
      } else {
        console.error("Error loading products:", response.message);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("product_id", form.product_id);
      data.append("nama", form.nama);
      data.append("stok", form.stok);
      data.append("tambahan_harga", form.tambahan_harga);

      const response = await serviceStore("product-variants", data);
      setLoading(false);

      if (!response.error) {
        alert("Varian berhasil ditambahkan");
        router.push("/product-variant");
      } else {
        alert(
          "Gagal menambahkan varian: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating variant:", error);
      setLoading(false);
      alert("Terjadi kesalahan saat menambahkan varian");
    }
  };

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">
        Product Variant Create
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField
            select
            required
            label="Produk"
            variant="standard"
            value={form.product_id}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, product_id: e.target.value }))
            }
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.nama || product.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Nama Varian"
            variant="standard"
            value={form.nama}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nama: e.target.value }))
            }
          />
          <TextField
            type="number"
            label="Tambahan Harga"
            variant="standard"
            value={form.tambahan_harga}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tambahan_harga: e.target.value }))
            }
          />
          <TextField
            required
            type="number"
            label="Stok"
            variant="standard"
            value={form.stok}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, stok: e.target.value }))
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
