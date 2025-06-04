import { useState, useCallback } from 'react';

export const useValidation = (validators = {}) => {
    const [errors, setErrors] = useState({});

    const validate = useCallback((fieldName, value) => {
        let fieldErrors = [];
        if (validators[fieldName]) {
            validators[fieldName].forEach(validator => {
                const error = validator(value);
                if (error) {
                    fieldErrors.push(error);
                }
            });
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: fieldErrors.length > 0 ? fieldErrors : undefined,
        }));
        return fieldErrors.length === 0; // Trả về true nếu không có lỗi
    }, [validators]);

    const validateAll = useCallback((formValues) => {
        let isValid = true;
        let newErrors = {};
        for (const fieldName in formValues) {
            let fieldErrors = [];
            if (validators[fieldName]) {
                validators[fieldName].forEach(validator => {
                    const error = validator(formValues[fieldName]);
                    if (error) {
                        fieldErrors.push(error);
                    }
                });
            }
            if (fieldErrors.length > 0) {
                isValid = false;
            }
            newErrors[fieldName] = fieldErrors.length > 0 ? fieldErrors : undefined;
        }
        setErrors(newErrors);
        return isValid;
    }, [validators]);

    return {
        errors,
        validate,
        validateAll,
        setErrors 
    };
};