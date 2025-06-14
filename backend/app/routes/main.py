from flask import Blueprint

main_app = Blueprint("main", __name__)


@main_app.route("/")
def index():
    return "<p> Parking Lot API Running! </p>"
