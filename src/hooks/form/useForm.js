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
        const isValid = validateAll(formValues); // Validate lại lần cuối trước khi submit
        if (isValid) {
            await onSubmit(formValues);
        } else {
            throw new Error("Form không hợp lệ. Vui lòng kiểm tra lại các trường.");
        }
    }, [formValues, onSubmit, validateAll]);

    const { isLoading, error, isSuccess, handleSubmit } = useSubmit(formSubmitLogic);

    const resetForm = useCallback(() => {
        setFormValues(initialValues);
        setErrors({}); // Reset lỗi
    }, [initialValues, setErrors]);

    // Kiểm tra tính hợp lệ của toàn bộ form dựa trên errors
    const isValid = Object.values(validate_errors).every(err => !err || err.length === 0);

    return {
        formValues,
        handleChange, // Hàm handleChange để truyền vào input
        validate_errors,
        isLoading,
        error, // Lỗi từ quá trình submit
        isSuccess,
        handleSubmit, // Hàm submit chính của form
        resetForm,
        isValid, // Trạng thái hợp lệ của form
    };
};