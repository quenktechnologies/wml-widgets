import { Event } from '@package/self/control';

/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
export class StackChangedEvent<M> extends Event<M[]> { }
