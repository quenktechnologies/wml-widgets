import * as wml from '@quenk/wml';
export interface ListAttrs extends wml.Attrs {
    ww?: {
        /**
         * class or classes for the <ul> element.
         */
        class?: string;
    };
}
/**
 * List of navigation links.
 */
export declare class List extends wml.Component<ListAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
