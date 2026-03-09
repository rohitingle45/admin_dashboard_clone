import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import type { UserStatus, TableColumn, Employee } from '../../types';
import Topbar from "../../Components/layout/Topbar";
import Table from "../../Components/table/Table";
import Button from "../../Components/buttons/Button";
import Pagination from "../../Components/table/Pagination";
import mockEmployees from "../../mock/employees";
import AddNewEmployeeHeader, { type TabType } from "../../Components/layout/AddNewEmployeeHeader";
import PersonalInfo from "../Employees/PersonalInfo";
import ProfessionalInfo from "../Employees/ProfessionalInfo";
import Documents from "../Employees/Documents";
import AccountAccess from "../Employees/AccountAccess";

const ITEMS_PER_PAGE = 10;

interface AddNewEmployeeProps {
  onMount?: () => void;
}

const AddNewEmployee: React.FC<AddNewEmployeeProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter] = useState<UserStatus | 'all'>('all');
  const [currentTab, setCurrentTab] = useState<TabType>('personal');
  const [currentPage, setCurrentPage] = useState(1);
  
  const columns: TableColumn<Employee>[] = useMemo(() => [
    { 
      header: 'Employee Name', 
      accessor: 'name',
      className: 'text-[#16151C] font-medium',
      render: (name: string, user: Employee) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <span>{name}</span>
        </div>
      )
    },
    { 
      header: 'Employee ID', 
      accessor: 'id',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Department', 
      accessor: 'department',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Designation', 
      accessor: 'designation',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Type', 
      accessor: 'type',
      className: 'text-[#16151C]' 
    },
    { 
      header: 'Status', 
      accessor: 'activity',
      className: 'text-[#16151C]',
      render: (value: string) => (
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[4px] text-xs font-medium bg-[#7152F31A] text-[#7152F3]">
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      className: 'pl-2',
      render: (_, user) => (
        <div className="flex items-center space-x-1">
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View user:', user.id);
            }}
            title="View"
          >
            <img src="/images/view.png" className="w-5 h-5" alt="View" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', user.id);
            }}
            title="Edit"
          >
            <img src="/images/edit.png" className="w-5 h-5" alt="Edit" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                console.log('Delete user:', user.id);
                // Add your delete logic here
              }
            }}
            title="Delete"
          >
            <img src="/images/trash.png" className="w-5 h-5" alt="Delete" />
          </button>
        </div>
      ),
    }
  ], []);

  const employees: Employee[] = useMemo(() => mockEmployees, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.id.includes(searchQuery) ||
        employee.email?.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === 'all' || !activeFilter) return matchesSearch;
      return matchesSearch && employee.status === activeFilter;
    });
  }, [employees, searchQuery, activeFilter]);

  // Calculate paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);
  // Reset to first page when filters or search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const navigate = useNavigate();

  const handleRowClick = (employee: Employee) => {
    navigate(`/employees/${employee.id}`);
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
  };

  const tabs = [
    { id: 'personal' as TabType, label: 'Personal Information', number: '01' },
    { id: 'professional' as TabType, label: 'Professional Information', number: '02' },
    { id: 'documents' as TabType, label: 'Documents', number: '03' },
    { id: 'account' as TabType, label: 'Account Access', number: '04' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div>
        <Topbar 
          title={
            <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
              All Employees
            </div>
          } 
          subtitle="All Employee Information"
          subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white h-full w-full">
        {/* Search and Filter Bar */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-120">

            <AddNewEmployeeHeader
                activeTab={currentTab}
                onTabChange={handleTabChange}
                tabs={tabs}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="h-fit">
          <div className="p-6 overflow-auto">
            {currentTab === 'personal' && <PersonalInfo isEditing={false} />}
            {currentTab === 'professional' && <ProfessionalInfo isEditing={false} />}
            {currentTab === 'documents' && <Documents isEditing={false} />}
            {currentTab === 'account' && <AccountAccess isEditing={false} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployee;