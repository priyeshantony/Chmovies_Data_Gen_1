"use client"; // Mark this component as a client component

import { useState } from "react";
import Header from "@/app/components/Layout/Header";
import Sidebar from "@/app/components/Layout/Sidebar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true); // Main menu visibility
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeThirdLevel, setActiveThirdLevel] = useState<{ [key: string]: boolean }>({
    analytics: true,
    users: true,
    videos: true,
  });

  // Toggle Sidebar via Header Button
  const toggleSidebar = () => {
    if (activeSubMenu) {
      setActiveSubMenu(null); // Close sub-menu first
      setActiveMenu(null);
    } else if (isSidebarVisible) {
      setIsSidebarVisible(false); // Close main menu if sub-menu is already closed
    } else {
      setIsSidebarVisible(true); // Open main menu if everything is closed
    }
  };

  // Toggle sub-menus (Dashboard, Pages, etc.)
  const toggleSubMenu = (menu: string) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
    setActiveMenu(menu);
  };

  // Toggle third-level menus
  const toggleThirdLevelMenu = (menu: string) => {
    setActiveThirdLevel((prev) => ({
      ...prev,
      [menu]: !prev[menu], // Toggle only the clicked submenu
    }));
  };

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        activeSubMenu={activeSubMenu}
        activeMenu={activeMenu}
        activeThirdLevel={activeThirdLevel}
        toggleSubMenu={toggleSubMenu}
        toggleThirdLevelMenu={toggleThirdLevelMenu}
      />

      {/* Page Content */}
      <Header toggleSidebar={toggleSidebar} />
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isSidebarVisible ? (activeSubMenu ? "370px" : "120px") : "0" }}
      >
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;