import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const [login, setLogin] = useState(true);
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, values } = useFormValidation(INITIAL_STATE, validateLogin);

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
        { errors.email && <p className="error-text">{errors.password}</p> }
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
