import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// views

import Login from "../views/Student-auth/SignUpPage.jsx";
import Register from "../views/Student-auth/SignUpPage.jsx";

const bgImage = new URL("../assets/img/register_bg_2.png", import.meta.url).href;

export default function Auth() {
  return (
    <>
    
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + bgImage + ")",
            }}
          ></div>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          </Routes>
      
        </section>
      </main>
    </>
  );
}
