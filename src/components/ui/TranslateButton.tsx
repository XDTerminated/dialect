import React from "react";

interface TranslateButtonProps {
    onClick: () => void; // Adding the click handler
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
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
        text-xl
      "
        >
            Translate
        </button>
    );
};

export default TranslateButton;
