import { jest } from '@jest/globals'; 

export const useValidation = jest.fn(() => ({
    validate_errors: {},
    validateAll: jest.fn((values) => {
        // Basic mock validation: assume valid unless specific errors are set for test
        const errors = {};
        if (values.productId === 'invalid') errors.productId = ['Invalid ID'];
        return Object.keys(errors).length === 0;
    }),
    setErrors: jest.fn(),
}));