import Header from "../_components/header";

function AiAssistantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default AiAssistantsLayout;
