import React from "react";
import { ComboBox, Tooltip } from "carbon-components-react";
import "./styles.scss";

const SelectComponent = ({
  comboBoxProps,
  disabled,
  downshiftProps,
  id,
  initialSelectedItem,
  invalid,
  invalidText,
  items,
  itemToString,
  key,
  label,
  onChange,
  placeholder,
  shouldFilterItem,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  values
}) => {
  return (
    <div key={key} className="select">
      <ComboBox
        disabled={disabled}
        downshiftProps={downshiftProps}
        id={id}
        initialSelectedItem={initialSelectedItem}
        invalid={invalid}
        invalidText={invalidText}
        items={items}
        itemToString={itemToString}
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        titleText={titleText}
        shouldFilterItem={shouldFilterItem}
        value={values}
        {...comboBoxProps}
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

SelectComponent.defaultProps = {
  tooltipClassName: "select__tooltip"
}

export default SelectComponent;
