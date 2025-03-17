import { getServerSession } from "next-auth";
import DeleteCommentButton from "./DeleteCommentButton";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface CommentSectionProps {
  blogPostId: string;
}

export default async function CommentSection({ blogPostId }: CommentSectionProps) {
  const comments = await prisma.comment.findMany({
    where: { blogPostId },
    orderBy: { createdAt: "asc" },
  });

  const session = await getServerSession(authOptions);

  return (
    <div className="mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {/* Display Comments */}
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="border-b py-2 flex justify-between items-center">
              <div>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">By {comment.email}</p>
              </div>

              {/* Delete Button (Only for Admins) */}
              {session && <DeleteCommentButton commentId={comment.id} />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Comment Form */}
      <form action={`/api/blogs/${blogPostId}/comments`} method="POST" className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="content"
          placeholder="Write a comment..."
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">
          Post Comment
        </button>
      </form>
    </div>
  );
}
