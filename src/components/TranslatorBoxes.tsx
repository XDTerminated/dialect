// import React, { useState } from "react";
// import { NonEditableTextarea, Textarea } from "./ui/Textarea";
// import Dropdown from "./ui/Dropdown";
// import SwitchButton from "./ui/SwitchButton";
// import TranslateButton from "./ui/TranslateButton";
// import { fetchResponse } from "../api/fetchResponse"; // Import your API function

// const TranslatorBoxes = () => {
//     // State to hold the content of the editable Textarea
//     const [textareaValue, setTextareaValue] = useState("");
//     // State to hold the content of the non-editable Textarea (translation result)
//     const [translationValue, setTranslationValue] = useState("");

//     // Sample dropdown items for demonstration
//     const dropdownItems1 = [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }];
//     const dropdownItems2 = [{ label: "Option A" }, { label: "Option B" }, { label: "Option C" }];

//     // Handler for dropdown selection
//     const handleSelect1 = (label) => {
//         console.log("Selected from Dropdown 1:", label);
//     };

//     const handleSelect2 = (label) => {
//         console.log("Selected from Dropdown 2:", label);
//     };

//     // Function to count the words in the textarea
//     const countWords = (text) => {
//         return text.trim().split(/\s+/).length;
//     };

//     // Handler for Translate button click
//     // Handler for Translate button click
//     const handleTranslateClick = async () => {
//         const wordCount = countWords(textareaValue);

//         if (wordCount > 5) {
//             try {
//                 // Call the API with the textarea content
//                 const result = await fetchResponse(textareaValue);

//                 // Extract the text content from the API response
//                 const extractedText = result?.content?.[0]?.text || "No content available";

//                 // Log the extracted text for debugging
//                 console.log(extractedText);

//                 // Set the extracted text in the non-editable textarea
//                 setTranslationValue(extractedText);
//             } catch (error) {
//                 console.error("Error:", error);
//                 setTranslationValue("An error occurred during translation.");
//             }
//         } else {
//             setTranslationValue("Please enter more than 5 words for translation.");
//         }
//     };

//     return (
//         <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4">
//             {/* Flex Row for Dropdowns */}
//             <div className="flex space-x-4 flex-1 w-full">
//                 <Dropdown label="Select Option" items={dropdownItems1} onSelect={handleSelect1} />
//                 <SwitchButton />
//                 <Dropdown label="Select Option" items={dropdownItems2} onSelect={handleSelect2} />
//             </div>

//             {/* Flex Row for Textareas */}
//             <div className="flex space-x-4 flex-[20_0_0%] w-full">
//                 {/* Editable Textarea (Left Box) */}
//                 <Textarea
//                     className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
//                     placeholder="Type here..."
//                     value={textareaValue} // Bind the state to the Textarea
//                     onChange={(e) => setTextareaValue(e.target.value)} // Update state on change
//                 />

//                 {/* Non-editable Textarea (Right Box) */}
//                 <NonEditableTextarea
//                     className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none"
//                     placeholder="Translation will appear here..."
//                     value={translationValue} // Bind the state of the non-editable Textarea
//                     readOnly
//                 />
//             </div>

//             {/* Translate Button */}
//             <div className="flex space-x-4 flex-1 w-full">
//                 <TranslateButton onClick={handleTranslateClick} /> {/* Pass the click handler */}
//             </div>
//         </div>
//     );
// };

// export default TranslatorBoxes;

import React, { useState } from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown";
import SwitchButton from "./ui/SwitchButton";
import TranslateButton from "./ui/TranslateButton";
import { fetchResponse } from "../api/fetchResponse"; // Import your API function
import { Progress } from "./ui/progress";

const TranslatorBoxes = () => {
    // State to hold the content of the editable Textarea
    const [textareaValue, setTextareaValue] = useState("");
    // State to hold the content of the non-editable Textarea (translation result)
    const [translationValue, setTranslationValue] = useState("");
    // State to track if translation is in progress
    const [isTranslating, setIsTranslating] = useState(false);
    // State for progress bar value
    const [progressValue, setProgressValue] = useState(0);

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
                const extractedText = result?.content?.[0]?.text || "No content available";

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

    return (
        <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4">
            {/* Progress Bar */}
            {isTranslating && (
                <div className="w-full mb-4">
                    <Progress value={progressValue} />
                </div>
            )}

            {/* Flex Row for Dropdowns */}
            <div className="flex space-x-4 flex-1 w-full">
                <Dropdown
                    label="Select Option"
                    items={dropdownItems1}
                    onSelect={handleSelect1}
                    disabled={isTranslating} // Disable during translation
                />
                <SwitchButton disabled={isTranslating} /> {/* Disable switch button */}
                <Dropdown
                    label="Select Option"
                    items={dropdownItems2}
                    onSelect={handleSelect2}
                    disabled={isTranslating} // Disable during translation
                />
            </div>

            {/* Flex Row for Textareas */}
            <div className="flex space-x-4 flex-[20_0_0%] w-full">
                {/* Editable Textarea (Left Box) */}
                <Textarea
                    className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
                    placeholder="Type here..."
                    value={textareaValue} // Bind the state to the Textarea
                    onChange={(e) => setTextareaValue(e.target.value)} // Update state on change
                    disabled={isTranslating} // Disable during translation
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
                <TranslateButton onClick={handleTranslateClick} disabled={isTranslating} /> {/* Disable button during translation */}
            </div>
        </div>
    );
};

export default TranslatorBoxes;
