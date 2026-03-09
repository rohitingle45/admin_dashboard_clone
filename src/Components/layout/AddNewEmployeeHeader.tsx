import React from 'react';

export type TabType = 'personal' | 'professional' | 'documents' | 'account';

export interface Tab {
  id: TabType;
  label: string;
  number: string;
}

interface AddNewEmployeeHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs: Tab[];
}

const AddNewEmployeeHeader: React.FC<AddNewEmployeeHeaderProps> = ({
  activeTab,
  onTabChange,
  tabs
}) => {

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Right side - Tabs in single line */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-end space-x-8">
              {tabs.map((tab) => (
                <div key={tab.id} className="flex flex-col items-center">
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      px-3 py-2 text-xs font-medium transition-colors duration-200 flex items-center space-x-2
                      ${activeTab === tab.id
                        ? 'text-[#7152F3]'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    <span className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-xs overflow-hidden
                      ${activeTab === tab.id
                        ? 'bg-transparent'
                        : 'bg-transparent'
                      }
                    `}>
                      {tab.id === 'personal' && (
                        <img 
                          src={activeTab === tab.id ? "/images/person-active.png" : "/images/person.png"}
                          alt="Personal" 
                          className="w-[24px] h-[24px] object-contain"
                        />
                      )}
                      {tab.id === 'professional' && (
                        <img 
                          src={activeTab === tab.id ? "/images/briefcase-active.png" : "/images/briefcase.png"}
                          alt="Professional" 
                          className="w-[24px] h-[24px] object-contain"
                        />
                      )}
                      {tab.id === 'documents' && (
                        <img 
                          src={activeTab === tab.id ? "/images/document-text-active.png" : "/images/document-text.png"}
                          alt="Documents" 
                          className="w-[24px] h-[24px] object-contain"
                        />
                      )}
                      {tab.id === 'account' && (
                        <img 
                          src={activeTab === tab.id ? "/images/lock-active.png" : "/images/lock.png"}
                          alt="Account" 
                          className="w-[24px] h-[24px] object-contain"
                        />
                      )}
                    </span>
                    <span className="whitespace-nowrap hidden sm:block text-[16px] font-['Lexend'] font-semibold">{tab.label}</span>
                  </button>
                  {/* Slider line below */}
                  <div 
                    className={`
                      h-0.5 bg-[#7152F3] transition-all duration-300 ease-in-out mt-1
                      ${activeTab === tab.id ? 'w-full' : 'w-0'}
                    `}
                    style={{
                      width: activeTab === tab.id ? '100%' : '0%',
                    }}
                  />
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full text-left px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 flex items-center space-x-2
                ${activeTab === tab.id
                  ? 'bg-[#7152F3] text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span className={`
                flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                ${activeTab === tab.id
                  ? 'bg-white text-[#7152F3]'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {tab.number}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployeeHeader;