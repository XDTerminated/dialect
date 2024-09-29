import React, { useState } from "react";
import { Progress } from "@/components/ui/Progress";
import { fetchResponse } from "@/api/fetchResponse"; // Assuming you have this function for fetching the translation

const TranslatorApp = () => {
    const [text, setText] = useState("");
    const [isTranslating, setIsTranslating] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [translatedText, setTranslatedText] = useState("");

    const handleTranslate = async () => {
        setIsTranslating(true);
        setProgressValue(0);

        // Simulate progress over time
        const progressInterval = setInterval(() => {
            setProgressValue((prev) => Math.min(prev + 10, 100));
        }, 100); // Simulate progress every 100ms

        try {
            // Call the API to get the translation
            const response = await fetchResponse(text);

            if (response.success) {
                setTranslatedText(response.data); // Update with the translated text
            } else {
                // Handle error
                setTranslatedText("Error translating text.");
            }
        } catch (error) {
            console.error(error);
            setTranslatedText("Error translating text.");
        } finally {
            // Clear the progress interval and finish translation
            clearInterval(progressInterval);
            setProgressValue(100); // Set the progress to 100% when done
            setTimeout(() => {
                setIsTranslating(false); // Hide the progress bar and re-enable the interface
            }, 500); // Allow a small delay to show the final progress
        }
    };

    return (
        <div className="p-4">
            {isTranslating && (
                <div className="mb-4">
                    <Progress value={progressValue} />
                </div>
            )}

            <textarea
                className="w-full h-32 p-2 border"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isTranslating} // Disable input while translating
                placeholder="Enter text to translate..."
            />

            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                onClick={handleTranslate}
                disabled={isTranslating} // Disable button while translating
            >
                {isTranslating ? "Translating..." : "Translate"}
            </button>

            {translatedText && (
                <div className="mt-4 p-2 bg-gray-100 border">
                    <strong>Translated Text:</strong> {translatedText}
                </div>
            )}
        </div>
    );
};

export default TranslatorApp;
