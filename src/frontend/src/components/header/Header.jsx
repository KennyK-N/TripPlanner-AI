import { useState } from "react";
import { ThemeToggleButton } from "@components/common/ThemeToggleButton";
import UserDropdown from "@components/header/UserDropdown";
import { Link } from "react-router";

function Header({ onClick, onToggle }) {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="fixed top-0 flex w-full bg-white border-gray-200 z-10 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div
          className={`${"flex"} items-center justify-end w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* Dark Mode Toggler */}
            <ThemeToggleButton />
          </div>
          {/* User Area  */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

export default Header;
