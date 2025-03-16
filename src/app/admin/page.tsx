"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg bg-white p-6 shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex flex-col gap-4">
          <Link href="/portfolio/edit">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit Portfolio
            </button>
          </Link>
          <Link href="/blogs/create">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Create Blog Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
