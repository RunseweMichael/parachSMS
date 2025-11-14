import React, { useState, useEffect } from "react";
import SignUpPanel from "../../component/AuthForms/SignUpPanel";
import SignInPanel from "../../component/AuthForms/SignInPanel";

/* -------------------------------------------------------------------------- */
/*                                  THEMES                                    */
/* -------------------------------------------------------------------------- */

const THEMES = {
  linear: {
    left: "from-indigo-500/60 to-purple-600/60",
    right: "from-purple-600/60 to-indigo-500/60",
    orb1: "bg-purple-400/20",
    orb2: "bg-indigo-400/20",
    button: "bg-black text-white",
  },
  vercel: {
    left: "from-neutral-900/70 to-neutral-800/70",
    right: "from-neutral-800/70 to-neutral-900/70",
    orb1: "bg-white/10",
    orb2: "bg-white/10",
    button: "bg-white text-black",
  },
  apple: {
    left: "from-slate-200/40 to-slate-50/40",
    right: "from-slate-50/40 to-slate-200/40",
    orb1: "bg-slate-300/30",
    orb2: "bg-white/40",
    button: "bg-neutral-900 text-white",
  },
  cyber: {
    left: "from-fuchsia-500/50 to-blue-500/50",
    right: "from-blue-500/50 to-fuchsia-500/50",
    orb1: "bg-fuchsia-400/30",
    orb2: "bg-blue-400/30",
    button: "bg-fuchsia-600 text-white",
  },
};

/* -------------------------------------------------------------------------- */
/*                            PARALLAX ORB HOOK                               */
/* -------------------------------------------------------------------------- */

const useParallax = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return pos;
};

/* -------------------------------------------------------------------------- */
/*                         SPLIT PANEL WITH UPGRADES                          */
/* -------------------------------------------------------------------------- */

const SplitPanel = ({ isSignUp, theme, parallax }) => {
  const t = THEMES[theme];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Left split panel */}
      <div
        className={`
          absolute top-0 left-0 h-full w-[60%]
          bg-gradient-to-br ${t.left}
          backdrop-blur-xl shadow-2xl transform origin-bottom-left
          transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.25,1)]
          ${isSignUp ? "-translate-x-full -rotate-6" : "translate-x-0 rotate-0"}
        `}
        style={{
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
        }}
      />

      {/* Right split panel */}
      <div
        className={`
          absolute top-0 right-0 h-full w-[60%]
          bg-gradient-to-tr ${t.right}
          backdrop-blur-xl shadow-2xl transform origin-top-right
          transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.25,1)]
          ${isSignUp ? "translate-x-full rotate-6" : "translate-x-0 rotate-0"}
        `}
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Animated diagonal light sweep */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          skew-x-12 w-1/2 blur-xl opacity-0 pointer-events-none
          animate-[shine_3s_infinite]
        `}
        style={{ animationDelay: "0.3s" }}
      />

      {/* Parallax glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            absolute top-40 left-20 w-72 h-72 rounded-full blur-3xl transition-transform duration-300
            ${t.orb1}
          `}
          style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
        />
        <div
          className={`
            absolute bottom-20 right-24 w-96 h-96 rounded-full blur-3xl transition-transform duration-300
            ${t.orb2}
          `}
          style={{ transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)` }}
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   MAIN                                     */
/* -------------------------------------------------------------------------- */

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const theme = "linear"; // change theme here
  const parallax = useParallax();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      <div
        className="
          relative w-full max-w-[900px] min-h-[700px]
          bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-700
        "
      >
        {/* Split animation overlay */}
        <SplitPanel isSignUp={isSignUp} theme={theme} parallax={parallax} />

        {/* CONTENT SWAP */}
        <div className="relative h-full">
          {/* Sign In */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <SignInPanel isSignUp={isSignUp} />
          </div>

          {/* Sign Up */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <SignUpPanel isSignUp={isSignUp} />
          </div>
        </div>

        {/* Theme-styled switch button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className={`
              px-8 py-3 rounded-full text-sm font-semibold shadow-xl
              hover:shadow-2xl hover:scale-105 transition-all duration-300
              ${THEMES[theme].button}
            `}
          >
            {isSignUp ? "Already have an account? Sign In" : "New here? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
