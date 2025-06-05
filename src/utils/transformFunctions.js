export const toUppercase = (value) => {
  if (typeof value !== 'string') return value;
  return value.toUpperCase();
};

export const toLowercase = (value) => {
  if (typeof value !== 'string') return value;
  return value.toLowerCase();
};

// Chu cai dau viet hoa
export const toTitleCase = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toggleBoolean = (value) => {
  return !value;
};