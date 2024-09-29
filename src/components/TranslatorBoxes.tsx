// import React, { useState } from "react";
// import { NonEditableTextarea, Textarea } from "./ui/Textarea";
// import Dropdown from "./ui/Dropdown";
// import { GoArrowSwitch } from "react-icons/go";
// import SwitchButton from "./ui/SwitchButton";
// import TranslateButton from "./ui/TranslateButton";

// const TranslatorBoxes = () => {
//     // State for dropdown items
//     const [dropdownItems1, setDropdownItems1] = useState([
//         { label: "Option 1" },
//         { label: "Option 2" },
//         { label: "Option 3" }
//     ]);
//     const [dropdownItems2, setDropdownItems2] = useState([
//         { label: "Option A" },
//         { label: "Option B" },
//         { label: "Option C" }
//     ]);

//     // State for selected values
//     const [selectedValue1, setSelectedValue1] = useState("Select Option");
//     const [selectedValue2, setSelectedValue2] = useState("Select Option");

//     // Handle Switching Selected Components
//     const handleSwitch = () => {
//         console.log(typeof(dropdownItems1));
//         // Swap dropdown items
//         setDropdownItems1(prevItems1 => {
//             setDropdownItems2(prevItems2 => {
//                 return prevItems1;
//             });
//             return dropdownItems2;
//         });

//         // Swap selected values

//         //const tempValue = selectedValue1;
//         //setSelectedValue1(selectedValue2);
//         //setSelectedValue2(tempValue);
//         const tempValue = selectedValue1;
//         setSelectedValue1(selectedValue2);
//         setSelectedValue2(tempValue);
        
//           setDropdownItems1((prevItems) => [...prevItems]);
//          // onSelect(searchTerm);
//          // setSelectedLabel(searchTerm); // Update selected label
//          // setIsOpen(false);
//          // setSearchTerm('');
//          // setActiveIndex(-1);
//     };

//     // Handler for dropdown selection
//     const handleSelect1 = (label: string) => {
//         setSelectedValue1(label);
//         console.log("Selected from Dropdown 1:", label);
//     };

//     const handleSelect2 = (label: string) => {
//         setSelectedValue2(label);
//         console.log("Selected from Dropdown 2:", label);
//     };

//     return (
//         <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4">
//             {/* Flex Row for Dropdowns */}
//             <div className="flex space-x-4 flex-1 w-full">
//                 {/* Dropdown for Editable Textarea */}
//                 <Dropdown
//                     label={selectedValue1}
//                     items={dropdownItems1}
//                     onSelect={handleSelect1}
//                 />
//                 <SwitchButton onClick={handleSwitch} />
//                 {/* Dropdown for Non-Editable Textarea */}
//                 <Dropdown
//                     label={selectedValue2}
//                     items={dropdownItems2}
//                     onSelect={handleSelect2}
//                 />
//             </div>

//             {/* Flex Row for Textareas */}
//             <div className="flex space-x-4 flex-[20_0_0%] w-full">
//                 {/* Editable Textarea (Left Box) */}
//                 <Textarea
//                     className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
//                     placeholder="Type here..."
//                 />

//                 {/* Non-editable Textarea (Right Box) */}
//                 <NonEditableTextarea
//                     className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none"
//                     placeholder="Translation will appear here..."
//                     readOnly
//                 />
//             </div>
//             <div className="flex space-x-4 flex-1 w-full">
//                 <TranslateButton />
//             </div>
//         </div>
//     );
// };

// export default TranslatorBoxes;

// src/components/TranslatorBoxes.tsx
// import React, { useState } from 'react';
// import Dropdown from './ui/Dropdown';

// const TranslatorBoxes: React.FC = () => {
//   const [dropdown1Items, setDropdown1Items] = useState([
//     { label: 'English' },
//     { label: 'Spanish' },
//   ]);

//   const [dropdown2Items, setDropdown2Items] = useState([
//     { label: 'French' },
//     { label: 'German' },
//   ]);

//   const handleSelect1 = (label: string) => {
//     console.log('Selected from Dropdown 1:', label);
//   };

//   const handleSelect2 = (label: string) => {
//     console.log('Selected from Dropdown 2:', label);
//   };

//   const swapDropdowns = () => {
//     setDropdown1Items((prev) => dropdown2Items);
//     setDropdown2Items((prev) => dropdown1Items);
//   };

//   return (
//     <div>
//       <Dropdown
//         label="Select Language 1"
//         items={dropdown1Items}
//         onSelect={handleSelect1}
//       />
//       <Dropdown
//         label="Select Language 2"
//         items={dropdown2Items}
//         onSelect={handleSelect2}
//       />
//       <button onClick={swapDropdowns}>Switch Dropdowns</button>
//     </div>
//   );
// };

// export default TranslatorBoxes;


import React, { useState } from "react";
import { NonEditableTextarea, Textarea } from "./ui/Textarea";
import Dropdown from "./ui/Dropdown";
import SwitchButton from "./ui/SwitchButton";
import TranslateButton from "./ui/TranslateButton";

const TranslatorBoxes = () => {
    // State for dropdown items
    const [dropdownItems1, setDropdownItems1] = useState([
        { label: "Option 1" },
        { label: "Option 2" },
        { label: "Option 3" }
    ]);
    const [dropdownItems2, setDropdownItems2] = useState([
        { label: "Option A" },
        { label: "Option B" },
        { label: "Option C" }
    ]);

    // State for selected values
    const [selectedValue1, setSelectedValue1] = useState("Select Option");
    const [selectedValue2, setSelectedValue2] = useState("Select Option");

    // Handle Switching Selected Components
    const handleSwitch = () => {
        // Swap dropdown items
        setDropdownItems1((prev) => {
            setDropdownItems2((prevItems) => prev);
            return dropdownItems2;
        });

        // Swap selected values
        const tempValue = selectedValue1;
        setSelectedValue1(selectedValue2);
        setSelectedValue2(tempValue);
    };

    // Handler for dropdown selection
    const handleSelect1 = (label: string) => {
        setSelectedValue1(label);
        console.log("Selected from Dropdown 1:", label);
    };

    const handleSelect2 = (label: string) => {
        setSelectedValue2(label);
        console.log("Selected from Dropdown 2:", label);
    };

    return (
        <div className="p-4 flex flex-col justify-center items-start min-h-screen space-y-4">
            {/* Flex Row for Dropdowns */}
            <div className="flex space-x-4 flex-1 w-full">
                {/* Dropdown for Editable Textarea */}
                <Dropdown
                    label={selectedValue1}
                    items={dropdownItems1}
                    onSelect={handleSelect1}
                />
                <SwitchButton onClick={handleSwitch} />
                {/* Dropdown for Non-Editable Textarea */}
                <Dropdown
                    label={selectedValue2}
                    items={dropdownItems2}
                    onSelect={handleSelect2}
                />
            </div>

            {/* Flex Row for Textareas */}
            <div className="flex space-x-4 flex-[20_0_0%] w-full">
                {/* Editable Textarea (Left Box) */}
                <Textarea
                    className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed resize-none"
                    placeholder="Type here..."
                />

                {/* Non-editable Textarea (Right Box) */}
                <NonEditableTextarea
                    className="rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed opacity-50 resize-none"
                    placeholder="Translation will appear here..."
                    readOnly
                />
            </div>
            <div className="flex space-x-4 flex-1 w-full">
                <TranslateButton />
            </div>
        </div>
    );
};

export default TranslatorBoxes;
