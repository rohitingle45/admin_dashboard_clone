// import React from "react";

// interface IconButtonProps {
//   icon: string;
//   alt: string;
//   isActive?: boolean;
//   dark?: boolean;
//   className?: string;
// }

// const IconButton: React.FC<IconButtonProps> = ({ 
//   icon, 
//   alt, 
//   isActive = false, 
//   dark = false,
//   className = ""  
// }) => {
//   const color = isActive
//     ? "#7152F3"
//     : dark
//     ? "#ffffffcc" // semi-transparent white in dark mode
//     : "#16151C99"; // semi-transparent black in light mode

//   return (
//     <div className={`w-[24px] h-[24px] mr-3 flex-shrink-0 ${className}`}>
//       <img
//         src={icon}
//         alt={alt}
//         className="w-full h-full transition-all duration-200"
//         style={{
//           filter: `invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(1)`,
//           color, // this sets "currentColor"
//         }}
//       />
//     </div>
//   );
// };

// export default IconButton;
