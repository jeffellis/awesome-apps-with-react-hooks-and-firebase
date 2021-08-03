import React, { useEffect, useState } from "react";

function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
      if (isSubmitting) {
        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
            console.log('authenticated', values);
        }
        setSubmitting(false);
      }
  }, [errors]);

  function handleBlur() {
    setErrors(validate(values));
  };

  function handleChange(event) {
    event.persist();
    setValues((previousValues) => {
        console.log(event.target.name, event.target.value);
        return {
            ...previousValues,
            [event.target.name]: event.target.value,
        }
    });
  };

  function handleSubmit(event) {
      event.preventDefault();
      setSubmitting(true);
      const validationErrors = validate(values);
      setErrors(validationErrors);
      console.log({ values }, validationErrors);
  }

  return { errors, handleBlur, handleChange, handleSubmit, isSubmitting, values };
}

export default useFormValidation;
