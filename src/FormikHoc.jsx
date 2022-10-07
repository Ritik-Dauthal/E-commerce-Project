import React from "react";
import { useField } from "formik";

function FormikHoc(IncomingComponent) {
  function outgoingComponent({ id, name, ...rest }) {
    const field = useField(name);
    const [data, meta] = field;

    const { value, onBlur, onChange } = data;
    const { touched, error } = meta;

    return (
      <IncomingComponent
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={error}
        touched={touched}
        name={name}
        {...rest}
      />
    );
  }
  return outgoingComponent;
}
export default FormikHoc;
