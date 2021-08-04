import React, { useContext } from "react";
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from "../Auth/validateCreateLink";
import {FirebaseContext} from '../../firebase/index'

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);
  
  const { 
    errors,
    handleChange,
    handleSubmit,
    values,
  } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
  
  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
      return;
    }

    const { url, description } = values;
    const newLink = {
      comments: [],
      created: Date.now(),
      description,
      postedBy: {
        id: user.uid,
        name: user.displayName,
      },
      url,
      voteCount: 0,
      votes: [],
    };

    firebase.db.collection('links').add(newLink);

    props.history.push("/");
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
        type="url"
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
