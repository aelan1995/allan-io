"use client";
import ExperienceCard from "./ExperienceCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const experiences = [
  {
    year: "Present",
    title: "Data Scraper / Full Stack Developer",
    company: "Upwork",
    description:
      "Develop and maintain robust scraping solutions for legal, financial, and automotive datasets using Python. Projects include extracting legal case PDFs and saving them to Google Cloud Storage for OpenAI-based analysis, building stock market scrapers, and parsing VIN-specific recall data from automotive sites. Created a Shopee scraper POC and assisted in debugging and enhancing a Flask-based web application. Built a proof of concept for a Loan Management System and currently automating post analysis workflows using OpenAI. Responsibilities span full-stack development, API integrations, and deploying scraping pipelines with reliability and efficiency.",
    logo: "upwork.png",
    skills: [
      "Python",
      "Web Scraping",
      "Data Extraction",
      "Data Engineering",
      "Legal Data Processing",
      "Financial Data Automation",
      "VIN Lookup",
      "Google Cloud Storage",
      "Flask",
      "Shopee Scraper",
      "Beautiful Soup",
      "Scrapy",
      "Selenium",
      "Requests",
      "Pandas",
      "NumPy",
      "OpenAI API",
      "Post Analysis Automation",
      "CSV Processing",
      "API Integration",
      "Full Stack Development",
      "HTML Parsing",
      "Data Visualization",
    ],
    projects: [
      {
        title: "CI/CD Integration Pipeline",
        description:
          "Helped a client set up a minimal CI/CD workflow using Docker and GitHub Actions for deployment automation.",
        tech: ["Python", "Docker", "GitHub Actions", "CI/CD"],
        image: "upwork.png",
      },
      {
        title: "Legal Scraper",
        description:
          "Built a Python Selenium script to extract data from legal sites and automatically upload the PDFs to Google Drive.",
        tech: [
          "Python",
          "Selenium",
          "Requests",
          "Google Drive API",
          "Automation",
        ],
        image: "upwork.png",
      },
      {
        title: "Till Payments Integration in Flask Application",
        description:
          "Integrated a payment module to allow clients to process payments via PayPal and credit cards within a Flask app.",
        tech: ["Python", "Flask", "PayPal API", "REST", "Frontend Integration"],
        image: "upwork.png",
      },
      {
        title: "Shopee Scraper",
        description:
          "Created a proof-of-concept to scrape automotive product listings from Shopee, capturing costs and descriptions into a MySQL database.",
        tech: ["Python", "Selenium", "Shopee", "MySQL", "Data Extraction"],
        image: "upwork.png",
      },
      {
        title: "BarChart.com Automation",
        description:
          "Automated daily stock market data extraction using Selenium and Requests, saving the results as CSV via Windows Scheduler.",
        tech: ["Python", "Selenium", "Requests", "CSV", "Windows Scheduler"],
        image: "upwork.png",
      },
      {
        title: "Loan Management System",
        description:
          "Developed a full-stack loan management platform using React (frontend), Django (backend), and PostgreSQL on Ubuntu Server.",
        tech: ["React", "Django", "PostgreSQL", "Python", "Ubuntu"],
        image: "upwork.png",
      },
      {
        title: "Recall Campaign Site",
        description:
          "Built a Flask web app with automated data scraping, CSV generation, anti-captcha solving, and background scheduling using Celery and Redis. Implemented an admin dashboard for script monitoring and historical record management.",
        tech: [
          "Python",
          "Flask",
          "Celery",
          "Redis",
          "Selenium",
          "Anti-Captcha",
          "CSV",
        ],
        image: "upwork.png",
      },
    ],
  },
  {
    year: "May 2024 – Present",
    title: "Python Developer",
    company: "Shooju Global",
    description:
      "Specializing in web scraping and data extraction, I develop robust Python scripts using libraries such as Beautiful Soup, Scrapy, and Selenium. I automate data retrieval from static and dynamic websites, APIs, and HTML content, then clean, process, and structure the data into usable formats like CSV or databases. I handle scraping challenges including proxy rotation, CAPTCHA bypassing, and rate limiting. My work supports data-driven decision-making through efficient extraction, manipulation, and visualization workflows.",
    logo: "shooju.jpeg",
    skills: [
      "Python",
      "Web Scraping",
      "Data Scraping",
      "Data Manipulation",
      "Data Engineering",
      "Data Mining",
      "Beautiful Soup",
      "Scrapy",
      "Selenium",
      "Requests",
      "Pandas",
      "NumPy",
      "Data Visualization",
    ],
  },
  {
    year: "Jun 2023 – May 2024",
    title: "Developer",
    company: "SM Supermalls",
    description:
      "Handled debugging and development of internal applications using the OutSystems low-code platform. Collaborated with cross-functional teams to deliver efficient solutions, improve existing systems, and manage project timelines effectively. Contributed to the continuous enhancement of enterprise applications through critical analysis and rapid deployment.",
    logo: "sm_supermalls.png",
    skills: [
      "OutSystems",
      "Software Development",
      "Analytical Thinking",
      "Critical Thinking",
      "Project Management",
    ],
  },
  {
    year: "May 2021 – May 2023",
    title: "Computer Services Programmer A",
    company: "National Electrification Administration",
    description:
      "Developed internal tools and proof-of-concept systems to support NEA's digital transformation initiatives. Created a Raffle Application using Django and MS SQL to introduce digitized event workflows. Built a POC for an Electronic Budget Utilization System aimed at replacing manual processes, and a Training Management System to handle training schedules and quizzes for electric cooperatives. Provided support in CMS-based system deployment and general software development tasks.",
    logo: "nea.jpg",
    skills: [
      "Python",
      "Django",
      "MS SQL",
      "API Integration",
      "Software Development",
      "CMS",
      "System Deployment",
      "Analytical Thinking",
      "Communication",
    ],
    projects: [
      {
        title: "Electronic Budget Utilization System (POC)",
        description:
          "A prototype system to digitize NEA's manual budget tracking and approval process.",
        tech: ["Django", "MS SQL", "Python"],
        image: "ebus.png",
      },
      {
        title: "Learning Management System",
        description:
          "Developed to manage learning and training schedules, quizzes, and reports for electric cooperatives.",
        tech: ["Django", "Forms", "Quiz Module"],
        image: "lms.jpeg",
      },
      {
        title: "Raffle App for Events",
        description:
          "Desktop app for automated raffle draws during NEA events, built with GUI support.",
        tech: ["Python", "MS SQL", "Desktop GUI"],
        image: "nea.jpg",
      },
    ],
  },
  {
    year: "July 2018 – Apr 2021",
    title: "Information System Researcher I",
    company: "PAGASA",
    description:
      "Led the development of internal tools including a wind profile application and the PAGASA Data Monitoring Tool for real-time data visualization. Automated CSV generation and FTP transfers using Python. Integrated external API data into text files for use in weather updates on social media. Supported website maintenance and created scripts to streamline operational workflows. Developed the ICT Management System to track IT assets and maintenance reports. Assisted in ArcMap GIS data integration and provided technical support and documentation.",
    logo: "pagasa.png",
    skills: [
      "Python",
      "API Integration",
      "FTP",
      "ArcMap",
      "CSV Automation",
      "GIS",
      "Google Maps API",
      "System Deployment",
      "CMS",
      "PHP Frameworks",
      "Technical Support",
      "Analytical Thinking",
      "Communication",
    ],
    projects: [
      {
        title: "ICT Management System",
        description:
          "A Django-based system for the ICT Department to track IT assets, issues, and ongoing technical problems.",
        tech: ["Django", "PostgreSQL", "Python"],
        image: "ict.jpeg",
      },
      {
        title: "Daily Weather Automation",
        description:
          "Automated weather updates via API and FTP, scheduled to post to the official Facebook page at 4AM and 4PM.",
        tech: ["Requests", "FTP", "API"],
        image: "pagasa.png",
      },
    ],
  },
  {
    year: "June 2017 – May 2018",
    title: "Science Research Specialist I",
    company: "PAGASA",
    description:
      "Assisted in the development of a wind profile application and internal tools for data processing. Automated CSV generation and FTP transfers using Python, and integrated data with ArcMap for GIS visualization. Maintained documentation and supported teammates with technical concerns.",
    logo: "pagasa.png",
    skills: [
      "Python",
      "FTP",
      "ArcMap",
      "CSV Automation",
      "GIS",
      "Technical",
      "Analytical",
      "Communication",
    ],
    projects: [
      {
        title: "Wind Profile Application",
        description:
          "A Python-based desktop app using Tkinter and ArcMap to automate tropical cyclone bulletin datasets, estimate typhoon damage per household, and visualize impact predictions.",
        tech: ["Python", "ArcMap", "Interpolation", "CSV", "Automation", "FTP"],
        image: "pagasa.png",
      },
    ],
  },
  {
    year: "November 2015 - November 2016",
    title: "Technical Support Representative",
    company: "Teletech",
    description:
      "Provided technical support for Verizon customers, resolving issues related to internet, cable, and phone services. Delivered step-by-step assistance with troubleshooting and device configuration while maintaining high customer satisfaction.",
    logo: "teletech.png",
    skills: ["Technical", "Analytical", "Communication"],
  },
];

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
