import { useState } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

const CustomSelect = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const defaultOption =
    options.find((option) => option.value === defaultValue) || null;

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleChange = (option) => {
    setSelectedOption(option);

    if (onChange) {
      onChange(option?.value || "");
    }
  };

  return (
    <Creatable
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable
      className={className}
      classNames={{
        control: (state) => `
          !min-h-[44px]
          !rounded-lg
          !border
          ${
            state.isFocused
              ? "!border-brand-300"
              : "!border-gray-300 dark:!border-gray-700"
          }
          !bg-white dark:!bg-gray-900
          !shadow-theme-xs
        `,
        valueContainer: () => "!px-4 !py-0",

        placeholder: () => "!text-gray-400 dark:!text-white/40",

        singleValue: () => "!text-gray-800 dark:!text-white",

        input: () => "!text-gray-800 dark:!text-white",

        menu: () => "!bg-white dark:!bg-gray-900 !z-50",

        option: ({ isFocused, isSelected }) => `
          ${isFocused ? "!bg-gray-100 dark:!bg-gray-800" : ""}
            ${
              isSelected
                ? "!bg-brand-500 !text-white"
                : "!text-gray-700 dark:!text-gray-400"
            }
          `,
        indicatorSeparator: () => "!hidden",
      }}
    />
  );
};

export default CustomSelect;
