import AuthProvider from "@/context/AuthProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  var Session = undefined;
    return (
      <>
        <AuthProvider session={Session}>
        <main>{children}</main>
        </AuthProvider>

      </>
    )
  }