import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Stack, Box, Snackbar, Alert } from "@mui/material";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      setSnackbarMessage("Registration successful!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        if (error.response.status === 400) {
          setSnackbarMessage(
            "Failed: Invalid input. Please check your details.",
          );
        } else if (error.response.status === 409) {
          setSnackbarMessage("Failed: User already exists.");
        } else {
          setSnackbarMessage(
            "Failed: An unexpected error occurred. Please try again.",
          );
        }
      } else {
        setSnackbarMessage(
          "Failed: Network error. Please check your connection.",
        );
      }
      setSnackbarOpen(true);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            height: 40,
          }}
        >
          <Button variant="text" component={Link} to="/">
            ← Back
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RegisterPage;
