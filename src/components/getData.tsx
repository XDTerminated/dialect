"use client";

import React, { useEffect } from "react";
import { fetchResponse } from "../api/fetchResponse"; // Adjust the path as necessary

const GetData: React.FC = () => {
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchResponse("What is the capital of france");
                console.log(result);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getData();
    }, []);

    return <div>{/* Your component UI */}</div>;
};

export default GetData;
