import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  selected: string;
  onChange: (id: string, value: string) => void;
  placeholder?: string;
  id: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
  id,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    if (value !== selected) {
      onChange(id, value);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === selected);

  let statusColor =
    selected === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-700"
      : selected === "Completed"
      ? "bg-green-100 text-green-700 border-2 border-green-700"
      : "bg-red-100 text-red-700 border-2 border-red-700";

  return (
    <div className="relative w-24">
      {/* Selected Value */}
      <div
        className={`${statusColor} rounded-full px-2 py-0.5 cursor-pointer shadow-sm flex justify-between items-center`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-xs font-semibold">
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
        <ul className="absolute z-10 w-28 bg-white border border-gray-300 rounded-md shadow-md mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 hover:bg-indigo-200  cursor-pointer ${
                option.value === selected ? "bg-neutral-200 font-semibold text-indigo-500" : ""
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

export default CustomSelect;
