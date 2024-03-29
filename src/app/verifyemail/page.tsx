"use client";
import React from "react";

export default function Page({ searchParams }: any) {
  const [state, setState] = React.useState({
    loading: false,
    error: false,
    message: "Verify your account",
  });
  const token = searchParams.token;

  if (!token) {
    return <div className="p-4 bg-red-500 text-white">No token found</div>;
  }

  const handleClick = async () => {
    setState({ loading: true, error: false, message: "" });
    const response = await fetch("/api/users/verifyemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const result = await response.json();
      setState({ loading: false, error: false, message: result?.message });
    } else {
      const result = await response.json();
      setState({ loading: false, error: true, message: result?.message });
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center text-white h-screen">
      <button
        className="p-2 bg-blue-700 rounded-md text-white"
        onClick={handleClick}
      >
        {state.loading ? "Verifying..." : state.message}
      </button>
    </div>
  );
}
