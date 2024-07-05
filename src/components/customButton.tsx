import React from "react";
import { cn } from "@/lib/utils";
const CustomButton = ({ icon, text, onClick }: { icon: any, text: any, onClick: any }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-4 my-2 border border-[#ffc745] rounded-lg bg-white text-[#f7cb48] hover:bg-gray-200 transition-colors",
        text
      )}
    >
      <div className="flex items-center justify-center w-6 h-6 bg-[#F1FA05] rounded-full mr-2">
        <span>{icon}</span>
      </div>
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
