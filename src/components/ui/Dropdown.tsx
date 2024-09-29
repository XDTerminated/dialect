// import React, { useState, useRef, useEffect } from "react";
// import "./Dropdown.css";

// interface DropdownItem {
//     label: string;
//     description?: string;
// }

// // Modify the onSelect type to ensure it expects both label and description
// interface DropdownProps {
//     label: string;
//     items: DropdownItem[];
//     onSelect: (label: string, description?: string) => void; // Already defined correctly
//     disabled?: boolean; // Added disabled prop
// }

// const Dropdown: React.FC<DropdownProps> = ({ label, items, onSelect }) => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>(items);
//     const [activeIndex, setActiveIndex] = useState<number>(-1);
//     const [selectedLabel, setSelectedLabel] = useState<string>(label);
//     const [editingDescriptionIndex, setEditingDescriptionIndex] = useState<number | null>(null);
//     const [descriptionInput, setDescriptionInput] = useState<string>("");
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     // Update dropdown items when the items prop changes
//     useEffect(() => {
//         setDropdownItems(items);
//     }, [items]);

//     // Update selectedLabel when label prop changes
//     useEffect(() => {
//         setSelectedLabel(label);
//     }, [label]);

//     // Toggle dropdown visibility
//     const toggleDropdown = () => {
//         setIsOpen((prev) => !prev);
//         setSearchTerm(""); // Clear search term when toggling the dropdown
//         setActiveIndex(-1); // Reset active index when closing or opening the dropdown
//         setEditingDescriptionIndex(null); // Close description input if open
//     };

//     // Filter items based on search term
//     const filteredItems = dropdownItems.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

//     // Handle keyboard navigation for arrow keys and Enter
//     const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === "ArrowDown") {
//             // Navigate down
//             setActiveIndex((prevIndex) => (prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0));
//         } else if (event.key === "ArrowUp") {
//             // Navigate up
//             setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1));
//         } else if (event.key === "Enter") {
//             if (editingDescriptionIndex !== null) {
//                 // Save description if Enter is pressed while editing
//                 saveDescription(editingDescriptionIndex);
//             } else if (activeIndex >= 0) {
//                 // If an item is selected via keyboard
//                 const selectedItem = filteredItems[activeIndex];
//                 // onSelect(selectedItem.label);
//                 onSelect(selectedItem.label, selectedItem.description); // Pass description

//                 setSelectedLabel(selectedItem.label); // Update selected label
//                 // Move the selected item to the top of the list
//                 setDropdownItems((prevItems) => {
//                     const itemsWithoutSelected = prevItems.filter((item) => item.label !== selectedItem.label);
//                     return [selectedItem, ...itemsWithoutSelected];
//                 });
//                 setIsOpen(false);
//                 setSearchTerm("");
//                 setActiveIndex(-1);
//             } else if (searchTerm.trim()) {
//                 // Check if the searchTerm matches an existing item
//                 const existingItem = dropdownItems.find((item) => item.label.toLowerCase() === searchTerm.toLowerCase());

//                 if (existingItem) {
//                     // Select the existing item and move it to the top
//                     // onSelect(existingItem.label);
//                     onSelect(existingItem.label, existingItem.description); // Pass description

//                     setSelectedLabel(existingItem.label); // Update selected label
//                     setDropdownItems((prevItems) => {
//                         const itemsWithoutSelected = prevItems.filter((item) => item.label.toLowerCase() !== searchTerm.toLowerCase());
//                         return [existingItem, ...itemsWithoutSelected];
//                     });
//                     setIsOpen(false);
//                     setSearchTerm("");
//                     setActiveIndex(-1);
//                 } else {
//                     // Add the new item to the top of the list and select it
//                     const newItem: DropdownItem = {
//                         label: searchTerm,
//                     };
//                     setDropdownItems((prevItems) => [newItem, ...prevItems]);
//                     onSelect(searchTerm, undefined);
//                     setSelectedLabel(searchTerm); // Update selected label
//                     setIsOpen(false);
//                     setSearchTerm("");
//                     setActiveIndex(-1);
//                 }
//             }
//         }
//     };

//     // Function to save the description
//     const saveDescription = (index: number) => {
//         // Update the item's description
//         setDropdownItems((prevItems) => prevItems.map((itm, idx) => (idx === index ? { ...itm, description: descriptionInput } : itm)));
//         setEditingDescriptionIndex(null);
//     };

//     return (
//         <div className="dropdown flex-[10_0_0%]" ref={dropdownRef}>
//             <button className="h-full dropdown-button" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
//                 {selectedLabel} <span className="arrow">{isOpen ? "▲" : "▼"}</span>
//             </button>

//             {isOpen && (
//                 <div className="dropdown-content">
//                     {/* Search input field */}
//                     <input
//                         type="text"
//                         className="dropdown-search"
//                         placeholder="Type to search or add..."
//                         value={searchTerm} // Bind the input value to the state
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setActiveIndex(-1); // Reset active index when typing
//                         }} // Update search term on change
//                         onKeyDown={handleInputKeyDown} // Handle arrow keys and Enter
//                         autoFocus
//                     />

//                     <ul className="dropdown-menu" role="menu">
//                         {filteredItems.length > 0 ? (
//                             filteredItems.map((item, index) => (
//                                 <li key={index} role="none" className={`dropdown-item-container ${activeIndex === index ? "active" : ""}`}>
//                                     <div className="dropdown-item-wrapper">
//                                         <button
//                                             className="add-description"
//                                             onClick={(e) => {
//                                                 e.stopPropagation(); // Prevent triggering the item selection
//                                                 setEditingDescriptionIndex(editingDescriptionIndex === index ? null : index);
//                                                 setDescriptionInput(item.description || "");
//                                             }}
//                                             aria-label={`Add description to ${item.label}`}
//                                         >
//                                             +
//                                         </button>

//                                         <button
//                                             className="dropdown-item"
//                                             role="menuitem"
//                                             onClick={() => {
//                                                 // onSelect(item.label,);
//                                                 onSelect(item.label, item.description); // Pass description
//                                                 setSelectedLabel(item.label); // Update selected label
//                                                 // Move the selected item to the top of the list
//                                                 setDropdownItems((prevItems) => {
//                                                     const itemsWithoutSelected = prevItems.filter((i) => i.label !== item.label);
//                                                     return [item, ...itemsWithoutSelected];
//                                                 });
//                                                 setIsOpen(false);
//                                                 setSearchTerm("");
//                                                 setActiveIndex(-1);
//                                             }}
//                                         >
//                                             {item.label}
//                                         </button>
//                                         <button
//                                             className="remove-item"
//                                             onClick={(e) => {
//                                                 e.stopPropagation(); // Prevent triggering the item selection
//                                                 // Remove item from dropdownItems
//                                                 setDropdownItems((prevItems) => prevItems.filter((i) => i.label !== item.label));

//                                                 // If the removed item is the selected label, reset it
//                                                 if (selectedLabel === item.label) {
//                                                     setSelectedLabel(label);
//                                                     onSelect(label);
//                                                 }
//                                                 // Close description input if open
//                                                 if (editingDescriptionIndex === index) {
//                                                     setEditingDescriptionIndex(null);
//                                                 }
//                                             }}
//                                             aria-label={`Remove ${item.label}`}
//                                         >
//                                             ×
//                                         </button>
//                                     </div>
//                                     {/* Description Input Field */}
//                                     {editingDescriptionIndex === index && (
//                                         <div className="description-input-container">
//                                             <input
//                                                 type="text"
//                                                 className="description-input"
//                                                 placeholder="Enter description..."
//                                                 value={descriptionInput}
//                                                 onChange={(e) => setDescriptionInput(e.target.value)}
//                                                 onKeyDown={(e) => {
//                                                     if (e.key === "Enter") {
//                                                         saveDescription(index);
//                                                     }
//                                                 }}
//                                                 autoFocus
//                                             />
//                                             <button className="save-description" onClick={() => saveDescription(index)}>
//                                                 Save
//                                             </button>
//                                         </div>
//                                     )}
//                                 </li>
//                             ))
//                         ) : (
//                             <li className="dropdown-no-results">No results found</li>
//                         )}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dropdown;

import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownItem {
    label: string;
    description?: string;
}

interface DropdownProps {
    label: string;
    items: DropdownItem[];
    onSelect: (label: string, description?: string) => void;
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, onSelect }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>(items);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [selectedLabel, setSelectedLabel] = useState<string>(label);
    const [editingDescriptionIndex, setEditingDescriptionIndex] = useState<number | null>(null);
    const [descriptionInput, setDescriptionInput] = useState<string>("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDropdownItems(items);
    }, [items]);

    useEffect(() => {
        setSelectedLabel(label);
    }, [label]);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        setSearchTerm("");
        setActiveIndex(-1);
        setEditingDescriptionIndex(null);
    };

    const filteredItems = dropdownItems.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            setActiveIndex((prevIndex) => (prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0));
        } else if (event.key === "ArrowUp") {
            setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1));
        } else if (event.key === "Enter") {
            if (activeIndex >= 0) {
                const selectedItem = filteredItems[activeIndex];
                setSelectedLabel(selectedItem.label);
                setEditingDescriptionIndex(activeIndex); // Set the index for editing description
                setDescriptionInput(selectedItem.description || ""); // Pre-fill description input
            }
        }
    };

    const saveDescription = (index: number) => {
        setDropdownItems((prevItems) => prevItems.map((itm, idx) => (idx === index ? { ...itm, description: descriptionInput } : itm)));
        setEditingDescriptionIndex(null);
        onSelect(dropdownItems[index].label, descriptionInput); // Call onSelect to pass the updated description
    };

    return (
        <div className="dropdown flex-[10_0_0%]" ref={dropdownRef}>
            <button className="h-full dropdown-button" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
                {selectedLabel} <span className="arrow">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
                <div className="dropdown-content">
                    <input
                        type="text"
                        className="dropdown-search"
                        placeholder="Type to search or add..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setActiveIndex(-1);
                        }}
                        onKeyDown={handleInputKeyDown}
                        autoFocus
                    />

                    <ul className="dropdown-menu" role="menu">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <li key={index} role="none" className={`dropdown-item-container ${activeIndex === index ? "active" : ""}`}>
                                    <div className="dropdown-item-wrapper">
                                        <button
                                            className="add-description"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingDescriptionIndex(editingDescriptionIndex === index ? null : index);
                                                setDescriptionInput(item.description || "");
                                            }}
                                            aria-label={`Add description to ${item.label}`}
                                        >
                                            +
                                        </button>

                                        <button
                                            className="dropdown-item"
                                            role="menuitem"
                                            onClick={() => {
                                                setSelectedLabel(item.label);
                                                setEditingDescriptionIndex(index); // Set index to edit description
                                                setDescriptionInput(item.description || ""); // Pre-fill input with current description
                                                setIsOpen(false);
                                                setSearchTerm("");
                                                setActiveIndex(-1);
                                            }}
                                        >
                                            {item.label}
                                        </button>
                                        <button
                                            className="remove-item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDropdownItems((prevItems) => prevItems.filter((i) => i.label !== item.label));
                                                if (selectedLabel === item.label) {
                                                    setSelectedLabel(label);
                                                    onSelect(label);
                                                }
                                                if (editingDescriptionIndex === index) {
                                                    setEditingDescriptionIndex(null);
                                                }
                                            }}
                                            aria-label={`Remove ${item.label}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    {editingDescriptionIndex === index && (
                                        <div className="description-input-container">
                                            <input
                                                type="text"
                                                className="description-input"
                                                placeholder="Enter description..."
                                                value={descriptionInput}
                                                onChange={(e) => setDescriptionInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        saveDescription(index);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <button className="save-description" onClick={() => saveDescription(index)}>
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-no-results">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
