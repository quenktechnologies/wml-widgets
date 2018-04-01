import { Group, GroupAttrs } from '../../content/Group';
import { Main } from './wml/action-bar';
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
    view: Main;
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
