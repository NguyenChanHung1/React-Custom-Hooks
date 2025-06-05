import React from 'react';
import { useForm } from '../hooks/form/useForm';
import { required, isEmail, minLength } from '../utils/validators'; // Import các validator

const ContactForm = () => {
  const {
    formValues,
    handleChange,
    validate_errors,
    isLoading,
    error: submitError, // Đổi tên để tránh trùng lặp
    isSuccess,
    handleSubmit,
    resetForm,
    isValid
  } = useForm(
    {
      name: '',
      email: '',
      message: ''
    },
    {
      name: [required, minLength(3)],
      email: [required, isEmail],
      message: [required]
    },
    async (values) => {
      // Đây là logic gửi form thực tế, ví dụ gọi API
      console.log('Form submitted with values:', values);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (values.name === 'admin') {
            reject(new Error('Người dùng "admin" không được phép.'));
          } else {
            console.log('Gửi dữ liệu thành công!', values);
            resolve({ success: true, message: 'Dữ liệu đã được gửi.' });
          }
        }, 1500);
      });
    }
  );

  return (
    <div>
      <h2>Composition Design Pattern Demo - Form Validators</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name" // RẤT QUAN TRỌNG: Thêm thuộc tính `name` để `handleChange` hoạt động đúng
            value={formValues.name}
            onChange={handleChange}
          />
          {validate_errors.name && validate_errors.name.map((err, index) => (
            <p key={index} style={{ color: 'red' }}>{err}</p>
          ))}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" // RẤT QUAN TRỌNG: Thêm thuộc tính `name`
            value={formValues.email}
            onChange={handleChange}
          />
          {validate_errors.email && validate_errors.email.map((err, index) => (
            <p key={index} style={{ color: 'red' }}>{err}</p>
          ))}
        </div>

        <div>
          <label htmlFor="message">Tin nhắn:</label>
          <textarea
            id="message"
            name="message" // RẤT QUAN TRỌNG: Thêm thuộc tính `name`
            value={formValues.message}
            onChange={handleChange}
          ></textarea>
          {validate_errors.message && validate_errors.message.map((err, index) => (
            <p key={index} style={{ color: 'red' }}>{err}</p>
          ))}
        </div>

        <button type="submit" disabled={isLoading || !isValid}>
          {isLoading ? 'Đang gửi...' : 'Gửi'}
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>

        {submitError && <p style={{ color: 'red' }}>Lỗi gửi form: {submitError.message}</p>}
        {isSuccess && <p style={{ color: 'green' }}>Gửi form thành công!</p>}
      </form>
    </div>
  );
};

export default ContactForm;