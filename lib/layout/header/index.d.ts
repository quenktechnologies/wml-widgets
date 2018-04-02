import * as wml from '@quenk/wml';
export declare const HEADER = "ww-header";
/**
 * HeaderAttrs
 */
export interface HeaderAttrs extends wml.Attrs {
    ww?: {
        /**
         * class or classes to append to the root element.
         */
        class?: string;
        /**
         * text to display as an alternative to specifying children elements.
         */
        text?: string;
    };
}
/**
 * Header is used to clearly separate headings from
 * the rest of content.
 */
export declare class Header extends wml.Component<HeaderAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
        text: string;
    };
}
