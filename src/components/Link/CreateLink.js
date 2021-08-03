import React from "react";
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from "../Auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { 
    errors,
    handleChange,
    handleSubmit,
    values,
  } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
  
  function handleCreateLink() {
    console.log("Link created");
  }

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        className={ errors.description && 'error-input'}
        name="description"
        onChange={handleChange}
        placeholder="A description for your link"
        type="text"
        value={values.description}
      />
      { errors.description && <p className="error-text">{errors.description}</p> }
      <input
        autoComplete="off"
        className={ errors.description && 'error-input'}
        name="url"
        onChange={handleChange}
        placeholder="URL of your link"
        type="text"
        value={values.url}
      />
      { errors.url && <p className="error-text">{errors.url}</p> }
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
