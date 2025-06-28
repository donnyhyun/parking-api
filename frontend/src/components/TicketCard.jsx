import { Card, CardContent, Typography, CardHeader, Chip } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function TicketCard({ ticket }) {
  const isExited = Boolean(ticket.exit_time);

  return (
    <Card
      sx={{
        borderLeft: `6px solid ${isExited ? "#ccc" : "#4caf50"}`,
        backgroundColor: isExited ? "#fafafa" : "#e8f5e9",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardHeader
        avatar={<DirectionsCarIcon />}
        title={
          <Typography variant="h6" fontWeight="bold">
            # {ticket.plate_num}
          </Typography>
        }
        action={
          <Chip
            label={isExited ? "Exited" : "Parked"}
            color={isExited ? "default" : "success"}
            icon={isExited ? <ExitToAppIcon /> : null}
            size="small"
          />
        }
      />
      <CardContent>
        <Typography variant="body2">
          <strong>Model:</strong> {ticket.model_name || "-"}
        </Typography>
        <Typography variant="body2">
          <strong>Lot:</strong> {ticket.lot_id}
        </Typography>
        <Typography variant="body2">
          <strong>Slot:</strong> {ticket.slot_id}
        </Typography>
        <Typography variant="body2">
          <strong>Parked:</strong> {ticket.park_time}
        </Typography>
        <Typography variant="body2">
          <strong>Exited:</strong> {ticket.exit_time || "—"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TicketCard;
