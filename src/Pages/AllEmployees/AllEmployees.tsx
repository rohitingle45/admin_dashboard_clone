import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import type { TableColumn, Employee } from '../../types';
import Topbar from "../../Components/layout/Topbar";
import Table from "../../Components/table/Table";
import Button from "../../Components/buttons/Button";
import Pagination from "../../Components/table/Pagination";
import FilterPopup from "../../Components/layout/FilterPopup";
import mockEmployees from "../../mock/employees";

const ITEMS_PER_PAGE = 10;

interface FilterState {
  status: string[];
  department: string[];
  type: string[];
}

interface AllEmployeesProps {
  onMount?: () => void;
}

const AllEmployees: React.FC<AllEmployeesProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    status: [],
    department: [],
    type: []
  });
  
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
                className="h-[36px] w-[36px] object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-light text-[16px]">{name}</span>
        </div>
      )
    },
    { 
      header: 'Employee ID', 
      accessor: 'id',
      className: 'text-[#16151C] font-light text-[16px]' 
    },
    { 
      header: 'Department', 
      accessor: 'department',
      className: 'text-[#16151C] font-light text-[16px]' 
    },
    { 
      header: 'Designation', 
      accessor: 'designation',
      className: 'text-[#16151C] font-light text-[16px]' 
    },
    { 
      header: 'Type', 
      accessor: 'type',
      className: 'text-[#16151C] font-light text-[16px]' 
    },
    { 
      header: 'Status', 
      accessor: 'activity',
      className: 'text-[#16151C] font-light text-[16px]',
      render: (value: string) => (
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-[4px] text-xs font-medium bg-[#7152F31A] text-[#7152F3]">
          {value}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'id',
      render: (_, user) => (
        <div className="flex items-center space-x-2">
          <button 
            className="text-[#16151C] hover:text-gray-700 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View user:', user.id);
            }}
            title="View"
          >
            <img src="/images/view.png" className="w-5 h-5" alt="View" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', user.id);
            }}
            title="Edit"
          >
            <img src="/images/edit.png" className="w-5 h-5 invert" alt="Edit" />
          </button>
          <button 
            className="text-[#16151C] hover:text-gray-700 rounded-full hover:bg-gray-100"
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

      // Apply status filter
      const matchesStatus = currentFilters.status.length === 0 || currentFilters.status.includes(employee.status);

      // Apply department filter
      const matchesDepartment = currentFilters.department.length === 0 || currentFilters.department.includes(employee.department);

      // Apply type filter (if type field exists)
      const matchesType = currentFilters.type.length === 0 || (employee.type && currentFilters.type.includes(employee.type));

      return matchesSearch && matchesStatus && matchesDepartment && matchesType;
    });
  }, [employees, searchQuery, currentFilters]);

  // Calculate paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);
  // Reset to first page when filters or search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, currentFilters]);

  const handleFilterClick = () => {
    setIsFilterPopupOpen(true);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setCurrentFilters(filters);
  };

  const navigate = useNavigate();

  const handleRowClick = (employee: Employee) => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <div className="mb-2">
        <Topbar 
          title={
            <div className="w-[140px] h-[30px] font-semibold text-[19px] leading-6 text-[#16151C]">
              All Employees
            </div>
          } 
          subtitle="All Employee Information"
          subtitleClassName="font-light text-[14px] leading-6 text-[#9CA3AF]"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Search and Filter Bar */}
        <div className="p-4  flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rounded-lg">
              <img src="/images/search.png" className="h-[20px] w-[20px]" alt="Search" />
            </div>
            <input
              type="text"
              className="w-full bg-white pl-10 pr-3 py-2 border border-[#A2A1A81A] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-[#16151C33] placeholder:font-light"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-3 w-full md:w-auto">
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/add.png" className="h-[24px] w-[24px]" alt="Add" />
                  <span className="text-base leading-6 text-white text-[16px] font-light">Add New Employee</span>
                </div>
              }
              style={{ backgroundColor: 'hsla(252, 88%, 64%, 1.00)', color: 'white' }}
              className="px-4 py-2 rounded-lg text-sm hover:bg-[#5e44d1] w-[221px] h-[50px] flex items-center justify-center"
              onClick={() => navigate('/add-new-employee')}
            />
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/filter.png" className="h-[24px] w-[24px]" alt="Filter" />
                  <span className="text-base leading-6 text-black text-[16px] font-light">Filter</span>
                </div>
              }
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-light w-[120px] h-[50px] flex items-center justify-center"
              onClick={handleFilterClick}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="px-1 overflow-hidden ">
          <div className="overflow-auto text-sm">
            {paginatedUsers.length > 0 ? (
              <Table 
                columns={columns}
                data={paginatedUsers}
                onRowClick={handleRowClick}
                rowClassName="hover:bg-gray-50"
              />
              // <UserTable/>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No users found matching your search criteria
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-1 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)}
              onPageChange={setCurrentPage}
              totalItems={filteredEmployees.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </div>
      </div>

      {/* Filter Popup */}
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default AllEmployees;
