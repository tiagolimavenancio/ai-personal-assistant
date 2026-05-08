"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationAlert from "./confirmation-alert";
import { BlurFade } from "@/components/ui/blur-fade";

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const updateAssistant = useMutation(api.assistants.updateAssistant);
  const deleteAssistant = useMutation(api.assistants.deleteAssistant);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);

    await updateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction,
    });

    toast.success("Assistant updated successfully");
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteAssistant({
      id: assistant?._id,
    });
    setAssistant(null);
    setLoading(false);
  };

  return (
    assistant && (
      <div className="p-4 h-full bg-gradient-to-b from-secondary/30 to-secondary/50 border-l border-border/50 flex flex-col">
        <div className="space-y-1 mb-6">
          <h2 className="font-bold text-xl">Settings</h2>
          <p className="text-xs text-muted-foreground">Configure your assistant</p>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-6">
          <BlurFade delay={0.25}>
            <div className="flex gap-4 p-4 bg-background/60 rounded-2xl border border-border/50 shadow-sm">
              <Image
                className="rounded-xl h-[72px] w-[72px] object-cover ring-2 ring-primary/20"
                src={assistant?.image}
                alt="assistant"
                width={80}
                height={80}
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg truncate">{assistant?.name}</h2>
                <p className="text-muted-foreground text-sm truncate">
                  {assistant?.title}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.25 * 2}>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                AI Model
              </label>
              <Select
                defaultValue={assistant?.aiModelId}
                onValueChange={(value) => handleInputChange("aiModelId", value)}
              >
                <SelectTrigger className="w-full bg-background/80 border-border/50 rounded-xl focus:ring-primary/20">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {AiModelOptions.map((model, index) => (
                    <SelectItem key={model.id} value={model.name} className="cursor-pointer">
                      <div className="flex gap-3 items-center">
                        <Image
                          className="rounded-md"
                          src={model.logo}
                          alt={model.name}
                          width={20}
                          height={20}
                        />
                        <span>{model.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </BlurFade>

          <BlurFade delay={0.25 * 3}>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Custom Instructions
              </label>
              <Textarea
                className="min-h-[160px] bg-background/80 border-border/50 rounded-xl focus:ring-primary/20 resize-none"
                placeholder="Add custom instructions for your assistant..."
                value={assistant?.userInstruction}
                onChange={(e) =>
                  handleInputChange("userInstruction", e.target.value)
                }
              />
              <p className="text-xs text-muted-foreground">
                {assistant?.userInstruction?.length || 0} characters
              </p>
            </div>
          </BlurFade>
        </div>

        <div className="pt-4 border-t border-border/50 mt-4 flex gap-3">
          <ConfirmationAlert onDelete={handleDelete}>
            <Button 
              disabled={loading} 
              variant="outline" 
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive rounded-xl"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </ConfirmationAlert>
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-xl shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2Icon className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </div>
      </div>
    )
  );
}

export default AssistantSettings;
