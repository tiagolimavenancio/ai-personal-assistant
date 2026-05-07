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
      <div className="p-5 bg-secondary border-l-[1px] h-screen">
        <h2 className="font-bold text-xl">Settings</h2>

        <BlurFade delay={0.25}>
          <div className="flex gap-3 mt-4">
            <Image
              className="rounded-xl h-[80px] w-[80px]"
              src={assistant?.image}
              alt="assistant"
              width={100}
              height={100}
            />
            <div>
              <h2 className="font-bold">{assistant?.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {assistant?.title}
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.25 * 2}>
          <div className="mt-4">
            <h2 className="text-gray-500">Model:</h2>
            <Select
              defaultValue={assistant?.aiModelId}
              onValueChange={(value) => handleInputChange("aiModelId", value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {AiModelOptions.map((model, index) => (
                  <SelectItem key={model.id} value={model.name}>
                    <div className="flex gap-2 items-center m-1">
                      <Image
                        className="rounded-md"
                        src={model.logo}
                        alt={model.name}
                        width={20}
                        height={20}
                      />
                      <h2>{model.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </BlurFade>

        <BlurFade delay={0.25 * 3}>
          <div className="mt-4">
            <h2 className="text-gray-500">Instructions:</h2>
            <Textarea
              className="h-[180px] bg-white"
              placeholder="Add Instruction"
              value={assistant?.userInstruction}
              onChange={(e) =>
                handleInputChange("userInstruction", e.target.value)
              }
            />
          </div>
        </BlurFade>

        <div className="absolute bottom-10 right-5 flex gap-5">
          <ConfirmationAlert onDelete={handleDelete}>
            <Button disabled={loading} variant="ghost">
              <Trash /> Delete
            </Button>
          </ConfirmationAlert>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Save />}
            Save
          </Button>
        </div>
      </div>
    )
  );
}

export default AssistantSettings;
