"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceDestroy } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";

type CategoryRow = {
  id: number;
  nama: string;
  deskripsi: string;
};

export default function Page() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await service("product-categories");
      console.log("=== CATEGORY API RESPONSE ===");
      console.log("Full Response:", JSON.stringify(response, null, 2));

      if (response.error) {
        console.error("API Error:", response.message);
        alert("Error: " + response.message);
        setRows([]);
        return;
      }

      if (!response.data) {
        console.error("No data in response");
        setRows([]);
        return;
      }

      let dataArray = [];
      if (Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        dataArray = response.data.data;
      } else {
        console.error("Unexpected data structure:", response.data);
        setRows([]);
        return;
      }

      console.log("Data Array Length:", dataArray.length);
      console.log("First Item Raw:", dataArray[0]);

      if (dataArray.length === 0) {
        console.warn("No data found in response");
        alert(
          "Tidak ada data kategori. Silakan tambahkan data terlebih dahulu."
        );
        setRows([]);
        return;
      }

      const mapped = dataArray.map((item: any, index: number) => ({
        id: item.id || index + 1,
        nama: item.name || item.nama || `Category ${index + 1}`,
        deskripsi: item.description || item.deskripsi || "-",
      }));

      console.log("Mapped categories:", mapped);
      setRows(mapped);
    } catch (error: any) {
      console.error("Exception fetching categories:", error);
      alert("Terjadi kesalahan: " + (error.message || "Unknown error"));
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Hapus kategori ini?");
    if (!confirmDelete) return;

    try {
      const response = await serviceDestroy("product-categories", String(id));
      if (!response.error) {
        alert("Kategori berhasil dihapus");
        getData(); // Refresh data
      } else {
        alert(
          "Gagal menghapus kategori: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Terjadi kesalahan saat menghapus kategori");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 80 },
    { field: "nama", headerName: "Category Name", width: 220 },
    { field: "deskripsi", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex gap-2">
          <Link href={`/product-category/${params.row.id}/edit`}>
            <Button variant="outlined" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="flex w-full justify-between items-center my-4">
        <div className="">
          <h1 className="text-black font-bold">Product Category</h1>
        </div>
        <div className="">
          <Link href="/product-category/create">
            <Button variant="contained">Add New</Button>
          </Link>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} loading={loading} />
      </div>
    </Layout>
  );
}
