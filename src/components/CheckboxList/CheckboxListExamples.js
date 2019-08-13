import React, { useState } from "react";
import CheckboxList from ".";

const CheckboxListExamples = () => {
  const [selectedCheckboxList, setselectedCheckboxList] = useState(["chipmunk"]);

  const onCheckboxListChange = (value, id, event, selectedItems) => {
    console.log(selectedItems);
    let externalAnimals = [];
    selectedItems.forEach(item => {
      const firstIndex = animals.findIndex(animal => animal.id === item);
      const secondIndex = animals2.findIndex(animal => animal.id === item);
      if(firstIndex >= 0) {
        externalAnimals.push(animals3[firstIndex].id)
      } else if (secondIndex >= 0) {
        externalAnimals.push(animals3[secondIndex].id)
      }
    });
    setselectedCheckboxList(externalAnimals);
  }

  const animals = [
    { label: "Cat", id: "cat" },
    { label: "Dog", id: "dog" },
    { label: "Panda", id: "panda" }
  ];

  const animals2 = [
    { label: "Parrot", id: "parrot" },
    { label: "Peacock", id: "peacock" },
    { label: "Penguim", id: "penguim" }
  ];

  const animals3 = [
    { label: "Catfish", id: "catfish" },
    { label: "Cheetah", id: "cheetah" },
    { label: "Chipmunk", id: "chipmunk" }
  ];

  return (
    <>
      <br/>
      <h2>CheckboxList Examples</h2>
      <hr/>
      <h4>Default CheckboxList</h4>
      <div style={{ width: "25rem" }}>
        <CheckboxList
          initialSelectedItems={["panda"]}
          onChange={onCheckboxListChange}
          options={animals}
        />
      </div>
      <br/>
      <h4>CheckboxList with label and tooltip</h4>
      <div style={{ width: "25rem" }}>
        <CheckboxList
          initialSelectedItems={["peacock"]}
          labelText="Select some animals"
          onChange={onCheckboxListChange}
          options={animals2}
          tooltipContent="Tooltip for Checkbox list"
          tooltipProps={{ direction: "right" }}
        />
      </div>
      <br/>
      <h4>Externally controlled CheckboxList</h4>
      <div style={{ width: "25rem" }}>
        <CheckboxList
          labelText="Externally controlled"
          selectedItems={selectedCheckboxList}
          options={animals3}
        />
      </div>
    </>
  );
};

export default CheckboxListExamples;
