import { View } from '@quenk/wml';
import { Group, GroupAttrs } from '@package/self/content/Group';
import { Aside } from '@package/self/layout/aside/Aside';
export interface DrawerAttrs extends GroupAttrs {
    ww?: {
        drawer?: View;
        /**
         * content can be used instead of speciying children.
         */
        content?: View;
    };
}
/**
 * Drawer provides a 2 column application layout with the first typically used as navaigation
 * and the second main application content.
 *
 * ```wml
 *
 *  <Drawer
 *   wml:id="layout"
 *   content={{this.getContent()}} />
 *
 * ```
 */
export declare class Drawer extends Group<DrawerAttrs> {
    view: View;
    /**
     * values is a hash of values used in the template.
     */
    values: {
        id: {
            root: string;
            drawer: string;
        };
        class: {
            root: string;
        };
        attrs: {
            DRAWER: string;
            CONTENT: string;
        };
        aside: {
            content: View;
        };
        content: View;
    };
    _getAside<R>(f: (a: Aside) => R): R | null;
    _combine(classes: string[]): string;
    /**
     * drawerVisible queries whether the Aside is visible or not.
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
     * toggle the visibility of the Aside.
     */
    toggleDrawer(): void;
}
