import AssistantList from "./_components/assistant-list";
import AssistantSettings from "./_components/assistant-settings";
import ChatUI from "./_components/chat-ui";

function Workspace() {
  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          <AssistantList />
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <ChatUI />
        </div>
        <div className="hidden lg:block">
          <AssistantSettings />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
