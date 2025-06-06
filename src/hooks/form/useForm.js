import { useState, useCallback, useEffect } from 'react'; 
import { useValidation } from './useValidation';
import { useSubmit } from './useSubmit';

export const useForm = (initialValues = {}, validators = {}, onSubmit) => {
    const [formValues, setFormValues] = useState(initialValues);

    // useValidation
    const { validate_errors, validateAll, setErrors } = useValidation(validators);

    useEffect(() => {
        validateAll(formValues); // eslint-disable-next-line
    }, [formValues]);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);

    const formSubmitLogic = useCallback(async () => {
        const isValid = validateAll(formValues); 
        if (isValid) {
            await onSubmit(formValues);
        } else {
            throw new Error("Form không hợp lệ. Vui lòng kiểm tra lại các trường.");
        }
    }, [formValues, onSubmit, validateAll]);

    const { isLoading, error, isSuccess, handleSubmit } = useSubmit(formSubmitLogic);

    const resetForm = useCallback(() => {
        setFormValues(initialValues);
        setErrors({}); // Reset errors
    }, [initialValues, setErrors]);

    const isValid = Object.values(validate_errors).every(err => !err || err.length === 0);

    return {
        formValues,
        handleChange, // onChange handler
        validate_errors,
        isLoading,
        error, // submit error
        isSuccess,
        handleSubmit, // onSubmit handler cua form
        resetForm,
        isValid, // state cua form co valid hay ko
    };
};