import React, { useState } from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown";
import SwitchButton from "./ui/SwitchButton";
import TranslateButton from "./ui/TranslateButton";
import { fetchResponse } from "../api/fetchResponse"; // Import your API function
import { Progress } from "./ui/Progress";
import { FaTrash, FaRegCopy, FaRegClipboard } from "react-icons/fa"; // Import icons

const TranslatorBoxes = () => {
    // State for dropdown items
    const [dropdownItems1, setDropdownItems1] = useState([
        { label: "Option 1" },
        { label: "Option 2" },
        { label: "Option 3" }
    ]);
    const [dropdownItems2, setDropdownItems2] = useState([
        { label: "Option A" },
        { label: "Option B" },
        { label: "Option C" }
    ]);

    // State for selected values
    const [selectedValue1, setSelectedValue1] = useState("Select Option");
    const [selectedValue2, setSelectedValue2] = useState("Select Option");

    // State to hold the content of the editable Textarea
    const [textareaValue, setTextareaValue] = useState("");
    // State to hold the content of the non-editable Textarea (translation result)
    const [translationValue, setTranslationValue] = useState("");
    // State to track if translation is in progress
    const [isTranslating, setIsTranslating] = useState(false);
    // State for progress bar value
    const [progressValue, setProgressValue] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);

    // Handle Switching Selected Components
    const handleSwitch = () => {
        // Swap dropdown items
        setDropdownItems1(prev => dropdownItems2);
        setDropdownItems2(prev => prev);
        
        // Swap selected values
        const tempValue = selectedValue1;
        setSelectedValue1(selectedValue2);
        setSelectedValue2(tempValue);
    };

    // Handler for dropdown selection
    const handleSelect1 = (label: string) => {
        setSelectedValue1(label);
        console.log("Selected from Dropdown 1:", label);
    };

    const handleSelect2 = (label: string) => {
        setSelectedValue2(label);
        console.log("Selected from Dropdown 2:", label);
    };

    // Function to count the words in the textarea
    const countWords = (text) => {
        return text.trim().split(/\s+/).length;
    };

    // Handler for Translate button click
    const handleTranslateClick = async () => {
        const wordCount = countWords(textareaValue);

        if (wordCount > 5) {
            try {
                // Start translation and display progress bar
                setIsTranslating(true);
                setProgressValue(0); // Reset progress bar

                // Simulate progress increase
                const progressInterval = setInterval(() => {
                    setProgressValue((prev) => Math.min(prev + 10, 100));
                }, 100); // Increase progress every 100ms

                // Call the API with the textarea content
                const result = await fetchResponse(textareaValue);

                // Extract the text content from the API response
                const extractedText = result?.["choices"]?.[0]?.["message"]?.["content"] || "No content available";

                // Log the extracted text for debugging
                console.log(extractedText);

                // Set the extracted text in the non-editable textarea
                setTranslationValue(extractedText);

                // Complete the progress bar
                clearInterval(progressInterval);
                setProgressValue(100);

                // Hide progress bar after a short delay
                setTimeout(() => {
                    setIsTranslating(false);
                }, 500);
            } catch (error) {
                console.error("Error:", error);
                setTranslationValue("An error occurred during translation.");
                setIsTranslating(false);
            }
        } else {
            setTranslationValue("Please enter more than 5 words for translation.");
        }
    };

    // Function to clear the textarea
    const handleClearText = () => {
        setTextareaValue("");
        setTranslationValue("");
    };

    // Function to copy the translation text
    const handleCopyText = () => {
        navigator.clipboard.writeText(translationValue);
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 500);
    };

    return (
        <div className="p-4 flex flex-col justify-center items-start space-y-4 flex-[10_0_0%]">
            {/* Progress Bar */}
            {isTranslating && (
                <div className="w-full mb-4">
                    <Progress value={progressValue} />
                </div>
            )}

            {/* Flex Row for Dropdowns */}
            <div className="flex space-x-4 flex-1 w-full">
                <Dropdown
                    label={selectedValue1}
                    items={dropdownItems1}
                    onSelect={handleSelect1}
                    disabled={isTranslating} // Disable during translation
                />
                <SwitchButton onClick={handleSwitch} disabled={isTranslating} /> {/* Disable switch button */}
                <Dropdown
                    label={selectedValue2}
                    items={dropdownItems2}
                    onSelect={handleSelect2}
                    disabled={isTranslating} // Disable during translation
                />
            </div>

            {/* Flex Row for Textareas */}
            <div className="flex space-x-4 flex-[20_0_0%] w-full">
                {/* Editable Textarea (Left Box) */}
                <div className="relative flex-grow flex">
                    <Textarea
                        className="rounded-md border border-input bg-background text-xl ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
                        placeholder="Type here..."
                        value={textareaValue} // Bind the state to the Textarea
                        onChange={(e) => setTextareaValue(e.target.value)} // Update state on change
                        disabled={isTranslating} // Disable during translation
                    />
                    <button
                        onClick={handleClearText}
                        className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-700 transition"
                        style={{ fontSize: '1.5rem' }}
                    >
                        <FaTrash />
                    </button>
                </div>

                {/* Non-editable Textarea (Right Box) */}
                <div className="relative flex-grow flex">
                    <NonEditableTextarea
                        className="rounded-md border border-input bg-background text-xl ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-100 resize-none"
                        placeholder="Translation will appear here..."
                        value={translationValue} // Bind the state of the non-editable Textarea
                        readOnly
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-2 text-gray-500 hover:text-gray-700">
                        <FaRegClipboard
                            style={{
                                fontSize: '1.5rem',
                                opacity: isFlashing ? 1 : 0, // Flash effect via opacity
                                transition: "opacity 0.5s ease", // Smooth transition
                            }}
                        />
                        <button
                            onClick={handleCopyText}
                            className="text-gray-500 hover:text-gray-700 transition"
                            style={{ fontSize: '1.5rem' }} // Increase icon size
                        >
                            <FaRegCopy />
                        </button>
                    </div>
                </div>
            </div>

            {/* Translate Button */}
            <div className="flex space-x-4 flex-1 w-full">
                <TranslateButton onClick={handleTranslateClick} disabled={isTranslating} /> {/* Disable button during translation */}
            </div>
        </div>
    );
};

export default TranslatorBoxes;
