import React from "react";

const FormInput = ({ name, value, onChangeHandler, dataTestId, className }) => {
  return (
    <input
      className={`form-control ${className}`}
      type="text"
      name={name}
      value={value}
      onChange={onChangeHandler}
      data-test-id={dataTestId}
    />
  )
}

export default FormInput;