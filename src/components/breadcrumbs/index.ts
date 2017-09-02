import { Component, Attrs } from '@quenk/wml-runtime';
import * as layout from './wml/breadcrumbs';

export interface BreadCrumbAttrs extends Attrs {

    ww?: {

        class?: string

    }

};

/**
 * BreadCrumb
 */
export class BreadCrumbs extends Component<BreadCrumbAttrs>{

    view = new layout.BreadCrumbs(this);

}

export interface CrumbAttrs extends Attrs {

    ww?: {

        class?: string,
        href: string,
        anchorClass: string

    }

}

/**
 * Crumb
 */
export class Crumb extends Component<CrumbAttrs>{

    view = new layout.Crumb(this);

}
