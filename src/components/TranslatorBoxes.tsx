import React from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown"; // Import your Dropdown component
import { GoArrowSwitch } from "react-icons/go";
import SwitchButton from "./ui/SwitchButton";
import TranslateButton from "./ui/TranslateButton";

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
        <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4"> {/* Changed space-y-0 to space-y-4 for 16px gap */}
            {/* Flex Row for Dropdowns */}
            <div className="flex space-x-4 flex-1 w-full"> {/* Added flex-1 and space-x-4 for 16px gap */}
                {/* Dropdown for Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems1} onSelect={handleSelect1} />
                <SwitchButton />
                {/* Dropdown for Non-Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems2} onSelect={handleSelect2} />
            </div>

            {/* Flex Row for Textareas */}
            <div className="flex space-x-4 flex-[20_0_0%] w-full"> {/* Added flex-6 and space-x-4 for 16px gap */}
                {/* Editable Textarea (Left Box) */}
                <Textarea className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none" placeholder="Type here..." />

                {/* Non-editable Textarea (Right Box) */}
                <NonEditableTextarea className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none" placeholder="Translation will appear here..." readOnly />
            </div>
            <div className="flex space-x-4 flex-1 w-full">
                <TranslateButton/>
            </div>
        </div>
    );
};

export default TranslatorBoxes;
