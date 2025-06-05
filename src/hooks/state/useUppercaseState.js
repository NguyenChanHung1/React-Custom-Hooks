import { toUppercase } from '../../utils/transformFunctions';
import { createStateHooks } from '../factories/createStateHooks';

export const useUppercaseState = createStateHooks(toUppercase);