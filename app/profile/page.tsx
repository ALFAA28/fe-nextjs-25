"use client";
import React, { useState, useRef } from "react";
import Layout from "@/components/ui/Layout";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  IconButton, 
  Paper,
  Divider
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("John Doe"); // State Nama
  const [avatarPreview, setAvatarPreview] = useState("/static/images/avatar/2.jpg"); // State Avatar
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi saat memilih file gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi simpan perubahan
  const handleSave = async () => {
    setLoading(true);
    // Simulasi API call
    setTimeout(() => {
      alert("Profil berhasil diperbarui!");
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <Paper elevation={3} className="p-8 rounded-xl bg-white">
          <Typography variant="h5" fontWeight="bold" gutterBottom className="text-gray-800">
            Edit Profile
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-6">
            Kelola informasi profil Anda secara berkala untuk menjaga keamanan akun.
          </Typography>
          
          <Divider className="mb-8" />

          {/* Bagian Edit Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar
                src={avatarPreview}
                sx={{ width: 120, height: 120, border: '4px solid #f3f4f6', boxShadow: 1 }}
              />
              <label htmlFor="icon-button-file">
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'white',
                    boxShadow: 2,
                    '&:hover': { backgroundColor: '#f9fafb' }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <Typography variant="caption" className="mt-2 text-gray-500">
              Format: JPG, PNG. Max 2MB.
            </Typography>
          </div>

          {/* Bagian Edit Nama */}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <div className="flex items-center gap-3 mb-6">
              <PersonIcon color="action" />
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <Button 
                variant="text" 
                color="inherit"
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
                sx={{ 
                  backgroundColor: '#4f46e5', 
                  '&:hover': { backgroundColor: '#4338ca' },
                  px: 4
                }}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    </Layout>
  );
}