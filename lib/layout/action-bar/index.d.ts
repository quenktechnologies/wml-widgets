import { View } from '@quenk/wml';
import { LayoutAttrs, AbstractLayout } from '../';
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
export declare class ActionBar extends AbstractLayout<ActionBarAttrs> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            class: string;
        };
        content: {
            wml: {
                id: string;
            };
            class: string;
        };
    };
}
