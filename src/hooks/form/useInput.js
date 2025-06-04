import { useCallback, useState } from "react";

export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const reset = useCallback(() => {
        setValue(initialValue);
    }, [initialValue]);

    return { 
        value, 
        onChange: handleChange,
        reset,
        setValue
    };
}