import AssistantList from "./_components/assistant-list";
import AssistantSettings from "./_components/assistant-settings";
import ChatUI from "./_components/chat-ui";

function Workspace() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="grid grid-cols-12 h-full">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 h-full hidden md:block">
          <AssistantList />
        </aside>
        <main className="col-span-12 md:col-span-6 lg:col-span-7 h-full">
          <ChatUI />
        </main>
        <aside className="col-span-12 md:col-span-3 lg:col-span-3 h-full hidden md:block">
          <AssistantSettings />
        </aside>
      </div>
    </div>
  );
}

export default Workspace;
