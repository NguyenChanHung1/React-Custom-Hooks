export const required = (value) => {
  if (!value || value.trim() === '') {
    return 'Trường này là bắt buộc.';
  }
  return null;
};

export const minLength = (length) => (value) => {
  if (value && value.length < length) {
    return `Cần ít nhất ${length} ký tự.`;
  }
  return null;
};

export const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return 'Địa chỉ email không hợp lệ.';
  }
  return null;
};

export const isNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Trường này là bắt buộc và phải là số.';
  }
  if (isNaN(Number(value)) || !isFinite(Number(value))) {
    return 'Phải là một số hợp lệ.';
  }
  return null;
};

export const isPositive = (value) => {
  if (Number(value) < 0) {
    return 'Giá trị phải là số dương.';
  }
  return null;
};