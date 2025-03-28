"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPortfolioForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (profilePicture) formData.append("profilePicture", profilePicture);
    if (cvFile) formData.append("cvFile", cvFile);

    try {
      const response = await fetch("/api/portfolio/edit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update portfolio");
      }

      router.push("/"); // Redirect to portfolio page after successful submission
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block font-medium">CV (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Portfolio"}
      </button>
    </form>
  );
}
