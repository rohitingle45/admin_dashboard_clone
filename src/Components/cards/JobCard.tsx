import React from 'react';

interface JobCardProps {
  title: string;
  department: string;
  tags: string[];
  location: string;
  salary: string;
  icon?: string;
}

const JobCard: React.FC<JobCardProps> = ({ 
  title, 
  department, 
  tags, 
  location, 
  salary,
  icon = "/images/briefcase.png"
}) => {
  return (
    <div className="bg-[#A2A1A80D] border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      {/* Job Title and Department */}
      <div className="flex items-start mb-3">
        <div className="w-[45px] h-[45px] bg-[#A2A1A80D] rounded-[5px] flex items-center justify-center mr-3">
          <img src={icon} className="w-[24px] h-[24px]" alt="Job Icon" />
        </div>
        <div>
          <h3 className="font-['Lexend'] font-semibold text-[16px] text-[#241F18]">
            {title}
          </h3>
          <p className="font-['Lexend'] font-light text-[14px] text-[#A2A1A8]">
            {department}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1.5 bg-[#7152F3] text-white rounded-md text-[12px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Location and Salary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[#241F18]">
          <img src="/images/location.png" className="w-4 h-4 mr-1" alt="Location" />
          <span className="font-['Lexend'] font-light text-[14px]">{location}</span>
        </div>
        <div className="font-['Lexend'] font-semibold text-[18px] text-[#241F18]">
          {salary}<span className="font-light text-[16px]">/Month</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
