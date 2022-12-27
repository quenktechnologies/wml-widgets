import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
import { ControlAttrs, AbstractControl, Event as ControlEvent } from '../';
/**
 * TAB
 */
export declare const TAB = "ww-tab";
/**
 * TAB_BAR
 */
export declare const TAB_BAR = "ww-tab-bar";
/**
 * TabClickedEventHandler
 */
export type TabClickedEventHandler = (e: TabClickedEvent) => void;
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
    onClick?: TabClickedEventHandler;
}
/**
 * TabBarAttrs
 */
export interface TabBarAttrs extends HTMLElementAttrs {
    /**
     * justify the tab alignment.
     */
    justify?: boolean;
}
/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
export declare class TabClickedEvent extends ControlEvent<string> {
    name: string;
    constructor(name: string);
}
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export declare class Tab extends AbstractControl<void, TabAttrs> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        a: {
            wml: {
                id: string;
            };
            content: import("@quenk/wml").Content[];
            clicked: (e: Event) => void;
        };
    };
    /**
     * click this Tab
     */
    click(): Tab;
}
/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export declare class TabBar extends Component<TabBarAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
    };
}
