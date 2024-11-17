"use client";
import Link from "next/link";
import Notify, { showToast } from "@/components/notify";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Spinner from "@/components/Spinner";
import PasswordCheckList from "react-password-checklist"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordValid, setIspasswordValid] = useState(false);
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handlePasswordFocus = () => {
    setShowPasswordChecklist(true);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid){
      showToast("Passwords do not meet the required criteria", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword){
      showToast("Passwords do not match", "error");
      return;
    }
    
    setIsLoading(true)
    try {
      const response = await axios.post("/api/users", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 201) {
        showToast(response.data.message, "success");
      } else {
        showToast(response.data.message || "Error occurred", "error");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response?.data?.message || "Network error occurred";
        showToast(errorMessage, "error")
      }
      
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Notify />
      <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
        <div
          className="w-full h-screen flex justify-center items-center bg-black bg-opacity-45"
        >
          <aside className="">
            <h1
              className="text-center text-black font-light text-4xl bg-yellow rounded-tl-[40px] m-0 py-4"
            >
              Sign Up
            </h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md rounded-br-[40px] bg-opacity-20 shadow-lg shadow-black p-6"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="py-2 px-3 w-full text-lg text-black font-light rounded-md hover:shadow-sm hover:outline-blue-200 transition"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="py-2 px-3 w-full text-lg text-black font-light outline-none mt-3 rounded-md hover:shadow-sm hover:outline-blue-200 transition"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-3 w-full text-lg text-black font-light outline-none mt-3 rounded-md hover:shadow-sm hover:outline-blue-200 transition"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handlePasswordFocus}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="py-2 px-3 w-full text-lg text-black font-light outline-none mt-3 rounded-md hover:shadow-sm hover:outline-blue-200 transition"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handlePasswordFocus}
              />
              {showPasswordChecklist && (
                  <PasswordCheckList
                  rules={["minLength", "specialChar", "number", "capital", "match"]} 
                  minLength={8}
                  value={formData.password}
                  valueAgain={formData.confirmPassword}
                  onChange={(isValid) => setIspasswordValid(isValid)}
                  messages={{
                    minLength: "Password has at least 8 characters",
                    specialChar: "Password has at least one special character",
                    number: "Password has at least one number",
                    capital: "Password has at least one capital letter",
                    match: "Passwords match",
                  }}
                  className="text-white"
                />
              )}
              
              <div className="flex items-center justify-between mt-5">
                <Link
                  href="/"
                  className="text-white cursor-pointer transition hover:text-black"
                >
                  Already Registered?
                </Link>
                <button
                  type="submit"
                  className="bg-black text-yellow font-medium py-2 px-8 transition hover:text-white hover:opacity-90 rounded-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner />
                  ): (
                    "Sign Up"
                  )}
                  
                </button>
              </div>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
};

export default SignUp;
