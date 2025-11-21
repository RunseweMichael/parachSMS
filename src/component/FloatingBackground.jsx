import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated Gradient Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0d0d2b, #1e1e4d, #2a4d8a, #00d4ff, #6ee7ff, #0f172a)",
          backgroundSize: "600% 600%",
          filter: "blur(0px)", // Remove blur if you want sharper edges
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Extra Glow Pulse Layer (makes it POP!) */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(circle at 30% 30%, #00ffff 0%, transparent 50%), radial-gradient(circle at 70% 70%, #0066ff 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "0% 0%"],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Floating Particles Effect (optional magic) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
    key={i}
    className="absolute rounded-full mix-blend-screen filter blur-xl opacity-30"
    style={{
      width: i % 2 === 0 ? "600px" : "800px",
      height: i % 2 === 0 ? "600px" : "800px",
      background: i % 2 === 0 ? "#00d4ff" : "#4a7fff",
      top: `${10 + i * 20}%`,
      left: `${-20 + i * 30}%`,
    }}
    animate={{
      x: [0, 300, -200, 0],
      y: [0, -200, 150, 0],
      scale: [1, 1.4, 0.8, 1],
    }}
    transition={{
      duration: 30 + i * 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
      ))}
    </motion.div>
  );
}