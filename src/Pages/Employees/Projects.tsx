import React from "react";

interface Props {
  isEditing: boolean;
}

const Projects: React.FC<Props> = ({ isEditing }) => {
  const projects = [
    {
      id: 1,
      name: "Amongus - Discovery Phase",
      start: "Feb 01, 2023",
      finish: "Mar 05, 2023",
      status: "Completed",
    },
    {
      id: 2,
      name: "Wildcare - Development Project",
      start: "Feb 12, 2023",
      finish: "April 20, 2023",
      status: "Completed",
    },
    {
      id: 3,
      name: "Hingutsan Web Development",
      start: "April 05, 2023",
      finish: "October 05, 2023",
      status: "In Process",
    },
    {
      id: 4,
      name: "Montillisy Ecommerce Platform",
      start: "May 12, 2023",
      finish: "August 12, 2023",
      status: "In Process",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#E8FFF0] text-[#2ECC71]";
      case "In Process":
        return "bg-[#FFF8E5] text-[#E6A100]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
      <div className="w-full overflow-x-auto">
     

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-[#A2A1A8] text-[14px] font-light">
            <th className="py-3 px-4">Sr. No.</th>
            <th className="py-3 px-4">Project Name</th>
            <th className="py-3 px-4">Start Date</th>
            <th className="py-3 px-4">Finish Date</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p, index) => (
            <tr
              key={p.id}
              className="border-b last:border-b-0 border-[#A2A1A81A]"
            >
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {index + 1}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {p.name}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {p.start}
              </td>
              <td className="py-4 px-4 text-[16px] text-[#16151C]">
                {p.finish}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 text-[13px] rounded-full font-medium ${getStatusColor(
                    p.status
                  )}`}
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
