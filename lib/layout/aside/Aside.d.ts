import { Group, GroupAttrs } from '@package/self/content/Group';
import { Main } from './wml/aside';
export interface AsideAttrs extends GroupAttrs {
}
/**
 * Aside provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
export declare class Aside extends Group<AsideAttrs> {
    /**
     * values is a hash of values used in the template
     */
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
            content: string;
        };
        attrs: {
            content: string;
        };
    };
    view: Main;
    _getDrawerDOM<R>(f: (e: Element) => R): R | null;
    /**
     * visible queries whether the Drawer is visible or not.
     */
    visible(): boolean;
    /**
     * hide the drawer.
     */
    hide(): void;
    /**
     * showDrawer shows the drawer
     */
    show(): void;
    /**
     * toggle the visibility of this Drawer
     */
    toggle(): void;
}
