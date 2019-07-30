import React, { useState } from "react";
import { Button, TextInput, Tooltip } from "carbon-components-react";
import Chip from "./Chip";
import "./styles.scss";

const TextInputComponent = ({
  buttonClassName,
  buttonProps,
  createKeyValuePair,
  disabled,
  id,
  invalid,
  invalidText,
  items,
  key,
  labelText,
  keyLabelText,
  valueLabelText,
  onKeyBlur,
  onValueBlur,
  onInputBlur,
  keyPlaceholder,
  valuePlaceholder,
  onChange,
  placeholder,
  textInputProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  type
}) => {
  const [keyValue, setKeyValue] = useState("");
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [createdItems, setCreatedItems] = useState([]);

  const chipItems = items ? items : createdItems; // Externally controlled if items props exists

  const onInputChange = e => {
    setInput(e.target.value);
  }

  const onKeyChange = e => {
    setKeyValue(e.target.value);
  }

  const onValueChange = e => {
    setValue(e.target.value);
  }

  const addValue = () => {
    const items = [ ...chipItems ];
    if(createKeyValuePair && keyValue && value) {
      items.push(`${keyValue}:${value}`);
      setKeyValue("");
      setValue("");
    } else {
      input && items.push(input);
      setInput("");
    }

    setCreatedItems(items);
    onChange(items);
  }

  const removeValue = value => {
    const items = chipItems.filter(item => item !== value);
    setCreatedItems(items);
    onChange(items);
  }

  return (
    <div key={key} className="creatable">
      <div className="creatable__input">
        {createKeyValuePair ? (
          <div className="creatable__key-value-inputs">
            <TextInput
              disabled={disabled}
              id={`${id}-key`}
              invalid={invalid}
              invalidText={invalidText}
              labelText={keyLabelText}
              onBlur={onKeyBlur}
              onChange={onKeyChange}
              placeholder={keyPlaceholder}
              type={type}
              value={keyValue}
              {...textInputProps}
            />
            <p className="creatable__colon">:</p>
            <TextInput
              disabled={disabled}
              id={`${id}-value`}
              invalid={invalid}
              invalidText={invalidText}
              labelText={valueLabelText}
              onBlur={onValueBlur}
              onChange={onValueChange}
              placeholder={valuePlaceholder}
              type={type}
              value={value}
              {...textInputProps}
            />
          </div>
        ) : (
          <TextInput
            disabled={disabled}
            id={id}
            invalid={invalid}
            invalidText={invalidText}
            labelText={labelText}
            onBlur={onInputBlur}
            onChange={onInputChange}
            placeholder={placeholder}
            type={type}
            value={input}
            {...textInputProps}
          />
        )}
        <Button
          className={buttonClassName}
          disabled={disabled}
          onClick={addValue} 
          {...buttonProps}
        >
          Add
        </Button>
      </div>
      <div className="creatable__chips">
        {chipItems.map((item, index) => (
          <Chip key={`${item}-${index}`} value={item} removeValue={removeValue} />
        ))}
      </div>
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
  buttonClassName: "creatable__button",
  createKeyValuePair: false,
  tooltipClassName: "creatable__tooltip"
}

export default TextInputComponent;
