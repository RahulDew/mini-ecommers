import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectDropdown: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    if (value !== selected) {
      onChange(value);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div className="relative w-full sm:w-96">
      {/* Selected Value */}
      <div
        className="bg-white shadow-lg shadow-indigo-200 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-black">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white shadow-lg shadow-indigo-200 rounded-lg mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 hover:bg-indigo-100 cursor-pointer ${
                option.value === selected ? "font-semibold text-indigo-600" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
