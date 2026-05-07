import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AiAssistantsList from "@/services/AiAssistantsList";

function AssistantAvatar({ children, onSelectedImage }: any) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
          {AiAssistantsList.map((assistant, index) => (
            <Image
              key={index}
              className="w-[30px] h-[30px] rounded-lg cursor-pointer object-cover"
              src={assistant.image}
              width={80}
              height={80}
              alt={assistant.name}
              onClick={() => onSelectedImage(assistant.image)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AssistantAvatar;
