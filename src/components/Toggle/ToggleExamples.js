import React, { useState } from "react";
import Toggle from ".";

const ToggleExamples = () => {
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  const onToggleChange = value => {
    setToggle(value);
    console.log(value);
  }

  const onToggleChange2 = value => {
    setToggle2(value);
  }

  return (
    <>
      <br/>
      <h2>Toggle Examples</h2>
      <hr/>
      <h4>Default Toggle</h4>
      <p>{`Toggle value: ${toggle}`}</p>
      <Toggle 
        id="default-toggle"
        defaultToggled={toggle}
        onToggle={onToggleChange}
        theme="black"
      />
      <br/>
      <h4>Externally Controlled Toggle</h4>
      <p>Toggle controlled by first toggle</p>
      <Toggle 
        id="externally-controlled-toggle"
        disabled
        toggled={toggle}
        theme="white"
      />
      <br/>
      <h4>Toggle with label and tooltip</h4>
      <div style={{ width: "13rem" }}>
        <Toggle 
          id="label-tooltip-toggle"
          defaultToggled={toggle2}
          onToggle={onToggleChange2}
          labelText="Toggle"
          tooltipContent="Tooltip for toggle"
          tooltipProps={{ direction: "right" }}
          theme="black"
        />
      </div>
    </>
  );
};

export default ToggleExamples;
