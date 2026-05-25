import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { UseSidebarContext } from "@/context/SidebarContext";
//* TODO: MOVE THIS FILE INTO COMPONENT LATER

export default function Sidebar({
  Userlogo = "https://via.placeholder.com/120x40?text=LOGO",
  Email = "temp@gmail.com",
  Name = "Temp",
  children,
}) {
  const { expanded, toggleSidebar } = UseSidebarContext();
  const isRendered = false;
  return (
    <>
      <aside
        className={
          expanded
            ? "fixed left-0 top-0 h-screen w-64 z-20"
            : "fixed left-0 top-0 h-screen z-20"
        }
      >
        <nav className=" overflow-y-scroll no-scrollbar h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            {isRendered && (
              <img
                src={Userlogo}
                className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
              />
            )}
            <button
              onClick={() => toggleSidebar()}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <ul className="flex-1 px-3">{children}</ul>

          <div className="border-t flex p-3 ">
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{Name}</h4>
                <span className="text-xs text-gray-600">{Email}</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
