"use client";
import Link from "next/link";
import Notify, { showToast } from "@/components/notify";
import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        showToast("Login Successful", "success");
      } else {
        showToast(response.data.message || "Login failed", "error");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Network error occurred";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <Notify />
      <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
        <div className="w-full h-screen flex 
          justify-center items-center bg-black bg-opacity-45">
          <aside className="">
            <h1 className="text-center text-black font-light text-4xl 
              bg-yellow rounded-tl-[40px] m-0 py-4">Sign In</h1>
            <form action="" 
              className="bg-white w-full max-w-md rounded-br-[40px]
              bg-opacity-20 shadow-lg shadow-black p-6"
              onSubmit={handleSubmit}
            >
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail" 
                className="py-2 px-3 w-full text-lg text-black 
                font-light rounded-sm transition hover:outline-blue-200"
              />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange} 
                placeholder="Password" 
                className="py-2 px-3 w-full text-lg text-black 
                font-light outline-none mt-3 rounded-sm transition hover:outline-blue-200"
              />
              <div 
                className="flex items-center justify-between mt-5">
                <Link href="/sign-up" className="text-white cursor-pointer transition hover:text-black">Not Yet Registered?</Link>
                <button 
                  type="submit" 
                  className="bg-black text-yellow font-medium py-2 px-8 transition hover:text-white hover:opacity-90 rounded-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In...": "Sign In"}
                </button>
              </div>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
};

export default LoginForm;