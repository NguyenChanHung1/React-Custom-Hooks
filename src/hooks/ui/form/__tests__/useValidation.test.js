import { renderHook, act } from '@testing-library/react-hooks';
import { useValidation } from '../useValidation';

describe('useValidation Hook', () => {
    const required = (value) => (value ? undefined : 'This field is required');
    const minLength = (min) => (value) => (value.length >= min ? undefined : `Must be at least ${min} characters`);

    const validators = {
        name: [required],
        password: [required, minLength(8)],
    };

    it('should return valid when all fields meet the criteria', () => {
        const { result } = renderHook(() => useValidation(validators));
        const validFormValues = { name: 'John Doe', password: 'password123' };

        let isValid;
        act(() => {
            isValid = result.current.validateAll(validFormValues);
        });

        expect(isValid).toBe(true);
        expect(result.current.validate_errors).toEqual({});
    });

    it('should return invalid and error messages for fields that fail validation', () => {
        const { result } = renderHook(() => useValidation(validators));
        const invalidFormValues = { name: '', password: '123' };
        
        let isValid;
        act(() => {
            isValid = result.current.validateAll(invalidFormValues);
        });

        expect(isValid).toBe(false);
        expect(result.current.validate_errors.name).toEqual(['This field is required']);
        expect(result.current.validate_errors.password).toEqual(['Must be at least 8 characters']);
    });

    it('should allow manually setting and clearing errors', () => {
        const { result } = renderHook(() => useValidation(validators));
        const manualErrors = { name: ['Manual error message'] };

        act(() => {
            result.current.setErrors(manualErrors);
        });

        expect(result.current.validate_errors).toEqual(manualErrors);

        act(() => {
            result.current.setErrors({});
        });

        expect(result.current.validate_errors).toEqual({});
    });
});