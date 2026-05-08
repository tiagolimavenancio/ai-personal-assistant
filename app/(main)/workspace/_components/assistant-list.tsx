"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useConvex } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
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
  const { user } = useAuth();
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
    <div className="relative p-4 h-full bg-gradient-to-b from-secondary/50 to-secondary border-r border-border/50 flex flex-col">
      <AddNewAssistant>
        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/20">
          <span className="mr-1">+</span> Add New Assistant
        </Button>
      </AddNewAssistant>

      <div className="relative mt-4">
        <Input
          className="bg-background/80 backdrop-blur-sm border-border/50 pl-10 focus:border-primary/50 focus:ring-primary/20 input-glow"
          placeholder="Search assistants..."
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto scrollbar-thin space-y-2 -mr-2 pr-2">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : assistantList.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No assistants yet</p>
            <p className="text-xs mt-1">Create your first AI assistant</p>
          </div>
        ) : (
          assistantList.map((_assistant, index) => (
            <BlurFade
              key={_assistant?.image}
              delay={0.25 + index * 0.05}
              inView
            >
              <div
                key={index}
                className={`group flex p-3 gap-3 items-center hover:bg-accent/50 rounded-xl cursor-pointer transition-all duration-200 card-hover ${_assistant?.id === assistant?.id ? "bg-accent border border-primary/20 shadow-md" : "border border-transparent hover:border-border"}`}
                onClick={() => setAssistant(_assistant)}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    className="rounded-xl w-[56px] h-[56px] object-cover ring-2 ring-offset-2 ring-offset-background"
                    src={_assistant?.image}
                    alt={_assistant?.name}
                    width={50}
                    height={50}
                  />
                  {_assistant?.id === assistant?.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-soft" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm truncate">
                    {_assistant?.name}
                  </h2>
                  <h2 className="text-muted-foreground text-xs truncate">
                    {_assistant?.title}
                  </h2>
                </div>
              </div>
            </BlurFade>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-border/50 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 hover:bg-accent/50 rounded-xl transition-colors"
            >
              <div className="flex gap-3 items-center w-full p-2 rounded-xl cursor-pointer">
                <div className="relative">
                  <Image
                    src={user?.picture || "/default-avatar.png"}
                    alt="user"
                    width={35}
                    height={35}
                    className="rounded-full ring-2 ring-primary/20"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${user?.orderId ? "bg-green-500" : "bg-amber-500"}`}
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h2 className="font-semibold text-sm truncate">
                    {user?.name}
                  </h2>
                  <h2 className="text-xs text-muted-foreground">
                    {user?.orderId ? "Pro Plan" : "Free Plan"}
                  </h2>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px]" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenProfile(true)}
                className="cursor-pointer"
              >
                <UserCircle2 className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
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
