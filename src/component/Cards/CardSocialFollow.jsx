import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";

export default function CardSocialFollow() {
  const platforms = [
    { name: "Facebook", icon: FacebookIcon, color: "from-blue-600 to-blue-800", link: "https://facebook.com/parachcomputers" },
    { name: "Instagram", icon: InstagramIcon, color: "from-pink-500 via-purple-500 to-orange-400", link: "https://instagram.com/parach_computers" },
    { name: "LinkedIn", icon: LinkedinIcon, color: "from-blue-700 to-blue-900", link: "https://linkedin.com/company/parach-ict-academy" },
    { name: "YouTube", icon: YoutubeIcon, color: "from-red-600 to-red-800", link: "https://www.youtube.com/channel/UCbHBjB06C4jm_gFvAMxaRhw" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Join Community</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-users text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        {platforms.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r ${p.color} text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className="flex items-center space-x-3">
              {/* This is the fix! */}
              <p.icon className="w-5 h-5" />
              <span className="font-medium">{p.name}</span>
            </div>
            <i className="fas fa-arrow-right text-sm"></i>
          </a>
        ))}
      </div>
    </div>
  );
}