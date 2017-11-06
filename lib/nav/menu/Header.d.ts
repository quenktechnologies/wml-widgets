import * as wml from '@quenk/wml';
export interface HeaderAttrs extends wml.Attrs {
    ww?: {
        class?: string;
        text?: string;
    };
}
/**
 * Header can be used to display non-clickable heading text in a nav list.
 */
export declare class Header extends wml.Component<HeaderAttrs> {
    view: wml.View;
    values: {
        item: {
            class: string;
        };
        span: {
            class: string;
        };
        text: string;
    };
}
