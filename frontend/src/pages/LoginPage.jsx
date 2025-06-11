import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { handleLogin } from "../api/user";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setPasswordError("");
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    try {
      const res = await handleLogin(password);
      localStorage.setItem("token", res.data.access_token);
      console.log("Login success:", res.data);

      const path = password === "admin" ? "/admin/tickets" : "/ticket";
      navigate(path);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("Login failed: User does not exist");
          setErrorOpen(true);
        } else {
          setErrorMessage("An error occurred during login");
          setErrorOpen(true);
        }
      } else {
        console.error(error.message);
      }
    }
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

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
