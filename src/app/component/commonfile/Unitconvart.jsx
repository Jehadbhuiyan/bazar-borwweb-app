export const unitBn = {
  litre: "লিটার",
  kg: "কেজি",
  gram: "গ্রাম",
  dozen: "ডজন",
  piece: "গ্রাম",
  hali: "হালি",
};

export const getUnitBn = (unit) => unitBn[unit] || unit;