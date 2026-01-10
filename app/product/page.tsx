"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceDestroy } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Cookies from "js-cookie";
import LoginRequired from "@/components/auth/LoginRequired";

type ProductRow = {
  id: number;
  nama: string;
  harga: string;
  deskripsi: string;
};

export default function Page() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await service("products");
      console.log("=== PRODUCT API RESPONSE ===");
      // ... 

      if (response.error) {
        console.error("API Error:", response.message);
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

      const mapped = dataArray.map((item: any, index: number) => {
        let categoryName = "-";
        if (item.category && typeof item.category === "object") {
          categoryName = item.category.nama || item.category.name || "-";
        } else if (item.categories && typeof item.categories === "object") {
          categoryName = item.categories.nama || item.categories.name || "-";
        }

        return {
          id: item.id || index + 1,
          nama: item.nama || item.name || `Product ${index + 1}`,
          harga: String(item.harga || item.price || "0"),
          deskripsi: item.deskripsi || item.description || "-",
        };
      });

      setRows(mapped);
    } catch (error: any) {
      console.error("Exception fetching products:", error);
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
    const confirmDelete = window.confirm("Hapus produk ini?");
    if (!confirmDelete) return;

    try {
      const response = await serviceDestroy("products", String(id));
      if (!response.error) {
        alert("Produk berhasil dihapus");
        getData();
      } else {
        alert(
          "Gagal menghapus produk: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Terjadi kesalahan saat menghapus produk");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 80 },
    { field: "nama", headerName: "Product Name", width: 200 },
    { field: "harga", headerName: "Harga", width: 120 },
    { field: "deskripsi", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex gap-2">
          <Link href={`/product/${params.row.id}/edit`}>
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
          <h1 className="text-black font-bold">Product</h1>
        </div>
        <div className="">
          <Link href="/product/create">
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
