import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <div className="flex justify-center items-start flex-1">
            <textarea
                className={cn(
                    "p-4 w-full h-full rounded-md border border-input",
                    "bg-background px-3 py-2 text-xl",
                    "ring-offset-background",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "hover:ring-2 hover:ring-offset-2 hover:ring-gray-400",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "resize-none transition",
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
export default Textarea;

Textarea.displayName = "Textarea";

// Non-editable Textarea component
const NonEditableTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <div className="flex justify-center items-start flex-1">
            <textarea
                className={cn(
                    "p-4 w-full h-full rounded-md border border-input",
                    "bg-background px-3 py-2 text-xl",
                    "ring-offset-background",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "hover:ring-2 hover:ring-offset-2 hover:ring-gray-400",
                    "disabled:cursor-not-allowed opacity-50",
                    "resize-none transition",
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
