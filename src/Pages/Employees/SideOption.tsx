import React from "react";

interface SideOptionProps {
  active: string;
  onChange: (tab: string) => void;
}

const SideOption: React.FC<SideOptionProps> = ({ active, onChange }) => {
  const items = [
    {
      id: "profile",
      label: "Profile",
      icon: "/images/person.png",
      activeIcon: "/images/pfp.png",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: "/images/calendar-check.png",
      activeIcon: "/images/calendar-check.png",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "/images/Projects.png",
      activeIcon: "/images/Projects.png",
    },
    {
      id: "leave",
      label: "Leave",
      icon: "/images/Leave.png",
      activeIcon: "/images/Leave.png",
    },
  ];

  return (
    <aside className="w-full md:w-[200px]">
      <div className="border border-[#E5E7EB] rounded-xl bg-white p-2 space-y-2">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={`w-full flex items-center gap-3 justify-start px-4 py-3 rounded-lg text-[16px] font-light transition-all duration-200
                ${
                  isActive
                    ? "bg-[#7152F3] text-white shadow-sm"
                    : "bg-white text-[#16151C] hover:bg-[#F9FAFB]"
                }`}
            >
              <img
                src={isActive ? it.activeIcon : it.icon}
                alt={it.label}
                className="w-5 h-5 object-contain"
              />
              <span>{it.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default SideOption;
