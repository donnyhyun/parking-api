from flask import Blueprint, jsonify
from app.models.models import Vehicle

vehicle_app = Blueprint("VehicleApp", __name__)


@vehicle_app.route("/vehicles", methods=["GET"])
def get_vehicles():
    vehicles = Vehicle.query.all()
    res = []
    for vehicle in vehicles:
        data = {
            "id": vehicle.id,
            "model": vehicle.model,
            "plate_num": vehicle.plate_num,
            "owner_id": vehicle.user_id,
            "created_at": vehicle.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        res.append(data)
    return jsonify(res), 200
