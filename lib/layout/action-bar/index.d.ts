import { View } from '@quenk/wml';
import { LayoutAttrs, GenericLayout } from '../';
/**
 * ACTION_BAR class name. for the ActionBar root.
 */
export declare const ACTION_BAR = "ww-action-bar";
/**
 * ACTION_BAR_CONTENT class name.
 */
export declare const ACTION_BAR_CONTENT = "ww-action-bar__content";
/**
 * ActionBarAttrs
 */
export interface ActionBarAttrs extends LayoutAttrs {
}
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
export declare class ActionBar extends GenericLayout<ActionBarAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            class: string;
        };
        content: {
            id: string;
            class: string;
        };
    };
}
