import React from "react";
import { RadioButton, RadioButtonGroup, Tooltip } from "carbon-components-react";
import "./styles.scss";

const RadioComponent = ({
  defaultSelected,
  key,
  labelText,
  name,
  onChange,
  options,
  orientation,
  radioGroupProps,
  radioButtonProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  valueSelected
}) => {
  return (
    <div key={key} className="radio-group">
      {labelText && (
        <div className="radio-group__info">
          <p className="radio-group__label">{labelText}</p>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <Tooltip {...tooltipProps}>
                {tooltipContent}
              </Tooltip>
            </div>
          )}
        </div>
      )}
      <RadioButtonGroup
        defaultSelected={defaultSelected}
        name={name}
        onChange={onChange}
        orientation={orientation}
        valueSelected={valueSelected}
        {...radioGroupProps}
      >
        {options.map(option => (
          <RadioButton
            disabled={option.disabled}
            id={option.id}
            key={option.id}
            labelText={option.label}
            value={option.value}
            {...radioButtonProps} 
          />
        ))}
      </RadioButtonGroup>
    </div>
  );
};

RadioComponent.defaultProps = {
  tooltipClassName: "radio-group__tooltip"
}

export default RadioComponent;
