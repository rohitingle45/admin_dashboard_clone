import React, { useState } from "react";
import Topbar from "../../Components/layout/Topbar";
import Button from "../../Components/buttons/Button";
import JobCard from "../../Components/cards/JobCard";
import JobsPopup from "../../Components/layout/JobsPopup";
import type { Job } from "../../types";

interface JobsProps {
  onMount?: () => void;
}

const Jobs: React.FC<JobsProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isJobsPopupOpen, setIsJobsPopupOpen] = useState(false);

  const handleAddJobClick = () => {
    setIsJobsPopupOpen(true);
  };

  const handleAddJob = (jobData: Omit<Job, 'status'>) => {
    console.log('Adding new job:', jobData);
    // Here you would typically add the job to your state or send it to an API
    // For now, we'll just log it
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <div className="mb-2">
        <Topbar 
          title={
            <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
              Jobs
            </div>
          } 
          subtitle="Show All Jobs"
          subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Search and Filter Bar */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border border-[#A2A1A81A] rounded-lg">
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

          <div className="flex space-x-3 w-full h-[50px] md:w-auto">
            <Button 
              label={
                <div className="flex items-center space-x-2">
                  <img src="/images/add.png" className="h-[24px] w-[24px]" alt="Add" />
                  <span className="text-base leading-6 text-white text-[16px] font-medium">Add New Job</span>
                </div>
              }
              style={{ backgroundColor: '#7152F3', color: 'white' }}
              className="px-4 py-2 rounded-lg text-sm hover:bg-[#5e44d1]"
              onClick={handleAddJobClick}
            />
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="p-4 flex gap-4">
          {/* Active Jobs - First Div */}
          <div className="w-full h-fit border border-gray-200 rounded-lg bg-white p-4">
            <div className="flex items-center mb-4">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              <h2 className="font-['Lexend'] font-semibold text-[18px] text-[#16151C]">Active Jobs</h2>
            </div>
            
            <div className="space-y-3">
              <JobCard
                title="UI/UX Designer"
                department="Design"
                tags={["Design", "Full Time", "Remote"]}
                location="California, USA"
                salary="$3600"
              />
              
              <JobCard
                title="Sr. UX Researcher"
                department="Design"
                tags={["Design", "Full Time"]}
                location="New York, USA"
                salary="$1500"
              />
              
              <JobCard
                title="BDM"
                department="Sales"
                tags={["Sales", "Full Time"]}
                location="New York, USA"
                salary="$1000"
              />
              
              <JobCard
                title="React JS"
                department="Developer"
                tags={["Developer", "Full Time"]}
                location="California, USA"
                salary="$2000"
              />
            </div>
          </div>

          {/* Inactive Jobs - Second Div */}
          <div className="w-full h-[754px] border border-gray-200 rounded-lg bg-white p-4">
            <div className="flex items-center mb-4">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
              <h2 className="font-['Lexend'] font-semibold text-[18px] text-[#16151C]">Inactive Jobs</h2>
            </div>
            
            <div className="space-y-3">
              <JobCard
                title="Hr Executive"
                department="HR"
                tags={["HR", "Full Time", "Remote"]}
                location="California, USA"
                salary="$3600"
              />
              
              <JobCard
                title="Python Developer"
                department="Developer"
                tags={["Developer", "Full Time"]}
                location="New York, USA"
                salary="$1500"
              />
            </div>
          </div>

          {/* Completed Jobs - Third Div */}
          <div className="w-full h-[754px] border border-gray-200 rounded-lg bg-white p-4">
            <div className="flex items-center mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <h2 className="font-['Lexend'] font-semibold text-[18px] text-[#16151C]">Completed Jobs</h2>
            </div>
            
            <div className="space-y-3">
              <JobCard
                title="UI/UX Designer"
                department="Design"
                tags={["Design", "Full Time", "Remote"]}
                location="California, USA"
                salary="$3600"
              />
              
              <JobCard
                title="Sr. UX Researcher"
                department="Design"
                tags={["Design", "Full Time"]}
                location="New York, USA"
                salary="$1500"
              />

              <JobCard
                title="BDM"
                department="Sales"
                tags={["Sales", "Full Time"]}
                location="New York, USA"
                salary="$1000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Popup */}
      <JobsPopup
        isOpen={isJobsPopupOpen}
        onClose={() => setIsJobsPopupOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
};

export default Jobs;
