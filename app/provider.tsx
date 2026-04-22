"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from "@/context/AuthContext";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [user, setUser] = React.useState();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ConvexProvider client={convex}>
        <AuthContext.Provider value={{ user, setUser }}>
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </AuthContext.Provider>
      </ConvexProvider>
    </GoogleOAuthProvider>
  );
}
