"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AiAssistantsList from "@/services/AiAssistantsList";
import { Input } from "@/components/ui/input";
import { AssistantType } from "@/types/assistant-type";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import AssistantAvatar from "./assistant-avatar";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";
import { Loader2Icon } from "lucide-react";

const DEFAULT_ASSISTANT = {
  id: 0,
  image: "/bug-fixer.avif",
  name: "",
  title: "",
  instruction: "",
  userInstruction: "",
  sampleQuestions: [],
  aiModelId: "",
};

function AddNewAssistant({ children }: any) {
  const { user } = useAuth();
  const { assistant, setAssistant } = useContext(AssistantContext);

  const [selectedAssistant, setSelectedAssistant] =
    useState<AssistantType>(DEFAULT_ASSISTANT);

  const [isLoading, setIsLoading] = useState(false);

  const addAssistant = useMutation(api.assistants.insertSelectedAssistants);

  const handleInputChange = (value: any, field: string) => {
    setSelectedAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = async () => {
    if (
      !selectedAssistant.name ||
      !selectedAssistant.title ||
      !selectedAssistant.userInstruction
    ) {
      toast.warning("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const result = await addAssistant({
      records: [selectedAssistant],
      uid: user?._id,
    });

    toast.success("Assistant added successfully");

    setAssistant(null);
    setIsLoading(false);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent className="max-w-6xl w-[95vw] p-0 sm:p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold">
              Add New Assistant
            </DialogTitle>
            <DialogDescription className="text-sm">
              Create a new assistant or select a template
            </DialogDescription>
          </DialogHeader>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 pr-0 md:pr-4 border-r-0 md:border-r border-border">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-10"
                    onClick={() => setSelectedAssistant(DEFAULT_ASSISTANT)}
                  >
                    <span className="mr-2 text-base">+</span>
                  </Button>

                  <div className="pt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Templates
                    </p>
                    <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                      {AiAssistantsList.map((assistant, index) => (
                        <div
                          className="p-2 hover:bg-accent flex gap-3 items-center rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border"
                          key={index}
                          onClick={() => setSelectedAssistant(assistant)}
                        >
                          <Image
                            src={assistant?.image}
                            width={60}
                            height={60}
                            alt={assistant?.name}
                            className="w-9 h-9 object-cover rounded-lg shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {assistant?.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {assistant?.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-5">
                <div className="flex flex-col sm:flex-row gap-5 p-4 bg-secondary/30 rounded-xl border">
                  {selectedAssistant && (
                    <AssistantAvatar
                      onSelectedImage={(avatar: string) =>
                        handleInputChange(avatar, "image")
                      }
                    >
                      <div className="relative group cursor-pointer">
                        <Image
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all"
                          src={selectedAssistant?.image}
                          width={150}
                          height={150}
                          alt="assistant"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">
                            Change
                          </span>
                        </div>
                      </div>
                    </AssistantAvatar>
                  )}
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground/80">
                        Name
                      </label>
                      <Input
                        value={selectedAssistant?.name}
                        placeholder="e.g., Coding Helper"
                        className="h-10 px-3"
                        onChange={(e) =>
                          handleInputChange(e.target.value, "name")
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground/80">
                        Title
                      </label>
                      <Input
                        value={selectedAssistant?.title}
                        placeholder="e.g., Your Programming Assistant"
                        className="h-10 px-3"
                        onChange={(e) =>
                          handleInputChange(e.target.value, "title")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    AI Model
                  </label>
                  <Select
                    defaultValue={selectedAssistant?.aiModelId}
                    onValueChange={(value) =>
                      handleInputChange(value, "aiModelId")
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {AiModelOptions.map((model, index) => (
                        <SelectItem key={index} value={model.name}>
                          <div className="flex gap-2 items-center">
                            <Image
                              className="rounded-md"
                              src={model.logo}
                              alt={model.name}
                              width={18}
                              height={18}
                            />
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Instructions
                  </label>
                  <Textarea
                    className="min-h-[140px] p-3 resize-none"
                    placeholder="Define how your assistant should behave and respond..."
                    value={selectedAssistant?.userInstruction}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "userInstruction")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 pt-3 border-t gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="px-5">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={onSave} className="px-5">
              {isLoading && <Loader2Icon className="animate-spin mr-2" />}
              Add Assistant
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddNewAssistant;
