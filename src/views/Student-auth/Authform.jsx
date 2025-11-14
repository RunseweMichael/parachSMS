import React, { useState } from "react";
import { Facebook, Mail, Linkedin, MailCheck, Lock, UserLock, UserPen, MailPlus, Phone, Scroll, MapPinHouse,  } from "lucide-react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 font-sans">
      <div
        className={`relative bg-white rounded-lg shadow-2xl overflow-hidden w-[50%] max-w-full min-h-[750px] transition-all duration-700 ease-in-out ${
          isSignUp ? "right-panel-active" : ""
        }`}
      >
        {/* --- Sign Up --- */}
        <div
          className={`absolute top-0 h-full w-1/2 flex items-center justify-center flex-col p-10 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <h1 className="text-2xl font-bold mb-3">Create Account</h1>
        
<UserPen
          size={20}
          className="absolute ml-[15px] left-9.5 top-[24%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-[#cdd1d7]
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Full Name"
          type="text"
        />        
           
     <MailPlus
          size={20}
          className="absolute ml-[15px] left-9.5 top-[34%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-[#cdd1d7]
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Email"
          type="email"
        />  
        <Lock
          size={20}
          className="absolute ml-[15px] left-9.5 top-[43.5%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Enter your password"
          type="text"
        />  
     {/** Gender */}
        <Phone
          size={20}
          className="absolute ml-[15px] left-9.5 top-[53%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Phone Number"
          type="text"
        />  
        <Scroll
          size={20}
          className="absolute ml-[15px] left-9.5 top-[63%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Enter your prefered course"
          type="text"
        />  
 {/** date */}
<MapPinHouse
          size={20}
          className="absolute ml-[15px] left-9.5 top-[73%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Enter your current address"
          type="text"
        />
        <button className="bg-[linear-gradient(138deg,rgba(54,92,235,1)_0%,rgba(141,54,234,1)_50%)] text-white w-full font-bold mt-3.5 cursor-pointer px-8 py-4 rounded-2xl uppercase text-sm hover:bg-blue-600 transition">
            Sign Up
          </button>
        </div>

        {/* --- Sign In --- */}
        <div
          className={`absolute top-0 h-full w-1/2 flex items-center justify-center flex-col p-10 transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-full opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <h1 className="text-2xl font-bold mb-3">Sign in</h1>
      <MailCheck
          size={20}
          className="absolute ml-[15px] left-9.5 top-[31.7%] transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 my-2.5 w-full py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Enter your Email"
          type="text"
        />
<Lock
          size={20}
          className="absolute ml-[15px] left-9.5 top-[41%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full my-2.5 py-3.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="Enter your password"
          type="text"
        />  
<UserLock
          size={20}
          className="absolute ml-[15px] left-9.5 top-[51%]  transform -translate-y-1/2 text-[#b5bac3] transition-colors duration-300"
        />
        <input
          className="rounded-[10px] tracking-widest pl-10 w-full py-3.5 my-2.5 bg-white border border-[#cdd1d7] placeholder:text-[#cdd1d7] text-[15px] text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-300 ease-in-out"
          placeholder="OTP Password"
          type="text"
        /> 
        <div className=" flex w-full justify-between my-3.5 items-center">
     <div className="re">      <input type="checkbox" name="Remember" id="" /> <span className="text-[#4b5563 text-[17px]">Remember me</span></div>
              <a href="#" className=" text-[#2563ee] hover:text-blue-500">Forgot your password?</a>
        </div>
      
          <button className="bg-[linear-gradient(138deg,rgba(54,92,235,1)_0%,rgba(141,54,234,1)_50%)] text-white w-full font-bold px-8 py-4 cursor-pointer rounded-2xl uppercase text-sm hover:bg-blue-600 transition">
            Sign In
          </button>
             <button className="bg-[linear-gradient(138deg,rgba(54,92,235,1)_0%,rgba(141,54,234,1)_50%)] text-white w-full font-bold mt-3.5 cursor-pointer px-8 py-4 rounded-2xl uppercase text-sm hover:bg-blue-600 transition">
            Send OTP
          </button>
        </div>

        {/* --- Overlay Panel --- */}
        <div
          className={`absolute top-0 left-[50%] w-1/2 h-full text-center overflow-hidden transition-transform duration-700 ease-in-out ${
            isSignUp ? "-translate-x-full" : ""
          }`}
        >
          <div
            className={`bg-[linear-gradient(138deg,rgba(54,92,235,1)_0%,rgba(141,54,234,1)_50%)] text-white absolute -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Overlay Left */}
            <div className=" h-full w-[80%] flex flex-col items-center justify-center text-center px-10 transform transition-all duration-700 ease-in-out translate-x-[-20%]">
              <h1 className="text-center text-3xl font-bold mb-3">Welcome Back!</h1>
              
              <button
                onClick={() => setIsSignUp(false)}
                className="border border-white text-white px-8 py-2 rounded-full uppercase text-sm hover:bg-white hover:text-blue-500 transition"
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right */}
            <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center text-center px-10 transform transition-all duration-700 ease-in-out">
              <h1 className="text-3xl font-bold mb-3">Hello</h1>
              <p className="text-sm mb-5">Enter your personal details and start your journey with us</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="border border-white text-white px-8 py-2 rounded-full uppercase text-sm hover:bg-white hover:text-blue-500 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AuthForm;
