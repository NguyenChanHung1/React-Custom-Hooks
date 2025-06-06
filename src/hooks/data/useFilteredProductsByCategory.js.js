import { createDataProcessorHook } from '../factories/createDataProcessorHook';
import { filterProductsByCategory } from '../../utils/dataProcessors';

export const useFilteredProductsByCategory = createDataProcessorHook(filterProductsByCategory, { category: '' });