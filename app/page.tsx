"use client";
import ToolsSection from "@/components/ToolsSection";
import LogoAnimation from "@/components/LogoAnimation";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-start gap-12 px-6 py-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center gap-4 text-center">
        <LogoAnimation />
        <h2 className="text-sm uppercase tracking-widest text-cyan-400">
          Web Scraping • OpenAI Automation • Full Stack Django + React Apps
        </h2>
        <h1 className="text-5xl md:text-4xl font-bold mt-2">
          Hi, I'm Allan 👋
        </h1>
        <p className="text-xl text-gray-300 max-w-md mx-auto">
          <Typewriter
            words={[
              "Full Stack Developer",
              "Automation Enthusiast",
              "Data Scraper",
              "AI Workflow Builder",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="#experience"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 rounded-xl text-white font-semibold shadow-md hover:shadow-blue-500/30"
          >
            View My Experience
          </Link>
          <Link
            href="#tools"
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 rounded-xl text-white font-semibold shadow-md hover:shadow-emerald-500/30"
          >
            View Tools Section
          </Link>
          <Link
            href="#contact"
            className="px-6 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-500 hover:to-fuchsia-500 transition-all duration-300 rounded-xl text-white font-semibold shadow-md hover:shadow-pink-400/30"
          >
            Contact Me
          </Link>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-10"
        >
          <Link
            href="#experience"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ↓ Scroll down
          </Link>
        </motion.div>

        {/* ✅ Fade-out mask */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </section>

      {/* Experience Timeline */}
      <div id="experience" className="w-full">
        <ExperienceSection />
      </div>

      <div id="tools" className="w-full">
        <ToolsSection />
      </div>

      <div
        id="contact"
        className="w-full max-w-5xl mx-auto px-4 py-12 text-center"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact{" "}
        </motion.h2>
        <motion.div
          className="mt-20 bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-700 rounded-2xl p-6 md:p-10 shadow-lg max-w-3xl mx-auto text-left text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Let’s Connect</h3>
              <p className="text-gray-400 max-w-md text-sm">
                I'm open to freelance work, collaborations, and consulting
                opportunities. If you have a project in mind or just want to say
                hello, feel free to reach out.
              </p>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p className="flex items-center gap-2">
                📧
                <a
                  href="mailto:allanboiebiaspunzalan@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  allanboiebiaspunzalan@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                📱
                <a
                  href="https://wa.me/639760304099"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  Message me on WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                💼
                <a
                  href="https://www.upwork.com/freelancers/allanp12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300 hover:underline"
                >
                  Visit My Upwork Account
                </a>
              </p>
              <p className="flex items-center gap-2">
                💼
                <a
                  href="https://www.linkedin.com/in/allan-boi-punzalan-083654158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Visit my LinkedIn
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {showTopButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-medium"
          >
            ↑ Back to Top
          </button>
        </motion.div>
      )}
    </main>
  );
}
