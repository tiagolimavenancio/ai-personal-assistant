"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConvex } from "convex/react";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { AssistantType } from "@/types/assistant-type";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const [assistantList, setAssistantList] = useState<AssistantType[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);

  const getAssistants = async () => {
    const result = await convex.query(api.assistants.getAllAssistants, {
      uid: user?.uid,
    });
    setAssistantList(result);
  };

  useEffect(() => {
    if (user) {
      getAssistants();
    }
  }, []);

  return (
    <div className="relative p-5 bg-secondary border-r-[1px] h-screen">
      <h2 className="font-bold text-lg">Your Personal AI Asssitant</h2>
      <Button className="w-full mt-3">+ Add New Assistant</Button>
      <Input className="bg-white mt-3" placeholder="Search" />

      <div className="mt-5">
        {assistantList.map((_assistant, index) => (
          <div
            key={index}
            className={`flex mt-2 p-2 gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer ${_assistant.id === assistant.id ? "bg-gray-200 dark:bg-slate-700" : ""}`}
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
        ))}
      </div>

      <div className="absolute bottom-10 flex gap-3 items-center hover:bg-gray-200 w-[87%] p-2 rounded-xl cursor-pointer">
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
    </div>
  );
}

export default AssistantList;
