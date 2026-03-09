import React from "react";

interface Props {
  isEditing: boolean;
}

export default function PersonalInfo({ isEditing }: Props) {
  const info = {
    firstName: "Brooklyn",
    lastName: "Simmons",
    mobileNumber: "(702) 555-0122",
    emailAddress: "brooklyn.s@example.com",
    dateOfBirth: "July 14, 1995",
    maritalStatus: "Married",
    gender: "Female",
    nationality: "America",
    address: "2464 Royal Ln. Mesa, New Jersey",
    city: "California",
    state: "United State",
    zipCode: "35624",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
      {Object.entries(info).map(([key, value]) => (
        <div
          key={key}
          className="border-b pb-3"
          style={{ borderColor: "#A2A1A81A" }}
        >
          {/* Label / Key */}
          <label className="block text-[14px] text-[#A2A1A8] capitalize mb-1 font-light">
            {key.replace(/([A-Z])/g, " $1")}
          </label>

          {/* Value / Input */}
          {isEditing ? (
            <input
              defaultValue={value}
              className="w-full border border-[#D9D9D9] rounded-md px-3 py-2 text-[#16151C] text-[16px]  font-light focus:outline-none focus:ring-2 focus:ring-[#7152F3]"
            />
          ) : (
            <p className="text-[16px] text-[#16151C] font-light">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}