import { useState, useCallback } from 'react';

export const useSubmit = (submitCallback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = useCallback(async (event) => {
        if (event) {
            event.preventDefault(); //
        }
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);
        try {
            await submitCallback();
            setIsSuccess(true);
        } catch (err) {
            setError(err);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }, [submitCallback]);

    return {
        isLoading,
        error,
        isSuccess,
        handleSubmit,
    };
};