import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
import KeyPad from "./KeyPad";

const CenteredPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TicketTextField = styled(TextField)`
  margin-top: 6px;
`;

function TicketPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState("");

  const handleEnterClick = async () => {
    try {
      const payload = JSON.stringify({
        name: vehicleName,
        plate: licensePlate,
        size: sizeValue,
      });
      console.log("Park Payload:", payload);
      const response = await fetch(`http://127.0.0.1:5001/park?lot_id=1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error sending license plate:", error);
      setErrorOpen(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  return (
    <CenteredPage>
      <h1>Parking Service </h1>
      <RowContainer>
        <TextField
          select
          label="Size"
          value={sizeValue}
          onChange={(e) => setSizeValue(e.target.value)}
          variant="outlined"
          size="medium"
          sx={{ width: "100px" }}
        >
          <MenuItem value="sedan">Sedan</MenuItem>
          <MenuItem value="suv">SUV</MenuItem>
          <MenuItem value="truck">Truck</MenuItem>
        </TextField>
        <TicketTextField
          id="vehicle-name"
          label="Enter your vehicle model: "
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          variant="outlined"
          sx={{ width: "300px" }}
        />
      </RowContainer>
      <div>
        <label>Enter your license plate: </label>
      </div>
      <TicketTextField
        id="outlined-basic"
        label="License #"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        variant="outlined"
        sx={{ width: "250px" }}
      />
      <KeyPad setValue={setLicensePlate} />
      <Button variant="contained" onClick={handleEnterClick}>
        Enter
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
    </CenteredPage>
  );
}

export default TicketPage;
