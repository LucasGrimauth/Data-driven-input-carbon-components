import React from "react";
import { TextArea, Tooltip } from "carbon-components-react";
import "./styles.scss";

const TextAreaComponent = ({
  disabled,
  id,
  invalid,
  invalidText,
  key,
  helperText,
  labelText,
  onBlur,
  onChange,
  placeholder,
  style,
  textAreaProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  type,
  value
}) => {
  return (
    <div key={key} className="text-area">
      <TextArea
        disabled={disabled}
        id={id}
        invalid={invalid}
        invalidText={invalidText}
        helperText={helperText}
        labelText={labelText}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
        type={type}
        value={value}
        {...textAreaProps}
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

TextAreaComponent.defaultProps = {
  tooltipClassName: "text-area__tooltip"
}

export default TextAreaComponent;
