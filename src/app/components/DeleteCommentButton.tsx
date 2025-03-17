"use client";

import { useState } from "react";

export default function DeleteCommentButton({ commentId }: { commentId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Failed to delete comment.");
    }
  };

  return (
    <div>
      {isConfirming ? (
        <div className="flex space-x-2">
          <button onClick={handleDelete} className="text-red-600 text-sm">
            Confirm Delete
          </button>
          <button onClick={() => setIsConfirming(false)} className="text-gray-600 text-sm">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={() => setIsConfirming(true)} className="text-red-600 text-sm">
          Delete
        </button>
      )}
    </div>
  );
}
