"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceShow, serviceUpdate } from "@/services/services";
import { Button, MenuItem, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProductOption = { id: number; nama: string; name?: string };

export default function ProductVariantEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const variantId = params?.id;

  const [form, setForm] = useState({
    product_id: "",
    nama: "",
    stok: "",
    tambahan_harga: "",
  });
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadData = async () => {
    if (!variantId) return;

    try {
      const [detailRes, productRes] = await Promise.all([
        serviceShow("product-variants", String(variantId)),
        service("products"),
      ]);

      if (!detailRes.error && detailRes.data) {
        setForm({
          product_id: String(detailRes.data.product_id || ""),
          nama: detailRes.data.nama || detailRes.data.name || "",
          stok: String(detailRes.data.stok ?? detailRes.data.stock ?? ""),
          tambahan_harga: String(
            detailRes.data.tambahan_harga ??
              detailRes.data.harga ??
              detailRes.data.price ??
              ""
          ),
        });
      } else {
        console.error("Error loading variant:", detailRes.message);
        alert("Gagal memuat data varian");
      }

      if (!productRes.error && productRes.data) {
        const dataArray = Array.isArray(productRes.data) ? productRes.data : [];
        setProducts(dataArray);
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
  }, [variantId]);

// ... kode bagian atas tetap sama

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!variantId) return;
  setLoading(true);

  try {
    // PERBAIKAN: Gunakan objek JSON biasa
    const payload = {
      product_id: form.product_id,
      nama: form.nama,
      stok: form.stok,
      tambahan_harga: form.tambahan_harga,
    };

    // Gunakan payload as any untuk mengirim data JSON lewat serviceUpdate
    const response = await serviceUpdate("product-variants", payload as any, variantId);
    
    setLoading(false);

    if (!response.error) {
      alert("Varian berhasil diupdate");
      router.push("/product-variant");
    } else {
      alert(
        "Gagal mengupdate varian: " + (response.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating variant:", error);
    setLoading(false);
    alert("Terjadi kesalahan saat mengupdate varian");
  }
};

// ... kode bagian bawah tetap sama

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">
        Product Variant Edit
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
            disabled={fetching}
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
            disabled={fetching}
          />
          <TextField
            type="number"
            label="Tambahan Harga"
            variant="standard"
            value={form.tambahan_harga}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, tambahan_harga: e.target.value }))
            }
            disabled={fetching}
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
