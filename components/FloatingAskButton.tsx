"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingAskButton() {
  const pathname = usePathname();

  if (pathname === "/ask") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.6, y: 24 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Link
          href="/ask"
          aria-label="Ask AI about Allan"
          className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 hover:scale-105"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-blue-500/40 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
          />
          <motion.span
            animate={{ rotate: [0, 12, -8, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.2 }}
            className="flex h-5 w-5 items-center justify-center"
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          <span>Ask about Allan</span>
          <span className="ml-1 hidden rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-widest sm:inline">
            AI
          </span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
