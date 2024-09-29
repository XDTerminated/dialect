// "use client";
// import React, { useEffect, useState } from "react";
// import { BsMoonStarsFill } from "react-icons/bs";
// import { MdOutlineWbSunny } from "react-icons/md";

// const NightmodeButton = () => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     useEffect(() => {
//         if (isDarkMode) {
//             document.body.style.color = "#333333";
//             document.body.style.backgroundColor = "#FFFFFF";
//         } else {
//             document.body.style.color = "#FFFFFF";
//             document.body.style.backgroundColor = "#333333";
//         }
//     }, [isDarkMode]);

//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//     };

//     return (
//         <button
//             onClick={toggleDarkMode}
//             style={{
//                 position: "fixed",
//                 bottom: "20px", // Adjust this value for vertical spacing
//                 right: "20px", // Adjust this value for horizontal spacing
//                 padding: "15px",
//                 fontSize: "50px",
//                 fontWeight: "normal",
//                 backgroundColor: isDarkMode ? "#6CB4EE" : "#FFD700",
//                 color: isDarkMode ? "#333333" : "#FFFFFF",
//                 border: "none", // Updated to 'none' for no border
//                 borderRadius: "50px",
//                 cursor: "pointer",
//                 width: "50px",
//                 height: "50px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: adds shadow for better visibility
//             }}
//         >
//             {isDarkMode ? <BsMoonStarsFill /> : <MdOutlineWbSunny />}
//         </button>
//     );
// };

// export default NightmodeButton;

"use client";
import React, { useEffect, useState } from "react";
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
                position: "fixed",
                bottom: "5vh", // 5% of the viewport height
                right: "5vw", // 5% of the viewport width
                padding: "1rem", // Responsive padding
                fontSize: "2.5rem", // Responsive font size
                fontWeight: "normal",
                backgroundColor: isDarkMode ? "#6CB4EE" : "#FFD700",
                color: isDarkMode ? "#333333" : "#FFFFFF",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                width: "4rem", // Responsive width
                height: "4rem", // Responsive height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: adds shadow for better visibility
                transition: "background-color 0.3s, color 0.3s", // Smooth transitions
            }}
        >
            {isDarkMode ? <BsMoonStarsFill /> : <MdOutlineWbSunny />}
        </button>
    );
};

export default NightmodeButton;
