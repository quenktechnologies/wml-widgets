import { TabClickedEvent } from './TabClickedEvent';
import { Component, Attrs, View } from '@quenk/wml';
import { Control, ControlAttrsProperties } from '..';
/**
 * TabAttrsProperties
 */
export interface TabAttrsProperties extends ControlAttrsProperties {
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
 * TabAttrs
 */
export interface TabAttrs extends Attrs {
    ww: TabAttrsProperties;
}
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export declare class Tab extends Component<TabAttrs> implements Control<TabAttrs> {
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
