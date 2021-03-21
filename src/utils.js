export const formatName = (string) => {
  const splitString = string.split('');
  const formatedString = splitString.map((item, index) => {
    if (index === 0) {
      return item.toUpperCase();
    }
    return item;
  });
  return formatedString;
};
