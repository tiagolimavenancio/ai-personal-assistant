import { useContext } from "react";
import { AssistantContext } from "@/context/AssistantContext";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

function EmptyChatState() {
  const { assistant } = useContext(AssistantContext);

  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/10">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <SparklesText className="text-3xl md:text-4xl text-center">
          How can I assist you today?
        </SparklesText>
        <p className="text-muted-foreground text-sm max-w-md">
          Start a conversation with your AI assistant
        </p>
      </div>

      {assistant?.sampleQuestions && assistant.sampleQuestions.length > 0 && (
        <div className="w-full max-w-xl space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">
            Try asking
          </p>
          <div className="grid gap-3">
            {assistant.sampleQuestions.map((suggestion: string, index: number) => (
              <BlurFade key={index} delay={0.25 * index}>
                <button
                  className="group flex items-center justify-between gap-4 p-4 text-sm md:text-base bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 rounded-xl transition-all duration-200 w-full text-left"
                >
                  <span className="truncate">{suggestion}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </button>
              </BlurFade>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmptyChatState;
