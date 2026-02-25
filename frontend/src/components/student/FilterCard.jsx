import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Ahmedabad",
    ],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-5 LPA", "5-15 LPA", "15-30 LPA"], 
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-100">
      {/* Header - mobile pe toggle button */}
      <div
        className="flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <span className="md:hidden text-gray-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>

      {/* Filter Content - mobile pe collapse, desktop pe hamesha show */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <hr className="mt-3 mb-2" />

        {/* Clear Filter */}
        {selectedValue && (
          <button
            onClick={() => setSelectedValue("")}
            className="text-sm text-[#6A38C2] hover:underline mb-2"
          >
            Clear Filter
          </button>
        )}

        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={data.filterType} className="mt-3">
              <h1 className="font-bold text-base text-gray-800">
                {data.filterType}
              </h1>
              {data.array.map((item, idx) => {
                const itemId = `r${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem id={itemId} value={item} />
                    <Label
                      htmlFor={itemId}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
