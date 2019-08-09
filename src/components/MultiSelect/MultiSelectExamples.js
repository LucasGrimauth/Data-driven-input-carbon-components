import React, { useState } from "react";
import MultiSelect from ".";
import MultiSelectV2 from "./MultiSelectV2";
import MultiSelectComboBox from "./MultiSelectComboBox";

const MultiSelectExamples = () => {
  const [selectedValues, setSelectedValues] = useState([{ label: "Cat", value: "cat" }]);

  const onValueChange = ({ selectedItems }) => {
    setSelectedValues(selectedItems);
    console.log(selectedItems);
  }

  const animals = [
    { label: "Caribou", value: "caribou" },
    { label: "Cat", value: "cat" },
    { label: "Catfish", value: "catfish" },
    { label: "Cheetah", value: "cheetah" },
    { label: "Chipmunk", value: "chipmunk" },
    { label: "Dog", value: "dog" },
    { label: "Dolphin", value: "dolphin" }, 
    { label: "Dove", value: "dove" },
    { label: "Panda", value: "panda" },
    { label: "Parrot", value: "parrot" },
    { label: "Peacock", value: "peacock" },
    { label: "Penguim", value: "penguim" }
  ]

  return (
    <>
      <br/>
      <h2>MultiSelect Examples</h2>
      <hr/>
      <h4>ComboBox MultiSelect</h4>
      <div style={{ width: "25rem" }}>
        <MultiSelectComboBox
          id="combobox-multi-select"
          initialSelectedItems={selectedValues}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          titleText="Select some animals"
          placeholder="Select some animals"
        />
      </div>
      <br/>
      <h4>Default MultiSelect</h4>
      <div style={{ width: "25rem" }}>
        <MultiSelect
          id="default-multi-select"
          initialSelectedItems={selectedValues}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          label="Select some animals"
          placeholder="Select some animals"
        />
      </div>
      <br/>
      <h4>MultiSelect with label and tooltip</h4>
      <div style={{ width: "25rem" }}>
        <MultiSelect
          id="multi-select-tooltip"
          initialSelectedItems={selectedValues}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          label="Select some animals"
          placeholder="Select some animals"
          titleText="Select some animals"
          tooltipContent="Tooltip for multiselect"
          tooltipProps={{ direction: "top" }}
        />
      </div>
      <br/>
      <h4>MultiSelect with externally controlled values</h4>
      <div style={{ width: "25rem" }}>
        <MultiSelectV2
          id="multi-select-externally-controlled"
          initialSelectedItems={selectedValues}
          selectedItems={selectedValues}
          items={animals}
          itemToString={item => item.label}
          onChange={onValueChange}
          label="Select some animals"
          placeholder="Select some animals"
          titleText="Select some animals"
          tooltipContent="Externally controlled multiselect"
          tooltipProps={{ direction: "top" }}
        />
      </div>
    </>
  );
};

export default MultiSelectExamples;
