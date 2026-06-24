import React from "react";
import PauseTwoToneIcon from "@mui/icons-material/PauseTwoTone";
import PlayArrowTwoToneIcon from "@mui/icons-material/PlayArrowTwoTone";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";

/**
 *
 * @returns React.ReactElement
 */
const Backsound = () => {
  const audioRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isPlay, setPlay] = React.useState(false);
  const [constraints, setConstraints] = React.useState({});

  /**
   * Fungsi toggle button
   */
  const toggleAudio = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlay((prevState) => !prevState);
  };

  /**
   * Auto play musik dengan penanganan blokir browser (Autoplay Policy)
   */
  React.useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setPlay(true);
            removeListeners();
          })
          .catch((err) => console.log("Interaksi gagal memicu audio:", err));
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    // Jalankan fungsi putar bawaan saat pertama kali dimuat
    const playPromise = audioRef.current?.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlay(true);
        })
        .catch(() => {
          // Jika terblokir browser, pasang listener interaksi pertama tamu
          setPlay(false);
          window.addEventListener("click", handleFirstInteraction);
          window.addEventListener("touchstart", handleFirstInteraction);
        });
    }

    // Bersihkan listener saat komponen dilepas agar tidak terjadi kebocoran memori
    return () => {
      removeListeners();
    };
  }, [audioRef]);

  // observe when browser is resizing
  React.useLayoutEffect(() => {
    const domRect = containerRef.current.getBoundingClientRect();
    const { top, bottom, left, right } = domRect;

    setConstraints({
      top: -top,
      bottom: window.innerHeight - bottom,
      left: -left,
      right: window.innerWidth - right,
    });
  }, [containerRef, setConstraints]);

  return (
    <Box
      ref={containerRef}
      component={motion.div}
      drag
      dragConstraints={constraints}
      boxShadow={8}
      sx={{
        position: "fixed",
        zIndex: 2000,
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(213, 206, 163, 0.7)",
        borderRadius: "50%",
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <audio
        ref={audioRef}
        preload="true"
        loop
        autoPlay={true}
        style={{ display: "none" }}
      >
        <source src="/assets/audio/backsound.mp3" type="audio/mp3" />
      </audio>

      <IconButton
        onClick={toggleAudio}
        color="secondary"
        sx={{ backgroundColor: "text.primary" }}
        aria-label="Play button"
        id="playButton"
        role="button"
        title="Play button"
        size="small"
      >
        {isPlay ? <PauseTwoToneIcon /> : <PlayArrowTwoToneIcon />}
      </IconButton>
    </Box>
  );
};

export default Backsound;