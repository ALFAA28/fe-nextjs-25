"use client";

import TextField from "@mui/material/TextField";
import Layout from "@/components/ui/Layout";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { serviceStore } from "@/services/services";
import { useRouter } from "next/navigation";

export default function ProductCategoryCreate() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("nama", form.nama);
      data.append("deskripsi", form.deskripsi);

      const response = await serviceStore("product-categories", data);
      setLoading(false);

      if (!response.error) {
        alert("Kategori berhasil ditambahkan");
        router.push("/product-category");
      } else {
        alert(
          "Gagal menambahkan kategori: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setLoading(false);
      alert("Terjadi kesalahan saat menambahkan kategori");
    }
  };

  return (
    <Layout>
      <h1 className="dark:text-black text-2xl font-bold my-4">
        Product Category Create
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
          />
        </div>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Menyimpan..." : "Submit"}
        </Button>
      </form>
    </Layout>
  );
}
