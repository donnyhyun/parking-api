import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    setPasswordError("");
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    let path = `/ticket`;
    navigate(path);
  };
  return (
    <div className={"loginContainer"}>
      <h1> Welcome to Parking API </h1>
      <br />
      <div className={"inputContainer"}>
        <TextField
          variant="outlined"
          className={"inputBox"}
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"buttonContainer"}>
        <button className={"loginButton"} onClick={onButtonClick}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
