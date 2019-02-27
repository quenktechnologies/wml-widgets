import { View, Content, Component } from '@quenk/wml';
import { Hidable } from '../../content/state/hidden';
import { WidgetAttrs } from '../../';
import { LayoutAttrs, Layout } from '../';
/**
 * DRAWER_LAYOUT
 */
export declare const DRAWER_LAYOUT = "ww-drawer-layout";
/**
 * DrawerLayoutAttrs
 */
export interface DrawerLayoutAttrs extends LayoutAttrs {
    /**
     * drawerContent used to populate the Drawer.
     */
    drawerContent?: Content[];
}
/**
 * DrawerLayout provides a 1 column application layout with a drawer that can
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8
 * on a desktop (not fact checked yet).
 *
 *  Mobile:
 *  +---------------------------------------------------------------------+
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |   <drawer>                                 |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  +---------------------------------------------------------------------+
 *
 *  Desktop:
 *  +---------------------------------------------------------------------+
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |   <drawer>  |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  +---------------------------------------------------------------------+
 */
export declare class DrawerLayout extends Component<WidgetAttrs<DrawerLayoutAttrs>> implements Hidable, Layout {
    view: View;
    /**
     * values is a hash of values used in the template.
     */
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string | undefined;
            className: string;
        };
        drawer: {
            wml: {
                id: string;
            };
            content: Content[];
        };
        content: {
            id: string;
            value: Content[];
        };
    };
    isHidden(): boolean;
    hide(): DrawerLayout;
    show(): DrawerLayout;
    toggle(): this;
    setContent(c: Content[]): DrawerLayout;
    removeContent(): DrawerLayout;
}
