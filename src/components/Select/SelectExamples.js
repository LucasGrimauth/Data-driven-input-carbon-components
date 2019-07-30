import React, { useState } from "react";
import Select from ".";

const SelectExamples = () => {
  const [selectedValue, setselectedValue] = useState({ label: "Panda", value: "panda" });

  const onValueChange = ({ selectedItem }) => {
    setselectedValue(selectedItem);
  }

  const animals = [
    { label: "Caribou", value: "caribou" },
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Dolphin", value: "dolphin" }, 
    { label: "Panda", value: "panda" }
  ]

  return (
    <>
      <br/>
      <h2>Select Examples</h2>
      <hr/>
      <h4>Default Select</h4>
      <div style={{ width: "25rem" }}>
        <Select
          id="default-combo-box"
          initialSelectedItem={selectedValue}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          placeholder="Select an animal"
          shouldFilterItem={({ item, inputValue }) => item.label.includes(inputValue)}
          value={selectedValue}
        />
      </div>
      <br/>
      <h4>Select with label and tooltip</h4>
      <div style={{ width: "25rem" }}>
        <Select
          id="combo-box-tooltip"
          initialSelectedItem={selectedValue}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          placeholder="Select an animal"
          titleText="Select an animal"
          tooltipContent="Tooltip for select"
          tooltipProps={{ direction: "top" }}
          shouldFilterItem={({ item, inputValue }) => item.label.includes(inputValue)}
          value={selectedValue}
        />
      </div>
    </>
  );
};

export default SelectExamples;
