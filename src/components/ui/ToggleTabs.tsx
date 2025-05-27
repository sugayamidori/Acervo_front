import { useState } from "react";

interface ToggleTabsProps {
  options: string[];
  onSelect: (selected: string) => void;
}

export function ToggleTabs({ options, onSelect }: ToggleTabsProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-full max-w-md bg-gray-100 rounded-md flex">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setSelected(option);
            onSelect(option);
          }}
          className={`w-full py-2 text-sm font-medium rounded-md transition-colors
            ${selected === option ? "bg-white shadow" : "bg-gray-100"}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
