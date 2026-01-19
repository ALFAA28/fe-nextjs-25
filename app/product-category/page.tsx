"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceDestroy } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Cookies from "js-cookie";
import LoginRequired from "@/components/auth/LoginRequired";

// Tambahkan import berikut
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type CategoryRow = {
  id: number;
  nama: string;
  deskripsi: string;
};

export default function Page() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await service("product-categories");
      if (response.error) {
        setRows([]);
        return;
      }

      if (!response.data) {
        setRows([]);
        return;
      }

      let dataArray = [];
      if (Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        dataArray = response.data.data;
      } else {
        setRows([]);
        return;
      }

      const mapped = dataArray.map((item: any, index: number) => ({
        id: item.id || index + 1,
        nama: item.name || item.nama || `Category ${index + 1}`,
        deskripsi: item.description || item.deskripsi || "-",
      }));

      setRows(mapped);
    } catch (error: any) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      getData();
    }
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Hapus kategori ini?");
    if (!confirmDelete) return;

    try {
      const response = await serviceDestroy("product-categories", String(id));
      if (!response.error) {
        alert("Kategori berhasil dihapus");
        getData();
      } else {
        alert(
          "Gagal menghapus kategori: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus kategori");
    }
  };

  // --- BAGIAN YANG DIPERBAIKI ---
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 80 },
    { field: "nama", headerName: "Category Name", width: 220 },
    { field: "deskripsi", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120, // Lebar disesuaikan karena ikon lebih hemat tempat
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex gap-1 items-center h-full">
          <Tooltip title="Edit">
            <Link href={`/product-category/${params.row.id}/edit`}>
              <IconButton color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  // --- SELESAI PERBAIKAN ---

  if (!isLoggedIn) {
    return (
      <Layout>
        <LoginRequired />
      </Layout>
    );
  }

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
        <div className="bg-white rounded-lg shadow">
          <DataGrid rows={rows} columns={columns} loading={loading} />
        </div>
      </div>
    </Layout>
  );
}
