from flask import Blueprint, jsonify
from app.models.models import ParkingLot, Slot


lot_app = Blueprint("LotApp", __name__)


@lot_app.route("/parking-lots", methods=["GET"])
def get_stack():
    lots = ParkingLot.query.all()
    res = []
    for lot in lots:
        data = {"id": lot.id, "capacity": lot.capacity, "description": lot.description}
        res.append(data)
    return jsonify(res), 200


@lot_app.route("/lot/<lot_id>", methods=["GET"])
def get_parkinglot(lot_id):
    slots = Slot.query.filter_by(lot_id=lot_id).all()
    res = []
    for slot in slots:
        data = {"id": slot.id, "occupied": slot.occupied, "size": slot.size}
        res.append(data)
    return {"lot_num": lot_id, "spaces": res}, 200


@lot_app.route("/empty/<lot_id>", methods=["GET"])
def get_empty_slots(lot_id):
    open_slots = Slot.query.filter_by(lot_id=lot_id, occupied=False).all()
    res = []
    for slot in open_slots:
        data = {
            "lot_id": slot.lot_id,
            "id": slot.id,
            "occupied": slot.occupied,
            "size": slot.size,
        }
        res.append(data)

    return {"lot_num": lot_id, "open_spaces": res}, 200


@lot_app.route("/all", methods=["GET"])
def get_all_spaces_by_lot():
    spaces = []
    num_lots = ParkingLot.query.count()
    for i in range(1, num_lots + 1):
        slots = Slot.query.filter_by(lot_id=i).all()
        res = []
        for slot in slots:
            data = {"id": slot.id, "occupied": slot.occupied, "size": slot.size}
            res.append(data)
        spaces.append({"lot_num": i, "parking_slots": res})
    return spaces, 200
