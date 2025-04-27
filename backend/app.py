import os
from flask import Flask
from flask_cors import CORS
from models.models import db
from init import populate_db
from parkingLot import park_app
from ticket import ticket_app
from parkingStack import lot_app

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'db/parkinglot.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.sort_keys = False
app.register_blueprint(park_app)
app.register_blueprint(ticket_app)
app.register_blueprint(lot_app)
db.init_app(app)


@app.route("/")
def index():
    return "<p> Parking Lot API Running! </p>"


if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
    app.run(port=5001, debug=True)
