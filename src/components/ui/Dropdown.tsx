// src/components/Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css'; // Import the CSS for styling

interface DropdownItem {
  label: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  onSelect: (label: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state for filtering
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>(items); // Manage dropdown items in state
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Track active item index
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm(''); // Clear search term when toggling the dropdown
    setActiveIndex(-1); // Reset active index when closing or opening the dropdown
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Handle Escape key to close dropdown
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter items based on search term
  const filteredItems = dropdownItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle keyboard navigation for arrow keys and Enter
  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'ArrowDown') {
      // Navigate down
      setActiveIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      // Navigate up
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
      );
    } else if (event.key === 'Enter') {
      if (activeIndex >= 0) {
        // If an item is selected via keyboard
        const selectedItem = filteredItems[activeIndex];
        onSelect(selectedItem.label);
        // Move the selected item to the top of the list
        setDropdownItems((prevItems) => {
          const itemsWithoutSelected = prevItems.filter(
            (item) => item.label !== selectedItem.label
          );
          return [selectedItem, ...itemsWithoutSelected];
        });
        setIsOpen(false);
        setSearchTerm('');
        setActiveIndex(-1);
      } else if (searchTerm.trim()) {
        // Check if the searchTerm matches an existing item
        const existingItem = dropdownItems.find(
          (item) => item.label.toLowerCase() === searchTerm.toLowerCase()
        );

        if (existingItem) {
          // Select the existing item and move it to the top
          onSelect(existingItem.label);
          setDropdownItems((prevItems) => {
            const itemsWithoutSelected = prevItems.filter(
              (item) => item.label.toLowerCase() !== searchTerm.toLowerCase()
            );
            return [existingItem, ...itemsWithoutSelected];
          });
          setIsOpen(false);
          setSearchTerm('');
          setActiveIndex(-1);
        } else {
          // Add the new item to the top of the list and select it
          const newItem: DropdownItem = {
            label: searchTerm,
          };
          setDropdownItems((prevItems) => [newItem, ...prevItems]);
          onSelect(searchTerm);
          setIsOpen(false);
          setSearchTerm('');
          setActiveIndex(-1);
        }
      }
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label} <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-content">
          {/* Search input field */}
          <input
            type="text"
            className="dropdown-search"
            placeholder="Type to search or add..."
            value={searchTerm} // Bind the input value to the state
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveIndex(-1); // Reset active index when typing
            }} // Update search term on change
            onKeyDown={handleInputKeyDown} // Handle arrow keys and Enter
            autoFocus
          />

          <ul
            className="dropdown-menu"
            role="menu"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  role="none"
                  className={activeIndex === index ? 'active' : ''}
                  style={{
                    backgroundColor:
                      activeIndex === index ? '#ddd' : 'transparent',
                  }}
                >
                  <button
                    className="dropdown-item"
                    role="menuitem"
                    onClick={() => {
                      onSelect(item.label);
                      // Move the selected item to the top of the list
                      setDropdownItems((prevItems) => {
                        const itemsWithoutSelected = prevItems.filter(
                          (i) => i.label !== item.label
                        );
                        return [item, ...itemsWithoutSelected];
                      });
                      setIsOpen(false);
                      setSearchTerm('');
                      setActiveIndex(-1);
                    }}
                  >
                    {item.label}
                  </button>
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
