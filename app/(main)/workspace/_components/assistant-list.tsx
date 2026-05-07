"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useConvex } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { AssistantType } from "@/types/assistant-type";
import { AssistantContext } from "@/context/AssistantContext";
import { BlurFade } from "@/components/ui/blur-fade";
import AddNewAssistant from "./add-new-assistant";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import Profile from "./profile";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const { assistant, setAssistant } = useContext(AssistantContext);
  const convex = useConvex();

  const [assistantList, setAssistantList] = useState<AssistantType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const getAssistants = async () => {
    setLoading(true);
    const result = await convex.query(api.assistants.getAllAssistants, {
      uid: user?._id,
    });
    setAssistantList(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getAssistants();
    }
  }, [user && assistant === null]);

  return (
    <div className="relative p-5 bg-secondary border-r-[1px] h-screen">
      <h2 className="font-bold text-lg">Your Personal AI Asssitant</h2>
      <AddNewAssistant>
        <Button className="w-full mt-3">+ Add New Assistant</Button>
      </AddNewAssistant>

      <Input className="bg-white mt-3" placeholder="Search" />

      <div className="mt-5">
        {assistantList.map((_assistant, index) => (
          <BlurFade key={_assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={index}
              className={`flex mt-2 p-2 gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer ${_assistant?.id === assistant?.id ? "bg-gray-200 dark:bg-slate-700" : ""}`}
              onClick={() => setAssistant(_assistant)}
            >
              <Image
                className="rounded-lg w-[60px] h-[60px] object-cover"
                src={_assistant?.image}
                alt={_assistant?.name}
                width={50}
                height={50}
              />
              <div>
                <h2 className="font-bold">{_assistant?.name}</h2>
                <h2 className="text-gray-600 text-sm dark:text-gray-400">
                  {_assistant?.title}
                </h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <div className="absolute flex bottom-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <div className="flex gap-3 items-center hover:bg-gray-200 w-full p-2 rounded-xl cursor-pointer">
                <Image
                  src={user?.picture}
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <div>
                  <h2 className="font-bold">{user?.name}</h2>
                  <h2 className="text-gray-400 text-sm">
                    {user?.orderId ? "Pro Plan" : "Free Plan"}
                  </h2>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                <UserCircle2 /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Profile open={openProfile} onClose={() => setOpenProfile(false)} />
    </div>
  );
}

export default AssistantList;
