import React from "react";

interface Props {
  isEditing: boolean;
}

const Leave: React.FC<Props> = ({ isEditing }) => {
  const leaves = [
    {
      date: "July 01, 2023",
      duration: "July 05 - July 08",
      days: "3 Days",
      manager: "Mark Willians",
      status: "Pending",
    },
    {
      date: "Apr 05, 2023",
      duration: "Apr 06 - Apr 10",
      days: "4 Days",
      manager: "Mark Willians",
      status: "Approved",
    },
    {
      date: "Mar 12, 2023",
      duration: "Mar 14 - Mar 16",
      days: "2 Days",
      manager: "Mark Willians",
      status: "Approved",
    },
    {
      date: "Feb 01, 2023",
      duration: "Feb 02 - Feb 10",
      days: "8 Days",
      manager: "Mark Willians",
      status: "Approved",
    },
    {
      date: "Jan 01, 2023",
      duration: "Jan 16 - Jan 19",
      days: "3 Days",
      manager: "Mark Willians",
      status: "Reject",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#E8FFF0] text-[#27AE60]";
      case "Pending":
        return "bg-[#FFF8E5] text-[#E6A100]";
      case "Reject":
      case "Rejected":
        return "bg-[#FFECEC] text-[#FF6B6B]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
     

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#A2A1A81A] text-[#A2A1A8] text-[14px] font-light">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Duration</th>
            <th className="py-3 px-4">Days</th>
            <th className="py-3 px-4">Reporting Manager</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l, idx) => (
            <tr key={idx} className="border-b border-[#A2A1A81A]">
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {l.date}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {l.duration}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {l.days}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {l.manager}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 text-[13px] rounded-full font-medium ${getStatusColor(
                    l.status
                  )}`}
                >
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leave;
