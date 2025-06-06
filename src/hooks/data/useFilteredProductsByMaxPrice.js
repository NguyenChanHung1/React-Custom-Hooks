import { createDataProcessorHook } from '../factories/createDataProcessorHook';
import { filterProductsByMaxPrice } from '../../utils/dataProcessors';

export const useFilteredProductsByMaxPrice = createDataProcessorHook(filterProductsByMaxPrice, { maxPrice: Infinity });