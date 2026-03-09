import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { mockPayrollData } from '../../mock/payroll';
import type { Payroll, PayrollStatus, TableColumn } from '../../types';
import Topbar from "../../Components/layout/Topbar";
import Table from "../../Components/table/Table";
import Button from "../../Components/buttons/Button";
import Pagination from "../../Components/table/Pagination";

const ITEMS_PER_PAGE = 10;

interface PayrollProps {
  onMount?: () => void;
}

const Payroll: React.FC<PayrollProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter] = useState<PayrollStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const columns: TableColumn<Payroll>[] = useMemo(() => [
    { 
      header: 'Employee Name', 
      accessor: 'name',
      className: 'font-[Lexend] text-[#16151C] font-medium',
      render: (name: string, payroll: Payroll) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
            {payroll.avatarUrl ? (
              <img 
                src={payroll.avatarUrl} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-50">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-[Lexend] text-[14px] font-light text-[#16151C]">{name}</span>
        </div>
      )
    },
    { 
      header: 'CTC', 
      accessor: 'ctc',
      className: 'font-[Lexend] text-[#16151C] font-light text-[14px] leading-5 px-1'  
    },
    { 
      header: 'Salary per Month', 
      accessor: 'salaryPerMonth',
      className: 'font-[Lexend] text-[#16151C] font-light text-[14px] leading-5 px-1' 
    },
    { 
      header: 'Deduction', 
      accessor: 'deduction',
      className: 'font-[Lexend] text-[#16151C] font-light text-[14px] leading-5 px-1' 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      className: 'font-[Lexend] text-[#16151C] font-light text-[14px] leading-5',
      render: (value: PayrollStatus) => {
        const statusColors = {
          'Completed': 'bg-[#10B9811A] text-[#10B981]',
          'Pending': 'bg-[#F59E0B1A] text-[#F59E0B]'
        };
        return (
          <span className={`font-[Lexend] inline-flex items-center justify-center px-2.5 py-1 rounded-[4px] text-xs font-medium ${statusColors[value]}`}>
            {value}
          </span>
        );
      }
    },
  ], []);

  const payrollData: Payroll[] = useMemo(() => mockPayrollData, []);

  const filteredPayroll = useMemo(() => {
    return payrollData.filter(payroll => {
      const matchesSearch = 
        payroll.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payroll.id.includes(searchQuery) ||
        payroll.email?.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === 'all' || !activeFilter) return matchesSearch;
      return matchesSearch && payroll.status === activeFilter;
    });
  }, [payrollData, searchQuery, activeFilter]);

  // Calculate paginated data
  const paginatedPayroll = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPayroll.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPayroll, currentPage]);
  // Reset to first page when filters or search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const navigate = useNavigate();

  const handleRowClick = (payroll: Payroll) => {
    navigate(`/payroll/${payroll.id}`);
  };

  return (
    <div className="w-full flex flex-col bg-white p-4 pt-0 pb-0">
      <div>
        <Topbar 
          title={
            <div className="w-[140px] font-semibold text-[20px] leading-6 text-[#16151C]">
              Payroll
            </div>
          } 
          subtitle="Employee Payroll Information"
          subtitleClassName="font-light text-[14px] leading-6 text-[#9CA3AF]"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white pt-0">
        {/* Search and Filter Bar */}
        <div className="p-4 pb-2 pt-2 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rounded-lg">
              <img src="/images/search.png" className="h-[20px] w-[20px]" alt="Search" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-[#A2A1A81A] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-[#16151C33] placeholder:font-light"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-[10px]">
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/upload.png" className="h-[24px] w-[24px]" alt="Add" />
                  <span className="text-base leading-6 text-[#FFFFFF] text-[16px] font-[300]">Export</span>
                </div>
              }
              className="px-4 py-[12px] rounded-[10px] text-sm hover:bg-[#5e44d1] bg-[#7152F3]"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="px-0 overflow-hidden">
          <div className="overflow-hidden text-sm">
            {paginatedPayroll.length > 0 ? (
              <div className="w-full min-w-[1550px] overflow-hidden">
                <Table 
                  columns={columns}
                  data={paginatedPayroll}
                  onRowClick={handleRowClick}
                  rowClassName="hover:bg-gray-50"
                />
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No payroll records found matching your search criteria
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-1 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPayroll.length / ITEMS_PER_PAGE)}
              onPageChange={setCurrentPage}
              totalItems={filteredPayroll.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;