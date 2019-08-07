import React from "react";
import { Formik, Form } from "formik";
//import * as yup from "yup";
import { transformAll } from "@overgear/yup-ast";
import DataDrivenInput from "../DataDrivenInput";

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
    value: "",
    type: "text",
    placeholder: "placeholder"
  },
  {
    key: "inputEmail",
    label: "Label Email",
    value: "",
    type: "email",
    placeholder: "placeholder"
  },
  {
    key: "inputArea",
    label: "Label Area",
    value: "",
    type: "textarea",
    placeholder: "placeholder"
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
  }
]

const yupAST = [
  ["yup.object"],
  [
    "yup.shape",
    {
      inputText: [["yup.string"], ["yup.required", "Please enter a text"], ["yup.min", 2, "Minimum 2 characters"]],
      inputEmail: [["yup.string"], ["yup.required", "Please enter an email"], ["yup.email", "Please enter a valid email"]],
      inputArea: [["yup.string"], ["yup.required", "Please enter a text"]]
    }
  ]
];

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
    <h2>Formik Example</h2>
    <hr/>
    <Formik
      initialValues={initialValues()}
      validationSchema={transformAll(yupAST)}
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
          console.log(errors);
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
                  onBlur: handleBlur,
                  required: !!invalidText
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
      )}}
    </Formik>
  </>
);

export default DynamicFormik;
