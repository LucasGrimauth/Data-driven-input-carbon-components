import React from "react";
import CloseIcon from "./CloseIcon";
import "./styles.scss";

const Chip = ({ key, value, removeValue }) => {
  return (
    <button key={key} className="chip" type="button" onClick={() => removeValue(value)}>
      <CloseIcon className="chip__icon" />
      <p className="chip__value">{value}</p>
    </button>
  )
}

export default Chip;