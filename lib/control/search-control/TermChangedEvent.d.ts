import { Event } from '@package/wml-widgets/control';
/**
 * TermChangedEvent signals the search term has changed.
 */
export declare class TermChangedEvent extends Event<string> {
    constructor(name: string, value: string);
}
