"use client";

import Layout from "@/components/ui/Layout";
import { service, serviceDestroy } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";

type VariantRow = {
  id: number;
  nama: string;
  tambahan_harga: number;
  stok: number;
  product: string;
};

export default function Page() {
  const [rows, setRows] = useState<VariantRow[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await service("product-variants");
      console.log("=== PRODUCT VARIANT API RESPONSE ===");
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

      // Handle array response
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
        alert("Tidak ada data varian. Silakan tambahkan data terlebih dahulu.");
        setRows([]);
        return;
      }

      const mapped = dataArray.map((item: any, index: number) => {
        console.log(`Mapping item ${index}:`, item);

        // Extract product name
        let productName = "-";
        if (item.product && typeof item.product === "object") {
          productName = item.product.nama || item.product.name || "-";
        }

        const mappedItem = {
          id: item.id || index + 1,
          nama: item.nama || item.name || `Variant ${index + 1}`,
          tambahan_harga:
            item.tambahan_harga !== undefined && item.tambahan_harga !== null
              ? Number(item.tambahan_harga)
              : item.harga !== undefined && item.harga !== null
              ? Number(item.harga)
              : item.price !== undefined && item.price !== null
              ? Number(item.price)
              : 0,
          stok:
            item.stok !== undefined && item.stok !== null
              ? Number(item.stok)
              : item.stock !== undefined && item.stock !== null
              ? Number(item.stock)
              : 0,
          product: productName,
        };

        console.log(`  Mapped to:`, mappedItem);
        return mappedItem;
      });

      console.log("Final Mapped Rows:", mapped);
      setRows(mapped);
    } catch (error: any) {
      console.error("Exception fetching variants:", error);
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
    const confirmDelete = window.confirm("Hapus varian ini?");
    if (!confirmDelete) return;

    try {
      const response = await serviceDestroy("product-variants", String(id));
      if (!response.error) {
        alert("Varian berhasil dihapus");
        getData(); // Refresh data
      } else {
        alert(
          "Gagal menghapus varian: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error deleting variant:", error);
      alert("Terjadi kesalahan saat menghapus varian");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 80 },
    { field: "nama", headerName: "Nama Varian", width: 200 },
    { field: "product", headerName: "Product", width: 180 },
    { field: "tambahan_harga", headerName: "Tambahan Harga", width: 180 },
    { field: "stok", headerName: "Stok", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex gap-2">
          <Link href={`/product-variant/${params.row.id}/edit`}>
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
          <h1 className="text-black font-bold">Product Variant</h1>
        </div>
        <div className="">
          <Link href="/product-variant/create">
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
