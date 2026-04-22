"use client";

import { Button } from "@/components/ui/button";
import { GetAuthUserData } from "@/services/GlobalAPI";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";

function SignIn() {
	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			if (typeof window !== undefined) {
				localStorage.setItem("user_token", tokenResponse.access_token);
			}

			const userInfo = await GetAuthUserData(tokenResponse.access_token);
			console.log(userInfo);
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
