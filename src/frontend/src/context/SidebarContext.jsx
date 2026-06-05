import { useContext, useState, createContext } from "react";

const sideBarContext = createContext();

export function UseSidebarContext() {
  const context = useContext(sideBarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within sideBarProvider");
  }

  return context;
}
export function SideBarProvider({ children }) {
  const [expanded, setExpanded] = useState(true);

  function toggleSidebar() {
    setExpanded((prev) => !prev);
  }

  function closeSidebar() {
    setExpanded(false);
  }

  return (
    <sideBarContext.Provider value={{ expanded, toggleSidebar, closeSidebar }}>
      {children}
    </sideBarContext.Provider>
  );
}
