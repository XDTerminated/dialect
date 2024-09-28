import React from "react";
import { NonEditableTextarea, Textarea } from "./ui/textarea";

const TranslatorBoxes = () => {
    return (
        <div className="flex justify-center items-start min-h-screen pt-10 space-x-4">
            {/* Editable Textarea (Left Box) */}
            <Textarea className="h-96 w-[600px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none" placeholder="Type here..." />

            {/* Non-editable Textarea (Right Box) */}
            <NonEditableTextarea className="h-96 w-[600px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none" placeholder="Translation will appear here..." readOnly />
        </div>
    );
};

export default TranslatorBoxes;
