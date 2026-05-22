"use client";
import ExperienceCard from "./ExperienceCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/data/experiences";

const ExperienceSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Work Experiences
      </motion.h2>

      <div className="relative mx-auto max-w-3xl px-1 border-l-2 border-gray-700 space-y-12 text-left">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] top-6 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900" />

            {/* Experience Card (clickable) */}
            <div
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="cursor-pointer"
            >
              <ExperienceCard
                {...exp}
                isOpen={openIndex === idx}
                hasProjects={!!exp.projects?.length}
              />
            </div>

            {/* Expandable Projects */}
            <AnimatePresence>
              {openIndex === idx && exp.projects && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-6 mt-4 border-l-2 border-gray-700 pl-6 space-y-6"
                >
                  {exp.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="relative">
                      {/* Dot */}
                      <div className="bg-slate-800 p-4 rounded-lg shadow-md text-left flex flex-col md:flex-row gap-4">
                        {/* Image */}
                        {proj.image && (
                          <img
                            src={`/logos/${proj.image}`}
                            alt={proj.title}
                            className="w-24 h-24 object-contain border border-gray-700 rounded-md"
                          />
                        )}

                        {/* Text */}
                        <div>
                          <p className="font-semibold text-white">
                            {proj.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {proj.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {proj.tech.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
