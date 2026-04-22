"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalAPI";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useContext } from "react";

function SignIn() {
  const createUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== undefined) {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }

      const userInfo = await GetAuthUserData(tokenResponse.access_token);
      const result = await createUser({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      });
      console.log({ result });
      setUser(result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md">
        <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
        <h2 className="text-2xl">Sign In To AI Personal Assistant & Agent</h2>

        <Button onClick={() => googleLogin()}>Sign in with Gmail</Button>
      </div>
    </div>
  );
}

export default SignIn;
