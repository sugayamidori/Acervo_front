export const formatNumber = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, "");

  if (cleanNumber.length !== 13) {
    throw new Error("Invalid number. The number must be 13 digits long.");
  }

  const countryCode = cleanNumber.slice(0, 2);
  const ddd = cleanNumber.slice(2, 4);
  const partOne = cleanNumber.slice(4, 9);
  const partTwo = cleanNumber.slice(9);

  return `+${countryCode} (${ddd}) ${partOne}-${partTwo}`;
};
