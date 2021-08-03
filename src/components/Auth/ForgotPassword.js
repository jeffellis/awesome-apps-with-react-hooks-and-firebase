import React, { useContext, useState } from "react";
import {FirebaseContext} from '../../firebase/index'

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      setPasswordResetError(null);
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
    } catch (err) {
      console.error("Error sending email", err);
      setIsPasswordReset(false);
      setPasswordResetError(err.message);
    }
  }

  return ( 
    <div>
      <input
        className="input"
        onChange={ (event) => setResetPasswordEmail(event.target.value) }
        placeholder="Provide your account email"
        type="email"
        value={resetPasswordEmail}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div> 
      { isPasswordReset && <p>Check email to reset password</p> } 
      { passwordResetError && <p className="error-text">{ passwordResetError }</p> } 
    </div>
  );
}

export default ForgotPassword;
