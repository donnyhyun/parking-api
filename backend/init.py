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
    size="suv"
)

s2 = Slot(
    lot_id=1,
    occupied=False,
    size="sedan"
)

s3 = Slot(
    lot_id=2,
    occupied=False,
    size="truck"
)

s4 = Slot(
    lot_id=1,
    occupied=False,
    size="suv"
)

s5 = Slot(
    lot_id=1,
    occupied=False,
    size="suv"
)

s6 = Slot(
    lot_id=2,
    occupied=False,
    size="suv"
)

s7 = Slot(
    lot_id=1,
    occupied=False,
    size="truck"
)

s8 = Slot(
    lot_id=1,
    occupied=False,
    size="sedan"
)

s9 = Slot(
    lot_id=1,
    occupied=False,
    size="sedan"
)

s10 = Slot(
    lot_id=1,
    occupied=False,
    size="suv"
)

s11 = Slot(
    lot_id=1,
    occupied=False,
    size="suv"
)

s12 = Slot(
    lot_id=1,
    occupied=False,
    size="truck"
)


def populate_db():
    db.session.add_all([p1, p2, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12])
    db.session.commit()
