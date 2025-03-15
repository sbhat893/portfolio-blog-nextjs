"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/logout")}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute right-4 top-4"
    >
      Logout
    </button>
  );
}
