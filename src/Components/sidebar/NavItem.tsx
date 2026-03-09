import React from "react";
import "../../index.css";

interface NavItemProps {
  icon: {
    active: string;
    inactive: string;
  };
  label: string;
  dark: boolean;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, dark, isActive = false }) => {
  const iconSrc = isActive ? icon.active : icon.inactive;

  return (
    <div className="relative w-full">
      {isActive && (
        <div
          className="absolute left-0 top-0 h-full w-[0.2rem] bg-[#7152F3] rounded-r-sm"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
        />
      )}

      <button
        className={`flex w-full px-6 py-3 items-center gap-3 transition-all duration-200 ${
          dark
            ? isActive
              ? ""
              : "text-gray-300 hover:bg-[#2B2C2F]"
            : isActive
            ? "text-[#7152F3] font-bold"
            : "text-[#16151C] hover:bg-gray-100"
        }`}
        style={{
          outline: "none",
          border: "none",
          WebkitTapHighlightColor: "transparent",
          paddingLeft: isActive ? "calc(1.5rem - 4px)" : "4rem",
        }}
      >
        <img
          src={iconSrc}
          alt={label}
          className="w-6 h-6 transition-all duration-200"
          draggable={false}
        />

        <span
          className={`${
            isActive
              ? "text-[#7152F3] font-semibold leading-6 text-[16px]"
              : "text-[#16151C] font-light text-[16px]"
          }`}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export default NavItem;
