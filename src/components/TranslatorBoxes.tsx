import React, { useState } from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown";
import SwitchButton from "./ui/SwitchButton";
import TranslateButton from "./ui/TranslateButton";

const TranslatorBoxes = () => {
    // State to hold the content of the editable Textarea
    const [textareaValue, setTextareaValue] = useState("");
    // State to hold the content of the non-editable Textarea (translation result)
    const [translationValue, setTranslationValue] = useState("");

    // Sample dropdown items for demonstration
    const dropdownItems1 = [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }];
    const dropdownItems2 = [{ label: "Option A" }, { label: "Option B" }, { label: "Option C" }];

    // Handler for dropdown selection
    const handleSelect1 = (label) => {
        console.log("Selected from Dropdown 1:", label);
    };

    const handleSelect2 = (label) => {
        console.log("Selected from Dropdown 2:", label);
    };

    // Handler for Translate button click
    const handleTranslateClick = () => {
        // Set the non-editable textarea's value to whatever is in the editable textarea
        setTranslationValue(textareaValue);
    };

    return (
        <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4">
            {/* Flex Row for Dropdowns */}
            <div className="flex space-x-4 flex-1 w-full">
                {/* Dropdown for Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems1} onSelect={handleSelect1} />
                <SwitchButton />
                {/* Dropdown for Non-Editable Textarea */}
                <Dropdown label="Select Option" items={dropdownItems2} onSelect={handleSelect2} />
            </div>

            {/* Flex Row for Textareas */}
            <div className="flex space-x-4 flex-[20_0_0%] w-full">
                {/* Editable Textarea (Left Box) */}
                <Textarea
                    className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
                    placeholder="Type here..."
                    value={textareaValue} // Bind the state to the Textarea
                    onChange={(e) => setTextareaValue(e.target.value)} // Update state on change
                />

                {/* Non-editable Textarea (Right Box) */}
                <NonEditableTextarea
                    className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none"
                    placeholder="Translation will appear here..."
                    value={translationValue} // Bind the state of the non-editable Textarea
                    readOnly
                />
            </div>

            {/* Translate Button */}
            <div className="flex space-x-4 flex-1 w-full">
                <TranslateButton onClick={handleTranslateClick} /> {/* Pass the click handler */}
            </div>
        </div>
    );
};

export default TranslatorBoxes;
