import * as wml from '@quenk/wml';
import { Hidable } from '../../content/state/hidden';
import { LayoutAttrs, AbstractLayout } from '../../layout';
export declare const DRAWER = "ww-drawer";
export declare const DRAWER_CONTENT = "ww-drawer__content";
/**
 * DrawerAttrs
 */
export interface DrawerAttrs extends LayoutAttrs {
    /**
     * hidden if true, will hide the drawer.
     */
    hidden?: boolean;
    /**
     * content for the Drawer.
     *
     * Will be used if no children specified.
     */
    content?: wml.Content[];
}
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as
 * querying the current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears
 * in-front  of other content. Adjust the respective style variables to change.
 */
export declare class Drawer extends AbstractLayout<DrawerAttrs> implements Hidable {
    view: wml.View;
    values: {
        root: {
            id: string | undefined;
            className: string;
            wml: {
                id: string;
            };
        };
        content: {
            wml: {
                id: string;
            };
            className: string;
            value: import("@quenk/wml").Content[];
        };
    };
    isHidden(): boolean;
    hide(): Drawer;
    show(): Drawer;
    toggle(): Drawer;
}
