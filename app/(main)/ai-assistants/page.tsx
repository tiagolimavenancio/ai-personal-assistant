"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import AiAssistantsList from "@/services/AiAssistantsList";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";
import { get } from "node:https";
import { useRouter } from "next/navigation";

export type AssistantType = {
  id: number;
  title: string;
  name: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AiAssistants() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType[]>(
    [],
  );
  const insertAssistant = useMutation(api.assistants.insertSelectedAssistants);
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const router = useRouter();

  const getAssistants = async () => {
    const result = await convex.query(api.assistants.getAllAssistants, {
      uid: user?.uid,
    });

    if (result.length > 0) {
      router.replace("/workspace");
      return;
    }
  };

  const handleSelectAssistant = (assistant: AssistantType) => {
    const item = selectedAssistant.find(
      (item: AssistantType) => item.id === assistant.id,
    );

    if (item) {
      const filteredAssistant = selectedAssistant.filter(
        (item: AssistantType) => item.id !== assistant.id,
      );
      setSelectedAssistant(filteredAssistant);
      return;
    }

    setSelectedAssistant((prev) => [...prev, assistant]);
  };

  const isAssistantSelected = (assistant: AssistantType) => {
    const item = selectedAssistant.find(
      (item: AssistantType) => item.id === assistant.id,
    );
    return !!item;
  };

  const handleClickContinue = async () => {
    setIsLoading(true);
    const result = await insertAssistant({
      records: selectedAssistant,
      uid: user?._id,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getAssistants();
    }
  }, []);

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold">
              Welcome to the World of AI Assistants 🤖
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <p className="text-xl mt-2">
              Choose your AI Campanion to Simplify Your Task 🚀
            </p>
          </BlurFade>
        </div>
        <RainbowButton
          disabled={selectedAssistant.length === 0 || isLoading}
          onClick={handleClickContinue}
        >
          {isLoading && <Loader2Icon className="animate-spin" />}
          Continue
        </RainbowButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={assistant.id}
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative"
              onClick={() => handleSelectAssistant(assistant)}
            >
              <Checkbox
                className="absolute m-2 w-4 h-4"
                checked={isAssistantSelected(assistant)}
              />
              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">
                {assistant.name}
              </h2>
              <h2 className="text-center text-gray-600 dark:text-gray-300">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AiAssistants;
