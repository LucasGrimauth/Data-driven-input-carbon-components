import React, { useState } from "react";
import Radio from ".";

const RadioExamples = () => {
  const [selectedRadio, setselectedRadio] = useState("default value");

  const onRadioChange = value => {
    setselectedRadio(value);
    console.log(value)
  }

  return (
    <>
      <br/>
      <h2>Radio Examples</h2>
      <hr/>
      <h4>Default Radio</h4>
      <div style={{ width: "25rem" }}>
        <Radio
          defaultSelected={selectedRadio}
          name="Radio group 1"
          onChange={onRadioChange}
          options={[{ id: "radio-1", label: "Radio 1", value: "default value" }, { id: "radio-2", label: "Radio 2", value: "other value" }]}
          orientation="vertical"
          valueSelected={selectedRadio}
        />
      </div>
      <br/>
      <h4>Radio with label and tooltip</h4>
      <div style={{ width: "25rem" }}>
        <Radio
          defaultSelected={selectedRadio}
          labelText="Select a value"
          name="Radio group 2"
          onChange={onRadioChange}
          options={[{ id: "radio-3", label: "Radio 3", value: "default value" }, { id: "radio-4", label: "Radio 4", value: "other value" }]}
          orientation="horizontal"
          tooltipContent="Tooltip for Radio group"
          tooltipProps={{ direction: "right" }}
          valueSelected={selectedRadio}
        />
      </div>
    </>
  );
};

export default RadioExamples;
