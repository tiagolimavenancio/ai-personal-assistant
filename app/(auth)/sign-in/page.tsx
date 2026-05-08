"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { getAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import { Sparkles, Loader2 } from "lucide-react";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const createUser = useMutation(api.users.createUser);
  const router = useRouter();
  const { setUser } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("user_token", tokenResponse.access_token);
        }

        const userInfo = await getAuthUserData(tokenResponse.access_token);
        const result = await createUser({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });

        setUser(result);
        router.replace("/ai-assistants");
      } catch (error) {
        console.error("Login failed:", error);
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
      setIsLoading(false);
    },
  });

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-3xl font-bold">AssistAI</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Your intelligent<br />personal assistant
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-md">
            Create personalized AI assistants that understand you, learn from you, and help you be more productive every day.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-violet-600 bg-gray-200" />
              ))}
            </div>
            <div>
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-white/70">Active users</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AssistAI</span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-500">Sign in to continue to your assistant</p>
            </div>

            <Button
              onClick={() => googleLogin()}
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Image 
                    src="/google.png" 
                    alt="Google" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5"
                  />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                />
              </div>
              <Button className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl">
                Sign in with Email
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-violet-600 font-semibold hover:text-violet-700">
                Sign up free
              </a>
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-gray-500 hover:underline">Terms</a>{" "}
            and{" "}
            <a href="#" className="text-gray-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;