import { jest } from '@jest/globals'; // Import jest from @jest/globals

export const useSubmit = jest.fn((submitLogic) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);
        try {
            await submitLogic();
            setIsSuccess(true);
        } catch (err) {
            setError(err);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, isSuccess, handleSubmit };
});