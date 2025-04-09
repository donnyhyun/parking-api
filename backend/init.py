from models.models import db, Slot, ParkingLot

p1 = ParkingLot(
    capacity=10,
    description="Small local parking space"
)

p2 = ParkingLot(
    capacity=300,
    description="Large parking complex"
)

s1 = Slot(
    lot_id=1,
    occupied=False,
    size="medium"
)

s2 = Slot(
    lot_id=1,
    occupied=False,
    size="small"
)

s3 = Slot(
    lot_id=2,
    occupied=False,
    size="large"
)

s4 = Slot(
    lot_id=1,
    occupied=False,
    size="medium"
)

s5 = Slot(
    lot_id=1,
    occupied=False,
    size="medium"
)

s6 = Slot(
    lot_id=2,
    occupied=False,
    size="medium"
)

s7 = Slot(
    lot_id=1,
    occupied=False,
    size="large"
)


def populate_db():
    db.session.add_all([p1, p2, s1, s2, s3, s4, s5, s6, s7])
    db.session.commit()
