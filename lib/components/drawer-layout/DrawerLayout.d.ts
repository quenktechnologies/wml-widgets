import { Component, WMLElement, Renderable, Attrs, Macro } from '@quenk/wml-runtime';
import { Main } from './wml/drawer-layout';
export interface DrawerLayoutAttrs extends Attrs {
    ww?: {
        navigation?: Macro<void>;
        content?: () => Macro<void>;
    };
}
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export declare class DrawerLayout extends Component<DrawerLayoutAttrs> {
    view: Main<this>;
    _getDrawerDOM(): WMLElement;
    _combine(classes: string[]): string;
    /**
     * drawerVisible queries whether the Drawer is visible or not.
     * @returns {Boolean}
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
    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): DrawerLayout;
}
export default DrawerLayout;
