import { Component, Attrs, Macro } from '@quenk/wml-runtime';
import { Main } from './wml/drawer';
export interface DrawerAttrs extends Attrs {
    ww?: {
        content?: Macro<void>;
    };
}
/**
 * Drawer provides an area for navigation content.
 */
export declare class Drawer extends Component<DrawerAttrs> {
    view: Main<this>;
    _getDrawerDOM(): Element;
    /**
     * visible queries whether the Drawer is visible or not.
     */
    visible(): boolean;
    /**
     * hide the drawer.
     */
    hide(): void;
    /**
     * showDrawer shows the drawer
     */
    show(): void;
    /**
     * toggle the visibility of this Drawer
     */
    toggle(): void;
}
