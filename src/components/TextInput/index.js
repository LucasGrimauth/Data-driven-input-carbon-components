import React from "react";
import { TextInput, Tooltip } from "carbon-components-react";
import "./styles.scss";

const TextInputComponent = ({
  disabled,
  id,
  invalid,
  invalidText,
  key,
  labelText,
  onBlur,
  onChange,
  placeholder,
  style,
  textInputProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  type,
  value
}) => {
  return (
    <div key={key} className="text-input">
      <TextInput
        disabled={disabled}
        id={id}
        invalid={invalid}
        invalidText={invalidText}
        labelText={labelText}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        type={type}
        value={value}
        {...textInputProps}
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

TextInputComponent.defaultProps = {
  tooltipClassName: "text-input__tooltip"
}

export default TextInputComponent;
