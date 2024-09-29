// TranslateButton.tsx
import React from 'react';

const TranslateButton: React.FC = () => {
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
        text-white 
        p-3 
        rounded 
        transition 
        duration-300
      "
    >
      Translate
    </button>
  );
};

export default TranslateButton;
