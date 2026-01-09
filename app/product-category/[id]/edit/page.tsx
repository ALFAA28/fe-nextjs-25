"use client";

import Layout from "@/components/ui/Layout";
import { serviceShow, serviceUpdate } from "@/services/services";
import { Button, TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductCategoryEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const categoryId = params?.id;

  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadData = async () => {
    if (!categoryId) return;

    try {
      const detailRes = await serviceShow(
        "product-categories",
        String(categoryId)
      );

      if (!detailRes.error && detailRes.data) {
        setForm({
          nama: detailRes.data.nama || "",
          deskripsi: detailRes.data.deskripsi || "",
        });
      } else {
        console.error("Error loading category:", detailRes.message);
        alert("Gagal memuat data kategori");
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
  }, [categoryId]);

// ... kode bagian atas tetap sama

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!categoryId) return;

  setLoading(true);
  try {
    // --- BAGIAN YANG DIUBAH (OPSI 1) ---
    // Ganti FormData dengan objek JSON biasa
    const payload = {
      nama: form.nama,
      deskripsi: form.deskripsi,
    };

    const response = await serviceUpdate(
      "product-categories",
      payload as any, // Masukkan payload objek di sini
      categoryId
    );
    // --- AKHIR PERUBAHAN ---

    setLoading(false);

    if (!response.error) {
      alert("Kategori berhasil diupdate");
      router.push("/product-category");
    } else {
      alert(
        "Gagal mengupdate kategori: " + (response.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating category:", error);
    setLoading(false);
    alert("Terjadi kesalahan saat mengupdate kategori");
  }
};

// ... kode bagian bawah (return JSX) tetap sama

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">
        Product Category Edit
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TextField
            required
            label="Nama"
            variant="standard"
            value={form.nama}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nama: e.target.value }))
            }
            disabled={fetching}
          />
          <TextField
            required
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
