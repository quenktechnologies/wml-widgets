import * as wml from '@quenk/wml';
export interface MenuAttrs extends wml.Attrs {
    ww?: {
        /**
         * class or classes for the <ul> element.
         */
        class?: string;
    };
}
/**
 * Menu of navigation links.
 */
export declare class Menu extends wml.Component<MenuAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
