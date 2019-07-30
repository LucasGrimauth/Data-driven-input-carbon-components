import React from "react";
import { Toggle, Tooltip } from "carbon-components-react";
import "./styles.scss";

const ToggleComponent = ({
  disabled,
  defaultToggled,
  id,
  key,
  labelText,
  tooltipClassName,
  tooltipContent,
  onChange,
  onToggle,
  toggled,
  toggleProps,
  tooltipProps,
  theme
}) => {
  return (
    <div key={key} className={`toggle --${theme}`}>
      {labelText && (
        <div className="toggle__info">
          <label className="toggle__label" htmlFor={id}>{labelText}</label>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <Tooltip {...tooltipProps}>
                {tooltipContent}
              </Tooltip>
            </div>
          )}
        </div>
      )}
      <Toggle
        id={id}
        disabled={disabled}
        defaultToggled={defaultToggled}
        onChange={onChange}
        onToggle={onToggle}
        toggled={toggled}
        labelA=""
        labelB=""
        {...toggleProps}
      />
    </div>
  );
};

ToggleComponent.defaultProps = {
  theme: "black",
  tooltipClassName: "toggle__tooltip"
};

export default ToggleComponent;
