import { View, Content, Component } from '@quenk/wml';
import { Drawer } from '../../menu/drawer';
import { HTMLId } from '../../';
import { LayoutAttrs, Layout } from '../';
export declare const DRAWER_LAYOUT = "ww-drawer-layout";
export declare const DRAWER_LAYOUT_CONTENT = "ww-drawer-layout__content";
/**
 * DrawerLayoutAttrs
 */
export interface DrawerLayoutAttrs extends LayoutAttrs {
    /**
     * drawer is the id of the root element of the drawer.
     *
     * This will be removed and added as the drawer is toggled.
     */
    drawer: HTMLId;
    /**
     * open if true shows the drawer along with the content.
     *
     * Defaults to false.
     */
    open?: boolean;
    /**
     * persist is a comma seperated list of html ids of elements in the content
     * are of the layout that should not be removed when setContent() is called.
     *
     * Use this to keep navigation bars etc.
     */
    persist?: string;
    /**
     * content if specified indicates which of the elements to treat as the
     * container for content.
     *
     * This element will be updated by calls to setContent() and removeContent()
     */
    content?: HTMLId;
}
/**
 * DrawerLayout provides a 2 column layout for an application where the first
 * column is an optionally displayed menu "drawer" and the second used for
 * regular application content.
 *
 * Methods exists to open or close the drawer as well as replace the content
 * displayed in the second column as desired.
  */
export declare class DrawerLayout extends Component<DrawerLayoutAttrs> implements Layout {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string | undefined;
        className: string;
        content: {
            wml: {
                id: string;
            };
            className: string;
            content: Content[];
            persist: string[];
        };
        drawer: {
            wml: {
                id: string;
            };
            hidden: boolean;
            content: Content[];
        };
    };
    get _drawer(): Drawer;
    get _content(): Element;
    /**
     * isOpen indicates whether the drawer part of the layout is open.
     */
    isOpen(): boolean;
    /**
     * open the drawer part of the layout.
     */
    open(): void;
    /**
     * close the drawer part of the layout.
     */
    close(): void;
    /**
     * toggle the state of the drawer part of the layout.
     */
    toggle(): void;
    setContent(frag: Content[]): DrawerLayout;
    removeContent(): DrawerLayout;
}
