from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ParkingLot(db.Model):
    __tablename__ = "lot"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    capacity = db.Column(db.Integer)
    description = db.Column(db.String)
    slots = db.relationship("Slot", backref="lot")
    tickets = db.relationship("Ticket", backref="lot")


class Slot(db.Model):
    __tablename__ = "slot"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lot_id = db.Column(db.Integer, db.ForeignKey('lot.id'), nullable=False)
    occupied = db.Column(db.Boolean, default=False)
    size = db.Column(db.String)
    ticket = db.relationship("Ticket", backref="slot")


class Ticket(db.Model):
    __tablename__ = "ticket"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sid = db.Column(db.Integer, db.ForeignKey('slot.id'))
    lid = db.Column(db.Integer, db.ForeignKey('lot.id'))
    name = db.Column(db.String, nullable=True)
    plate_num = db.Column(db.String, nullable=False, unique=True)
    park_time = db.Column(db.DateTime, default=datetime.now)
    exit_time = db.Column(db.DateTime, default=None)

