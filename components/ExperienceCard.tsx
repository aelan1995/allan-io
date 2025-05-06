"use client";

import Image from "next/image";
import {
  Code,
  Server,
  Map,
  FileText,
  MessageCircle,
  Zap,
  ChevronDown,
} from "lucide-react";

interface ExperienceCardProps {
  year: string;
  title: string;
  company: string;
  description: string;
  logo: string;
  skills: string[];
  isOpen?: boolean;
  hasProjects?: boolean;
}

const skillBadgeMap: {
  [key: string]: { icon: React.ReactNode; color: string };
} = {
  Python: { icon: <Code size={14} />, color: "bg-yellow-600" },
  FTP: { icon: <Server size={14} />, color: "bg-purple-700" },
  ArcMap: { icon: <Map size={14} />, color: "bg-green-700" },
  "CSV Automation": { icon: <FileText size={14} />, color: "bg-blue-700" },
  GIS: { icon: <Map size={14} />, color: "bg-teal-700" },
  Technical: { icon: <Zap size={14} />, color: "bg-indigo-700" },
  Analytical: { icon: <Zap size={14} />, color: "bg-cyan-700" },
  Communication: { icon: <MessageCircle size={14} />, color: "bg-pink-700" },
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  year,
  title,
  company,
  description,
  logo,
  skills,
  isOpen = false,
  hasProjects = false,
}) => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-md space-y-4 hover:bg-gray-800 transition cursor-pointer">
      <div className="flex items-center gap-4">
        <Image
          src={`/logos/${logo}`}
          alt={company}
          width={100}
          height={100}
          className="rounded-full object-cover aspect-square"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {hasProjects && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            )}
          </div>
          <p className="text-sm text-gray-400">
            {company} <span className="text-xs text-gray-500">({year})</span>
          </p>
        </div>
      </div>

      <p className="text-gray-300">{description}</p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const badge = skillBadgeMap[skill] || {
            icon: <Zap size={14} />,
            color: "bg-gray-700",
          };
          return (
            <span
              key={skill}
              className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${badge.color} text-white`}
            >
              {badge.icon}
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceCard;
