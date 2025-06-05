import { useState, useCallback } from "react";

export const createStateHooks = (transformFunction) => {
    // tra ve 1 hook
    return (initialValue = '') => {
        const [value, setValue] = useState(() => transformFunction(initialValue));

        const setTransformValue = useCallback((newValue) => {
            setValue(transformFunction(newValue));
        }, []); //

        const reset = useCallback(() => {
            setValue(transformFunction(initialValue));
        }, [initialValue]); // transformFunction

        return {
            value,
            setValue: setTransformValue,
            reset
        };
    };
};