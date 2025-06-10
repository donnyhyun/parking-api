import React, { useState } from "react";
import { TextField, Button, Stack, Box } from "@mui/material";
import { registerUser } from "../api/user";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phoneNumber: false,
  });

  const handleRegister = async () => {
    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim(),
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    try {
      const response = await registerUser(name, email, phoneNumber);
      console.log(
        "User registered successfully. User ID: " + response.data.userId,
      );
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred during registration.",
      );
    }
  };

  return (
    <div className={"loginContainer"}>
      <h1> User Registration </h1>
      <br />
      <Stack spacing={4}>
        <TextField
          variant="outlined"
          className={"inputBox"}
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          error={errors.email}
          helperText={errors.email ? "Email is required" : ""}
        />
        <TextField
          variant="outlined"
          className={"inputBox"}
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          error={errors.name}
          helperText={errors.name ? "Name is required" : ""}
        />
        <TextField
          variant="outlined"
          className={"inputBox"}
          value={phoneNumber}
          placeholder="Enter your phone number here"
          onChange={(ev) => setPhoneNumber(ev.target.value)}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber ? "Phone number is required" : ""}
        />
        <Box mt={3}>
          <Button variant="outlined" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Stack>
    </div>
  );
}

export default RegisterPage;
