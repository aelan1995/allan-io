"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const programmingLanguages = [
  "python.png",
  "javascript.png",
  "typescript.png",
  "php.png",
];
const libraries = [
  "selenium.png",
  "react.png",
  "motion.jpeg",
  "django.svg",
  "gunicorn.png",
  "flask.png",
];
const applications = [
  "arcgis.png",
  "postman.png",
  "docker.jpg",
  "nginx.png",
  "visual_studio.png",
  "visual_code.png",
  "bitbucket.png",
  "jira.png",
  "jupyter.png",
  "excel.png",
  "openai.png",
];

const categories = [
  { title: "Programming Languages", data: programmingLanguages },
  { title: "Libraries & Frameworks", data: libraries },
  { title: "Applications & Tools", data: applications },
];

export default function ToolsSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tools
      </motion.h2>

      <div className="flex flex-col gap-12">
        {categories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {category.data.map((icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full overflow-hidden p-3 border border-gray-600 bg-transparent shadow-md"
                >
                  <Image
                    src={`/logos/${icon}`}
                    alt={icon}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
