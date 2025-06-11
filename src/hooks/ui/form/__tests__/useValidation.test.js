import { renderHook, act } from '@testing-library/react';
import { useValidation } from '../useValidation';

describe('useValidation Hook', () => {
    // Định nghĩa một vài validators mẫu để test
    const required = (value) => (value ? undefined : 'This field is required');
    const minLength = (min) => (value) => (value.length >= min ? undefined : `Must be at least ${min} characters`);

    const validators = {
        name: [required],
        password: [required, minLength(8)],
    };

    it('should return valid when all fields meet the criteria', () => {
        // Arrange: Chuẩn bị dữ liệu đầu vào
        const { result } = renderHook(() => useValidation(validators));
        const validFormValues = { name: 'John Doe', password: 'password123' };

        // Act: Thực thi hàm cần test
        let isValid;
        act(() => {
            isValid = result.current.validateAll(validFormValues);
        });

        // Assert: Kiểm tra kết quả
        expect(isValid).toBe(true);
        expect(result.current.validate_errors).toEqual({});
    });

    it('should return invalid and error messages for fields that fail validation', () => {
        // Arrange
        const { result } = renderHook(() => useValidation(validators));
        const invalidFormValues = { name: '', password: '123' };
        
        // Act
        let isValid;
        act(() => {
            isValid = result.current.validateAll(invalidFormValues);
        });

        // Assert
        expect(isValid).toBe(false);
        expect(result.current.validate_errors.name).toEqual(['This field is required']);
        expect(result.current.validate_errors.password).toEqual(['Must be at least 8 characters']);
    });

    it('should allow manually setting and clearing errors', () => {
        // Arrange
        const { result } = renderHook(() => useValidation(validators));
        const manualErrors = { name: ['Manual error message'] };

        // Act
        act(() => {
            result.current.setErrors(manualErrors);
        });

        // Assert
        expect(result.current.validate_errors).toEqual(manualErrors);

        // Act: Clear errors
        act(() => {
            result.current.setErrors({});
        });

        // Assert: Check if errors are cleared
        expect(result.current.validate_errors).toEqual({});
    });
});