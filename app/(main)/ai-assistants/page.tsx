"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import AiAssistantsList from "@/services/AiAssistantsList";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AssistantType } from "@/types/assistant-type";

function AiAssistants() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType[]>(
    [],
  );
  const insertAssistant = useMutation(api.assistants.insertSelectedAssistants);
  const { user } = useAuth();
  const convex = useConvex();
  const router = useRouter();

  const getAssistants = async () => {
    const result = await convex.query(api.assistants.getAllAssistants, {
      uid: user?._id,
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
    <div className="min-h-screen px-6 py-20 md:px-12 lg:px-20 xl:px-28 bg-grid-pattern/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
          <div className="space-y-3">
            <BlurFade delay={0.25} inView>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Welcome to the World of AI Assistants
              </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <p className="text-lg md:text-xl text-muted-foreground">
                Choose your AI companion to simplify your tasks
              </p>
            </BlurFade>
            {selectedAssistant.length > 0 && (
              <BlurFade delay={0.25 * 3} inView>
                <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-block">
                  {selectedAssistant.length} assistant
                  {selectedAssistant.length > 1 ? "s" : ""} selected
                </p>
              </BlurFade>
            )}
          </div>
          <div className="flex-shrink-0">
            <RainbowButton
              disabled={selectedAssistant.length === 0 || isLoading}
              onClick={handleClickContinue}
              className="px-8 py-3 text-base"
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                <span className="mr-2">→</span>
              )}
              Continue
            </RainbowButton>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {AiAssistantsList.map((assistant, index) => (
            <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
              <div
                key={assistant.id}
                className={`group relative p-3 md:p-4 rounded-2xl cursor-pointer transition-all duration-300 card-hover border-2 ${
                  isAssistantSelected(assistant)
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20 scale-[1.02]"
                    : "border-transparent hover:border-primary/30 hover:bg-secondary/50"
                }`}
                onClick={() => handleSelectAssistant(assistant)}
              >
                <div
                  className={`absolute top-3 left-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all duration-200 ${
                    isAssistantSelected(assistant)
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30 group-hover:border-primary/50"
                  }`}
                >
                  {isAssistantSelected(assistant) && (
                    <svg
                      className="w-full h-full text-primary-foreground p-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <div className="relative mt-4 md:mt-6 mb-3">
                  <Image
                    src={assistant.image}
                    alt={assistant.title}
                    width={600}
                    height={600}
                    className={`rounded-xl w-full aspect-square object-cover transition-transform duration-300 ${
                      isAssistantSelected(assistant)
                        ? "ring-2 ring-primary"
                        : "group-hover:ring-1 group-hover:ring-primary/50"
                    }`}
                  />
                  {isAssistantSelected(assistant) && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl animate-pulse-soft" />
                  )}
                </div>

                <div className="text-center space-y-1">
                  <h3
                    className={`font-bold text-sm md:text-base truncate ${
                      isAssistantSelected(assistant) ? "text-primary" : ""
                    }`}
                  >
                    {assistant.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate px-2">
                    {assistant.title}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AiAssistants;
