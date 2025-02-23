"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userSession = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userSession === "true");

    if (userSession !== "true") {
      router.push("/");
    }
  }, [router]);

  if (isLoggedIn === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
