import { createContext, useContext, useState, useEffect, useRef } from "react";

import Switch from "@components/form/Switch";
import TextArea from "@components/form/input/TextArea";
import Label from "@components/form/Label";
import Input from "@components/form/input/Input";
import Button from "@components/ui/Button";
import DateField from "@components/form/DateField";
import CustomSelect from "@components/form/CustomSelect";

export default function Prompt() {
  //TODO: use react.memo on the input componenets and usecallback on callback function, so we use the same callback function
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 dark:bg-black">
        {/* Name */}
        <div className="mb-6">
          <Label htmlFor="input">Project Name</Label>
          <Input type="text" id="input" placeholder="enter name for project" />
        </div>
        {/*  Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="Arrival Date">Date</Label>
            <DateField id="Arrival Date" name="arrivalDate" />
          </div>
          <div>
            <Label htmlFor="Leave Date">Date</Label>
            <DateField id="Leave Date" name="leaveDate" />
          </div>
        </div>

        {/* Two side-by-side boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CustomSelect label="To Country" name="toFormsCountry"></CustomSelect>{" "}
          <CustomSelect label="To City" name="toFormsCity"></CustomSelect>{" "}
        </div>
        {/* Text Area */}
        <div>
          {/* <Label>Description</Label> */}
          {/* <TextArea rows={10} /> */}
          <CustomSelect
            label="Interest"
            name="Interest"
            isMulti={true}
          ></CustomSelect>{" "}
        </div>
        <div className="mb-3 mt-3">
          <Switch label="Enable Email Notification for this project"></Switch>
        </div>
        {/* Submit Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
          Submit
        </Button>
      </div>
    </div>
  );
}
