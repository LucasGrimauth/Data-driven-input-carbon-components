import React from "react";
import { Formik, Form } from "formik";
//import * as yup from "yup";
import { transformAll } from "@overgear/yup-ast";
import DataDrivenInput from "../DataDrivenInput";
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

/* //Origingal Signup Schema

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});
*/

const inputs = [
  {
    key: "inputText",
    label: "Label Text",
    value: "something",
    type: "text",
    placeholder: "placeholder",
    required: true,
    minLength: "2",
    maxLength: "20"
  },
  {
    key: "inputEmail",
    label: "Label Email",
    value: "example@email.com",
    type: "email",
    required: true,
    placeholder: "placeholder"
  },
  {
    key: "inputArea",
    label: "Label Area",
    value: "",
    type: "textarea",
    placeholder: "placeholder",
    required: true
  },
  {
    key: "inputToggle",
    label: "Label Toggle",
    value: true,
    type: "toggle"
  },
  {
    key: "inputRadio",
    label: "Label Radio",
    value: "two",
    type: "radio",
    orientation: "vertical",
    options: [
      { id: "radio-1", label: "One", value: "one" }, 
      { id: "radio-2", label: "Two", value: "two" }
    ],
    placeholder: "placeholder"
  },
  {
    key: "inputSelect",
    label: "Label Select",
    value: { label: "Two", value: "two" },
    type: "select",
    options: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" }
    ],
    placeholder: "placeholder"
  },
  {
    key: "inputMultiselect",
    label: "Label MultiSelect",
    type: "multiselect",
    options: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ],
    values: [{ label: "Two", value: "two" }],
    placeholder: "placeholder"
  },
  {
    key: "inputCreatable",
    label: "Label Creatable",
    type: "creatable",
    values: ["one"],
    placeholder: "placeholder"
  },
  {
    key: "inputCheckboxList",
    label: "Label Checkbox",
    type: "checkbox",
    values: ["one", "two"],
    options: [
      { label: "One", id: "one" },
      { label: "Two", id: "two" },
      { label: "Three", id: "three" }
    ]
  }
]

const yupAST = () => {
  let yupShape = {}

  inputs.forEach(input => {
    let yupValidationArray = [];
    const inputType = input.type;

    if( inputType === TEXT_INPUT_TYPES.TEXT || 
        inputType === TEXT_INPUT_TYPES.PASSWORD ||
        inputType === TEXT_INPUT_TYPES.NUMBER ||
        inputType === TEXT_AREA_TYPES.TEXTAREA ||
        inputType === RADIO_TYPES.RADIO ) {
      yupValidationArray.push(["yup.string"]);
    } else if(inputType === TEXT_INPUT_TYPES.EMAIL) {
      yupValidationArray.push(["yup.string"], ["yup.email", "Please enter a valid email"]);
    } else if(inputType === TEXT_INPUT_TYPES.URL) {
      yupValidationArray.push(["yup.string"], ["yup.url", "Please enter a valid url"]);
    } else if(inputType === TOGGLE_TYPES.TOGGLE) {
      yupValidationArray.push(["yup.bool"]);
    } else if(inputType === SELECT_TYPES.SELECT) {
      yupValidationArray.push(["yup.object"]);
    } else if(inputType === MULTI_SELECT_TYPES.MULTI_SELECT || inputType === CREATABLE_TYPES.CREATABLE || inputType === CHECKBOX_TYPES.CHECKBOX) {
      yupValidationArray.push(["yup.array"]);
    }

    if(input.required) {
      yupValidationArray.push(["yup.required", `Please enter a ${input.key}`]);
    }
    if(input.minLength) {
      yupValidationArray.push(["yup.min", input.minLength, `Minimum of ${input.minLength} characters`]);
    }
    if(input.maxLength) {
      yupValidationArray.push(["yup.max", input.maxLength, `Maximum of ${input.maxLength} characters`]);
    }

    yupShape[input.key] = yupValidationArray;
  });

  return [["yup.object"],["yup.shape", yupShape]];
} 

/**
 * Get initial values of each input in array of inputs
 */
const initialValues = () => {
  const values = {} 
  inputs.forEach(input => {
    let value = input.value ? input.value : input.values ? input.values : undefined;
    if(value) values[input.key] = value;
  });
  return values;
}

const DynamicFormik = () => (
  <>
    <br/>
    <h2>Formik Example</h2>
    <hr/>
    <Formik
      initialValues={initialValues()}
      validationSchema={transformAll(yupAST())}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ 
        values,
        touched,
        errors,
        isValid,
        handleBlur,
        handleChange,
        setFieldValue 
      }) => {
        return (
          <Form style={{ display: "flex", flexDirection: "column", width: "25rem" }}>
            {inputs.map(input => {
              const key = input.key;
              const inputValue = values[key];
              const invalidText = errors[key];
              const invalid = invalidText && touched[key];
              return (
                <DataDrivenInput
                  type={input.type}
                  allProps={{
                    id: key,
                    name: key,
                    key: key,
                    placeholder: input.placeholder,
                    value: inputValue,
                    invalid: invalid,
                    invalidText: invalidText,
                    labelText: input.label,
                    titleText: input.label,
                    onBlur: handleBlur
                  }}
                  checkboxProps={{
                    onChange: (value, id, event, selectedItems) => setFieldValue(key, selectedItems),
                    initialSelectedItems: inputValue,
                    options: input.options
                  }}
                  creatableProps={{ 
                    onChange: createdItems => setFieldValue(key, createdItems),
                    values: inputValue
                  }}
                  multiSelectProps={{ 
                    onChange: ({ selectedItems }) => setFieldValue(key, selectedItems),
                    initialSelectedItems: inputValue,
                    items: input.options,
                    itemToString: input => input.label,
                    label: input.placeholder
                  }}
                  radioProps={{ 
                    onChange: value => setFieldValue(key, value),
                    options: input.options,
                    orientation: input.orientation,
                    valueSelected: inputValue
                  }}
                  selectProps={{ 
                    onChange: ({ selectedItem }) => setFieldValue(key, selectedItem),
                    initialSelectedItem: inputValue,
                    items: input.options,
                    itemToString: input => input.label
                  }}
                  textAreaProps={{ onChange: handleChange }}
                  textInputProps={{ onChange: handleChange, type: input.type }}
                  toggleProps={{ 
                    onToggle: value => setFieldValue(key, value),
                    toggled: inputValue
                  }}
                />
              )
            })}
            <button style={{ marginTop: "1rem" }} disabled={!isValid} type="submit">Submit</button>
          </Form>
        )}
      }
    </Formik>
  </>
);

export default DynamicFormik;
