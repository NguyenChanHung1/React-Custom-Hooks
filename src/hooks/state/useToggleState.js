import { toggleBoolean } from '../../utils/transformFunctions';
import { createStateHooks } from '../factories/createStateHooks';

export const useToggleState = createStateHooks(toggleBoolean);