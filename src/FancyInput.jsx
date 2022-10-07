import React from "react";
import FormikHoc from "./FormikHoc";

let FancyInput = ({
  placeholder,
  onChange,
  value,
  touched,
  error,
  ...rest
}) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="border-2 border-blue-500 rounded-md"
        {...rest}
      />
      {touched && error && <div className="text-red-700">{error}</div>}
    </div>
  );
};
export const FormikFancyInput = FormikHoc(FancyInput);
export default FancyInput;
