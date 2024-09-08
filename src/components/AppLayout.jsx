import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Main from "./Main";
import SideNavBar from "./SideNavBar";
import { SidebarProvider } from "../contexts/sideBarContext";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="duration-300 w-screen overflow-x-hidden ease-in-out transition-all">
      <SidebarProvider>
        <Header />
        <Main>
          <SideNavBar />
          <Outlet />
        </Main>
        <Footer />
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
