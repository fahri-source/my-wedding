// src/components/Hero/index.jsx
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { transition, parentVariants } from "@/animation/transition";
import { motion } from "framer-motion";
import useDB from "@/hooks/useDB";
import TextMask from "../TextMask";

/**
 * Animasi gambar masuk
 */
const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 }, // Scale diperkecil sedikit agar transisi ke 1 lebih smooth
  show: { scale: 1, opacity: 1, transition: { ...transition, duration: 1.5 } },
  exit: { opacity: 0 },
};

/**
 * Text variant animasi per kata
 */
const textVariants = {
  hidden: { opacity: 0, y: "80%", skewY: 10 },
  show: { opacity: 1, y: 0, skewY: 0, transition },
  exit: { opacity: 0 },
};

/**
 * Animasi untuk pembatas garis dekoratif
 */
const dividerLineVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition },
  exit: { opacity: 0 },
};

const Hero = () => {
  // Mengambil data hero dan wedding dari useDB
  const { hero, wedding } = useDB((db) => db);
  const [searchParams] = useSearchParams();

  // Fallback data jika properti di JSON belum terisi penuh saat loading
  const namaTamu = searchParams.get("nama_tamu") || "Tamu Undangan";
  const mempelaiPria = wedding?.mempelai?.pria?.namaPanggilan || "Pria";
  const mempelaiWanita = wedding?.mempelai?.wanita?.namaPanggilan || "Wanita";
  const mempelai = `${mempelaiPria} & ${mempelaiWanita}`;
  const tanggalResepsi = wedding?.resepsi?.tanggal || "";
  const undangan = "The wedding of";

  // Shared shadow style agar text putih tetap terbaca jelas di atas gambar
  const textShadowStyle = {
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7), 0px 0px 4px rgba(60, 42, 33, 0.4)",
    color: "#ffffff"
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
    >
      <Box sx={{ height: "100vh", overflow: "hidden", position: "relative", width: "100%" }}>
        
        {/* Gambar Cover - Dipastikan Sempurna di Tengah */}
        <Box
          component={motion.img}
          alt="Hero background"
          variants={imageVariants}
          src={hero?.banner}
          sx={{
            objectFit: "cover",
            objectPosition: "center center", // Menjaga fokus gambar tepat di tengah layar
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />

        {/* Overlay Konten & Gradasi Gelap */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2,
            backgroundImage: ({ palette }) => `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 60%, ${palette.background.default} 100%)`,
          }}
        >
          <Container 
            maxWidth="sm" 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              height: "100%", // Menggunakan 100% dari parent viewport h-100vh
              py: { xs: 6, md: 8 }, // Padding responsif agar aman di layar HP pendek
              alignItems: "center",
              boxSizing: "border-box"
            }}
          >
            
            {/* ================= BLOK ATAS (TOP SECTION) ================= */}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
              {/* 1. "The Wedding Of" */}
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 1, gap: 2 }}>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "rgba(255,255,255,0.6)", transformOrigin: "right" }} 
                />
                <Typography
                  variant="h2"
                  sx={{
                    ...textShadowStyle,
                    textAlign: "center",
                    fontSize: { md: 22, xs: 16 },
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    letterSpacing: "2px"
                  }}
                >
                  {undangan.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}&nbsp;
                    </TextMask>
                  ))}
                </Typography>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "rgba(255,255,255,0.6)", transformOrigin: "left" }} 
                />
              </Box>

              {/* 2. Nama Mempelai */}
              <Typography
                variant="h1"
                sx={{
                  ...textShadowStyle,
                  textAlign: "center",
                  fontSize: { md: "4.5rem", xs: "3rem" },
                  mt: 1,
                  fontFamily: "var(--font-wedding)", // Opsional: jika kamu pakai font estetik khusus di layout
                  lineHeight: 1.2
                }}
              >
                {mempelai.split(" ").map((text, key) => (
                  <TextMask key={key} variants={textVariants}>
                    {text}&nbsp;
                  </TextMask>
                ))}
              </Typography>
            </Box>

            {/* ================= BLOK BAWAH (BOTTOM SECTION) ================= */}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, mb: 4 }}>
              {/* 3. "Kepada Yth: Nama Tamu" */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    letterSpacing: "1.5px",
                    fontSize: { md: "0.95rem", xs: "0.85rem" },
                    mb: 1,
                    textTransform: "uppercase"
                  }}
                >
                  Kepada Yth:
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    ...textShadowStyle,
                    textAlign: "center",
                    fontSize: { md: "2.2rem", xs: "1.75rem" },
                    fontWeight: 500
                  }}
                >
                  {namaTamu.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}&nbsp;
                    </TextMask>
                  ))}
                </Typography>
              </Box>

              {/* 4. Tanggal Resepsi */}
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "rgba(255,255,255,0.6)", transformOrigin: "right" }} 
                />
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    ...textShadowStyle,
                    textAlign: "center",
                    fontSize: { md: 24, xs: 20 },
                    whiteSpace: "nowrap",
                    letterSpacing: "1px"
                  }}
                >
                  {tanggalResepsi.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}&nbsp;
                    </TextMask>
                  ))}
                </Typography>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "rgba(255,255,255,0.6)", transformOrigin: "left" }} 
                />
              </Box>
            </Box>

          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Hero;