import { FormControlEvent } from '@package/self/control/form-control';

/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
export class StackChangedEvent<M> extends FormControlEvent<M[]> { }
