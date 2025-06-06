import { createDataProcessorHook } from "../factories/createDataProcessorHook";
import { sortProductsByName } from "../../utils/dataProcessors";

export const useSortedProducts = createDataProcessorHook(sortProductsByName, { direction: 'asc' });