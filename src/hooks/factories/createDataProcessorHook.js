import { useState, useMemo, useCallback } from "react";

export const createDataProcessorHook = (processFunction, initialConfig) => {
    return (data) => {
        // processor's config
        const [config, setConfig] = useState(initialConfig);

        const processedData = useMemo(() => {
            if (!Array.isArray(data)) {
                return [];
            }
            return processFunction(data, config);
        }, [data, config]); // Tinh toan lai khi data, config thay doi

        // update config
        const updateConfig = useCallback((newConfig) => {
            setConfig(prevConfig => ({ ...prevConfig, ...newConfig }));
        }, []);

        return {
            processedData,
            config,
            updateConfig,
        };
    };
};