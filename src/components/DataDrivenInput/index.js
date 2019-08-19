import React from "react";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import Toggle from "../Toggle";
import Radio from "../Radio";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import Creatable from "../Creatable";
import CheckboxList from "../CheckboxList";
import {
  CHECKBOX_TYPES,
  CREATABLE_TYPES, 
  MULTI_SELECT_TYPES, 
  RADIO_TYPES, 
  SELECT_TYPES, 
  TEXT_AREA_TYPES,
  TEXT_INPUT_TYPES,
  TOGGLE_TYPES
} from "../../constants/inputTypes";

const DataDrivenInputComponent = ({
  allProps,
  checkboxProps,
  creatableProps,
  multiSelectProps,
  radioProps,
  selectProps,
  textAreaProps,
  textInputProps,
  toggleProps,
  type
}) => {
  if(Object.values(CHECKBOX_TYPES).includes(type)) {
    return <CheckboxList {...allProps} {...checkboxProps} />;
  } else if(Object.values(CREATABLE_TYPES).includes(type)) {
    return <Creatable {...allProps} {...creatableProps} />;
  } else if(Object.values(MULTI_SELECT_TYPES).includes(type)) {
    return <MultiSelect {...allProps} {...multiSelectProps} />;
  } else if(Object.values(RADIO_TYPES).includes(type)) {
    return <Radio {...allProps} {...radioProps} />;
  } else if(Object.values(SELECT_TYPES).includes(type)) {
    return <Select {...allProps} {...selectProps} />;
  } else if(Object.values(TEXT_AREA_TYPES).includes(type)) {
    return <TextArea {...allProps} {...textAreaProps} />;
  } else if(Object.values(TEXT_INPUT_TYPES).includes(type)) {
    return <TextInput type={type} {...allProps} {...textInputProps} />;
  } else if(Object.values(TOGGLE_TYPES).includes(type)) {
    return <Toggle {...allProps} {...toggleProps} />;
  } else {
    return null;
  }
};

export default DataDrivenInputComponent;
