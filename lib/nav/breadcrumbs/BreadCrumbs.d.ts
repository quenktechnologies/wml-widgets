import { Component, Attrs, View } from '@quenk/wml';
export interface BreadCrumbsAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * BreadCrumb
 */
export declare class BreadCrumbs extends Component<BreadCrumbsAttrs> {
    view: View;
    values: {
        class: {
            root: string;
        };
    };
}
