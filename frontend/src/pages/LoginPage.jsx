import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

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
    const path = password === "admin" ? "/admin/tickets" : "/ticket";
    navigate(path);
  };

  const handleRegister = async () => {
    navigate("/register");
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
        <Button variant="outlined" onClick={handleRegister} sx={{ mt: 1 }}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
