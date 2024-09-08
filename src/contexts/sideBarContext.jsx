import { createContext, useContext, useState } from "react";

const sidebarContext = createContext();

function SidebarProvider({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <sidebarContext.Provider
      value={{
        navOpen,
        setNavOpen,
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(sidebarContext);
  if (!context) throw new Error("Context was used outtside Provider");
  return context;
}

export { useSidebar, SidebarProvider };
