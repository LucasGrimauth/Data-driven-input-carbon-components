import React, { useState } from "react";
import Creatable from ".";

const CreatableExamples = () => {
  const [items, setItems] = useState([]);
  const onChange = createdItems => {
    setItems(createdItems);
    console.log(createdItems);
  }

  return (
    <>
      <br/>
      <h2>Creatable Examples</h2>
      <hr/>
      <h4>Text Input Creatable</h4>
      <div style={{ width: "25rem" }}>
        <Creatable
          id="text-input-creatable"
          labelText="Creatable"
          onChange={onChange}
          placeholder="Create some values"
          type="text"
        />
      </div>
      <br/>
      <h4>Key Value Pair Creatable</h4>
      <div style={{ width: "25rem" }}>
        <Creatable
          createKeyValuePair
          id="key-value-creatable"
          keyLabelText="Creatable Key"
          valueLabelText="Creatable Value"
          onChange={onChange}
          keyPlaceholder="Key"
          valuePlaceholder="Value"
          type="text"
        />
      </div>
      <br/>
      <h4>Externally controlled Creatable with tooltip</h4>
      <div style={{ width: "25rem" }}>
        <Creatable
          id="controlled-tooltip-creatable"
          values={items}
          labelText="Controlled Creatable"
          placeholder="Create some values in the other creatables"
          onChange={onChange}
          type="text"
          tooltipContent="Tooltip for creatable"
          tooltipProps={{ direction: "top" }}
        />
      </div>
    </>
  );
};

export default CreatableExamples;
