"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }
    router.push("/");
  }, [router]);

  return <div className="flex items-center justify-center h-screen">Logging out...</div>;
}
