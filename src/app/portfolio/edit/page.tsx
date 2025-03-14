import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import EditPortfolioForm from "./EditPortfolioForm";

export default async function EditPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Portfolio</h1>
      <EditPortfolioForm />
    </div>
  );
}
