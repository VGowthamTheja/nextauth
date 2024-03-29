"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const [state, setState] = React.useState({
    loading: false,
    error: false,
    message: "Login",
  });
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    setState({ loading: true, error: false, message: "Logging in..." });
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      setState({ loading: false, error: false, message: result?.message });
      router.push("/profile");
    } else {
      const result = await response.json();
      setState({ loading: false, error: true, message: result?.message });
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {state.message}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
