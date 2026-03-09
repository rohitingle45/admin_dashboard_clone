import React from "react";

const Attendance: React.FC = () => {
  const data = [
    { date: "July 01, 2023", checkIn: "09:28 AM", checkOut: "07:00 PM", break: "00:30 Min", hours: "09:02 Hrs", status: "On Time" },
    { date: "July 02, 2023", checkIn: "09:20 AM", checkOut: "07:00 PM", break: "00:20 Min", hours: "09:20 Hrs", status: "On Time" },
    { date: "July 03, 2023", checkIn: "09:25 AM", checkOut: "07:00 PM", break: "00:30 Min", hours: "09:05 Hrs", status: "On Time" },
    { date: "July 04, 2023", checkIn: "09:45 AM", checkOut: "07:00 PM", break: "00:40 Min", hours: "08:35 Hrs", status: "Late" },
    { date: "July 05, 2023", checkIn: "10:00 AM", checkOut: "07:00 PM", break: "00:30 Min", hours: "08:30 Hrs", status: "Late" },
    { date: "July 06, 2023", checkIn: "09:28 AM", checkOut: "07:00 PM", break: "00:30 Min", hours: "09:02 Hrs", status: "On Time" },
    { date: "July 07, 2023", checkIn: "09:30 AM", checkOut: "07:00 PM", break: "00:15 Min", hours: "09:15 Hrs", status: "On Time" },
    { date: "July 08, 2023", checkIn: "09:52 AM", checkOut: "07:00 PM", break: "00:45 Min", hours: "08:23 Hrs", status: "Late" },
    { date: "July 09, 2023", checkIn: "09:10 AM", checkOut: "07:00 PM", break: "00:30 Min", hours: "09:02 Hrs", status: "On Time" },
    { date: "July 10, 2023", checkIn: "09:48 AM", checkOut: "07:00 PM", break: "00:42 Min", hours: "08:30 Hrs", status: "Late" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-[14px] text-[#16151C]">
        <thead>
          <tr className="text-left font-normal border-b border-[#F3F3F3]">
            <th className="py-3 text-[#A2A1A8] font-normal">Date</th>
            <th className="py-3 text-[#A2A1A8] font-normal">Check In</th>
            <th className="py-3 text-[#A2A1A8] font-normal">Check Out</th>
            <th className="py-3 text-[#A2A1A8] font-normal">Break</th>
            <th className="py-3 text-[#A2A1A8] font-normal">Working Hours</th>
            <th className="py-3 text-[#A2A1A8] font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-[#F3F3F3] last:border-none hover:bg-[#FAFAFA] transition-colors"
            >
              <td className="py-3">{row.date}</td>
              <td className="py-3">{row.checkIn}</td>
              <td className="py-3">{row.checkOut}</td>
              <td className="py-3">{row.break}</td>
              <td className="py-3">{row.hours}</td>
              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    row.status === "On Time"
                      ? "bg-[#E7F9EE] text-[#3DBE65]"
                      : "bg-[#FCE9E9] text-[#E03A3A]"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
