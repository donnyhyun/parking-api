from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ParkingLot(db.Model):
    __tablename__ = "lot"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=True)
    slots = db.relationship("Slot", backref="lot")
    tickets = db.relationship("Ticket", backref="lot")


class Slot(db.Model):
    __tablename__ = "slot"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lot_id = db.Column(db.Integer, db.ForeignKey("lot.id"), nullable=False)
    occupied = db.Column(db.Boolean, default=False)
    size = db.Column(db.String, nullable=False)
    ticket = db.relationship("Ticket", backref="slot")


class Ticket(db.Model):
    __tablename__ = "ticket"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    slot_id = db.Column(db.Integer, db.ForeignKey("slot.id"))
    lot_id = db.Column(db.Integer, db.ForeignKey("lot.id"))
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.id"))
    park_time = db.Column(db.DateTime, default=datetime.now)
    exit_time = db.Column(db.DateTime, default=None)


class Vehicle(db.Model):
    __tablename__ = "vehicle"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    plate_num = db.Column(db.String, nullable=False, unique=True)
    model = db.Column(db.String, nullable=True)
    size = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, nullable=False, index=True)
    name = db.Column(db.String, nullable=True)
    phone_number = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    deactivated_at = db.Column(db.DateTime, default=None)
