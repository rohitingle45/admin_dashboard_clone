import React from "react";
import Button from "../buttons/Button";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: (mode: "light" | "dark") => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="flex bg-[#A2A1A80D] rounded-lg p-1 w-full gap-1 pb-4">
      <Button
        label={
          <span className="flex items-center justify-center gap-2">
            <img src="/images/sun.png" alt="Light" className="h-6 w-6 text-[#FFFFFF]" />
          <span className="text-[16px] font-[300] leading-[24px] text-[#FFFFFF]">Light</span>
          </span>
        }
        active={!isDarkMode}
        onClick={() => toggleTheme("light")}
      />
      <Button
        label={
          <span className="flex items-center justify-center gap-2">
            <img src="/images/half moon.png" alt="Dark" className="h-6 w-6 text-[#16151C]" />
            <span className="text-[16px] font-[300] leading-[24px] text-[#16151C]">Dark</span>
          </span>
        }
        active={isDarkMode}
        onClick={() => toggleTheme("dark")}
      />
    </div>
  );
};

export default ThemeToggle;
