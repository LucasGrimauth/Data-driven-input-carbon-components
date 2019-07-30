import React, { useState } from "react";
import DataDrivenInput from ".";

const DataDrivenInputExamples = () => {
  const [input, setInput] = useState("default value");
  const [input2, setInput2] = useState("default value");

  const onInputChange = e => {
    setInput(e.target.value)
  }

  const onInputChange2 = e => {
    setInput2(e.target.value)
  }

  return (
    <>
      <br/>
      <h2>DataDrivenInput Examples</h2>
      <hr/>
      <h4>Default DataDrivenInput</h4>
      <div style={{ width: "25rem" }}>
        <DataDrivenInput
          type="password"
          textInputProps={{
            id: "default-data-driven-input",
            labelText: "Text Input inside Data Driven Input",
            onChange: onInputChange,
            placeholder: "Data driven input",
            value: input
          }}
        />
      </div>
      <br/>
      <h4>DataDrivenInput with tooltip</h4>
      <div style={{ width: "25rem" }}>
        <DataDrivenInput
          type="text"
          textInputProps={{
            id: "tooltip-data-driven-input",
            labelText: "Text Input inside Data Driven Input",
            onChange: onInputChange2,
            placeholder: "Data driven input",
            value: input2,
            tooltipContent: "Tooltip for DataDrivenInput",
            tooltipProps: { direction: "top" }
          }}
        />
      </div>
      <br/>
      <h4>Externally controlled DataDrivenInput</h4>
      <div style={{ width: "25rem" }}>
        <DataDrivenInput
          type="text"
          textInputProps={{
            disabled: true,
            id: "controlled-data-driven-input",
            labelText: "Text Input inside Data Driven Input",
            onChange: onInputChange2,
            placeholder: "Data driven input",
            value: input2,
            tooltipContent: "Externally controlled data driven input",
            tooltipProps: { direction: "top" }
          }}
        />
      </div>
    </>
  );
};

export default DataDrivenInputExamples;
