import { View } from '@quenk/wml';
import { Group, GroupAttrs } from '../../content/Group';
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
export interface ActionBarAttrs extends GroupAttrs {
}
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
export declare class ActionBar extends Group<ActionBarAttrs> {
    view: View;
    values: {
        id: {
            content: string;
        };
        class: {
            root: string;
            content: string;
        };
    };
}
