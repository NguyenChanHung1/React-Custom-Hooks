import { toLowercase } from '../../utils/transformFunctions';
import { createStateHooks } from '../factories/createStateHooks';

export const useLowercaseState = createStateHooks(toLowercase);