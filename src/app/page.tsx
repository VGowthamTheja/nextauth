import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 flex justify-center items-center text-white h-screen gap-3">
      <Link href="/login" className="p-4 bg-slate-700 rounded-md">
        Login
      </Link>
      <Link href="/signup" className="p-4 bg-slate-700 rounded-md">
        Signup
      </Link>
    </div>
  );
}
