import { View } from '@quenk/wml';
import { Group, GroupAttrs } from '../../content/Group';
import { Hidable } from '../../content/state/hidden';
/**
 * DRAWER_LAYOUT
 */
export declare const DRAWER_LAYOUT = "ww-drawer-layout";
export interface DrawerLayoutAttrs extends GroupAttrs {
    ww?: {
        drawer?: View;
        /**
         * content can be used instead of speciying children.
         */
        content?: View;
    };
}
/**
 * DrawerLayout provides a 1 column application layout with a drawer that can
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8 on
 * a desktop (not fact checked yet).
 *
 *  Mobile:
 *  +------------------------------------------------------------------------------+
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |   <drawer>                                 |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  +------------------------------------------------------------------------------+
 *
 *  Desktop:
 *  +------------------------------------------------------------------------------+
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |   <drawer>  |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  +------------------------------------------------------------------------------+
 *
 */
export declare class DrawerLayout extends Group<DrawerLayoutAttrs> implements Hidable {
    view: View;
    isHidden: () => boolean;
    hide: () => DrawerLayout;
    show: () => DrawerLayout;
    toggle: () => DrawerLayout;
    /**
     * values is a hash of values used in the template.
     */
    values: {
        root: {
            id: string;
            class: string;
        };
        drawer: {
            id: string;
            content: View;
        };
        content: {
            render: () => Node | (Element | Node | HTMLElement)[];
        };
    };
}
