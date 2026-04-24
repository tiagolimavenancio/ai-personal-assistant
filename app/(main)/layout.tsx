import Provider from "./provider";

function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider>{children}</Provider>
    </div>
  );
}

export default WorkspaceLayout;
