import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) { 
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Redirect unauthenticated users to login page
    },
  }
);

// Define protected routes
export const config = {
  matcher: ["/admin", "/blogs/create", "/portfolio/edit", "/blogs/:id/edit"],
};
