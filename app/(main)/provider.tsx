"use client";

import { useRouter } from "next/navigation";
import Header from "./_components/header";
import { getAuthUserData } from "@/services/GlobalAPI";
import { useContext, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";

function Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const convex = useConvex();
  const { user, setUser } = useContext(AuthContext);
  const [assistant, setAssistant] = useState(null);

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
      <AssistantContext.Provider value={{ assistant, setAssistant }}>
        <Header />
        {children}
      </AssistantContext.Provider>
    </div>
  );
}

export default Provider;
