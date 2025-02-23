"use client";
import { useState } from "react";
import { FaChartBar, FaFileAlt, FaKey, FaUserPlus, FaChevronDown, FaChevronRight, FaUsers, FaFilm, FaCog, FaUsb, FaBorderAll, FaVideo, FaVideoSlash, FaList, FaFileVideo } from "react-icons/fa";
import Header from "@/app/components/Layout/Header";
import Dashboard from "@/app/components/Dashboard";
import './Main.css';
import { GiFilmProjector } from "react-icons/gi";
import { ImFilm } from "react-icons/im";
import { Fa6, FaListCheck } from "react-icons/fa6";

import Movie from "@/app/components/Videos/Movie";
import Series from "@/app/components/Videos/Series";

const Main = () => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true); // Main menu visibility
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeThirdLevel, setActiveThirdLevel] = useState<{ [key: string]: boolean }>({
    analytics: true,
    users: true,
    videos: true,
  });

  // Toggle sub-menus (Dashboard, Pages, etc.)
  const toggleSubMenu = (menu: string) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
    setActiveMenu(menu);
  };

  const toggleThirdLevelMenu = (menu: string) => {
    setActiveThirdLevel((prev) => ({
      ...prev,
      [menu]: !prev[menu], // Toggle only the clicked submenu
    }));
  };

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

  return (
    <div className="flex transition-all duration-300">
      {/* Header (Pass toggle function) */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <aside
        className="bg-gray-900 text-white h-full fixed top-0 left-0 pt-[52px] flex transition-all duration-300"
        style={{
          width: isSidebarVisible ? (activeSubMenu ? "350px" : "120px") : "0",
          opacity: isSidebarVisible ? 1 : 0,
        }}
      >
        {/* Main Menu */}
        <div id="main-menu" className="sidebar w-[120px] bg-gray-800 h-full overflow-y">
          <ul className="p-1 space-y-6">
            {/* Dashboard Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("dashboard")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "dashboard" ? "mainActive" : ""}`}
              >
                <FaBorderAll className="text-3xl" />
                <span className="mt-2 text-[13px]">Dashboard</span>
              </button>
            </li>

            {/* Users Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("users")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "users" ? "mainActive" : ""}`}
              >
                <FaUsers className="text-3xl" />
                <span className="mt-2 text-[13px]">Users</span>
              </button>
            </li>

            {/* Videos Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("videos")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "videos" ? "mainActive" : ""}`}
              >
                <ImFilm className="text-3xl" />
                <span className="mt-2 text-[13px]">Videos</span>
              </button>
            </li>

            {/* Pages Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("marketing")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "marketing" ? "mainActive" : ""}`}
              >
                <FaChartBar className="text-3xl" />
                <span className="mt-2 text-[13px]">Marketing</span>
              </button>
            </li>

            {/* Pages Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("plugins")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "plugins" ? "mainActive" : ""}`}
              >
                <FaUsb className="text-3xl" />
                <span className="mt-2 text-[13px]">Plugins</span>
              </button>
            </li>

            {/* Pages Button */}
            <li className="text-center">
              <button
                onClick={() => toggleSubMenu("settings")}
                className={`flex flex-col items-center w-full p-4 hover:bg-gray-700 rounded focus:outline-none relative 
                  ${activeMenu === "settings" ? "mainActive" : ""}`}
              >
                <FaCog className="text-3xl" />
                <span className="mt-2 text-[13px]">Settings</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Sub-Menu */}
        <div
          id="sub-menu"
          className={`submenu overflow-y-auto bg-gray-700 border-l border-gray-600 transition-all duration-300 ${
            activeSubMenu ? "w-[230px] opacity-100" : "w-0 opacity-0"
          }`}
        >
          {activeSubMenu === "dashboard" && (
            <ul className="p-1 space-y-4 mt-2">
              <li>
                <button
                  className="flex justify-between items-center w-full p-3 hover:bg-gray-600 rounded text-sm"
                  onClick={() => toggleThirdLevelMenu("analytics")}
                >
                  <span className="mr-2 flex items-center">                    
                  <span className="mr-2 " >{activeThirdLevel["analytics"] ? <FaChevronDown /> : <FaChevronRight />}</span>
                     Analytics
                  </span>
                </button>

                {/* Third-Level Dropdown (Default Open) */}
                {activeThirdLevel["analytics"] && (
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/analytics/reports"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaFileAlt className="mr-2" /> Reports
                      </a>
                    </li>
                    <li>
                      <a
                        href="/analytics/charts"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaChartBar className="mr-2" /> Charts
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {activeSubMenu === "users" && (
            <ul className="p-1 space-y-4 mt-2">
              <li>
                <button
                  className="flex justify-between items-center w-full p-3 hover:bg-gray-600 rounded text-sm"
                  onClick={() => toggleThirdLevelMenu("users")}
                >
                  <span className="flex items-center">                    
                  <span className="mr-2 " >{activeThirdLevel["users"] ? <FaChevronDown /> : <FaChevronRight />}</span>
                    Users
                  </span>
                </button>

                {/* Third-Level Dropdown (Default Open) */}
                {activeThirdLevel["users"] && (
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/users/subscriber"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaUsers className="mr-2" /> Subscriber List
                      </a>
                    </li>
                    <li>
                      <a
                        href="/users/adminstrator"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaUserPlus className="mr-2" /> Adminstrator List
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {activeSubMenu === "videos" && (
            <ul className="p-1 space-y-4 mt-2">
              <li>
                <button
                  className="flex justify-between items-center w-full p-3 hover:bg-gray-600 rounded text-sm"
                  onClick={() => toggleThirdLevelMenu("videos")}
                >
                  <span className="flex items-center">                    
                  <span className="mr-2 " >{activeThirdLevel["videos"] ? <FaChevronDown /> : <FaChevronRight />}</span>
                    Videos
                  </span>
                </button>

                {/* Third-Level Dropdown (Default Open) */}
                {activeThirdLevel["videos"] && (
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/videos/movie"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaFilm className="mr-2" /> Videos
                      </a>
                    </li>
                    <li>
                      <a
                        href="/videos/series"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaVideo className="mr-2" /> Series
                      </a>
                    </li>
                    <li>
                      <a
                        href="/videos/category"
                        className="flex items-center p-2 pl-4 hover:bg-gray-500 rounded text-sm"
                      >
                        <FaListCheck className="mr-2" /> Category
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>
      </aside>

      {/* Main Content (Shifts Right When Sidebar Opens) */}
      <div
        className="flex-1 transition-all duration-300 p-6 mt-16"
        style={{ marginLeft: isSidebarVisible ? (activeSubMenu ? "370px" : "120px") : "0" }}
      >
        <Series />
      </div>
      
    </div>
  );
};

export default Main;