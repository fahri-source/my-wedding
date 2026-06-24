// src/components/Hero.jsx
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { transition, parentVariants } from "@/animation/transition";
import { motion } from "framer-motion";
import useDB from "@/hooks/useDB";
import TextMask from "../TextMask";

/**
 * Animasi gambar
 */
const imageVariants = {
  hidden: { scale: 2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition },
  exit: { opacity: 0 },
};

/**
 * Text variant
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
  const { hero, wedding } = useDB((db) => db);
  const [searchParams] = useSearchParams();

  const namaTamu = searchParams.get("nama_tamu") || "Tamu Undangan";
  const mempelaiPria = wedding.mempelai.pria.namaPanggilan;
  const mempelaiWanita = wedding.mempelai.wanita.namaPanggilan;
  const mempelai = `${mempelaiPria} & ${mempelaiWanita}`;
  const undangan = "The wedding of";

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
    >
      <Box sx={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <Box
          component={motion.img}
          alt="Hero background"
          variants={imageVariants}
          src={hero.banner}
          sx={{
            objectFit: "cover",
            objectPosition: "center center",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Overlay Konten */}
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
            backgroundImage: ({ palette }) => {
              return `linear-gradient(to bottom, rgba(0,0,0,0.3), ${palette.background.default})`;
            },
          }}
        >
          <Container 
            maxWidth="sm" 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", // Mendorong kelompok TOP ke atas dan BOTTOM ke bawah
              height: "100%", 
              py: 8, // Memberikan jarak aman di atas dan di bawah layar
              alignItems: "center" 
            }}
          >
            
            {/* ================= BLOK ATAS (TOP SECTION) ================= */}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* 1. "The Wedding Of" */}
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 1, gap: 2 }}>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider", transformOrigin: "right" }} 
                />
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: 24, xs: 18 },
                    textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {undangan.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}
                    </TextMask>
                  ))}
                </Typography>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider", transformOrigin: "left" }} 
                />
              </Box>

              {/* 2. Nama Mempelai "Arif & Watti" */}
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  fontSize: { md: "5em", xs: "3.5em" },
                  textShadow: "4px 4px rgba(60, 42, 33, 0.6)",
                  mt: 2,
                  mb: 0
                }}
              >
                {mempelai.split(" ").map((text, key) => (
                  <TextMask key={key} variants={textVariants}>
                    {text}
                  </TextMask>
                ))}
              </Typography>
            </Box>


            {/* ================= BLOK BAWAH (BOTTOM SECTION) ================= */}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              {/* 3. "Kepada Yth: Nama Tamu" */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    letterSpacing: "1px",
                    fontSize: { md: "0.95rem", xs: "0.85rem" },
                    mb: 0.5
                  }}
                >
                  Kepada Yth:
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: "2.5rem", xs: "2rem" },
                    textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                  }}
                >
                  {namaTamu.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}
                    </TextMask>
                  ))}
                </Typography>
              </Box>

              {/* 4. Tanggal Resepsi */}
              <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider", transformOrigin: "right" }} 
                />
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: 20, xs: 16 },
                    textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {wedding.resepsi.tanggal.split(" ").map((text, key) => (
                    <TextMask key={key} variants={textVariants}>
                      {text}
                    </TextMask>
                  ))}
                </Typography>
                <Box 
                  component={motion.div} 
                  variants={dividerLineVariants} 
                  sx={{ flexGrow: 1, borderBottom: 1, borderColor: "divider", transformOrigin: "left" }} 
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