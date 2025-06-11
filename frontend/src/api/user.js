import client from "./client";

export const parkVehicle = (vehicleName, licensePlate, sizeValue) =>
  client.post("/park?lot_id=1", {
    model: vehicleName,
    plate: licensePlate,
    size: sizeValue,
  });

export const exitVehicle = (licensePlate) =>
  client.post("/exit", {
    plate: licensePlate,
  });

export const registerUser = (name, email, phoneNumber) =>
  client.post("/register", {
    name: name,
    email: email,
    phone_number: phoneNumber,
  });

export const handleLogin = (phoneNumber) =>
  client.post("/login", {
    phone_number: phoneNumber,
  });
