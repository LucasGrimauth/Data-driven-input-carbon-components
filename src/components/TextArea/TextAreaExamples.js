import React, { useState } from "react";
import TextArea from ".";

const TextAreaExamples = () => {
  const [input, setInput] = useState("default value");

  const onInputChange = e => {
    setInput(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <br/>
      <h2>TextArea Examples</h2>
      <hr/>
      <h4>Default TextArea</h4>
      <div style={{ width: "25rem" }}>
        <TextArea
          id="default-text-input"
          labelText="Text Area"
          onChange={onInputChange}
          placeholder="text area"
          style={{ resize: "none" }}
          type="text"
          value={input}
        />
      </div>
      <br/>
      <h4>TextArea with tooltip</h4>
      <div style={{ width: "25rem" }}>
        <TextArea
          id="tooltip-text-input"
          labelText="Text Area"
          onChange={onInputChange}
          placeholder="text area"
          tooltipContent="Tooltip for TextArea"
          tooltipProps={{ direction:"top" }}
          style={{ resize: "none" }}
          type="text"
          value={input}
        />
      </div>
    </>
  );
};

export default TextAreaExamples;
