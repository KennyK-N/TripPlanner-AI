import { useContext, useState, createContext } from "react";

const SidebarContext = createContext();

export function UseSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within SidebarProvider");
  }

  return context;
}
export function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(true);

  function toggleSidebar() {
    setExpanded((prev) => !prev);
  }

  function closeSidebar() {
    setExpanded(false);
  }

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
