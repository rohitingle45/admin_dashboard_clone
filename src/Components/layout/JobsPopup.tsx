import React, { useState } from 'react';
import type { Job } from '../../types';

interface JobsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Omit<Job, 'status'>) => void;
}

interface JobsPopupState {
    type: string[];
}

const JobsPopup: React.FC<JobsPopupProps> = ({ isOpen, onClose, onAddJob }) => {
    
   const [tempFilters, setTempFilters] = useState<JobsPopupState>({
        type: [],
    });
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    tags: [] as string[],
    location: '',
    salary: ''
  });
  const [currentTag, setCurrentTag] = useState('');

  const departments = [
    'Design', 'HR', 'Sales', 'Business Analyst', 'Project Manager',
    'Java', 'Python', 'React JS', 'Account', 'Node JS'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (category: keyof JobsPopupState, value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [category]: (prev[category as keyof JobsPopupState] as string[])?.includes(value)
        ? (prev[category as keyof JobsPopupState] as string[]).filter(item => item !== value)
        : [...(prev[category as keyof JobsPopupState] as string[]), value]
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.department && formData.location && formData.salary) {
      onAddJob(formData);
      // Reset form
      setFormData({
        title: '',
        department: '',
        tags: [],
        location: '',
        salary: ''
      });
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      department: '',
      tags: [],
      location: '',
      salary: ''
    });
    onClose();
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
            <h2 className="text-lg font-semibold text-gray-900">Add New Job</h2>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-4 h-fit overflow-y-auto">
              {/* Department */}
              <div className="mb-5">
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-[#A2A1A8CC] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              {/* Job Title */}
              <div className="mb-5">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter job title"
                  required
                />
              </div>
              {/* Location */}
              <div className="mb-5">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Salary */}
              <div className="mb-5">
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter salary"
                  required
                />
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
            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="flex space-x-2 justify-between w-full">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full px-3 py-2 text-[16px] font-medium font-['Poppins'] text-gray-700 bg-white border border-gray-300 rounded-[10px]
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-[16px] font-medium font-['Poppins'] text-[#FFFFFF] bg-[#7152F3] border border-transparent rounded-[10px]
                    hover:bg-[#7152F3] focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Add Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobsPopup;
