import client from "./client";

export const getAllLots = () => client.get("/parking-lots");

export const getParkingLotDetails = (lotId) => client.get(`/lot/${lotId}`);

export const getAllTickets = (lotId) =>
  client.get("/tickets", {
    params: lotId ? { lot_id: lotId } : {},
  });
