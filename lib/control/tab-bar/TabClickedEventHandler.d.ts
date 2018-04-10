import { TabClickedEvent } from './TabClickedEvent';
/**
 * TabClickedEventHandler receives an event when a tab has been clicked.
 */
export interface TabClickedEventHandler {
    (e: TabClickedEvent): void;
}
