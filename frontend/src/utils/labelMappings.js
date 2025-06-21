export const lotIdMap = {
  1: "A",
  2: "B",
  3: "C",
};

export const slotSizeMap = {
  sedan: "Small",
  suv: "Medium",
  truck: "Large",
};

export const getLotLabel = (id) => lotIdMap[id] || `Lot ${id}`;
export const getSizeLabel = (size) => slotSizeMap[size] || size;
