import { useState } from "react";
import { MenuItem, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
import KeyPad from "../components/KeyPad";
import { parkVehicle } from "../api/user";

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
  const [sizeValue, setSizeValue] = useState("");
  const [lotValue, setLotValue] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnterClick = async () => {
    try {
      const response = await parkVehicle(
        lotValue,
        vehicleName,
        licensePlate,
        sizeValue,
      );
      console.log("Server response:", response.data);
      setErrorOpen(false);
      setSuccessOpen(true);
    } catch (error) {
      console.error("Error sending license plate:", error);
      setErrorMessage("Error parking vehicle. Please check the details.");
      setSuccessOpen(false);
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
    <CenteredPage>
      <Typography variant="h4">Parking Service</Typography>
      <RowContainer>
        <TextField
          select
          label="Lot #"
          value={lotValue}
          onChange={(e) => setLotValue(e.target.value)}
          variant="outlined"
          size="medium"
          sx={{ width: "60px" }}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
        </TextField>
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
          label="Enter your vehicle model"
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
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
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
          Parking Successful
        </Alert>
      </Snackbar>
    </CenteredPage>
  );
}

export default TicketPage;
