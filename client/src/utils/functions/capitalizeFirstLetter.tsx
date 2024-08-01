export const capitalizeFirstLetter = (str: string) => {
  if (str.length === 0) {
    return str; // Handle empty strs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
