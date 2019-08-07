import React from "react";
import ReactDOM from "react-dom";
import DynamicFormik from "./components/Formik";
import CreatableExamples from "./components/Creatable/CreatableExamples";
import DataDrivenInputExamples from "./components/DataDrivenInput/DataDrivenInputExamples";
import MultiSelectExamples from "./components/MultiSelect/MultiSelectExamples";
import RadioExamples from "./components/Radio/RadioExamples";
import SelectExamples from "./components/Select/SelectExamples";
import TextInputExamples from "./components/TextInput/TextInputExamples";
import TextAreaExamples from "./components/TextArea/TextAreaExamples";
import ToggleExamples from "./components/Toggle/ToggleExamples";
import "./styles.scss";

function App() {
  return (
    <div className="App">
      <DynamicFormik />
      <CreatableExamples />
      <DataDrivenInputExamples />
      <MultiSelectExamples />
      <RadioExamples />
      <SelectExamples />
      <TextInputExamples />
      <TextAreaExamples />
      <ToggleExamples />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
