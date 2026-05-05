"use client";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EmptyChatState from "./empty-chat-state";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Send } from "lucide-react";
import AiModelOptions from "@/services/AiModelOptions";
import { AssistantContext } from "@/context/AssistantContext";
import { MessageType } from "@/types/message-type";
import Image from "next/image";

function ChatUI() {
  const [input, setInput] = useState<string>("");
  const { assistant } = useContext(AssistantContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messageRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <div className="mt-20 p-6 relative h-[88vh]">
      {messages.length === 0 && <EmptyChatState />}

      <div ref={messageRef} className="h-[75vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex gap-3">
              {message?.role === "assistant" && (
                <Image
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={assistant?.image}
                  alt="assistant"
                  width={100}
                  height={100}
                />
              )}

              <div
                className={`flex gap-3 p-3 rounded-lg  text-black ${message.role === "user" ? "bg-blue-300" : "bg-gray-100"}`}
              >
                {loading && messages?.length - 1 == index && (
                  <Loader2Icon className="animate-spin" />
                )}
                <h2>{message.content}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]">
        <Input
          value={input}
          disabled={loading}
          placeholder="Start typing here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <Button onClick={onSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default ChatUI;
