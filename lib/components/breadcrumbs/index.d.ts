import { Component, Attrs } from '@quenk/wml-runtime';
import * as layout from './wml/breadcrumbs';
export interface BreadCrumbAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * BreadCrumb
 */
export declare class BreadCrumbs extends Component<BreadCrumbAttrs> {
    view: layout.BreadCrumbs<this>;
}
export interface CrumbAttrs extends Attrs {
    ww?: {
        class?: string;
        href: string;
        anchorClass: string;
        onClick: (e: Event) => void;
    };
}
/**
 * Crumb
 */
export declare class Crumb extends Component<CrumbAttrs> {
    view: layout.Crumb<this>;
}
