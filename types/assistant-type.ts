export type AssistantType = {
  id: number;
  title: string;
  name: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
  aiModelId?: string;
};
