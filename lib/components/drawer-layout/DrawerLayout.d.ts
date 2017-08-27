import * as common from 'wml-widgets-common';
import { Attrs, Macro } from '@quenk/wml-runtime';
import { Main } from './wml/drawer-layout';
import { Drawer } from '../drawer/Drawer';
export interface DrawerLayoutAttrs extends Attrs {
    ww?: {
        drawer?: Macro<void>;
        content?: Macro<void>;
    };
}
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export declare class DrawerLayout extends common.Container<DrawerLayoutAttrs> {
    view: Main<this>;
    _getDrawer(): Drawer;
    _combine(classes: string[]): string;
    /**
     * drawerVisible queries whether the Drawer is visible or not.
     */
    drawerVisible(): boolean;
    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer(): void;
    /**
     * showDrawer shows the drawer
     */
    showDrawer(): void;
    /**
     * toggle the visibility of this Drawer
     */
    toggleDrawer(): void;
}
