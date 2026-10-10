export const bnNumber = (number) => {
  if (number === null || number === undefined) return "";

  return Number(number).toLocaleString("bn-BD");
};