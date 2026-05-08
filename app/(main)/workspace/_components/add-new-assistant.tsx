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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Assistant</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-3 mt-5 gap-5">
                <div className="mt-5 border-r p-3">
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="w-full"
                    onClick={() => setSelectedAssistant(DEFAULT_ASSISTANT)}
                  >
                    + Create New Assistant
                  </Button>
                  <div className="mt-2">
                    {AiAssistantsList.map((assistant, index) => (
                      <div
                        className="p-2 hover:bg-secondary flex gap-2 items-center rounded-xl cursor-pointer"
                        key={index}
                        onClick={() => setSelectedAssistant(assistant)}
                      >
                        <Image
                          src={assistant?.image}
                          width={60}
                          height={60}
                          alt={assistant?.name}
                          className="w-[35px] h-[35px] object-cover rounded-lg"
                        />
                        <h2 className="text-xs">{assistant?.title}</h2>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex gap-5">
                    {selectedAssistant && (
                      <AssistantAvatar
                        onSelectedImage={(avatar: string) =>
                          handleInputChange(avatar, "image")
                        }
                      >
                        <Image
                          className="w-[100px] h-[100px] rounded-xl cursor-pointer object-cover"
                          src={selectedAssistant?.image}
                          width={150}
                          height={150}
                          alt="assistant"
                        />
                      </AssistantAvatar>
                    )}
                    <div className="flex flex-col gap-3 w-full">
                      <Input
                        value={selectedAssistant?.name}
                        placeholder="Name of Assistant"
                        className="w-full"
                        onChange={(e) =>
                          handleInputChange(e.target.value, "name")
                        }
                      />
                      <Input
                        value={selectedAssistant?.title}
                        placeholder="Title of Assistant"
                        className="w-full"
                        onChange={(e) =>
                          handleInputChange(e.target.value, "title")
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-gray-500">Model:</h2>
                    <Select
                      defaultValue={selectedAssistant?.aiModelId}
                      onValueChange={(value) =>
                        handleInputChange(value, "aiModelId")
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        {AiModelOptions.map((model, index) => (
                          <SelectItem key={index} value={model.name}>
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
                  <div className="mt-5">
                    <h2 className="text-gray-500">Instructions:</h2>
                    <Textarea
                      className="h-[200px]"
                      placeholder="Add Instructions"
                      value={selectedAssistant?.userInstruction}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "userInstruction")
                      }
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={onSave}>
              {isLoading && <Loader2Icon className="animate-spin" />} Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddNewAssistant;
