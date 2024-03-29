"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      router.push("/login");
    } else {
      const result = await response.json();
      console.log(result);
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center text-white items-center h-screen">
      <button onClick={handleLogout} className="p-2 bg-rose-700 rounded-md">
        Logout
      </button>
    </div>
  );
}
