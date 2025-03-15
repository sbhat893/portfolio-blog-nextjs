import AuthProvider from "@/context/AuthProvider";
import { ReactNode } from "react";

export default function Layout({ children, Session }: { children: ReactNode, Session: any }) {
    return (
      <>
        <AuthProvider session={Session}>
        <main>{children}</main>
        </AuthProvider>

      </>
    )
  }