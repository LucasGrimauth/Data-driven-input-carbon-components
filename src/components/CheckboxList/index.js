import React, { useState } from "react";
import { Checkbox, Tooltip } from "carbon-components-react";
import "./styles.scss";

const CheckboxListComponent = ({
  checkboxProps,
  disabled,
  initialSelectedItems,
  key,
  labelText,
  onChange,
  options,
  selectedItems: propsSelectedItems,
  tooltipClassName,
  tooltipContent,
  tooltipProps
}) => {
  const [stateSelectedItems, setSelectedItems] = useState(initialSelectedItems);

  const selectedItems = propsSelectedItems ? propsSelectedItems : stateSelectedItems; // Externally controlled if selectedItems props exists

  const handleCheckboxChange = (value, id, event) => {
    let newSelectedItems = [...stateSelectedItems];

    if(value) {
      newSelectedItems.push(id);
    } else {
      newSelectedItems = newSelectedItems.filter(item => item !== id);
    }

    setSelectedItems(newSelectedItems);

    if(typeof onChange === "function") {
      onChange(value, id, event, newSelectedItems);
    }
  }

  return (
    <div key={key} className="checkbox-list">
      {labelText && (
        <div className="checkbox-list__info">
          <p className="checkbox-list__label">{labelText}</p>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <Tooltip {...tooltipProps}>
                {tooltipContent}
              </Tooltip>
            </div>
          )}
        </div>
      )}
      <div className="checkbox-list__list">
        {options.map(option => {
          const checked = selectedItems.some(item => item === option.id);
          return (
            <Checkbox
              disabled={disabled}
              id={option.id}
              labelText={option.label}
              onChange={handleCheckboxChange}
              checked={checked}
              {...checkboxProps}
            />
          )
        })}
      </div>
    </div>
  );
};

CheckboxListComponent.defaultProps = {
  initialSelectedItems: [],
  tooltipClassName: "checkbox-list__tooltip"
}

export default CheckboxListComponent;
