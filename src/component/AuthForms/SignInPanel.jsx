import React from 'react';
import { MailCheck, Lock, UserLock } from 'lucide-react';

// Reusable Input with Icon (same as SignUpPanel)
const InputWithIcon = ({ icon, placeholder, type = 'text', className = '' }) => {
  return (
    <div className="relative w-full group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-300 
                   placeholder:text-gray-400 text-gray-900 text-sm tracking-wide
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-300 ease-out ${className}`}
      />
    </div>
  );
};

// Main Sign-In Panel
const SignInPanel = ({ isSignUp }) => {
  return (
    <div
      className={` inset-y-0  w-full flex flex-col items-center justify-center p-10 
                  transition-all duration-700 ease-in-out transform
                  ${isSignUp 
                    ? 'translate-x-0 opacity-0 z-0' 
                    : 'translate-x-0 opacity-100 z-10'}`}
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h1>

      <div className="w-full space-y-3.5 max-w-sm">
        <InputWithIcon
          icon={<MailCheck size={20} />}
          placeholder="Enter your Email"
          type="email"
        />

        <InputWithIcon
          icon={<Lock size={20} />}
          placeholder="Enter your password"
          type="password"
        />

        <InputWithIcon
          icon={<UserLock size={20} />}
          placeholder="OTP Password"
          type="text"
        />
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="w-full max-w-sm flex justify-between items-center my-4 text-sm">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Forgot your password?
        </a>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-3.5">
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 
                     text-white font-bold py-4 rounded-2xl 
                     uppercase tracking-wider text-sm 
                     transition-all duration-300 transform hover:scale-[1.02] 
                     active:scale-100 shadow-lg"
        >
          Sign In
        </button>

        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 
                     hover:from-indigo-600 hover:to-pink-600 
                     text-white font-bold py-4 rounded-2xl 
                     uppercase tracking-wider text-sm 
                     transition-all duration-300 transform hover:scale-[1.02] 
                     active:scale-100 shadow-lg"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default SignInPanel;