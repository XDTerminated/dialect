// SwitchButton.tsx
import React from 'react';
import { GoArrowSwitch } from 'react-icons/go';

const SwitchButton: React.FC = () => {
  return (
    <button
      className="
        flex-1 
        flex 
        items-center 
        justify-center 
        bg-[#3498db] 
        hover:bg-[#2980b9] 
        active:bg-[#1e6a92]
        p-3 
        rounded 
        transition 
        duration-300
      "
    >
      <GoArrowSwitch size={24} />
    </button>
  );
};

export default SwitchButton;
