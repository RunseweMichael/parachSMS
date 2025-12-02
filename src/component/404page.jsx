import React from "react";
import { motion } from "framer-motion";
import { Lamp, Home } from "lucide-react";

export default function Error404() {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white bg-gradient-to-b from-[#0C0E10] to-[#446182]">
      {/* Subtle animated fog / mist */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Ground with subtle reflection */}
      <div className="absolute bottom-0 w-full h-[30vh] bg-[#0C0E10] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center w-[90%] max-w-7xl mx-auto h-full">
        {/* Left: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left pb-20 lg:pb-0"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                404
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl lg:text-4xl font-light mt-4 max-w-lg mx-auto lg:mx-0 text-gray-300"
          >
            This page has wandered off into the night...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="/"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-[#0C0E10] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20"
            >
              <Home className="w-5 h-5 group-hover:translate-x-1 transition" />
              Take Me Home
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Animated Lamp & Bench */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 h-full flex items-end justify-center lg:justify-end pb-10"
        >
          <svg
            className="w-full max-w-lg lg:max-w-2xl drop-shadow-2xl"
            viewBox="51.5 -15.288 385 505.565"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Warm glowing gradient */}
            <defs>
              <radialGradient id="warmGlow" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffedb3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#446182" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="softGlow" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#446182" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Bench (unchanged but grouped) */}
            <g className="bench-legs" fill="#0C0E10">
              <path d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111 v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z" />
            </g>
            {/* ... rest of bench paths ... */}
            <g className="top-bench" stroke="#0C0E10" strokeWidth="1" fill="#5B3E2B"> {/* unchanged */} </g>
            <g className="bottom-bench">{/* unchanged */}</g>

            {/* Animated Lamp */}
            <g id="lamp">
              {/* Pole */}
              <path fill="#202425" d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917 c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z" />

              {/* Flickering light */}
              <motion.circle
                cx="119.676"
                cy="44.22"
                r="40"
                fill="#fffbeb"
                animate={{
                  r: [38, 42, 38],
                  opacity: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Multiple glow layers for depth */}
              <motion.circle
                cx="119.676"
                cy="44.22"
                r="70"
                fill="url(#warmGlow)"
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <circle cx="119.676" cy="44.22" r="100" fill="url(#softGlow)" opacity="0.3" />
              <circle cx="119.676" cy="44.22" r="150" fill="url(#softGlow)" opacity="0.15" />

              {/* Lamp details */}
              <path fill="#202425" d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889 S149.306,67.362,149.306,71.528z" />
              <path fill="#202425" d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869 c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z" />
            </g>

            {/* Lamp icon floating subtly */}
            <motion.g
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lamp className="w-8 h-8 text-yellow-200/30 absolute" style={{ x: 100, y: 20 }} />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}