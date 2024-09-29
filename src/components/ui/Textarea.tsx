import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <div className="flex justify-center items-start min-h-screen pt-10">
            <textarea
                className={cn(
                    "h-96 w-[600px] rounded-md border border-input",
                    "bg-background px-3 py-2 text-sm",
                    "ring-offset-background",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "resize-none",
                    "text-gray-900 dark:text-gray-100", // Dark mode text color
                    "dark:bg-gray-800", // Dark mode background color
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});

Textarea.displayName = "Textarea";

// Non-editable Textarea component
const NonEditableTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <div className="flex justify-center items-start min-h-screen pt-10">
            <textarea
                className={cn(
                    "h-96 w-[600px] rounded-md border border-input",
                    "bg-background px-3 py-2 text-sm",
                    "ring-offset-background",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed opacity-50",
                    "resize-none",
                    "text-gray-900 dark:text-gray-100", // Dark mode text color
                    "dark:bg-gray-800", // Dark mode background color
                    className
                )}
                ref={ref}
                readOnly
                {...props}
            />
        </div>
    );
});

NonEditableTextarea.displayName = "NonEditableTextarea";

export { Textarea, NonEditableTextarea };
