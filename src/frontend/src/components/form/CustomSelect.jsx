import { useState } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import Label from "@/components/form/Label";
const CustomSelect = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  label = "",
  name = "",
  isMulti = false,
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
    <div>
      {label !== "" && (
        <Label htmlFor="select" className="test">
          {label}
        </Label>
      )}
      <Creatable
        isMulti={isMulti}
        id="select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isSearchable
        className={className}
        classNames={{
          control: (state) => `
      !h-11
      !w-full
      !rounded-lg
      !border
      !appearance-none
      !shadow-theme-xs
      !bg-transparent
      dark:!bg-gray-900
      ${
        state.isFocused
          ? "!border-brand-300 !ring-3 !ring-brand-500/20 dark:!border-brand-800"
          : "!border-gray-300 dark:!border-gray-700"
      }
    `,
          valueContainer: () => "!px-4 !py-0 !flex !items-center !h-full",
          placeholder: () => "!text-sm !text-gray-400 dark:!text-white/30",
          singleValue: () => "!text-sm !text-gray-800 dark:!text-white/90",
          input: () => "!text-sm !text-gray-800 dark:!text-white/90",
          menu: () => "!bg-white dark:!bg-gray-900 !z-10",
          option: ({ isFocused, isSelected }) => `
      !text-sm
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
    </div>
  );
};

export default CustomSelect;
