import { useMemo, useState } from 'react';

export const useProductHighlight = (products, strategy, config) => {
    const [highlightConfig, setHighlightConfig] = useState({
        strategy: strategy || null,
        config: config || null
    });

    const highlightedProducts = useMemo(() => {
        if (!highlightConfig.strategy || !highlightConfig.config) return products;
        return products.map((product) => ({
            ...product,
            isHighlighted: highlightConfig.strategy(product, 
                highlightConfig.config),
        }));
    }, [products, highlightConfig]);

    return [
        highlightedProducts, highlightConfig, setHighlightConfig
    ];
};