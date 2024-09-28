import React from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown"; // Import your Dropdown component

const TranslatorBoxes = () => {
    // Sample dropdown items for demonstration
    const dropdownItems1 = [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }];

    const dropdownItems2 = [{ label: "Option A" }, { label: "Option B" }, { label: "Option C" }];

    // Handler for dropdown selection
    const handleSelect1 = (label) => {
        console.log("Selected from Dropdown 1:", label);
        // Add any additional logic you need for this dropdown
    };

    const handleSelect2 = (label) => {
        console.log("Selected from Dropdown 2:", label);
        // Add any additional logic you need for this dropdown
    };

    return (
        <div className="flex justify-center items-start min-h-screen pt-10 space-x-4">
            {/* Left Side: Dropdown and Editable Textarea */}
            <div className="flex flex-col">
                {/* Dropdown for Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems1} onSelect={handleSelect1} />

                {/* Editable Textarea (Left Box) */}
                <Textarea className="h-96 w-[600px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none" placeholder="Type here..." />
            </div>

            {/* Right Side: Dropdown and Non-Editable Textarea */}
            <div className="flex flex-col">
                {/* Dropdown for Non-Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems2} onSelect={handleSelect2} />

                {/* Non-editable Textarea (Right Box) */}
                <NonEditableTextarea className="h-96 w-[600px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none" placeholder="Translation will appear here..." readOnly />
            </div>
        </div>
    );
};

export default TranslatorBoxes;
