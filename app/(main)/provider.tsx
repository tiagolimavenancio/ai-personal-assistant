"use client";

import { useRouter } from "next/navigation";
import Header from "./_components/header";
import { getAuthUserData } from "@/services/GlobalAPI";
import { useContext, useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";

function Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const convex = useConvex();
  const { user, setUser } = useContext(AuthContext);

  const checkUseAuth = async () => {
    const token = localStorage.getItem("user_token");
    const user = token && (await getAuthUserData(token));

    if (!user.email) {
      router.replace("/sign-in");
      return;
    }

    try {
      const result = await convex.query(api.users.getUser, {
        email: user?.email,
      });
      setUser(result);
    } catch (error) {}
  };

  useEffect(() => {
    checkUseAuth();
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
