import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Topbar from "../../Components/layout/Topbar";
import Button from "../../Components/buttons/Button";
import mockEmployees from "../../mock/employees";
import SideOption from "./SideOption";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import Documents from "./Documents";
import AccountAccess from "./AccountAccess";
import Attendance from "./Attendance";
import Projects from "./Projects";
import Leave from "./Leave";

const tabs = [
  { key: "personal", label: "Personal Information", icon: "/images/user.svg", activeIcon: "/images/user-active.svg" },
  { key: "professional", label: "Professional Information", icon: "/images/briefcase.svg", activeIcon: "/images/briefcase-active.png" },
  { key: "documents", label: "Documents", icon: "/images/document-text.svg", activeIcon: "/images/document-text-active.png" },
  { key: "access", label: "Account Access", icon: "/images/lock.svg", activeIcon: "/images/lock-active.svg" },
];

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employee = React.useMemo(() => mockEmployees.find((e) => e.id === id), [id]);
  const [activeTab, setActiveTab] = React.useState<string>("personal");
  const [leftActive, setLeftActive] = React.useState<string>("profile");

  React.useEffect(() => {
    if (leftActive === "profile") setActiveTab("personal");
  }, [leftActive]);

  if (!employee) {
    return (
      <div className="w-full">
        <Topbar
          title={<div className="font-light text-[18px] text-[#16151C]">Employee Details</div>}
          subtitle="Employee not found"
          subtitleClassName="text-[15px] text-[#A2A1A8]"
        />
        <div className="p-6 text-[16px] text-[#16151C]">No employee found for id: {id}</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">

      {/* Top Header */}
      <div className="flex justify-between items-center bg-white px-6 py-3 border-gray-200">
        <div>
          {/* Title */}
          <div className="text-[#16151C] font-semibold text-[20px] leading-[26px]">
            {employee.name}
          </div>

          {/* Breadcrumb */}
          <div className="text-[14px] font-normal leading-[20px] text-[#16151C] mt-1 flex items-center space-x-1">
            <span onClick={() => navigate("/all-employees")} className="cursor-pointer hover:text-[#7152F3]">
              All Employee
            </span>
            <span>›</span>
            <span>{employee.name}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          {/* Search */}
          <div className="flex items-center border border-[#E5E5E5] rounded-[10px] px-4 py-2 w-[240px] bg-white gap-2">
            <img src="/images/search.png" alt="search" className="w-4 h-4 opacity-70" />
            <input type="text" placeholder="Search" className="bg-transparent outline-none text-[14px] text-[#16151C] w-full" />
          </div>

          {/* Notification */}
          <div className="flex items-center justify-center w-[44px] h-[44px] rounded-md border border-[#E5E5E5] bg-white cursor-pointer hover:bg-[#F9F9F9] transition">
            <img src="/images/notification.png" alt="notification" className="w-5 h-5" />
          </div>

          {/* Profile */}
          <div className="flex items-center border border-[#E5E5E5] bg-white rounded-[10px] px-3 py-2 gap-2 cursor-pointer hover:shadow-sm transition">
            <img src={employee.avatarUrl} alt="Profile" className="w-8 h-8 rounded-md object-cover" />
            <div>
              <div className="text-[14px] font-semibold text-[#16151C]">Robert Allen</div>
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-[#16151C]">HR Manager</span>
                <img src="/images/Vector 175.png" alt="▼" className="w-3 h-3 opacity-60" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Employee Card */}
      <div className="bg-white border border-gray-200 rounded-xl mx-6 my-4 shadow-sm">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-gray-100">

          <div className="flex items-center space-x-4">
            <div className="h-[80px] w-[80px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {employee.avatarUrl ? (
                <img src={employee.avatarUrl} className="h-full w-full object-cover" />
              ) : (
                <div className="text-gray-500 text-lg font-semibold">
                  {employee.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <div className="text-[18px] font-semibold text-[#16151C] leading-[24px] mb-1">
                {employee.name}
              </div>

              <div className="flex items-center text-[14px] text-[#16151C] gap-2 leading-[20px]">
                <img src="/images/briefcase.svg" className="w-4 h-4 opacity-70" />
                {employee.designation}
              </div>

              <div className="flex items-center text-[14px] text-[#16151C] gap-2 leading-[20px] mt-1">
                <img src="/images/gmail.svg" className="w-4 h-4 opacity-70" />
                {employee.email}
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            label={
              <span className="flex items-center gap-2 text-[14px] text-white">
                <img src="/images/edit.png" className="w-4 h-4" /> Edit Profile
              </span>
            }
            style={{ backgroundColor: "#7152F3" }}
            className="px-4 py-2 rounded-lg hover:bg-[#5e44d1] mt-4 md:mt-0"
            onClick={() => navigate(`/add-new-employee?edit=${employee.id}`)}
          />
        </div>

        {/* Layout Body */}
        <div className="flex flex-col md:flex-row">

          {/* Sidebar */}
          <div className="w-full md:w-[220px] p-4">
            <SideOption active={leftActive} onChange={setLeftActive} />
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 pt-4">

            {leftActive === "profile" && (
              <>
                {/* Tabs */}
              {/* Tabs – increased spacing more */}
<div className="border-b border-gray-100 mb-5">
  <div className="flex items-center h-[48px] px-6 justify-between">

    {/* Left tabs with *more* spacing */}
    <div className="flex items-center gap-[56px]">
      {tabs.map((t, i) => {
        const active = activeTab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 h-[48px] px-1 text-[15px] leading-[22px] ${
              active
                ? "text-[#7152F3] font-semibold border-b-2 border-[#7152F3]"
                : "text-[#444] font-normal"
            }`}
          >
            <img 
              src={active ? t.activeIcon : t.icon}
              className="w-[20px] h-[20px]"
            />
            {t.label}
          </button>
        );
      })}
    </div>

    {/* Right padding equal to left padding */}
    <div className="w-[24px]"></div>
  </div>
</div>


                {/* Tab Content */}
                <div>
                  {activeTab === "personal" && <PersonalInfo isEditing={false} />}
                  {activeTab === "professional" && <ProfessionalInfo isEditing={false} />}
                  {activeTab === "documents" && <Documents isEditing={false} />}
                  {activeTab === "access" && <AccountAccess isEditing={false} />}
                </div>
              </>
            )}

            {leftActive === "attendance" && <Attendance isEditing={false} />}
            {leftActive === "projects" && <Projects isEditing={false} />}
            {leftActive === "leave" && <Leave isEditing={false} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
