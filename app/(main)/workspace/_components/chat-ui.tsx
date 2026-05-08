"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EmptyChatState from "./empty-chat-state";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Send } from "lucide-react";
import AiModelOptions from "@/services/AiModelOptions";
import { AssistantContext } from "@/context/AssistantContext";
import { MessageType } from "@/types/message-type";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useAuth } from "@/context/AuthContext";
import { AssistantType } from "@/types/assistant-type";

function ChatUI() {
  const [input, setInput] = useState<string>("");
  const { assistant } = useContext(AssistantContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messageRef = useRef<HTMLDivElement>(null);

  const updateTokens = useMutation(api.users.updateTokens);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (assistant?.id) {
      setMessages([]);
    }
  }, [assistant?.id]);

  const onSendMessage = async () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "Loading..." },
    ]);

    const aiModel = AiModelOptions.find(
      (item) => item?.name === assistant?.aiModelId,
    );

    if (!aiModel?.edenAi) {
      toast.error("No AI Model selected");
      return;
    }

    setInput("");
    setLoading(true);

    const result = await axios.post("/api/eden-ai-model", {
      provider: aiModel?.edenAi,
      userInput:
        input + ":" + assistant?.instruction + ":" + assistant?.userInstruction,
      aiResp: messages[messages?.length - 1]?.content,
    });

    setMessages((prev) => prev.slice(0, -1));
    setMessages((prev) => [...prev, result.data]);
    setLoading(false);

    handleUpdateUserToken(result.data?.content);
  };

  const handleUpdateUserToken = async (resp: string) => {
    const tokenCount = resp.match(/\S+/g)?.length || 0;

    console.log({ tokenCount });

    const result = await updateTokens({
      credits: user?.credits - tokenCount,
      uid: user?._id,
    });

    setUser((prev: AssistantType) => ({
      ...prev,
      credits: user?.credits - tokenCount,
    }));

    console.log({ result });
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 relative">
      {messages.length === 0 && <EmptyChatState />}

      <div ref={messageRef} className="flex-1 overflow-y-auto scrollbar-thin py-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex animate-slide-up ${message.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              {message?.role === "assistant" && (
                <div className="flex-shrink-0">
                  <Image
                    className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover ring-2 ring-primary/20"
                    src={assistant?.image}
                    alt="assistant"
                    width={40}
                    height={40}
                  />
                </div>
              )}

              <div
                className={`relative px-4 py-3 rounded-2xl ${
                  message.role === "user" 
                    ? "chat-bubble-user rounded-br-md shadow-lg shadow-primary/20" 
                    : "chat-bubble-assistant rounded-bl-md shadow-lg shadow-secondary/20"
                }`}
              >
                {loading && messages?.length - 1 == index && (
                  <Loader2Icon className="animate-spin w-4 h-4 mb-1" />
                )}
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${message.role === "user" ? "text-white" : "text-foreground"}`}>
                  {message.content}
                </p>
                {message.role === "assistant" && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full opacity-50" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <Input
            value={input}
            disabled={loading || user?.credits <= 0}
            placeholder="Type your message..."
            className="flex-1 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 py-6 rounded-xl"
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
          />
          <Button
            disabled={loading || user?.credits <= 0 || !input.trim()}
            onClick={onSendMessage}
            className="px-6 py-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-mono">Enter</kbd> to send
          {user?.credits !== undefined && (
            <span className="ml-2 text-primary/70">
              • {user.credits} credits remaining
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ChatUI;
