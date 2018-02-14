import { Event } from '@package/wml-widgets/control';
/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
export declare class TabClickedEvent extends Event<string> {
    name: string;
    constructor(name: string);
}
