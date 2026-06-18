import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateField({ id = "", name = "" }) {
  const [date, setDate] = useState(null);
  console.log(date?.toISOString());
  return (
    <DatePicker
      id={id}
      name={name}
      selected={date}
      onChange={(e) => setDate(e)}
      placeholderText="Select a date"
      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
      wrapperClassName="w-full"
      dateFormat="yyyy-MM-dd"
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}
