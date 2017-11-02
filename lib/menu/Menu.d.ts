import * as wml from '@quenk/wml';
export interface MenuAttrs extends wml.Attrs {
    ww?: {
        /**
         * class styles for the root element (ul).
         */
        class?: string;
        /**
         * hidden indicates the menu should be hidden.
         */
        hidden?: boolean;
        /**
         * hideOnExternalClick hides the menu when an external click event takes place.
         */
        hideOnExternalClick?: boolean;
        /**
         * hideOnClick hides the menu when an internal click event takes place.
         */
        hideOnClick?: boolean;
    };
}
/**
 * Menu
 */
export declare class Menu extends wml.Component<MenuAttrs> {
    view: wml.View;
    values: {
        id: {
            root: string;
            target: string;
        };
        class: {
            root: string;
        };
        content: (Element | Node | HTMLElement)[];
        click: {
            hideOnClick: boolean;
            hideOnExternalClick: boolean;
        };
    };
    /**
     * isHidden
     */
    isHidden(): boolean;
    /**
     * hide the menu.
     */
    hide(): Menu;
    /**
     * show this menu.
     */
    show(): Menu;
    /**
     * toggle this menu's visibility
     */
    toggle(): Menu;
    /**
     * setContent of this menu.
     */
    setContent(view: wml.Renderable): Menu;
    handleEvent(e: Event): void;
    rendered(): void;
}
