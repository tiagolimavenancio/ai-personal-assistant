import { createContext, useContext } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, setUser: () => {} };
  }
  return context;
}