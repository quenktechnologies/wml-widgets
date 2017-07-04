import { AbstractWidget, WMLElement, Renderable } from '@quenk/wml/lib/runtime';
import { Main } from './wml/drawer-layout';
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export declare class DrawerLayout extends AbstractWidget {
    view: Main;
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
    rendered(): void;
    handleEvent(e: any): void;
}
export default DrawerLayout;
