import { TabClickedEvent } from './TabClickedEvent';
import { View } from '@quenk/wml';
import { ControlAttrs, GenericControl } from '..';
/**
 * TabAttrs
 */
export interface TabAttrs extends ControlAttrs<void> {
    /**
     * active indicates whether the tab should be active or not.
     */
    active?: boolean;
    /**
     * text can be specified to be displayed on the tab.
     */
    text?: string;
    /**
     * onClick is applied when the tab is clicked.
     */
    onClick?: (e: TabClickedEvent) => void;
}
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export declare class Tab extends GenericControl<void, TabAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            class: string;
        };
        a: {
            id: string;
            text: string;
            clicked: (e: Event) => void;
        };
    };
    /**
     * click this Tab
     */
    click(): Tab;
}
