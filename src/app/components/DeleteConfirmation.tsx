"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function DeleteConfirmation({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blogs/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog post");
      }

      router.push("/blogs"); // Redirect after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Delete Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export {DeleteConfirmation};