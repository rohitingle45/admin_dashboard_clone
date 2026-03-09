import React, { useState } from 'react';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  status: string[];
  department: string[];
  type: string[];
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState<FilterState>({
    status: [],
    department: ['Design', 'Java', 'Python', 'Project Manager'],
    type: [],
  });

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [category]: (prev[category as keyof FilterState] as string[])?.includes(value)
        ? (prev[category as keyof FilterState] as string[]).filter(item => item !== value)
        : [...(prev[category as keyof FilterState] as string[]), value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleClear = () => {
    setTempFilters({
      status: [],
      department: [],
      type: [],
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-[383px] h-fit rounded-[20px] shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filter Options</h2>
          </div>

          {/* Content */}
          <div className="p-4 h-fit overflow-y-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <img src="/images/search.png" className="h-[24px] w-[24px]" alt="" />
                </div>
                <input
                  type="text"
                  placeholder="Search filters..."
                  className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder:text-[#16151C33] placeholder:font-['Lexend'] placeholder:font-light placeholder:text-[16px] focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Department Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Department</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column - First 5 */}
                  <div className="space-y-2">
                    {['Design', 'HR', 'Sales', 'Business Analyst', 'Project Manager'].map((dept) => (
                      <label key={dept} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={tempFilters.department.includes(dept)}
                          onChange={() => handleCheckboxChange('department', dept)}
                          className="w-4 h-4 text-[#7152F3] border-gray-300 rounded focus:ring-[#7152F3] accent-[#7152F3]"
                        />
                        <span className="ml-2 text-[16px] font-['Lexend'] font-light leading-[24px] text-[#16151C]">{dept}</span>
                      </label>
                    ))}
                  </div>

                  {/* Right Column - Next 5 */}
                  <div className="space-y-2">
                    {['Java', 'Python', 'React JS', 'Account', 'Node JS'].map((dept) => (
                      <label key={dept} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={tempFilters.department.includes(dept)}
                                onChange={() => handleCheckboxChange('department', dept)}
                                className="
                                w-4 h-4 border border-gray-300 rounded-[4px]
                                text-[#7152F3] focus:ring-[#7152F3] accent-[#7152F3]
                                cursor-pointer
                                "
                            />
                            <span className="ml-2 text-[16px] font-['Lexend'] font-light leading-[24px] text-[#16151C]">{dept}</span>
                        </label>

                    ))}
                  </div>
                </div>
              </div>

              {/* Select Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Type</h3>
                <div className="flex gap-6">
                  {['Office', 'Work From Home'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={tempFilters.type.includes(type)}
                            onChange={() => handleCheckboxChange('type', type)}
                            className={`
                            appearance-none w-5 h-5 rounded-full border-2 border-[#A2A1A833]
                            checked:bg-[#7152F3] checked:border-[#7152F3]
                            flex items-center justify-center transition-all duration-200 cursor-pointer
                            `}
                        />
                        <span className="ml-1 text-[16px] font-['Lexend'] font-light leading-[24px] text-[#16151C]">{type}</span>
                    </label>

                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2 justify-between w-full">
              <button
                onClick={onClose}
                className="w-full px-3 py-2 text-[16px] font-medium font-['Poppins'] text-gray-700 bg-white border border-gray-300 rounded-[10px]
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="w-full px-3 py-2 text-[16px] font-medium font-['Poppins'] text-[#FFFFFF] bg-[#7152F3] border border-transparent rounded-[10px]
                  hover:bg-[#7152F3] focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPopup;