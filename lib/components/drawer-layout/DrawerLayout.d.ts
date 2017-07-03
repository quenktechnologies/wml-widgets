import { AbstractWidget, WMLElement } from '@quenk/wml/lib/runtime';
import { Main } from './wml/view';
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export declare class DrawerLayout extends AbstractWidget {
    view: Main;
    _getDrawerDOM(): WMLElement;
    _combine(classes: string[]): string;
    /**
     * drawerContent provides the content for this layout's Drawer.
     */
    drawerContent(): HTMLElement;
    /**
     * mainViewContent provides the content for this layout's MainView.
     */
    mainViewContent(): HTMLElement;
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
    toggle(): void;
    rendered(): void;
    handleEvent(e: any): void;
    render(): any;
}
export default DrawerLayout;
