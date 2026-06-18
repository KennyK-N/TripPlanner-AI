import { SideBarProvider } from "@/context/SidebarContext";
import Alert from "@components/ui/Alert";
import Header from "@components/header/Header.jsx";
import SideBarLayout from "@layout/SideBarLayout";

export default function AppLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden">
      <SideBarProvider>
        <Alert></Alert>
        <SideBarLayout></SideBarLayout>
        <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">
          <Header />
          {/*TODO: Make this part mobile responsive later*/}
          {/*Display container */}
          <main className="h-full p-10 ml-15 sm:ml-20 lg:ml-22 mt-[5em]">
            {children}
          </main>
        </div>
      </SideBarProvider>
    </div>
  );
}
