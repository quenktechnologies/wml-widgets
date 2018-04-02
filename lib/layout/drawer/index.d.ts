import * as wml from '@quenk/wml';
import { Hidable, IsVisible, Hide, Show, Toggle } from '../../content/state/hidden';
import { Group, GroupAttrs } from '../../content/Group';
export declare const DRAWER = "ww-drawer";
export declare const DRAWER_CONTENT = "ww-drawer__content";
/**
 * DrawerAttrs
 */
export interface DrawerAttrs extends GroupAttrs {
}
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
export declare class Drawer extends Group<DrawerAttrs> implements Hidable {
    view: wml.View;
    isVisible: IsVisible;
    hide: Hide<Drawer>;
    show: Show<Drawer>;
    toggle: Toggle<Drawer>;
    /**
     * values is a hash of values used in the template
     */
    values: {
        root: {
            id: string;
            class: string;
        };
        content: {
            class: string;
            render: () => Node | wml.Content[];
        };
    };
}
