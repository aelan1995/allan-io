"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoAnimation() {
  return (
    <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
      {/* Animated gradient glow */}
      <motion.div
        className="absolute w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-40"
        initial={{ scale: 0.9, opacity: 0.3 }}
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.04, 1],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        }}
        className="relative z-10 w-full h-full"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={1024}
          height={1024}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
