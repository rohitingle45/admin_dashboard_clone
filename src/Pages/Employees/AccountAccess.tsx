import React from "react";

interface Props {
  isEditing: boolean;
}

export default function AccountAccess({ isEditing }: Props) {
  const info = {
    emailAddress: "brooklyn.s@example.com",
    slackId: "brooklyn_simmons",
    skypeId: "brooklyn_simmons",
    githubId: "brooklyn_simmons",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#A2A1A81A]">
      {Object.entries(info).map(([key, value], index) => (
        <div
          key={key}
          className={`py-4 px-2 border-b border-[#A2A1A81A] ${
            index % 2 === 0 ? "md:pr-6" : "md:pl-6"
          }`}
        >
          <label className="block text-[14px] text-[#A2A1A8] capitalize mb-1">
            {key.replace(/([A-Z])/g, " $1")}
          </label>

          {isEditing ? (
            <input
              defaultValue={value}
              className="w-full border border-[#A2A1A81A] rounded-lg px-3 py-2 text-[16px] text-[#16151C] focus:outline-none focus:ring-2 focus:ring-[#7152F3]"
            />
          ) : (
            <p className="text-[16px] text-[#16151C] font-light">
              {value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
