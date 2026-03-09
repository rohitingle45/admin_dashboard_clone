import React, { useState, useRef, useEffect } from "react";

interface TopbarProps {
  title: React.ReactNode;
  subtitle?: string;
  subtitleClassName?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Background blur overlay */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      
      <div className="flex items-center justify-between p-4 pt-0 pb-7 bg-white border-gray-200">
        {/* Left: Title and Subtitle */}
        <div>
          <h1 className="font-bold text-[20px] leading-6 text-[#16151C]">{title}</h1>
          {subtitle && <p className="font-light text-[14px] leading-[18px] text-[#9CA3AF]">{subtitle}</p>}
        </div>

        {/* Right: Search, Notifications, and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/images/search.png" className="w-[20px] h-[20px]" alt="Search" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-[261px] h-[50px] pl-11 pr-4 py-2 font-[Lexend,sans-serif] font-light text-[16px] rounded-lg leading-6 text-[rgba(22,21,28,0.2)] bg-white border-2 border-[#A2A1A81A] focus:outline-none focus:ring-0"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="w-[50px] h-[50px] flex items-center justify-center bg-[#A2A1A81A] rounded-lg hover:bg-gray-50 focus:outline-none"
            >
              <img src="/images/notification.png" className="w-[24px] h-[24px]" alt="Notifications" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-1 border-2 border-[#A2A1A81A] rounded-[10px] px-2 h-[55px] cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={toggleDropdown}
            >
              <div className="relative">
                <img 
                  className="w-[40px] h-[40px] object-cover rounded-[8px]" 
                  src="/images/profile.png" 
                  alt="User avatar"
                />
              </div>
              <div className="text-left p-0">
                <p className="font-semibold text-[16px] text-[#16151C]">
                  Robert Allen
                </p>
                <p className="font-light text-[12px] text-[#9CA3AF]">
                HR Manager
                </p>
              </div>
              <img 
                src="/images/down.png" 
                className="w-[20px] h-[20px]" 
                alt="Dropdown" 
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-[60]">
                <div className="py-2">
                  <button className="w-full text-left px-4 py-3 text-[14px] text-[#16151C] hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <img src="/images/person.png" className="w-[20px] h-[20px]" alt="Profile" />
                    <span className="font-light text-[16px] text-[#16151C]">My Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 text-[14px] text-[#F45B69] hover:bg-red-50 transition-colors flex items-center space-x-3">
                    <img src="/images/logout.svg" className="w-[20px] h-[20px]" alt="Logout" />
                    <span className="font-light text-[16px] text-[#F45B69]">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;