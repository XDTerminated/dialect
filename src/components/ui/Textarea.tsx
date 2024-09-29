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
                    "p-4 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none h-full", // Added h-full
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
                    "p-4 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none h-full", // Added h-full
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
