// src/api/fetchResponse.ts

export interface ApiResponse {
    content: any;
    success: boolean;
    data?: any;
    error?: string;
}

export const fetchResponse = async (text: string, translate1: string, translate2: string): Promise<ApiResponse> => {
    // Construct the prompt with the custom format
    text = text
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/"/g, "'") // Replace double quotes with single quotes
        .replace(/[^a-zA-Z0-9\s.,!?'-]/g, " "); // Replace non-alphanumeric except regular punctuation with spaces

    const prompt = `Translate [${text}] from [${translate1}] to [${translate2}]`;

    const response = await fetch(`http://127.0.0.1:8000/bedrock/call-bedrock/?prompt=${encodeURIComponent(prompt)}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: ApiResponse = await response.json();
    return data;
};
