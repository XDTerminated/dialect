"use client";
import React, { useEffect, useState } from 'react'
import { BsMoonStarsFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";

const NightmodeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

        if (isDarkMode) {
            document.body.style.color = "#333333";
            document.body.style.backgroundColor = "#FFFFFF";
        } else {
            document.body.style.color = "#FFFFFF";
            document.body.style.backgroundColor = "#333333";
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsDarkMode(!isDarkMode);
            setIsAnimating(false);
        }, 500);
    };

    return (
        <button
            onClick={toggleDarkMode}
            style={{
                padding: '20px',
                fontSize: '20px',
                fontWeight: 'bold',
                backgroundColor: isDarkMode ? '#6CB4EE' : '#FFD700',
                color: isDarkMode ? '#333333' : '#FFFFFF',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                right: '25px',
                bottom: '20px',
                transition: 'background-color 0.5s ease, color 0.5 ease',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: isAnimating ? 'revolve 0.5s ease': 'none',
                }}
            >
                {isDarkMode ? <BsMoonStarsFill /> : <MdOutlineWbSunny />}
            </div>
        

            <style jsx>{`
                @keyframes revolve {
                    0% {
                        transform: rotate(0deg) scale(1);
                    } 
                    50% {
                        transform: rotate(180deg) scale(0.6);
                    }
                    100% {
                        transform: rotate(360deg) scale(1);
                    }
                }
            `}</style>
        </button>
    );
};

export default NightmodeButton