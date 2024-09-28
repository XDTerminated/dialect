"use client";
import React, { useEffect, useState } from 'react'
import { BsMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";

const NightmodeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {

        if (isDarkMode) {
            document.body.style.color = "#333333";
            document.body.style.backgroundColor = "#FFFFFF";
        } else {
            document.body.style.color = "#FFFFFF";
            document.body.style.backgroundColor = "#333333";
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            style={{
                float: 'left',
                padding: '15px',
                fontSize: '50px',
                fontWeight: 'normal',
                backgroundColor: isDarkMode ? '#6CB4EE' : '#FFD700',
                color: isDarkMode ? '##333333' : '#FFFFFF',
                border: '20px',
                borderRadius: '50px',
                cursor: 'pointer',
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isDarkMode ? <BsMoonStarsFill /> : <MdOutlineWbSunny />}
        </button>



    );
};

export default NightmodeButton