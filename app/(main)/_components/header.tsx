"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <div className="w-full p-3 fixed shadow-sm flex justify-between items-center px-14">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <div>
          <h2 className="font-bold text-xl">AI Assistants</h2>
          <p className="text-xs text-muted-foreground">
            Your personal AI companions
          </p>
        </div>
      </div>
      {user?.picture && (
        <Image
          src={user?.picture}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default Header;
