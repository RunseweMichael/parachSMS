import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingBackground from "../../component/FloatingBackground";

export default function LandingChoicePage() {
  const navigate = useNavigate();

  return (
    <div className="z-0 relative min-h-screen w-full">
         
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-6">
        <FloatingBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-10 max-w-md w-full text-center"
      >

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Parach Computers</h1>
        <p className="text-gray-600 mb-10">How can we help you today?</p>

        <div className="flex flex-col gap-4">
          {/* ENQUIRY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-white border border-gray-300 rounded-xl text-lg font-semibold text-gray-700 shadow-sm hover:shadow-md transition"
            onClick={() => navigate("/enquiry")}
          >
            Make an Enquiry
          </motion.button>

          {/* JOIN US BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-xl text-lg font-bold shadow-md hover:shadow-xl transition"
            onClick={() => navigate("/signin")} // Direct to sign in
          >
            Join Us
          </motion.button>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
