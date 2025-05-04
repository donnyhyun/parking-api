import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyPad from "./KeyPad";

function ExitPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const handleExit = async () => {
    try {
      const response = await fetch(``, {
        method: "POST",
      });

      const result = await response.json();
      console.log("Exit response:", result);
    } catch (error) {
      console.error("Error processing exit:", error);
      setErrorOpen(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
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
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to submit. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ExitPage;
