import { View, Content, Component } from '@quenk/wml';
import { Hidable } from '../../content/state/hidden';
import { WidgetAttrs } from '../../';
import { LayoutAttrs, Layout } from '../';
/**
 * DRAWER_LAYOUT
 */
export declare const DRAWER_LAYOUT = "ww-drawer-layout";
export interface DrawerLayoutAttrs extends LayoutAttrs {
    drawer?: View;
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
export declare class DrawerLayout extends Component<WidgetAttrs<DrawerLayoutAttrs>> implements Hidable, Layout {
    view: View;
    isHidden: () => boolean;
    hide: () => DrawerLayout;
    show: () => DrawerLayout;
    toggle: () => DrawerLayout;
    setContent: (c: Content) => DrawerLayout;
    removeContent: () => DrawerLayout;
    /**
     * values is a hash of values used in the template.
     */
    values: {
        root: {
            class: string;
        };
        drawer: {
            id: string;
            content: View;
        };
        content: {
            id: string;
            render: () => Content[];
        };
    };
}
