// src/components/Gift.jsx
import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { transition, parentVariants } from "@/animation/transition";
import useDB from "@/hooks/useDB";

import CopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LocationIcon from "@mui/icons-material/LocationOn";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition },
  exit: { opacity: 0 },
};

const Gift = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { gift, wedding } = useDB((db) => db);

  const mempelaiPria = wedding.mempelai.pria.namaPanggilan;
  const mempelaiWanita = wedding.mempelai.wanita.namaPanggilan;
  const namaPengantin = `${mempelaiPria} & ${mempelaiWanita}`;
  const alamatKado = wedding.resepsi.alamat;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <Box
      component={motion.div}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
      sx={{
        py: 10,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Menyesuaikan optimalisasi teks sesuai body css global Anda
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <Container maxWidth="sm">
        <Box
          component={motion.div}
          variants={cardVariants}
          sx={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Mengikuti nuansa hitam transparan
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            p: { xs: 3, md: 5 },
            textAlign: "center",
            boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Judul Utama - Memanfaatkan line-height 100% khas heading global Anda */}
{/* Judul Utama - Otomatis Menggunakan Font Latin 'Arizonia' karena menggunakan variant h2 */}
<Typography 
  variant="h2" 
  component="h2" 
  sx={{ 
    mb: 2, 
    fontWeight: 500, 
    color: "#fff",
    textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
    letterSpacing: "1px",
    lineHeight: "120%", // Diberi 120% agar ekor font latin Arizonia yang anggun tidak terpotong ke bawah
  }}
>Wedding Gift
</Typography>

          {/* Deskripsi Keterangan */}
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 4, 
              color: "#fff", 
              px: { md: 2 }, 
              lineHeight: 1.6, 
              opacity: 0.9,
            }}
          >
            {gift.keterangan}
          </Typography>

          {/* === SECTION 1: DAFTAR REKENING === */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
            {gift.rekening.map((acc, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: "16px",
                  textAlign: "left",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                  <Box
                    component="img"
                    src={acc.logo}
                    alt={acc.provider}
                    sx={{
                      height: { xs: 24, md: 30 },
                      objectFit: "contain",
                      filter: "none"
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#fff" }}>
                    {acc.nama}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block", mb: 0.5 }}>
                      NOMOR REKENING
                    </Typography>
                    {/* Diubah agar font selaras dengan angka web global (bukan monospace kaku) */}
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#E5E5CB", letterSpacing: "1px", lineHeight: "100%" }}>
                      {acc.nomor}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCopy(acc.nomor, index)}
                    startIcon={copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                    sx={{
                      backgroundColor: copiedIndex === index ? "#5F8D4E" : "rgba(229, 229, 203, 0.2)",
                      color: "#fff",
                      border: "1px solid rgba(229, 229, 203, 0.4)",
                      textTransform: "none",
                      borderRadius: "8px",
                      backdropFilter: "blur(4px)",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: copiedIndex === index ? "#4f773e" : "rgba(229, 229, 203, 0.35)",
                        borderColor: "#E5E5CB",
                      },
                    }}
                  >
                    {copiedIndex === index ? "Tersalin" : "Salin"}
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* === SECTION 2: ALAMAT FISIK === */}
          <Box
            sx={{
              pt: 4,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ p: 1.5, backgroundColor: "rgba(229, 229, 203, 0.08)", borderRadius: "50%", mb: 1.5 }}>
              <LocationIcon sx={{ color: "#E5E5CB", fontSize: 26 }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: "#fff", lineHeight: "100%" }}>
              A.n {namaPengantin}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6, fontSize: "0.85rem", px: 2 }}>
              {alamatKado}
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(Gift);