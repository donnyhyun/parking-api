import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyPad from "./KeyPad";

function ExitPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleExit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5001/exit`,
        {
          plate: licensePlate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Exit response:", response.data);
      setSuccessOpen(true);
    } catch (error) {
      console.error("Error processing exit:", error);
      setErrorOpen(true);
    }
  };

  const handleErrorClose = (_, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const handleSuccessClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSuccessOpen(false);
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Exit Parking
      </Typography>
      <TextField
        label="License Plate"
        variant="outlined"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />
      <KeyPad setValue={setLicensePlate} />
      <Button variant="contained" color="primary" onClick={handleExit}>
        Exit
      </Button>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to submit. Please try again.
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Exit Successful
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ExitPage;
