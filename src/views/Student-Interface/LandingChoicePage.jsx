import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  MessageSquare,
  LogIn,
  Server,
  HardDrive,
  Wifi,
  CircuitBoard,
  Cog,
  ShieldCheck,
  Cloud,
  Terminal,
  Monitor,
  Database,
  Satellite,
  Smartphone,
  MousePointer,
  Keyboard,
  Bug,
  Radio
} from "lucide-react";

export default function LandingChoicePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const float = {
    animate: {
      y: [0, -25, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-blue-100/30 backdrop-blur-3xl"
    >
      {/* 20 Floating Tech Icons */}
      {[
        [Cpu, "top-10 left-10", "text-blue-400/60"],
        [Server, "top-40 left-24", "text-green-500/60"],
        [HardDrive, "bottom-20 left-14", "text-purple-500/60"],
        [Wifi, "top-56 left-1/2", "text-indigo-400/60"],
        [CircuitBoard, "top-12 right-28", "text-blue-500/60"],
        [Cog, "bottom-32 right-20", "text-purple-600/60"],
        [ShieldCheck, "top-1/3 right-10", "text-teal-500/60"],
        [Cloud, "top-1/4 left-1/4", "text-emerald-500/60"],
        [Terminal, "bottom-10 left-1/2", "text-blue-600/60"],
        [Monitor, "bottom-20 right-1/3", "text-cyan-500/60"],
        [Database, "top-1/2 right-1/2", "text-indigo-500/60"],
        [Satellite, "bottom-1/4 right-16", "text-blue-400/60"],
        [Smartphone, "top-1/2 left-10", "text-amber-500/60"],
        [MousePointer, "top-20 right-1/4", "text-rose-500/60"],
        [Keyboard, "bottom-40 left-1/3", "text-lime-500/60"],
        [Bug, "bottom-1/3 right-1/4", "text-red-500/60"],
        [Radio, "top-16 left-1/2", "text-orange-500/60"],
      ].map(([Icon, pos, color], i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} ${color}`}
          variants={float}
          animate="animate"
        >
          <Icon size={50} />
        </motion.div>
      ))}

      {/* Center Card */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center relative z-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 drop-shadow-sm mb-4">
            Welcome to Parach ICT Academy
          </h1>

          <p className="text-gray-700 text-lg mb-10">
            Choose what you want to do today.
          </p>

          <div className="flex flex-col gap-4">
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              custom={1}
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4 bg-white border border-gray-300 rounded-xl text-lg font-semibold text-gray-700 shadow-sm hover:shadow-xl transition flex items-center justify-center gap-2"
              onClick={() => navigate("/enquiries/add")}
            >
              <MessageSquare className="w-5 h-5" />
              Make an Enquiry
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="hidden"
              custom={2}
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-2xl transition flex items-center justify-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <LogIn className="w-5 h-5" />
              Register / Pay for Courses
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center border border-white/50"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 drop-shadow-sm">
              Do you want to register/pay for our courses?
            </h2>

            <p className="text-gray-600 mb-8">
              You’ll need an account to continue.
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-xl"
                onClick={() => navigate("/signup")}
              >
                Yes, Continue
              </button>

              <button
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-md hover:shadow-xl"
                onClick={() => navigate("/signin")}
              >
                Already a Member? Log In
              </button>

              <button
                className="w-full py-3 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                No, Go Back
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
