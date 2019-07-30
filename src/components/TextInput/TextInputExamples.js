import React, { useState } from "react";
import TextInput from ".";

const TextInputExamples = () => {
  const [input, setInput] = useState("default value");

  const onInputChange = e => {
    setInput(e.target.value)
  }

  return (
    <>
      <br/>
      <h2>TextInput Examples</h2>
      <hr/>
      <h4>Default TextInput</h4>
      <div style={{ width: "25rem" }}>
        <TextInput
          id="default-text-input"
          labelText="Text Input"
          onChange={onInputChange}
          placeholder="text input"
          value={input}
          type="text"
        />
      </div>
      <br/>
      <h4>TextInput with tooltip</h4>
      <div style={{ width: "25rem" }}>
        <TextInput
          id="tooltip-text-input"
          labelText="Text Input"
          onChange={onInputChange}
          placeholder="text input"
          tooltipContent="Tooltip for textinput"
          tooltipProps={{ direction:"top" }}
          type="text"
          value={input}
        />
      </div>
    </>
  );
};

export default TextInputExamples;
