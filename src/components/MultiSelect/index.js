import React from "react";
import { MultiSelect, Tooltip } from "carbon-components-react";
import "./styles.scss";

const MultiSelectComponent = ({
  disabled,
  downshiftProps,
  id,
  initialSelectedItems,
  invalid,
  invalidText,
  items,
  itemToString,
  key,
  label,
  multiSelectProps,
  onChange,
  placeholder,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  values
}) => {
  return (
    <div key={key} className="multi-select">
      <MultiSelect
        disabled={disabled}
        id={id}
        initialSelectedItems={initialSelectedItems}
        invalid={invalid}
        invalidText={invalidText}
        items={items}
        itemToString={itemToString}
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        titleText={titleText}
        selectedItems={values}
        downshiftProps={downshiftProps}
        {...multiSelectProps}
      />
      {tooltipContent && (
        <div className={tooltipClassName}>
          <Tooltip {...tooltipProps}>
            {tooltipContent}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

MultiSelectComponent.defaultProps = {
  tooltipClassName: "multi-select__tooltip"
}

export default MultiSelectComponent;
