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