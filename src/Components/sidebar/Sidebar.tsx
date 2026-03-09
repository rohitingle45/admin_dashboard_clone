import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

   const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "apps" },
    { name: "All Users", path: "/", icon: "user" },
    { name: "All Websites", path: "/websites", icon: "user" },
    { name: "Trending Topics", path: "/trending", icon: "location" },
    { name: "Upcoming Modules", path: "/upcoming", icon: "upcoming" },
    { name: "All Employees", path: "/all-employees", icon: "user" },
    { name: "All Departments", path: "/departments", icon: "community" },
    { name: "Attendance", path: "/attendance", icon: "calendar-check" },
    { name: "Payroll", path: "/payroll", icon: "coin-dollar" },
    { name: "Jobs", path: "/jobs", icon: "briefcase" },
    { name: "Settings", path: "/settings", icon: "setting" },
  ].map((link) => ({
    ...link,
    icon: {
      active: `/images/${link.icon}-active.svg`,
      inactive: `/images/${link.icon}.svg`,
    },
  }));

  const handleNavClick = (path: string, label: string) => {
    setActivePage(label);
    navigate(path);
  };

  const toggleTheme = (mode: "light" | "dark") => {
    if (mode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`fixed flex flex-col w-[280px] h-screen left-0 top-0 backdrop-blur-md transition-all duration-200 ml-4`}
      style={{ backgroundColor: "#A2A1A80D" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-start p-2 pt-6 pl-[4.5rem]">
        <div className="w-[36.41px] h-[36.41px] flex items-center justify-center mr-1">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-[36.41px] h-[36.41px] object-contain"
          />
        </div>
        <span className="w-[77.75px] h-[20.05px] text-[#16151C] opacity-100 font-medium text-[20px] mb-2">
          HRMS
        </span> 
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col mt-4 w-full gap-[5px]">
        {navLinks.map((link, idx) => {
          const isActive = location.pathname === link.path || 
                         (link.path === '/' && location.pathname.startsWith('/users/'));
          return (
            <div
              key={idx}
              onClick={() => handleNavClick(link.path, link.name)}
              className={`relative transition-all duration-200 flex items-center cursor-pointer pl-4 hover:bg-gray-100 text-gray-700 whitespace-nowrap
                ${isActive ? 'bg-[#7152F30D]' : ''}`}
              style={isActive ? {
                background: 'linear-gradient(to right, transparent 1.5rem, #7152F30D 1.5rem, #7152F30D 100%)',
                backgroundClip: 'content-box',
                paddingLeft: '3.0rem',
                marginLeft: '0.5rem',
                width: 'calc(100% - 0.5rem)',
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              } : { border: 'none', outline: 'none', boxShadow: 'none' }}
            >
              <div className="relative z-10 flex items-center w-full">
                <div className="relative w-full">
                  <NavItem
                  icon={link.icon}
                  label={link.name}
                  isActive={isActive}
                  dark={isDarkMode}
                />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="p-3">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
