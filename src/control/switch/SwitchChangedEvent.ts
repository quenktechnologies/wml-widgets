import { Event } from '@package/self/control';

/**
 * SwitchChangedEvent signals the user has changed the switch.
 */
export class SwitchChangedEvent extends Event<boolean> {}
