import * as wml from '@quenk/wml';
export interface HeaderAttrs extends wml.Attrs {
    ww?: {
        class?: string;
        text?: string;
    };
}
/**
 * Header
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
