import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";

import Sidebar from "@components/sidebar/Sidebar";
import SideBarItem from "@components/sidebar/SideBarItem";

export default function SideBarLayout() {
  return (
    <>
      <Sidebar>
        {/*children */}
        <SideBarItem icon={<Home size={20} />} text="Home" alert />
        <SideBarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active
        />
        <SideBarItem icon={<StickyNote size={20} />} text="Projects" alert />
        <SideBarItem icon={<Calendar size={20} />} text="Calendar" />
        <SideBarItem icon={<Layers size={20} />} text="Tasks" />
        <SideBarItem icon={<Flag size={20} />} text="Reporting" />

        <hr className="my-3" />

        <SideBarItem icon={<Settings size={20} />} text="Settings" />
        <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>
    </>
  );
}
