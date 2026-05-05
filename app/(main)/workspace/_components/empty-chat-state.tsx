import { useContext } from "react";
import { AssistantContext } from "@/context/AssistantContext";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

function EmptyChatState() {
  const { assistant, setAssistant } = useContext(AssistantContext);

  return (
    <div className="flex flex-col items-center">
      <SparklesText className="text-4xl text-center">
        How can I assist you?
      </SparklesText>

      <div className="mt-7">
        {assistant?.sampleQuestions.map((suggestion: string, index: number) => (
          <BlurFade key={index} delay={0.25 * index}>
            <div>
              <h2 className="flex items-center justify-between gap-10 p-4 text-lg border mt-1 rounded-xl hover:bg-gray-100 cursor-pointer">
                {suggestion}
                <ChevronRight />
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default EmptyChatState;
