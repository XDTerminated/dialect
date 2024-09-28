// src/api/fetchResponse.ts (Create a new file in your project)

export interface ApiResponse {
    // Define the structure of the response based on what your Django API returns
    // For example:
    success: boolean;
    data?: any; // Adjust based on the actual data structure
    error?: string; // Optionally include an error field
}

export const fetchResponse = async (prompt: string): Promise<ApiResponse> => {
    const response = await fetch(`http://127.0.0.1:8000/bedrock/call-bedrock/?prompt=${encodeURIComponent(prompt)}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data: ApiResponse = await response.json();
    return data;
};
