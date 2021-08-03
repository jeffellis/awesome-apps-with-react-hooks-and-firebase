import React, { useState } from "react";

import firebase from "../../firebase";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const { 
    errors, 
    handleBlur, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    values 
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { email, name, password } = values;
    setFirebaseError(null);
    try {
      login ? 
        await firebase.login(email, password) :
        await firebase.register(name, email, password);

      props.history.push('/');
    } catch (err) {
      console.error('Authentication error:', err);
      setFirebaseError(err.message);
    }

  }

  return (
    <div>
      <h2 className="mv3">
        { login ? 'Login' : 'Create Account' }
      </h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        { login ? null :
        <input
          type="text"
          placeholder="Your Name"
          autoComplete="off"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
        /> }
        <input 
          className={errors.email && 'error-input'}
          type="email"
          placeholder="Your Email"
          autoComplete="off"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        { errors.email && <p className="error-text">{errors.email}</p> }
        <input 
          type="password"
          placeholder="Choose a secure password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        { errors.password && <p className="error-text">{errors.password}</p> }
        { firebaseError && <p className="error-text">{firebaseError}</p> }
        <div className="flex mt3">
          <button 
            className="button pointer mr2" 
            type="submit" 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button className="button pointer" type="button" 
          onClick={() => setLogin((prevLogin) => !prevLogin)} >
            { login ? "Need to Create an Account?" : "Already have an account" }
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
