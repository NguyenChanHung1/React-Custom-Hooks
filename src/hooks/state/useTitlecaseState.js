import { toTitleCase } from '../../utils/transformFunctions';
import { createStateHooks } from '../factories/createStateHooks';

export const useTitlecaseState = createStateHooks(toTitleCase);